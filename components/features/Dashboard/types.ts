export type WidgetType = 
  | 'line' 
  | 'bar' 
  | 'area' 
  | 'pie' 
  | 'radar' 
  | 'stat' 
  | 'scatter';

export type CurveType = 'monotone' | 'linear' | 'step';

export interface LineSeriesConfig {
  id: string;
  dataKey: string;
  name: string;
  color: string;
  strokeWidth: number;
  curveType: CurveType;
  dashed?: boolean;
}

export interface BarSeriesConfig {
  id: string;
  dataKey: string;
  name: string;
  color: string;
  stackId?: string;
}

export interface Widget {
  id: string;
  title: string;
  subtitle?: string;
  type: WidgetType;
  colSpan: 1 | 2 | 3; // 1 = 1/3 grid width, 2 = 2/3 grid width, 3 = full grid width
  height?: number;
  
  // Data
  data: Record<string, any>[];
  categoryKey: string; // e.g., "month", "quarter", "category"
  
  // Line Chart Configuration (Supports Multiple Comparison Lines!)
  lines?: LineSeriesConfig[];
  
  // Bar Chart Configuration
  bars?: BarSeriesConfig[];
  
  // Single Series / Color (for Pie, Area, Stat)
  primaryColor?: string;
  secondaryColor?: string;
  valueKey?: string;
  
  // Stat Card Specifics
  statValue?: string;
  statChange?: string;
  statIsPositive?: boolean;
  statPeriod?: string;
  
  // Appearance toggles
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
}
