import { useState } from 'react';
import { mockPlayers } from '@/data/mockPlayers';
import { PlayerStats } from '@/types';
import { StatChangeCard } from './StatChangeCard';

export function PlayerComparison() {
  const [player1Id, setPlayer1Id] = useState(mockPlayers[0]?.id || '');
  const [player2Id, setPlayer2Id] = useState(mockPlayers[1]?.id || '');
  const [selectedSeason, setSelectedSeason] = useState('2022-23');
  const [selectedStat, setSelectedStat] = useState<keyof PlayerStats>('pointsPerGame');
  
  const player1 = mockPlayers.find(p => p.id === player1Id);
  const player2 = mockPlayers.find(p => p.id === player2Id);
  
  const player1SeasonData = player1?.seasons.find(s => s.year === selectedSeason);
  const player2SeasonData = player2?.seasons.find(s => s.year === selectedSeason);
  
  const player1PrevSeasonData = player1?.seasons.find(s => s.year === '2021-22');
  const player2PrevSeasonData = player2?.seasons.find(s => s.year === '2021-22');
  
  const availableStats = [
    { key: 'pointsPerGame', label: 'Points Per Game' },
    { key: 'assistsPerGame', label: 'Assists Per Game' },
    { key: 'reboundsPerGame', label: 'Rebounds Per Game' },
    { key: 'stealsPerGame', label: 'Steals Per Game' },
    { key: 'blocksPerGame', label: 'Blocks Per Game' },
    { key: 'fieldGoalPercentage', label: 'Field Goal %' },
    { key: 'threePointPercentage', label: '3-Point %' },
    { key: 'freeThrowPercentage', label: 'Free Throw %' },
    { key: 'plusMinus', label: 'Plus/Minus' },
    { key: 'playerEfficiencyRating', label: 'Player Efficiency Rating' },
    { key: 'trueShootingPercentage', label: 'True Shooting %' }
  ];
  
  return (
    <div className="rounded-lg border p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Player Comparison</h2>
        <p className="text-muted-foreground">
          Compare statistics between two players
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Player 1</label>
          <select 
            value={player1Id} 
            onChange={(e) => setPlayer1Id(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          >
            {mockPlayers.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium">Player 2</label>
          <select 
            value={player2Id} 
            onChange={(e) => setPlayer2Id(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          >
            {mockPlayers.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium">Season</label>
          <select 
            value={selectedSeason} 
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="2020-21">2020-21</option>
            <option value="2021-22">2021-22</option>
            <option value="2022-23">2022-23</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-1">
        <label className="text-sm font-medium">Statistic</label>
        <select 
          value={selectedStat as string}
          onChange={(e) => setSelectedStat(e.target.value as keyof PlayerStats)}
          className="w-full rounded-md border px-3 py-2"
        >
          {availableStats.map((stat) => (
            <option key={stat.key} value={stat.key}>
              {stat.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {player1 && player1SeasonData && player1PrevSeasonData ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold">
                {player1.jerseyNumber}
              </div>
              <div>
                <h3 className="text-xl font-bold">{player1.name}</h3>
                <p className="text-sm text-muted-foreground">{player1.team.name} • {player1.position}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground mb-1">Height</div>
                <div className="font-semibold">{player1.height}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground mb-1">Weight</div>
                <div className="font-semibold">{player1.weight} lbs</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground mb-1">Age</div>
                <div className="font-semibold">{player1.age}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground mb-1">Games</div>
                <div className="font-semibold">{player1SeasonData.stats.gamesPlayed}</div>
              </div>
            </div>
            
            <StatChangeCard 
              title={availableStats.find(s => s.key === selectedStat)?.label || ''}
              current={player1SeasonData.stats[selectedStat] as number}
              previous={player1PrevSeasonData.stats[selectedStat] as number}
              unit={selectedStat.includes('Percentage') ? '%' : ''}
              description={`${selectedSeason} vs 2021-22`}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-60 border rounded-lg">
            <p className="text-muted-foreground">No data available for Player 1</p>
          </div>
        )}
        
        {player2 && player2SeasonData && player2PrevSeasonData ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold">
                {player2.jerseyNumber}
              </div>
              <div>
                <h3 className="text-xl font-bold">{player2.name}</h3>
                <p className="text-sm text-muted-foreground">{player2.team.name} • {player2.position}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground mb-1">Height</div>
                <div className="font-semibold">{player2.height}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground mb-1">Weight</div>
                <div className="font-semibold">{player2.weight} lbs</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground mb-1">Age</div>
                <div className="font-semibold">{player2.age}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm text-muted-foreground mb-1">Games</div>
                <div className="font-semibold">{player2SeasonData.stats.gamesPlayed}</div>
              </div>
            </div>
            
            <StatChangeCard 
              title={availableStats.find(s => s.key === selectedStat)?.label || ''}
              current={player2SeasonData.stats[selectedStat] as number}
              previous={player2PrevSeasonData.stats[selectedStat] as number}
              unit={selectedStat.includes('Percentage') ? '%' : ''}
              description={`${selectedSeason} vs 2021-22`}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-60 border rounded-lg">
            <p className="text-muted-foreground">No data available for Player 2</p>
          </div>
        )}
      </div>
      
      {player1SeasonData && player2SeasonData && (
        <div className="mt-6 rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-2">Head-to-Head Comparison</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-3xl font-bold">
                {player1SeasonData.stats[selectedStat].toFixed(
                  selectedStat.includes('Percentage') ? 3 : 1
                )}
                {selectedStat.includes('Percentage') ? '' : ''}
              </div>
              <div className="text-sm text-muted-foreground">{player1.name}</div>
            </div>
            
            <div className="text-muted-foreground font-medium">
              {availableStats.find(s => s.key === selectedStat)?.label || ''}
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold">
                {player2SeasonData.stats[selectedStat].toFixed(
                  selectedStat.includes('Percentage') ? 3 : 1
                )}
                {selectedStat.includes('Percentage') ? '' : ''}
              </div>
              <div className="text-sm text-muted-foreground">{player2.name}</div>
            </div>
          </div>
          
          <div className="relative h-2 bg-gray-200 rounded-full mt-4">
            <div
              className="absolute top-0 left-0 h-2 bg-primary rounded-full"
              style={{
                width: `${(player1SeasonData.stats[selectedStat] / (player1SeasonData.stats[selectedStat] + player2SeasonData.stats[selectedStat])) * 100}%`
              }}
            ></div>
          </div>
          
          <div className="mt-4 text-xs text-center text-muted-foreground">
            {selectedSeason} Season • {player1SeasonData.stats.gamesPlayed} games vs {player2SeasonData.stats.gamesPlayed} games
          </div>
        </div>
      )}
    </div>
  );
}