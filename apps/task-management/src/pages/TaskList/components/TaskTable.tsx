import { DEFAULT_PAGINATION_PARAMS, ROW_PER_PAGE_OPTIONS } from '@libs/constants';
import { GetTasksParams, ITask, OtherTaskStatus, TaskStatus } from '@libs/types';
import { formatDate } from '@libs/utils';
import { Chip, MenuItem, Stack, TablePagination, TextField, Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import React from 'react';
import { TaskStatusLabels } from '../constants';
import { useTaskStore } from '../hooks/useStore';

type Props = {
  onItemSelect?: (task: ITask) => void;
};

const FilterTaskStatusOptions = {
  All: OtherTaskStatus.All,
  Completed: TaskStatus.Completed,
  Incomplete: TaskStatus.Incomplete,
};

function TaskTable({ onItemSelect }: Props) {
  const [filterParams, setFilterParams] = React.useState<GetTasksParams>({
    ...DEFAULT_PAGINATION_PARAMS,
    status: FilterTaskStatusOptions.All,
  });
  const abortControllerRef = React.useRef(new AbortController());
  const { loading, tasks, pagination, getTasks } = useTaskStore();

  React.useEffect(() => {
    getTasks({ ...filterParams, signal: abortControllerRef.current.signal });
    return () => {
      abortControllerRef.current.abort();
    };
  }, [filterParams]);

  const handlePageChange = React.useCallback((e: any, pageIndex: number) => {
    setFilterParams((prev) => ({ ...prev, page: pageIndex + 1 }));
  }, []);

  const handleRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParams((prev) => ({ ...prev, limit: parseInt(e.target.value, 10) }));
  }, []);

  const handleStatusChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParams((prev) => ({ ...prev, status: e.target.value as TaskStatus }));
  }, []);

  const renderBottomToolbar = React.useCallback(
    () => (
      <TablePagination
        sx={{ overflow: 'hidden' }}
        count={pagination?.totalDocs}
        page={pagination?.page - 1}
        onPageChange={handlePageChange}
        rowsPerPage={pagination?.limit}
        onRowsPerPageChange={handleRowsPerPageChange}
        labelRowsPerPage="Show:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} task(s)`}
        rowsPerPageOptions={ROW_PER_PAGE_OPTIONS}
      />
    ),
    [pagination],
  );

  const columns = React.useMemo<MRT_ColumnDef<ITask>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell(props) {
          const color = props.row.original.status === TaskStatus.Completed ? 'success' : 'warning';
          return <Chip label={TaskStatusLabels[props.row.original.status]} color={color} />;
        },
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        accessorFn(originalRow) {
          return formatDate(originalRow.created_at);
        },
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    state: {
      pagination: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.limit,
      },
      showLoadingOverlay: loading,
    },
    renderEmptyRowsFallback: () => (
      <Stack spacing={2} minHeight={{ xs: 300, md: 800 }} justifyContent="center" alignItems="center">
        <Typography>No tasks found</Typography>
      </Stack>
    ),
    data: tasks,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enablePagination: false,
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
    }),
    paginationDisplayMode: 'pages',
    rowCount: pagination?.totalDocs ?? 0,
    enableGlobalFilterModes: false,
    enableGlobalFilter: false,
    enableDensityToggle: false,
    muiTablePaperProps: {
      sx: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      },
    },
    muiTableContainerProps: {
      sx: { flex: 1 },
    },
    enableStickyHeader: true,
    renderBottomToolbar,
    renderTopToolbar(props) {
      return (
        <Stack direction="row" justifyContent="flex-end" alignItems="center" p={2}>
          <TextField
            label="Status"
            select
            value={filterParams.status}
            onChange={handleStatusChange}
            sx={{ minWidth: 120 }}
          >
            {Object.entries(FilterTaskStatusOptions).map(([label, value]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      );
    },
    muiTableBodyRowProps: ({ row, staticRowIndex }) => ({
      hover: true,
      onClick: () => onItemSelect?.(row.original),
      sx: {
        bgcolor: staticRowIndex % 2 === 0 ? 'background.paper' : 'background.default',
      },
    }),
  });
  return <MaterialReactTable table={table} />;
}

export default React.memo(TaskTable);
