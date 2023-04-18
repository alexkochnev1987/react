import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Context } from '../App';

type Inputs = {
  email: string;
  password: string;
  username: string;
};

export const Registration = () => {
  const { store } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ email, password, username }) =>
    store.registration(email, password, username);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: true })}
        placeholder='email'
        defaultValue={'alexkochnev1987@gmail.com'}
      />

      <input
        {...register('username', { required: true })}
        placeholder='username'
        defaultValue={'qwerty'}
      />

      <input
        {...register('password', { required: true })}
        placeholder='password'
        defaultValue={'alexTest'}
      />

      <input type='submit' />
    </form>
  );
};
