// Team types
export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  city: string;
  conference: 'East' | 'West';
  division: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  seasons: TeamSeason[];
}

export interface TeamSeason {
  year: string;
  stats: TeamStats;
  standings: TeamStandings;
}

export interface TeamStats {
  wins: number;
  losses: number;
  pointsPerGame: number;
  pointsAllowedPerGame: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  turnoversPerGame: number;
  foulsPerGame: number;
  pace: number;
  offensiveRating: number;
  defensiveRating: number;
  netRating: number;
}

export interface TeamStandings {
  conferenceRank: number;
  divisionRank: number;
  playoffSeed?: number;
  gamesBack: number;
}

// Player types
export interface Player {
  id: string;
  name: string;
  position: Position;
  height: string;
  weight: number;
  age: number;
  jerseyNumber: string;
  team: {
    id: string;
    name: string;
    abbreviation: string;
  };
  college?: string;
  country: string;
  draftYear?: number;
  draftRound?: number;
  draftPick?: number;
  seasons: Season[];
}

export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C' | 'G' | 'F' | 'G-F' | 'F-C';

export interface Season {
  year: string;
  team: {
    id: string;
    name: string;
    abbreviation: string;
  };
  stats: PlayerStats;
}

export interface PlayerStats {
  gamesPlayed: number;
  gamesStarted: number;
  minutesPerGame: number;
  pointsPerGame: number;
  assistsPerGame: number;
  reboundsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  turnoversPerGame: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  threePointsMade: number;
  threePointsAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  offensiveRebounds: number;
  defensiveRebounds: number;
  personalFouls: number;
  plusMinus: number;
  trueShootingPercentage: number;
  playerEfficiencyRating: number;
  valueOverReplacement: number;
}

// Statistics types for visualization
export interface StatTrend {
  season: string;
  value: number;
}

export interface PlayerStatComparison {
  player1: Player;
  player2: Player;
  stat: keyof PlayerStats;
  player1Stats: StatTrend[];
  player2Stats: StatTrend[];
}

export interface TeamStatComparison {
  team1: Team;
  team2: Team;
  stat: keyof TeamStats;
  team1Stats: StatTrend[];
  team2Stats: StatTrend[];
}

// Filter and sorting options
export interface StatFilter {
  minValue?: number;
  maxValue?: number;
  statType: keyof PlayerStats | keyof TeamStats;
}

export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: keyof PlayerStats | keyof TeamStats;
  direction: SortDirection;
}