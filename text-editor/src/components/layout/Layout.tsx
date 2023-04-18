import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Context } from '../../App';
import { observer } from 'mobx-react-lite';
import { AuthService } from '../../services/auth-service';
import { IUser } from '~/models/iuser';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCount } from '../../store/counter-slice';
import { getUsers } from '../../store/user-slice';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const counter = useAppSelector(selectCount);
  const message = 'This is layout';
  const { store } = useContext(Context);
  const [openNav, setOpenNav] = useState(false);

  // const users = useAppSelector((state) => state.counter.users);
  const { users, error, loading } = useAppSelector((state) => state.user);

  // const [users, setUsers] = useState<IUser[]>();

  // const getUsers = async () => {
  //   store.setLoading(true);
  //   try {
  //     const { data } = await AuthService.getUsers();
  //     setUsers(data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     store.setLoading(false);
  //   }
  // };

  const [newMessage, setMessage] = useState('');
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    event.stopPropagation();

    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenNav(open);
  };

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     store.checkAuth();
  //   }
  // }, []);

  // if (store.isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>{error}</h1>;
  return (
    <div onClick={toggleDrawer(false)}>
      <h1>User email:{store.user.email ? store.user.email : 'LOGIN...'}</h1>
      <Button onClick={() => store.logout()}>Logout</Button>
      <h2 data-testid='input-message'>{newMessage}</h2>
      <input
        type='text'
        placeholder='enter name'
        value={newMessage}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={toggleDrawer(true)} data-testid='burger'>
        <MenuIcon />
      </Button>
      <Navbar openNav={openNav} />
      <Outlet />
      {/* <Button onClick={() => getUsers()}>Get users</Button> */}
      {users && users?.map((e) => <h4 key={e.email}>{e.username}</h4>)}
      <h1>{counter}</h1>
      <Button onClick={() => dispatch({ type: 'INCREMENT_ASYNC' })}>Increment</Button>
      <Button onClick={() => dispatch({ type: 'DECREMENT_ASYNC' })}>Decrement</Button>
      <Button onClick={() => dispatch(getUsers())}>Get users</Button>
    </div>
  );
};
