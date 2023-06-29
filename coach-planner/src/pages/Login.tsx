import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../router/routes';
// import GoogleIcon from '@mui/icons-material/Google';
import { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { AuthWrapper } from '../components/Auth-wrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputComponent } from '../components/forms/Input-component';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(25).required(),
});
export type LoginFormData = yup.InferType<typeof schema>;

enum FieldDescription {
  password = 'Min length 5 max 25',
  email = 'Enter a valid email',
}

export const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const signWithEmailHandler = async ({ email, password }: { email: string; password: string }) => {
    signInWithEmailAndPassword(email, password);
  };

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    signWithEmailHandler(data);
  };

  // const loginWithGoogleHandler = async () => {
  //   signInWithGoogle();
  // };

  useEffect(() => {
    if (user || googleUser) navigate('/');
  }, [user, navigate, googleUser]);

  return (
    <AuthWrapper text="Sign in" loading={loading || googleLoading}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <InputComponent
          control={control}
          description={FieldDescription.email}
          name="email"
          type="email"
          autoComplete="email"
          label="Email Address"
        />
        <InputComponent
          control={control}
          description={FieldDescription.password}
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
        />
        <Box minHeight={'30px'}>
          {error && (
            <Typography component="h4" variant="h4" color={'tomato'}>
              {error.message}
            </Typography>
          )}

          {googleError && (
            <Typography component="h4" variant="h4" color={'tomato'}>
              {googleError.message}
            </Typography>
          )}
        </Box>
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading || googleLoading}>
          Sign In
        </Button>
        <Grid container alignItems={'center'} spacing={4}>
          <Grid item xs={12} sm={4} md={4}>
            {/* Fix troubles with cors when deploy app and add permission to google account */}
            {/* <Button
              onClick={loginWithGoogleHandler}
              disabled={loading || !!errors.email || !!errors.password || googleLoading}
            >
              <GoogleIcon />
              {' Login with google'}
            </Button> */}
          </Grid>
          <Grid item sm={4} md={4}>
            <Link to={RouteNames.registration}>{"Don't have an account? Sign Up"}</Link>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Link to="#">Forgot password?</Link>
          </Grid>
        </Grid>
      </Box>
    </AuthWrapper>
  );
};
