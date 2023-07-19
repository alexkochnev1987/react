import { RoutePath } from '@/app/providers/RouterProvider/lib/constants';
import { DialogCreateTraining } from '@/components/training/Dialog-create-training';
import { auth } from '@/firebase';
import { Avatar, CircularProgress, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  loading: boolean;
  userImage: string | undefined;
  userName: string | undefined;
}

export const UserMenu: FC<UserMenuProps> = ({ loading, userImage, userName }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const signOut = () => {
    auth.signOut();
  };
  const GREETINGS = 'Hello ';
  const NO_NAME = 'No name';
  const settings = [
    { name: 'Profile', action: () => navigate(RoutePath.user) },
    { name: 'Logout', action: signOut },
    // { name: 'Create Exercise', action: },
    // { name: 'Create Training', action:  },
  ];
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <>
      <DialogCreateTraining />
      <Typography variant="body2" component="p" px={2}>
        {`${GREETINGS} ${userName || NO_NAME}!`}
      </Typography>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        {loading ? <CircularProgress /> : <Avatar src={userImage || ''} />}
      </IconButton>
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
