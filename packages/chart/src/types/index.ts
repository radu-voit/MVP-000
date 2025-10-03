// Chart Types
export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface ChartConfig {
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export type ChartType = 'area' | 'bar' | 'line' | 'scatter' | 'pie';
