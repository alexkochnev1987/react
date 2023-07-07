import { ColorModeContext } from '../Theme-provider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Avatar, Box, CircularProgress, IconButton, Typography, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { auth } from '../../firebase';
import { useContext } from 'react';
import { NavigationMenu } from './Navigation-menu';
import { useDocument } from 'react-firebase-hooks/firestore';
import { userDocRef } from '../../db/user';
import { FirebaseError } from '../Firebase-error';

export function Navbar() {
  const greetings = 'Hello ';
  const noName = 'Nouname';
  const appName = 'CoachPlanner';
  const [userData, loading, error] = useDocument(userDocRef);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  if (error) {
    return <FirebaseError error={error} />;
  }

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
        <Typography variant="body2" component="p" px={2}>
          {`${greetings} ${userData?.data()?.name || noName}!`}
        </Typography>
        <Box display={'flex'} gap={1}>
          {loading ? <CircularProgress /> : <Avatar src={userData?.data()?.img || ''} />}

          <Button onClick={() => auth.signOut()} size="small" color="inherit">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
