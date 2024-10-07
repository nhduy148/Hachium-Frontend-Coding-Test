import { LoadingButton } from '@libs/components';
import { ITask, TaskStatus } from '@libs/types';
import { isNilOrEmpty } from '@libs/utils';
import { Close } from '@mui/icons-material';
import { Button, Divider, Drawer, FormControlLabel, Paper, Stack, Switch, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { useTaskForm } from '../hooks/useForm';
import { useTaskStore } from '../hooks/useStore';

type Props = {
  open: boolean;
  onClose: () => void;
  task: ITask | null;
};

function TaskForm({ task, open, onClose }: Props) {
  const isEdit = !isNilOrEmpty(task);
  const { formMethod, resetDefaultValues } = useTaskForm();
  const { updateTask, createTask } = useTaskStore();
  const handleClose = React.useCallback(() => {
    onClose();
    resetDefaultValues();
  }, []);

  React.useEffect(() => {
    if (!isNilOrEmpty(task)) {
      formMethod.reset(task);
    }
  }, [isEdit]);

  const handleSubmit = React.useCallback(() => {
    formMethod.handleSubmit(async (data) => {
      if (isEdit) {
        await updateTask({ ...data, id: task?._id });
      } else {
        await createTask(data);
      }
      handleClose();
    })();
  }, [isEdit, task]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { width: 1, maxWidth: 600, overflow: 'hidden' },
      }}
    >
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Typography variant="h6">{isEdit ? 'Edit Task' : 'Create Task'}</Typography>
        <Button endIcon={<Close />} onClick={handleClose} color="dark" variant="text">
          <Typography variant="caption">
            Đóng <small>(ESC)</small>
          </Typography>
        </Button>
      </Stack>
      <Divider />
      <FormProvider {...formMethod}>
        <Stack spacing={3} padding={2} flex={1}>
          {isEdit && (
            <Controller
              control={formMethod.control}
              name="status"
              render={({ field }) => (
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="subtitle1">Status: </Typography>
                  <Paper variant="outlined">
                    <FormControlLabel
                      sx={{ pr: 1, width: 1, m: 0 }}
                      control={
                        <Switch
                          color="primary"
                          {...field}
                          size="medium"
                          name="status"
                          checked={field.value === TaskStatus.Completed}
                          onChange={(e) => {
                            field.onChange(e.target.checked ? TaskStatus.Completed : TaskStatus.Incomplete);
                          }}
                        />
                      }
                      label={field.value === TaskStatus.Incomplete ? 'Mark as Completed' : 'Mark as Incomplete'}
                    />
                  </Paper>
                </Stack>
              )}
            />
          )}
          <Controller
            name="title"
            control={formMethod.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Title"
                variant="outlined"
                fullWidth
                error={!isNilOrEmpty(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={formMethod.control}
            render={({ field }) => (
              <TextField {...field} label="Description" variant="outlined" fullWidth multiline rows={4} />
            )}
          />
        </Stack>
      </FormProvider>
      <Divider />
      <Stack direction="row" justifyContent="flex-end" padding={2} spacing={1}>
        <Button
          onClick={handleClose}
          color="light"
          disableElevation
          sx={{
            minWidth: 100,
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          isLoading={formMethod.formState.isSubmitting}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!formMethod.formState.isValid}
          fullWidth
        >
          {isEdit ? 'Update' : 'Create'}
        </LoadingButton>
      </Stack>
    </Drawer>
  );
}

export default TaskForm;
