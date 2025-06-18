# Basketball Statistics Trend Analyzer

An interactive web application for analyzing and visualizing basketball player and team statistics trends over time.

## Overview

The Basketball Stat Trend Analyzer is a modern web application that allows basketball enthusiasts, analysts, and fans to explore historical basketball statistics and identify patterns and trends. The app enables users to compare players, teams, and seasons with interactive visualizations.

## Features

- **Multi-player Comparison**: Compare statistics for multiple players across different seasons
- **Trend Visualization**: View statistical trends over time with interactive charts
- **Team Performance Analysis**: Analyze team performance metrics across seasons
- **Customizable Metrics**: Select from a comprehensive set of basketball statistics to visualize
- **Interactive Dashboards**: Create and save custom stat dashboards for future reference
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices

## Technology Stack

- **Frontend**: React with TypeScript
- **State Management**: React Context API
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: Recharts for statistical visualizations
- **Data Processing**: JavaScript utilities for statistical calculations
- **Build Tools**: Vite for fast development and optimized production builds

## Project Structure

```
/basketball-stat-trend-analyzer
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── charts/        # Chart visualizations
│   │   ├── layout/        # Layout components
│   │   ├── player/        # Player-related components
│   │   ├── team/          # Team-related components
│   │   └── ui/            # UI components (shadcn/ui)
│   ├── context/           # React Context providers
│   ├── data/              # Mock data and data utilities
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── .eslintrc.json         # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Core Components

### Player Comparison

The PlayerComparison component allows users to select multiple players and compare their statistics across different metrics and seasons. It features:

- Multi-player selection (up to 3 players)
- Metric selection from various statistical categories
- Interactive visualization of selected metrics
- Side-by-side comparison of player performance

### Statistical Trend Analysis

The StatTrendChart component visualizes how a player's or team's performance in a specific statistical category has evolved over time. Features include:

- Entity selection (player or team)
- Metric selection from available statistical categories
- Time range selection
- Line chart visualization of trends

### Statistical Change Cards

The StatChangeCard component provides a quick overview of changes in a player's statistics between seasons, including:

- Visual indicators for positive/negative changes
- Percentage change calculation
- Comparison to previous season

## Data Structure

The application uses a well-defined data schema:

- **Players**: Personal information and season-by-season statistics
- **Teams**: Team information and performance metrics across seasons
- **Seasons**: Year-by-year statistical data

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dxaginfo/basketball-stat-trend-analyzer-v2.git
   cd basketball-stat-trend-analyzer-v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Select Players/Teams**: Use the search or dropdown to select the players or teams you want to analyze
2. **Choose Metrics**: Select which statistical metrics you want to visualize
3. **Set Time Range**: Adjust the time range for the analysis
4. **View Visualizations**: Explore the generated charts and analyze trends
5. **Export/Save**: Export visualizations or save your dashboard configuration

## Development Roadmap

- [x] Basic project setup with React, TypeScript, and Vite
- [x] UI components implementation with Tailwind CSS and shadcn/ui
- [x] Mock data structure for basketball statistics
- [x] Player comparison interface
- [x] Basic chart visualizations
- [x] Responsive design implementation
- [ ] API integration for real basketball data
- [ ] Advanced filtering and search capabilities
- [ ] Dashboard saving functionality
- [ ] User authentication for saving preferences
- [ ] Advanced statistical analysis features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data visualization libraries: Recharts
- UI component library: shadcn/ui
- Design inspiration from modern sports analytics platforms