import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import {
  ExerciseResponse,
  ExerciseResponseKeys,
  updateExercise,
} from "../../db/exercises";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const EditContent = ({
  // idExercise,
  // fieldName,
  callback,
  value,
  label,
}: {
  // idExercise: string;
  // fieldName: ExerciseResponseKeys;
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
    // updateExercise(idExercise, { [fieldName]: content });
  };
  return (
    <Box display="flex">
      <TextField
        value={content}
        onChange={handleInputChange}
        autoFocus
        fullWidth
        label={label}
        multiline
      />
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
