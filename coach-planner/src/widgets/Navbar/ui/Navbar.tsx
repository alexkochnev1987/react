import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Avatar, Box, CircularProgress, IconButton, Link, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { auth, userId } from '@/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { FirebaseError } from '@/components/Firebase-error';
import { useThemes } from '@/app/providers/ThemeProvider/lib/useThemes';
import { getUserDocRef } from '@/db/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser, setUser } from '@/store/slices/userSlice';
import { DialogCreateTraining } from '@/components/training/Dialog-create-training';
import { NavLink, useLocation } from 'react-router-dom';
import { RoutePath } from '@/app/providers/RouterProvider/lib/constants';
import { useState } from 'react';
import { UserMenu } from './UserMenu';
const NavRoutes = [
  {
    name: 'Exercises',
    link: RoutePath.exercise,
  },
  {
    name: 'Plan',
    link: RoutePath.plan,
  },
  {
    name: 'Trainings',
    link: RoutePath.trainings,
  },
  // {
  //   name: 'Set user',
  //   link: RoutePath.user,
  // },
];

export function Navbar() {
  const APP_NAME = 'CoachPlanner';
  const userUiid = useAppSelector(selectUser);
  const [userData, loading, error] = useDocument(getUserDocRef(userUiid));
  const { mode, toggleThemeMode } = useThemes();
  const location = useLocation();

  if (error) {
    return <FirebaseError error={error} />;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={toggleThemeMode} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {APP_NAME}
        </Typography>

        {/* <NavigationMenu /> */}
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          {NavRoutes.map((page) => (
            <Button key={page.name} color="inherit">
              <Link
                component={NavLink}
                to={page.link}
                underline={location.pathname === page.link ? 'always' : 'hover'}
                color={'inherit'}
              >
                {page.name}
              </Link>
            </Button>
          ))}
        </Box>

        <UserMenu userName={userData?.data()?.name} loading={loading} userImage={userData?.data()?.img} />
      </Toolbar>
    </AppBar>
  );
}
