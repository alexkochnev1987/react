import { Box, IconButton, TextField } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { EditContentButtons } from '@/entities/EditContentButtons';

interface EditFieldProps {
  children: ReactNode;
  onSubmit: (input: string) => void;
  startValue: string | undefined;
  label: string;
  small?: boolean;
  flex?: boolean;
  multiline?: boolean;
}

export const EditTrainingField: FC<EditFieldProps> = ({
  children,
  onSubmit,
  startValue,
  label,
  small,
  flex,
  multiline,
}) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(startValue || '');

  const onSubmitHandler = () => {
    setEdit(false);
    onSubmit(value);
  };

  const setEditFalse = () => {
    setValue(startValue || '');
    setEdit(false);
  };

  const setEditTrue = () => {
    setEdit(true);
  };

  return (
    <Box display={'flex'} sx={{ width: '100%', alignItems: 'center' }} flex={1}>
      {edit ? (
        <TextField
          fullWidth
          type="textarea"
          multiline={multiline ? true : false}
          size={small ? 'small' : 'medium'}
          maxRows={4}
          label={label}
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        children
      )}
      {edit ? (
        <EditContentButtons handleCancel={setEditFalse} handleSave={onSubmitHandler} flex={flex} />
      ) : (
        <Box>
          <IconButton onClick={setEditTrue}>
            <EditIcon sx={small ? { fontSize: '12px' } : { fontSize: '24px' }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
