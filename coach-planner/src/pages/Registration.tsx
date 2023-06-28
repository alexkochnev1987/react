import { Box, Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../router/routes';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { auth } from '../firebase';
import { AuthWrapper } from '../components/Auth-wrapper';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputComponent } from '../components/forms/Input-component';

enum FieldDescription {
  password = 'Min length 5 max 25',
  email = 'Enter a valid email',
}
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(25).required(),
});
export type LoginFormData = yup.InferType<typeof schema>;

export const Registration = () => {
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) navigate('/');
  }, [navigate, user]);

  const onSubmit: SubmitHandler<LoginFormData> = ({ email, password }) => {
    createUserWithEmailAndPassword(email, password);
  };
  return (
    <AuthWrapper text="Sign up" loading={loading}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
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
        </Box>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading || !!errors.email || !!errors.password}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to={RouteNames.login}>Already have an account? Sign in</Link>
          </Grid>
        </Grid>
      </Box>
    </AuthWrapper>
  );
};
