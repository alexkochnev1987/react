import { Box, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const EditContent = ({
  callback,
  value,
  label,
}: {
  value: string | undefined;
  label: string;
  callback: (value: string | undefined) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setContent(value);
    setIsEditing(false);
  };
  const handleSave = () => {
    setIsEditing(false);
    callback(content);
  };
  return (
    <Box display="flex">
      <TextField value={content} onChange={handleInputChange} fullWidth label={label} multiline />
      {isEditing && (
        <Box>
          <IconButton onClick={handleSave} sx={{ padding: 0 }}>
            <CheckCircleIcon color="success" />
          </IconButton>
          <IconButton onClick={handleCancel} sx={{ padding: 0 }}>
            <CancelIcon color="error" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
