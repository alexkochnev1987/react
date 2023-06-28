import { UseControllerProps, useController } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import { LoginFormData } from '../../pages/Login';

interface NewProps extends UseControllerProps<LoginFormData> {
  description: string;
  type: string;
  autoComplete: string;
  label: string;
}

export const InputComponent = (props: NewProps) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  return (
    <>
      <TextField required {...field} fullWidth margin="normal" label={props.label} autoComplete={props.autoComplete} />
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
