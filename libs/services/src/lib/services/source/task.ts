import {
  CreateTaskForm,
  CreateTaskResponse,
  GetTaskDetailParams,
  GetTaskDetailResponse,
  GetTasksParams,
  GetTasksResponse,
  UpdateTaskForm,
  UpdateTaskResponse,
  DeleteTaskParams,
  DeleteTaskResponse,
  UpdateTaskStatusParams,
  UpdateTaskStatusResponse,
} from '@libs/types';
import Api from '../../networking/api';

export const getTaskList = ({ signal, ...params }: GetTasksParams) =>
  Api.GET_TASK_LIST<GetTasksResponse>(params, { signal });

export const getTask = (urlParams: GetTaskDetailParams) => Api.GET_TASK<GetTaskDetailResponse>({}, { urlParams });

export const createTask = (data: CreateTaskForm) => Api.CREATE_TASK<CreateTaskResponse>(data);

export const updateTask = ({ id, ...data }: UpdateTaskForm) =>
  Api.UPDATE_TASK<UpdateTaskResponse>(data, { urlParams: { id } });

export const deleteTask = (urlParams: DeleteTaskParams) => Api.DELETE_TASK<DeleteTaskResponse>({}, { urlParams });

export const updateTaskStatus = ({ id, ...data }: UpdateTaskStatusParams) =>
  Api.UPDATE_TASK_STATUS<UpdateTaskStatusResponse>(data, { urlParams: { id } });
