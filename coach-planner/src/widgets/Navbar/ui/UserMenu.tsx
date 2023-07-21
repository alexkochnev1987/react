import { RoutePath } from '@/app/providers/RouterProvider/config/constants';

import { createExercise } from '@/db/exercises';
import { createPlan } from '@/db/plans';
import { createTraining } from '@/db/trainings';
import { auth } from '@/firebase';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setImageNull } from '@/store/slices/draw-objects-slice';
import { selectUser } from '@/store/slices/userSlice';
import { Avatar, Button, CircularProgress, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserAction } from './getUserAction';

interface UserMenuProps {
  loading: boolean;
  userImage: string | undefined;
  userName: string | undefined;
}

const GREETINGS = 'Hello ';
const NO_NAME = 'No name';

export const UserMenu: FC<UserMenuProps> = ({ loading, userImage, userName }) => {
  const {
    anchorElUser,
    handleCloseUserMenu,
    handleOpenUserMenu,
    createNewPlan,
    createNewTraining,
    createNewExercise,
    signOut,
    goToProfile,
  } = getUserAction();

  const settings = [
    {
      name: 'Profile',
      action: goToProfile,
    },
    { name: 'Logout', action: signOut },
    { name: 'Create Exercise', action: createNewExercise },
    { name: 'Create Training', action: createNewTraining },
    { name: 'Create Plan', action: createNewPlan },
  ];
  return (
    <>
      <Button onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
        {`${GREETINGS} ${userName || NO_NAME}!`}
        {loading ? <CircularProgress /> : <Avatar src={userImage || ''} />}
      </Button>
      <Menu
        sx={{ mt: '10px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map(({ name, action }) => (
          <MenuItem key={name} onClick={action}>
            <Typography textAlign="center">{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
