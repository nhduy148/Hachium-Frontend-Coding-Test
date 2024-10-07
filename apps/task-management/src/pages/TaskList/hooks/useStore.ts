// create CRUD operations for tasks using zustand, typescript

import { DEFAULT_PAGINATION_DATA } from '@libs/constants';
import { createTask, deleteTask, getTaskList, updateTask, updateTaskStatus } from '@libs/services';
import {
  CreateTaskForm,
  DeleteTaskParams,
  GetTasksParams,
  ITask,
  PaginationResponse,
  UpdateTaskForm,
  UpdateTaskStatusParams,
} from '@libs/types';
import { cloneDeep } from 'lodash';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';

type State = {
  loading: boolean;
  tasks: ITask[];
  pagination: PaginationResponse;
};

export type Actions = {
  getTasks: (params: GetTasksParams) => Promise<void>;
  createTask: (form: CreateTaskForm) => Promise<void>;
  updateTask: (form: UpdateTaskForm) => Promise<void>;
  deleteTask: (params: DeleteTaskParams) => Promise<void>;
  updateTaskStatus: (params: UpdateTaskStatusParams) => Promise<void>;
};

export const useTaskStore = create<State & Actions>((set) => ({
  tasks: [],
  pagination: DEFAULT_PAGINATION_DATA,
  loading: false,
  getTasks: async (params) => {
    set({ loading: true });
    try {
      const response = await getTaskList(params);
      set({ tasks: response.data.list, pagination: response.data.pagination });
    } catch (error) {
      enqueueSnackbar('An error occurred while fetching tasks', { variant: 'error' });
    } finally {
      set({ loading: false });
    }
  },
  createTask: async (form) => {
    try {
      const response = await createTask(form);
      set((state) => ({ tasks: [...state.tasks, response.data] }));
    } catch (error) {
      enqueueSnackbar('An error occurred while creating task', { variant: 'error' });
    } finally {
      set({ loading: false });
    }
  },
  updateTask: async (form) => {
    try {
      const response = await updateTask(form);
      set((state) => {
        const prevTasks = cloneDeep(state.tasks);
        const index = state.tasks.findIndex((task) => task._id === response.data._id);
        if (index === -1) return { tasks: state.tasks };
        prevTasks[index] = response.data;
        return { tasks: prevTasks };
      });
    } catch (error) {
      enqueueSnackbar('An error occurred while updating task', { variant: 'error' });
    }
  },
  deleteTask: async (params) => {
    try {
      await deleteTask(params);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== params.id),
      }));
    } catch (error) {
      enqueueSnackbar('An error occurred while deleting task', { variant: 'error' });
    }
  },
  updateTaskStatus: async (params) => {
    try {
      const response = await updateTaskStatus(params);
      set((state) => {
        const prevTasks = cloneDeep(state.tasks);
        const index = state.tasks.findIndex((task) => task._id === response.data._id);
        if (index === -1) return { tasks: state.tasks };
        prevTasks[index] = response.data;
        return { tasks: prevTasks };
      });
    } catch (error) {
      enqueueSnackbar('An error occurred while updating task status', { variant: 'error' });
    }
  },
}));
