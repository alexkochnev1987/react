import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Avatar, Box, CircularProgress, IconButton, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { auth } from '@/firebase';
import { NavigationMenu } from './NavigationMenu';
import { useDocument } from 'react-firebase-hooks/firestore';
import { userDocRef } from '@/db/user';
import { FirebaseError } from '@/components/Firebase-error';
import { useThemes } from '@/app/providers/ThemeProvider/lib/useThemes';

export function Navbar() {
  const GREETINGS = 'Hello ';
  const NO_NAME = 'Nouname';
  const APP_NAME = 'CoachPlanner';
  const [userData, loading, error] = useDocument(userDocRef);
  const { mode, toggleThemeMode } = useThemes();

  if (error) {
    return <FirebaseError error={error} />;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <NavigationMenu />
        <IconButton onClick={toggleThemeMode} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {APP_NAME}
        </Typography>
        <Typography variant="body2" component="p" px={2}>
          {`${GREETINGS} ${userData?.data()?.name || NO_NAME}!`}
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
