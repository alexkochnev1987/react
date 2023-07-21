import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';
import ErrorPage from '@/pages/ErrorPage/Error-page';
import { CenteredLoader } from '@/shared/ui/CenteredLoader';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useAppDispatch();
  if (error) return <ErrorPage />;
  if (loading) return <CenteredLoader />;

  if (!user) return <Navigate to={RoutePath.login} state={{ from: location }} />;

  if (user) {
    dispatch(setUser(user.uid));
  }

  return <>{children}</>;
};
