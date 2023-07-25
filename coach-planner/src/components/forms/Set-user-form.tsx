import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { HintMessage } from './Hint-message';
import { SetUserFields } from './constants-set-user-form';
import { ReactNode } from 'react';
import { parseDateForInput } from '@/shared/lib/parseDate';

export const SetUserForm = ({
  callback,
  schema,
  fields,
  defaultValues,
  children,
}: {
  children?: ReactNode;
  callback: (data: any) => void;
  schema: yup.ObjectSchema<any>;
  fields: SetUserFields[];
  defaultValues: { [key: string]: any };
}) => {
  const submitText = 'Save';
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { ...defaultValues, birthDay: parseDateForInput(defaultValues.birthDay) },
    resolver: yupResolver(schema),
    mode: 'all',
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(callback)}
      noValidate
      sx={{ mt: 1, width: '100%' }}
    >
      {children}
      {fields.map((x) => {
        const error = errors?.[x.name]?.message;
        return (
          <Box key={x.name}>
            <Controller
              name={x.name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  margin="normal"
                  label={x.label}
                  type={x.type}
                />
              )}
            />
            {typeof error === 'string' ? (
              <HintMessage error={error} hint={x.hint} />
            ) : (
              <HintMessage error={''} hint={x.hint} />
            )}
          </Box>
        );
      })}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!isValid}>
        {submitText}
      </Button>
    </Box>
  );
};
