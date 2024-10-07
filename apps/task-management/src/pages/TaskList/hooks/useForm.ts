import { yupResolver } from '@hookform/resolvers/yup';
import { DEFAULT_REQUIRED_MESSAGE } from '@libs/constants';
import { TaskForm, TaskStatus } from '@libs/types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export const schema: yup.ObjectSchema<TaskForm> = yup.object().shape({
  title: yup.string().required(DEFAULT_REQUIRED_MESSAGE),
  description: yup.string().required(DEFAULT_REQUIRED_MESSAGE),
  status: yup.string().oneOf(Object.values(TaskStatus)),
});

export const defaultValues: TaskForm = {
  title: '',
  description: '',
};

export const useTaskForm = () => {
  const formMethod = useForm<TaskForm>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const resetDefaultValues = () => formMethod.reset(defaultValues);

  return { formMethod, resetDefaultValues };
};
