import { useState } from 'react'
import { StatTrendChart } from './components/stats/StatTrendChart'
import { PlayerComparison } from './components/stats/PlayerComparison'

// A simple TabBar component for navigation
function TabBar({ activeTab, setActiveTab }: { 
  activeTab: string; 
  setActiveTab: (tab: string) => void 
}) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'trends', label: 'Trend Analysis' },
    { id: 'comparison', label: 'Player Comparison' },
  ];

  return (
    <div className="border-b mb-6">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// A placeholder Dashboard component
function Dashboard() {
  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-1">Basketball Statistics Dashboard</h2>
      <p className="text-muted-foreground mb-6">
        Welcome to the Basketball Statistics Trend Analyzer. Use the tabs above to explore player statistics, 
        analyze trends, and compare player performance.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4 bg-primary/5">
          <div className="text-xl font-bold mb-1">Player Comparison</div>
          <p className="text-sm text-muted-foreground">
            Compare statistics between multiple players across different seasons.
          </p>
          <p className="mt-4 text-sm">
            Available for 3 players with data from 2020-21 to 2022-23 seasons.
          </p>
        </div>
        
        <div className="rounded-lg border p-4 bg-primary/5">
          <div className="text-xl font-bold mb-1">Trend Analysis</div>
          <p className="text-sm text-muted-foreground">
            Visualize how player statistics have evolved over time.
          </p>
          <p className="mt-4 text-sm">
            Track performance metrics across three consecutive seasons.
          </p>
        </div>
        
        <div className="rounded-lg border p-4 bg-primary/5">
          <div className="text-xl font-bold mb-1">Statistical Database</div>
          <p className="text-sm text-muted-foreground">
            Access comprehensive basketball statistics for players and teams.
          </p>
          <p className="mt-4 text-sm">
            Contains player statistics for multiple seasons and performance metrics.
          </p>
        </div>
      </div>
    </div>
  );
}

// The main App component
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-orange-500"></div>
            <h1 className="text-xl font-bold">Basketball Stat Analyzer</h1>
          </div>
          
          <nav>
            <ul className="flex space-x-4">
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">Documentation</a>
              </li>
              <li className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">GitHub</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container py-6">
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'trends' && <StatTrendChart />}
        {activeTab === 'comparison' && <PlayerComparison />}
      </main>
      
      <footer className="border-t py-6 mt-12">
        <div className="container">
          <p className="text-sm text-center text-muted-foreground">
            Basketball Statistics Trend Analyzer • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;