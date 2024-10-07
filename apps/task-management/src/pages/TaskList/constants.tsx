import { TaskStatus } from '@libs/types';

export const TaskStatusLabels: Record<TaskStatus, string> = {
  [TaskStatus.Completed]: 'Completed',
  [TaskStatus.Incomplete]: 'Incomplete',
};
