// Data Grid Types
export interface Column<T = any> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (props: { getValue: () => any; row: T }) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
}

export interface DataGridProps<T = any> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  sortable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;
