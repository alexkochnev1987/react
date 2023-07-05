import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, TextField } from '@mui/material';
import { HintMessage } from './Hint-message';
import { InputAdornmentComponent } from './Input-adornment';
import { type UserCredential } from 'firebase/auth';
const schema = yup.object({
  email: yup.string().email().max(100).required(),
  password: yup.string().min(5).max(30).required(),
});
export type LoginFormData = yup.InferType<typeof schema>;

enum FieldDescription {
  password = 'Min length 5 max 25',
  email = 'Enter a valid email. Max 100 symbols',
}

export const EmailPasswordForm = ({
  callback,
  loading,
  submitText = 'Sign In',
}: {
  callback: (email: string, password: string) => Promise<UserCredential | undefined>;
  loading: boolean;
  submitText?: string;
}) => {
  const handleClickShowPassword = () => setShow((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit: SubmitHandler<LoginFormData> = async ({ email, password }) => {
    callback(email, password);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            fullWidth
            margin="normal"
            label={'Email Address'}
            type="email"
            autoComplete="email"
          />
        )}
      />
      <HintMessage error={errors?.email?.message} hint={FieldDescription.email} />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            fullWidth
            margin="normal"
            label="Password"
            autoComplete="current-password"
            type={show ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornmentComponent
                  handleClickShowPassword={handleClickShowPassword}
                  handleMouseDownPassword={handleMouseDownPassword}
                  show={show}
                />
              ),
            }}
          />
        )}
      />
      <HintMessage error={errors?.password?.message} hint={FieldDescription.password} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading || !isValid}>
        {submitText}
      </Button>
    </Box>
  );
};
