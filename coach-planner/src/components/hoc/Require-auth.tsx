import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { RouteNames } from '../../router/routes';
import ErrorPage from '../../pages/Error-page';

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
  if (!user) return <Navigate to={RouteNames.login} state={{ from: location }} />;

  return children;
};
