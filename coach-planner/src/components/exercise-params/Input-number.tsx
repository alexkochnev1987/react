import { TextField } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { errorMessage } from '../dialogs/exercise-dialog/constants';
import { IExerciseParams, ExerciseParamsFormFields } from './constants';

export const InputNumberComponent = ({
  mode,
  x,
  control,
  errors,
}: {
  mode: boolean;
  errors: FieldErrors<IExerciseParams>;
  x: ExerciseParamsFormFields;
  control: Control<IExerciseParams, any>;
}) => {
  return (
    <>
      <Controller
        name={x.name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            disabled={mode ? false : x.name === 'rest'}
            size="small"
            type="number"
            sx={{ width: '110px', display: 'block' }}
            inputProps={{ min: 0 }}
            {...field}
            error={!!errors[x.name]}
            label={x.placeholder}
          />
        )}
      />
      {errors[x.name] && (
        <p style={{ color: 'red' }} role="alert">
          {errorMessage}
        </p>
      )}
    </>
  );
};
