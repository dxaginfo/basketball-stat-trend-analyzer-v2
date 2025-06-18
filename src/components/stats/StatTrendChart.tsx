import { useState } from 'react';
import { Player, PlayerStats, Team, TeamStats } from '@/types';
import { mockPlayers } from '@/data/mockPlayers';

// This is a placeholder for the actual chart component
// In a real implementation, you would use a charting library like Recharts
function LineChart({ data, xKey, yKey, height = 300 }: { data: any[], xKey: string, yKey: string, height?: number }) {
  return (
    <div 
      className="flex items-center justify-center" 
      style={{ height: `${height}px` }}
    >
      <p className="text-muted-foreground">
        Line chart would render here, showing {yKey} over {xKey}
      </p>
    </div>
  );
}

export function StatTrendChart() {
  const [entityType, setEntityType] = useState<'player' | 'team'>('player');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(mockPlayers[0]?.id || '');
  const [selectedStat, setSelectedStat] = useState<string>(entityType === 'player' ? 'pointsPerGame' : 'pace');
  
  const seasons = ['2020-21', '2021-22', '2022-23']; // In a real app, you'd get this from your data source
  
  // Define available stats based on entity type
  const playerStats = [
    { key: 'pointsPerGame', label: 'Points Per Game' },
    { key: 'assistsPerGame', label: 'Assists Per Game' },
    { key: 'reboundsPerGame', label: 'Rebounds Per Game' },
    { key: 'stealsPerGame', label: 'Steals Per Game' },
    { key: 'blocksPerGame', label: 'Blocks Per Game' },
    { key: 'fieldGoalPercentage', label: 'Field Goal %' },
    { key: 'threePointPercentage', label: '3-Point %' },
    { key: 'plusMinus', label: 'Plus/Minus' },
    { key: 'playerEfficiencyRating', label: 'Player Efficiency Rating' },
  ];
  
  const teamStats = [
    { key: 'pointsPerGame', label: 'Points Per Game' },
    { key: 'pointsAllowedPerGame', label: 'Points Allowed Per Game' },
    { key: 'pace', label: 'Pace' },
    { key: 'offensiveRating', label: 'Offensive Rating' },
    { key: 'defensiveRating', label: 'Defensive Rating' },
    { key: 'netRating', label: 'Net Rating' },
    { key: 'fieldGoalPercentage', label: 'Field Goal %' },
    { key: 'threePointPercentage', label: '3-Point %' },
  ];
  
  const availableStats = entityType === 'player' ? playerStats : teamStats;
  
  // Get the selected player
  const selectedPlayer: Player | null = 
    entityType === 'player'
      ? mockPlayers.find(p => p.id === selectedPlayerId) || null
      : null;
  
  // Generate data for the chart
  const chartData = seasons.map(season => {
    let value = null;
    
    if (selectedPlayer) {
      const seasonData = selectedPlayer.seasons.find(s => s.year === season);
      if (seasonData) {
        value = seasonData.stats[selectedStat as keyof PlayerStats];
      }
    }
    
    return {
      season,
      value
    };
  }).filter(d => d.value !== null);
  
  return (
    <div className="rounded-lg border p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Statistical Trend Analysis</h2>
        <p className="text-muted-foreground">
          View performance trends across multiple seasons
        </p>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="space-y-1">
          <label className="text-sm font-medium">Entity Type</label>
          <select 
            value={entityType} 
            onChange={(e) => {
              setEntityType(e.target.value as 'player' | 'team');
              setSelectedStat(e.target.value === 'player' ? 'pointsPerGame' : 'pace');
            }}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="player">Player</option>
            <option value="team">Team</option>
          </select>
        </div>
        
        {entityType === 'player' ? (
          <div className="space-y-1">
            <label className="text-sm font-medium">Player</label>
            <select 
              value={selectedPlayerId} 
              onChange={(e) => setSelectedPlayerId(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            >
              {mockPlayers.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="space-y-1">
            <label className="text-sm font-medium">Team</label>
            <select 
              className="w-full rounded-md border px-3 py-2"
              disabled
            >
              <option>Team selection would go here</option>
            </select>
          </div>
        )}
        
        <div className="space-y-1">
          <label className="text-sm font-medium">Statistic</label>
          <select 
            value={selectedStat} 
            onChange={(e) => setSelectedStat(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          >
            {availableStats.map((stat) => (
              <option key={stat.key} value={stat.key}>
                {stat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="rounded-md border p-4">
        <h3 className="mb-2 font-medium">
          {entityType === 'player' 
            ? (mockPlayers.find(p => p.id === selectedPlayerId)?.name || 'Player') 
            : 'Team'
          } - {availableStats.find(s => s.key === selectedStat)?.label || 'Statistic'}
        </h3>
        
        <LineChart 
          data={chartData}
          xKey="season"
          yKey="value"
          height={300}
        />
        
        <div className="mt-2 text-xs text-muted-foreground">
          {chartData.length === 0 
            ? 'No data available for the selected criteria' 
            : `Showing data for ${chartData.length} seasons`
          }
        </div>
      </div>
    </div>
  );
}