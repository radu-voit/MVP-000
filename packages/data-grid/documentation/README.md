# @koios/data-grid

Data grid components for tabular data display and manipulation.

## Overview

This package provides powerful data grid components built on top of TanStack Table, offering sorting, filtering, pagination, and virtualization capabilities.

## Features

- **High Performance**: Virtual scrolling for large datasets
- **Sorting**: Multi-column sorting support
- **Filtering**: Built-in filtering capabilities
- **Pagination**: Configurable pagination
- **Selection**: Row and cell selection
- **Customizable**: Extensive customization options
- **TypeScript Support**: Full type definitions included

## Installation

```bash
npm install @koios/data-grid
```

## Usage

```tsx
import { DataGrid, useDataGrid } from '@koios/data-grid';

function UserTable() {
  const columns = [
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'email', header: 'Email', accessorKey: 'email' },
    { id: 'role', header: 'Role', accessorKey: 'role' },
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    // ...
  ];

  return (
    <DataGrid
      data={data}
      columns={columns}
      pageSize={10}
      sortable
      filterable
    />
  );
}
```

## Components

- `DataGrid` - Main data grid component
- `DataTable` - Basic table component
- `ColumnHeader` - Column header component
- `Row` - Table row component
- `Cell` - Table cell component

## Hooks

- `useDataGrid` - Main data grid hook
- `useSorting` - Sorting functionality hook
- `useFiltering` - Filtering functionality hook
- `usePagination` - Pagination functionality hook

## Types

- `Column<T>` - Column definition interface
- `DataGridProps<T>` - Data grid props interface
- `SortDirection` - Sort direction type

## Contributing

Please refer to the dev-notes folder for development guidelines and contribution instructions.
