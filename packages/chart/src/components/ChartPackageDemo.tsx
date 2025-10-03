import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for charts
const sampleData = [
  { name: 'Jan', value: 400, sales: 2400, users: 240 },
  { name: 'Feb', value: 300, sales: 1398, users: 139 },
  { name: 'Mar', value: 200, sales: 9800, users: 980 },
  { name: 'Apr', value: 278, sales: 3908, users: 390 },
  { name: 'May', value: 189, sales: 4800, users: 480 },
  { name: 'Jun', value: 239, sales: 3800, users: 380 },
];

const pieData = [
  { name: 'Desktop', value: 400, color: '#0088FE' },
  { name: 'Mobile', value: 300, color: '#00C49F' },
  { name: 'Tablet', value: 300, color: '#FFBB28' },
  { name: 'Other', value: 200, color: '#FF8042' },
];

// Simple Area Chart Component
const AreaChart: React.FC<{ data: any[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="w-full h-64 relative">
      <svg width="100%" height="100%" viewBox="0 0 400 200">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={i}
            x1="40"
            y1={40 + ratio * 120}
            x2="380"
            y2={40 + ratio * 120}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Area path */}
        <path
          d={`M 40,${160 - (data[0].value / maxValue) * 120} ${data.map((d, i) => 
            `L ${40 + (i * 340) / (data.length - 1)},${160 - (d.value / maxValue) * 120}`
          ).join(' ')} L ${40 + 340},160 L 40,160 Z`}
          fill="url(#areaGradient)"
        />
        
        {/* Line */}
        <path
          d={`M 40,${160 - (data[0].value / maxValue) * 120} ${data.map((d, i) => 
            `L ${40 + (i * 340) / (data.length - 1)},${160 - (d.value / maxValue) * 120}`
          ).join(' ')}`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={40 + (i * 340) / (data.length - 1)}
            cy={160 - (d.value / maxValue) * 120}
            r="4"
            fill="#3b82f6"
          />
        ))}
        
        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={40 + (i * 340) / (data.length - 1)}
            y="190"
            textAnchor="middle"
            className="text-xs fill-gray-600"
          >
            {d.name}
          </text>
        ))}
        
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <text
            key={i}
            x="35"
            y={45 + ratio * 120}
            textAnchor="end"
            className="text-xs fill-gray-600"
          >
            {Math.round(maxValue * ratio)}
          </text>
        ))}
      </svg>
    </div>
  );
};

// Simple Bar Chart Component
const BarChart: React.FC<{ data: any[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = 300 / data.length;
  
  return (
    <div className="w-full h-64 relative">
      <svg width="100%" height="100%" viewBox="0 0 400 200">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={i}
            x1="40"
            y1={40 + ratio * 120}
            x2="380"
            y2={40 + ratio * 120}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Bars */}
        {data.map((d, i) => (
          <rect
            key={i}
            x={50 + i * barWidth}
            y={160 - (d.value / maxValue) * 120}
            width={barWidth - 10}
            height={(d.value / maxValue) * 120}
            fill="#10b981"
            rx="2"
          />
        ))}
        
        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={50 + i * barWidth + barWidth / 2}
            y="190"
            textAnchor="middle"
            className="text-xs fill-gray-600"
          >
            {d.name}
          </text>
        ))}
        
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <text
            key={i}
            x="35"
            y={45 + ratio * 120}
            textAnchor="end"
            className="text-xs fill-gray-600"
          >
            {Math.round(maxValue * ratio)}
          </text>
        ))}
      </svg>
    </div>
  );
};

// Simple Pie Chart Component
const PieChart: React.FC<{ data: any[] }> = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;
  
  return (
    <div className="w-full h-64 relative">
      <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
        {data.map((d, i) => {
          const percentage = d.value / total;
          const angle = percentage * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          
          const x1 = 100 + 60 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 100 + 60 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 100 + 60 * Math.cos((endAngle * Math.PI) / 180);
          const y2 = 100 + 60 * Math.sin((endAngle * Math.PI) / 180);
          
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          const pathData = [
            `M 100,100`,
            `L ${x1},${y1}`,
            `A 60,60 0 ${largeArcFlag},1 ${x2},${y2}`,
            'Z'
          ].join(' ');
          
          currentAngle += angle;
          
          return (
            <path
              key={i}
              d={pathData}
              fill={d.color}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
        
        {/* Legend */}
        {data.map((d, i) => (
          <g key={i}>
            <rect x="10" y={10 + i * 20} width="12" height="12" fill={d.color} />
            <text x="25" y={20 + i * 20} className="text-xs fill-gray-700">
              {d.name}: {Math.round((d.value / total) * 100)}%
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Chart Package Demo Component
export const ChartPackageDemo: React.FC = () => {
  const [selectedData, setSelectedData] = useState(sampleData);
  
  const updateData = () => {
    setSelectedData(prevData => 
      prevData.map(d => ({
        ...d,
        value: Math.floor(Math.random() * 500) + 100
      }))
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">@koios/chart Package Demo</h1>
          <p className="text-muted-foreground">
            Interactive chart components built with Recharts and D3
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Chart Types</CardTitle>
              <Button onClick={updateData} variant="outline" size="sm">
                Generate New Data
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="area" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="area">Area Chart</TabsTrigger>
                  <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                  <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                </TabsList>
                
                <TabsContent value="area" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Area Chart</h3>
                    <AreaChart data={selectedData} />
                    <p className="text-sm text-muted-foreground">
                      Shows trends over time with filled areas
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="bar" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Bar Chart</h3>
                    <BarChart data={selectedData} />
                    <p className="text-sm text-muted-foreground">
                      Compares values across categories
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="pie" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Pie Chart</h3>
                    <PieChart data={pieData} />
                    <p className="text-sm text-muted-foreground">
                      Shows proportions of a whole
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Multiple chart types (Area, Bar, Line, Scatter, Pie)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Interactive and responsive</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Customizable themes and colors</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Built on Recharts and D3</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>TypeScript support</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import { AreaChart, BarChart } from '@koios/chart';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  // ...
];

<AreaChart data={data} />
<BarChart data={data} />`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
