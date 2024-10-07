import { IDocument, Pagination, RequestListResponse } from './common';

// "All", "Completed", or "Incomplete".
export enum TaskStatus {
  Completed = 'completed',
  Incomplete = 'incomplete',
}
export enum OtherTaskStatus {
  All = 'all',
}

export interface ITask extends IDocument {
  title: string;
  description: string;
  status: TaskStatus;
}

export type FilterTaskStatus = TaskStatus | OtherTaskStatus;
export type GetTasksParams = Pagination & {
  signal?: AbortSignal;
  status?: FilterTaskStatus;
};
export type GetTasksResponse = RequestListResponse<ITask>;

export type GetTaskDetailParams = {
  id: string;
};
export type GetTaskDetailResponse = ITask;

export type TaskForm = {
  title: string;
  description: string;
  status?: TaskStatus;
};

export type CreateTaskForm = TaskForm;
export type CreateTaskResponse = ITask;

export type UpdateTaskForm = TaskForm & {
  id: string;
};
export type UpdateTaskResponse = ITask;

export type DeleteTaskParams = {
  id: string;
};
export type DeleteTaskResponse = boolean;

export type UpdateTaskStatusParams = {
  id: string;
  status: TaskStatus;
};
export type UpdateTaskStatusResponse = ITask;
