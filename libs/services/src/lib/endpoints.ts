const TaskEndpoints = {
  GET_TASK_LIST: 'GET /api/tasks',
  GET_TASK: 'GET /api/tasks/:id',
  CREATE_TASK: 'POST /api/tasks',
  UPDATE_TASK: 'PUT /api/tasks/:id',
  DELETE_TASK: 'DELETE /api/tasks/:id',
  UPDATE_TASK_STATUS: 'PUT /api/tasks/:id/status',
};

export const Endpoints = {
  ...TaskEndpoints,
};
