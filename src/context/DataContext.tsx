import { createContext, useContext, ReactNode, useState } from 'react';
import { Player, PlayerStats, Team, TeamStats, StatFilter, SortOption } from '@/types';
import { mockPlayers } from '@/data/mockPlayers';

// Initial default sort option
const DEFAULT_SORT: SortOption = {
  field: 'pointsPerGame',
  direction: 'desc'
};

// Define the context shape
interface DataContextType {
  // Players
  players: Player[];
  getPlayer: (id: string) => Player | undefined;
  getPlayersByTeam: (teamId: string) => Player[];
  getPlayerSeasonStats: (playerId: string, season: string) => PlayerStats | undefined;
  
  // Teams
  teams: Team[];
  getTeam: (id: string) => Team | undefined;
  getTeamSeasonStats: (teamId: string, season: string) => TeamStats | undefined;
  
  // Utility functions
  getAvailableSeasons: () => string[];
  filterPlayers: (filters: StatFilter[]) => Player[];
  sortPlayers: (players: Player[], sort: SortOption, season: string) => Player[];
  
  // Application state
  selectedSeason: string;
  setSelectedSeason: (season: string) => void;
  loading: boolean;
}

// Create the context with default empty values
const DataContext = createContext<DataContextType>({
  players: [],
  getPlayer: () => undefined,
  getPlayersByTeam: () => [],
  getPlayerSeasonStats: () => undefined,
  
  teams: [],
  getTeam: () => undefined,
  getTeamSeasonStats: () => undefined,
  
  getAvailableSeasons: () => [],
  filterPlayers: () => [],
  sortPlayers: () => [],
  
  selectedSeason: '',
  setSelectedSeason: () => {},
  loading: false,
});

// Custom hook for easy access to the context
export const useData = () => useContext(DataContext);

// Provider component
export function DataProvider({ children }: { children: ReactNode }) {
  const [players] = useState<Player[]>(mockPlayers);
  const [teams] = useState<Team[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>('2022-23');
  const [loading] = useState<boolean>(false);
  
  // Available seasons based on the data
  const getAvailableSeasons = (): string[] => {
    const seasons = new Set<string>();
    players.forEach(player => {
      player.seasons.forEach(season => {
        seasons.add(season.year);
      });
    });
    return Array.from(seasons).sort();
  };
  
  // Player utility functions
  const getPlayer = (id: string): Player | undefined => {
    return players.find(player => player.id === id);
  };
  
  const getPlayersByTeam = (teamId: string): Player[] => {
    return players.filter(player => 
      player.team.id === teamId || 
      player.seasons.some(season => season.team.id === teamId)
    );
  };
  
  const getPlayerSeasonStats = (playerId: string, season: string): PlayerStats | undefined => {
    const player = getPlayer(playerId);
    if (!player) return undefined;
    
    const seasonData = player.seasons.find(s => s.year === season);
    return seasonData?.stats;
  };
  
  // Team utility functions
  const getTeam = (id: string): Team | undefined => {
    return teams.find(team => team.id === id);
  };
  
  const getTeamSeasonStats = (teamId: string, season: string): TeamStats | undefined => {
    const team = getTeam(teamId);
    if (!team) return undefined;
    
    const seasonData = team.seasons.find(s => s.year === season);
    return seasonData?.stats;
  };
  
  // Filter and sorting functions
  const filterPlayers = (filters: StatFilter[]): Player[] => {
    if (filters.length === 0) return players;
    
    return players.filter(player => {
      // Check if player passes all filters
      return filters.every(filter => {
        const seasonData = player.seasons.find(s => s.year === selectedSeason);
        if (!seasonData) return false;
        
        const statValue = seasonData.stats[filter.statType as keyof PlayerStats] as number;
        const passesMin = filter.minValue === undefined || statValue >= filter.minValue;
        const passesMax = filter.maxValue === undefined || statValue <= filter.maxValue;
        
        return passesMin && passesMax;
      });
    });
  };
  
  const sortPlayers = (playerList: Player[], sort: SortOption, season: string): Player[] => {
    return [...playerList].sort((a, b) => {
      const aSeasonData = a.seasons.find(s => s.year === season);
      const bSeasonData = b.seasons.find(s => s.year === season);
      
      if (!aSeasonData && !bSeasonData) return 0;
      if (!aSeasonData) return 1;
      if (!bSeasonData) return -1;
      
      const aValue = aSeasonData.stats[sort.field as keyof PlayerStats] as number;
      const bValue = bSeasonData.stats[sort.field as keyof PlayerStats] as number;
      
      return sort.direction === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    });
  };
  
  // Create the context value object
  const contextValue: DataContextType = {
    players,
    getPlayer,
    getPlayersByTeam,
    getPlayerSeasonStats,
    
    teams,
    getTeam,
    getTeamSeasonStats,
    
    getAvailableSeasons,
    filterPlayers,
    sortPlayers,
    
    selectedSeason,
    setSelectedSeason,
    loading,
  };
  
  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}