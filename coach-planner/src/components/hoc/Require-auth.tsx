import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { auth, userId } from '../../firebase';
import ErrorPage from '../../pages/Error-page';
import { RoutePath } from '@/app/providers/RouterProvider/lib/constants';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  if (error) return <ErrorPage />;
  if (loading)
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  if (!user) return <Navigate to={RoutePath.login} state={{ from: location }} />;

  if (user) {
    localStorage.setItem(userId, user.uid);
  }
  return children;
};
