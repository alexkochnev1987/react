// import { Button } from '@mui/material';
import React, { useContext } from 'react';
// import { decrement, increment, selectCount } from '../store/counter-slice';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Context } from '../App';
// import { selectUser } from '~/store/user-slice';

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const { store } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    store.login(email, password);
  };
  // const dispatch = useAppDispatch();
  // const { user, isLogged } = useAppSelector(selectUser);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: true })}
        placeholder='email'
        type='email'
        defaultValue={'alexkochnev1987@gmail.com'}
      />

      <input
        {...register('password', { required: true })}
        placeholder='password'
        type='password'
        defaultValue={'alexTest'}
      />

      <input type='submit' />
    </form>
  );
};
