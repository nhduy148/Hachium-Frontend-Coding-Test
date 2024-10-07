import { ActionMenu, hideAppLoader, showAppLoader, showConfirmDialog, type ActionItem } from '@libs/components';
import { useCSRNavigate } from '@libs/hooks';
import { deleteTask } from '@libs/services';
import { ITask } from '@libs/types';
import { DeleteOutline } from '@mui/icons-material';
import { ListItemText, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import * as React from 'react';

type Props = {
  task: ITask;
};

export default function PMSItemActions({ task }: Props) {
  const navigate = useCSRNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenDeleteDialog = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    showConfirmDialog({
      title: 'Delete Task',
      message: `Are you sure you want to delete task "${task.title}"?`,
      onConfirm: handleDelete,
    });
  };

  const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!task) {
      enqueueSnackbar('Task not found', { variant: 'error' });
      return;
    }
    showAppLoader('Deleting task...');
    try {
      await deleteTask({ id: task.id });
      enqueueSnackbar('Task deleted successfully', { variant: 'success' });
    } catch (error) {
      const errorMessage = 'An error occurred while deleting the task';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      hideAppLoader();
    }
  };

  const actions = React.useMemo<ActionItem[]>(
    () => [
      {
        label: (
          <Stack direction="row" spacing={1} color="error.main" alignItems="center">
            <DeleteOutline fontSize="small" />
            <ListItemText primary="Delete" />
          </Stack>
        ),
        onClick: handleOpenDeleteDialog,
        menuProps: { color: 'error.main' },
      },
    ],
    [],
  );

  return <ActionMenu actions={actions} />;
}
