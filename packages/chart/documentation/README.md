# @koios/chart

Chart visualization components and utilities for the KOIOS platform.

## Overview

This package provides a comprehensive set of chart components built on top of Recharts and D3, designed for high-performance data visualization in React applications.

## Features

- **Multiple Chart Types**: Area, Bar, Line, Scatter, and Pie charts
- **Customizable**: Extensive theming and configuration options
- **Performance Optimized**: Built for handling large datasets
- **TypeScript Support**: Full type definitions included
- **Responsive**: Mobile-first responsive design

## Installation

\`\`\`bash
npm install @koios/chart
\`\`\`

## Usage

\`\`\`tsx
import { AreaChart, BarChart, LineChart } from '@koios/chart';

function Dashboard() {
  const data = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 200 },
    // ...
  ];

  return (
    <div>
      <AreaChart data={data} />
      <BarChart data={data} />
      <LineChart data={data} />
    </div>
  );
}
\`\`\`

## Components

- `AreaChart` - Area chart component
- `BarChart` - Bar chart component  
- `LineChart` - Line chart component
- `ScatterChart` - Scatter plot component
- `PieChart` - Pie chart component

## Hooks

- `useChartData` - Hook for processing chart data
- `useChartConfig` - Hook for chart configuration
- `useChartTheme` - Hook for chart theming

## API Reference

See the individual component documentation for detailed API references.

## Contributing

Please refer to the dev-notes folder for development guidelines and contribution instructions.
