import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { RouteNames } from '../router/routes';
import GoogleIcon from '@mui/icons-material/Google';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Grid, Typography } from '@mui/material';
import { AuthWrapper } from '../components/Auth-wrapper';
import { useIsUserLogin } from '../hooks/useIsUserLogin';
import { EmailPasswordForm } from '../components/forms/Email-password-form';

export const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  const loginWithGoogleHandler = async () => {
    signInWithGoogle();
  };
  useIsUserLogin(user);
  useIsUserLogin(googleUser);

  return (
    <AuthWrapper text="Sign in" loading={googleLoading || loading}>
      <EmailPasswordForm callback={signInWithEmailAndPassword} loading={loading} error={error} />
      <Grid container alignItems={'center'} justifyContent="flex-end" spacing={1}>
        {googleError && (
          <Typography component="h4" variant="h4" color={'tomato'}>
            {googleError.message}
          </Typography>
        )}
        <Grid item xs={12} sm={4} md={4} textAlign={'end'}>
          <Button onClick={loginWithGoogleHandler} disabled={googleLoading} startIcon={<GoogleIcon />}>
            {'Login with google'}
          </Button>
        </Grid>
        <Grid item xs={12} sm={5} md={5} textAlign={'end'}>
          <Link to={RouteNames.registration}>{"Don't have an account? Sign Up"}</Link>
        </Grid>
        <Grid item xs={12} sm={3} md={3} textAlign={'end'}>
          <Link to="#">Forgot password?</Link>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};
