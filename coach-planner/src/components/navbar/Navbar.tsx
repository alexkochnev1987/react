import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { RouteNames } from '../../router/routes';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { ColorModeContext } from '../../App';
import { useContext } from 'react';
import { NavigationMenu } from './Navigation-menu';

export function Navbar() {
  const appName = 'CoachPlanner';
  const [user] = useAuthState(auth);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <NavigationMenu />
        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {appName}
        </Typography>

        {user ? (
          <Box display={'flex'} gap={1}>
            {user.photoURL && <Avatar src={user.photoURL} />}
            <Button onClick={() => auth.signOut()} size="small" color="inherit">
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" size="small">
            <Link to={RouteNames.login} color="inherit">
              Login
            </Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
