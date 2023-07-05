import { UseControllerProps, useController } from 'react-hook-form';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
// import { LoginFormData } from '../../pages/Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

interface NewProps<TFields extends Record<string,any>> extends UseControllerProps<TFields> {
  description: string;
  type: string;
  autoComplete: string;
  label: string;
}

export const InputComponent = <T extends Record<string,any>>(props: NewProps<T>) => {
  const [show, setShow] = useState(false);
  const {
    field,
    fieldState: { error },
  } = useController(props);
  const handleClickShowPassword = () => setShow((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <TextField
        required
        {...field}
        fullWidth
        margin="normal"
        label={props.label}
        autoComplete={props.autoComplete}
        type={props.type !== 'password' ? props.type : show ? 'text' : 'password'}
        InputProps={{
          endAdornment: props.type === 'password' && (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {error ? (
        <Typography component="p" color={'tomato'} variant="subtitle2" px={2}>
          {error.message}
        </Typography>
      ) : (
        <Typography component="p" variant="subtitle2" px={2}>
          {props.description}
        </Typography>
      )}
    </>
  );
};
