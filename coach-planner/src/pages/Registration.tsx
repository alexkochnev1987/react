import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { AuthWrapper } from '../widgets/AuthWrapper';
import { EmailPasswordForm } from '../components/forms/Email-password-form';
import { useIsUserLogin } from '../hooks/useIsUserLogin';
import { RoutePath } from '@/app/providers/RouterProvider/config/constants';

const Registration = () => {
  const submitText = 'Sign Up';
  const linkText = 'Already have an account? Sign in';
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  useIsUserLogin(user);
  return (
    <AuthWrapper text={submitText} loading={loading}>
      <EmailPasswordForm callback={createUserWithEmailAndPassword} loading={loading} submitText={submitText} />
      {error && (
        <Typography component="p" variant="body2" color={'tomato'}>
          {error.message}
        </Typography>
      )}
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to={RoutePath.login}>{linkText}</Link>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Registration;
