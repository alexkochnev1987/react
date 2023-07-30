import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { Box, IconButton, Link, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDocument } from 'react-firebase-hooks/firestore';
import { FirebaseError } from '@/widgets/FirebaseError';
import { useThemes } from '@/app/providers/ThemeProvider/lib/useThemes';
import { NavLink, useLocation } from 'react-router-dom';
import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { UserMenu } from './UserMenu';
import { getUserDocRef } from '@/repository/user';
import { useState } from 'react';
import { Burger } from './Burger';
export const NavRoutes = [
  {
    name: 'Exercises',
    link: RoutePath.exercise,
  },
  {
    name: 'Plans',
    link: RoutePath.plan,
  },
  {
    name: 'Trainings',
    link: RoutePath.trainings,
  },
];

export function Navbar() {
  const APP_NAME = 'CoachPlanner';
  const [userData, loading, error] = useDocument(getUserDocRef());
  const { mode, toggleThemeMode } = useThemes();
  const location = useLocation();

  if (error) {
    return <FirebaseError message={error.message} />;
  }

  return (
    <AppBar position="static">
      <Toolbar
        disableGutters={true}
        sx={{ paddingLeft: (t) => t.spacing(1), paddingRight: (t) => t.spacing(1) }}
      >
        <Burger>
          <IconButton onClick={toggleThemeMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {APP_NAME}
          </Typography>
        </Burger>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
          }}
        >
          <IconButton onClick={toggleThemeMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Typography variant="h6" component="div">
            {APP_NAME}
          </Typography>
          <Box
            pl={3}
            sx={{
              flexGrow: 1,
            }}
          >
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
        </Box>

        <UserMenu
          userName={userData?.data()?.name}
          loading={loading}
          userImage={userData?.data()?.img}
        />
      </Toolbar>
    </AppBar>
  );
}
