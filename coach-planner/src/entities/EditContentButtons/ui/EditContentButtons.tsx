import { FC } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

interface EditContentButtonsProps {
  handleSave: () => void;
  handleCancel: () => void;
}

export const EditContentButtons: FC<EditContentButtonsProps> = ({ handleSave, handleCancel }) => {
  return (
    <Box>
      <IconButton onClick={handleSave} sx={{ padding: 0 }}>
        <CheckCircleIcon color="success" />
      </IconButton>
      <IconButton onClick={handleCancel} sx={{ padding: 0 }}>
        <CancelIcon color="error" />
      </IconButton>
    </Box>
  );
};
