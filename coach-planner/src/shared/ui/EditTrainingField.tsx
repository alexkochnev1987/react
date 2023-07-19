import { Box, IconButton, TextField } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { EditContentButtons } from '@/entities/EditContentButtons';

interface EditFieldProps {
  children: ReactNode;
  onSubmit: (input: string) => void;
  startValue: string;
  label: string;
  small?: boolean;
}

export const EditTrainingField: FC<EditFieldProps> = ({ children, onSubmit, startValue, label, small }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(startValue);

  const onSubmitHandler = () => {
    setEdit(false);
    onSubmit(value);
  };

  return (
    <Box display={'flex'} sx={{ width: '100%' }}>
      {edit ? (
        <EditContentButtons handleCancel={() => setEdit(false)} handleSave={onSubmitHandler} />
      ) : (
        <Box>
          <IconButton onClick={() => setEdit(true)}>
            <EditIcon sx={small ? { fontSize: '12px' } : { fontSize: '24px' }} />
          </IconButton>
        </Box>
      )}
      {edit ? (
        <TextField
          fullWidth
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
