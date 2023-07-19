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
}

export const EditTrainingField: FC<EditFieldProps> = ({ children, onSubmit, startValue, label, small }) => {
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
    <Box display={'flex'} sx={{ width: '100%' }}>
      {edit ? (
        <EditContentButtons handleCancel={setEditFalse} handleSave={onSubmitHandler} />
      ) : (
        <Box>
          <IconButton onClick={setEditTrue}>
            <EditIcon sx={small ? { fontSize: '12px' } : { fontSize: '24px' }} />
          </IconButton>
        </Box>
      )}
      {edit ? (
        <TextField
          fullWidth
          type="textarea"
          multiline={small ? true : false}
          maxRows={4}
          label={label}
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        children
      )}
    </Box>
  );
};
