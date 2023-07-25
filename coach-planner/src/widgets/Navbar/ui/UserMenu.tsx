import { Avatar, Button, CircularProgress, Menu, MenuItem, Typography } from '@mui/material';
import { FC } from 'react';
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
