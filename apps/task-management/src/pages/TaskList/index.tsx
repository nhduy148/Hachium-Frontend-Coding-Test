import { ITask } from '@libs/types';
import { Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';

function TaskList() {
  const [openForm, setOpenForm] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<ITask | null>(null);

  const handleTaskSelect = React.useCallback((task: ITask) => {
    setSelectedTask(task);
    setOpenForm(true);
  }, []);

  const handleFormClose = React.useCallback(() => {
    setOpenForm(false);
    setSelectedTask(null);
  }, []);

  const handleAddTaskClick = React.useCallback(() => {
    setOpenForm(true);
    setSelectedTask(null);
  }, []);

  return (
    <React.Fragment>
      <Stack spacing={2} padding={2} height="100vh" overflow="auto">
        <Paper component={Stack} direction="row" alignItems="center" justifyContent="space-between" p={2}>
          <Typography variant="h5">Task List</Typography>
          <Button variant="contained" color="primary" onClick={handleAddTaskClick}>
            Add Task
          </Button>
        </Paper>
        <TaskTable onItemSelect={handleTaskSelect} />
      </Stack>
      <TaskForm open={openForm} onClose={handleFormClose} task={selectedTask} />
    </React.Fragment>
  );
}

export default React.memo(TaskList);
