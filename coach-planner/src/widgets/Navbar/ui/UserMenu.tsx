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

interface UserMenuProps {
  loading: boolean;
  userImage: string | undefined;
  userName: string | undefined;
}

export const UserMenu: FC<UserMenuProps> = ({ loading, userImage, userName }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    auth.signOut();
  };

  const userUiid = useAppSelector(selectUser);
  const GREETINGS = 'Hello ';
  const NO_NAME = 'No name';
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const createNewExercise = async () => {
    const newExercise = await createExercise(userUiid);
    dispatch(setImageNull());
    if (newExercise) navigate(`${RoutePath.exercise}/${newExercise?.id}`);
  };

  const createNewTraining = async () => {
    if (userUiid) {
      const trainingId = await createTraining(userUiid);

      if (trainingId) {
        navigate(`${RoutePath.trainings}/${trainingId}`);
      }
    }
  };

  const createNewPlan = async () => {
    if (userUiid) {
      const planId = await createPlan(userUiid, 'Enter Plan Name');
      if (planId) {
        navigate(`${RoutePath.plan}/${planId.id}`);
      }
    }
  };
  const settings = [
    { name: 'Profile', action: () => navigate(RoutePath.user) },
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
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
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
