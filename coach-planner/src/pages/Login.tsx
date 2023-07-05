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
  const submitText = 'Sign In';
  const googleLoginText = 'Login with google';
  const forgotPassword = 'Forgot password?';
  const goToRegistrationLinkText = "Don't have an account? Sign Up";
  const [signInWithEmailAndPassword, user, loading, emailError] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

  const loginWithGoogleHandler = async () => {
    signInWithGoogle();
  };
  useIsUserLogin(user);
  useIsUserLogin(googleUser);

  return (
    <AuthWrapper text={submitText} loading={googleLoading || loading}>
      <EmailPasswordForm callback={signInWithEmailAndPassword} loading={loading} />
      {googleError && (
        <Typography component="h4" variant="h4" color={'tomato'}>
          {googleError.message}
        </Typography>
      )}
      {emailError && (
        <Typography component="p" variant="body2" color={'tomato'}>
          {emailError.message}
        </Typography>
      )}
      <Grid container alignItems={'center'} justifyContent="flex-end" spacing={1}>
        <Grid item xs={12} sm={4} md={4} textAlign={'end'}>
          <Button onClick={loginWithGoogleHandler} disabled={googleLoading} startIcon={<GoogleIcon />}>
            {googleLoginText}
          </Button>
        </Grid>
        <Grid item xs={12} sm={5} md={5} textAlign={'end'}>
          <Link to={RouteNames.registration}>{goToRegistrationLinkText}</Link>
        </Grid>
        <Grid item xs={12} sm={3} md={3} textAlign={'end'}>
          <Link to="#">{forgotPassword}</Link>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};
