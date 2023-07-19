import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { EditContentButtons } from '@/entities/EditContentButtons';
import { AllDrawType } from '@/features/DrawExercise/lib/helpers';
import { Timestamp } from 'firebase/firestore';

export const EditContent = ({
  callback,
  value,
  label,
}: {
  value: string | undefined | string[] | AllDrawType | Timestamp;
  label: string;
  callback: (value: string | undefined | string[] | AllDrawType | Timestamp) => void;
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
      {isEditing && <EditContentButtons handleSave={handleSave} handleCancel={handleCancel} />}
    </Box>
  );
};
