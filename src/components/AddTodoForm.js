import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Task name is required')
    .min(3, 'Task name must be at least 3 characters long')
    .max(30, 'Task name must not exceed 30 characters'),
});

export const AddTodoForm = ({ onAdd }) => {
  const { register, handleSubmit,reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    onAdd(data.title);
    reset(); 
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <input
        {...register('title')}
        type="text"
        placeholder="Add a new task..."
        className="border rounded p-2 w-full"
      />
      {errors.title && <span className="text-red-600">{errors.title.message}</span>}
      <br/><button type="submit" className="mt-2 bg-blue-600 text-white rounded p-2">Add Task</button>
    </form>
  );
};
