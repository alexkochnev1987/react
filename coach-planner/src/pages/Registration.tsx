import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { RouteNames } from '../router/routes';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { AuthWrapper } from '../components/Auth-wrapper';

import { EmailPasswordForm } from '../components/forms/Email-password-form';
import { useIsUserLogin } from '../hooks/useIsUserLogin';

export const Registration = () => {
  const submitText = 'Sign Up';
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  useIsUserLogin(user);
  return (
    <AuthWrapper text="Sign up" loading={loading}>
      <EmailPasswordForm
        callback={createUserWithEmailAndPassword}
        loading={loading}
        error={error}
        submitText={submitText}
      />

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to={RouteNames.login}>Already have an account? Sign in</Link>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};
