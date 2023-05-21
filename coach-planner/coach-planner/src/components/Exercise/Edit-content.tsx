import { Box, Button, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { ExerciseResponse, updateExercise } from "../../db/exercises";

type ExerciseResponseKeys = keyof ExerciseResponse;
export const EditContent = ({
  idExercise,
  fieldName,
  value,
  label,
}: {
  idExercise: string;
  fieldName: ExerciseResponseKeys;
  value: string | string[] | undefined;
  label: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(value);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    updateExercise(idExercise, { [fieldName]: content });
  };
  return (
    <Box>
      {isEditing ? (
        <TextField
          value={content}
          onChange={handleInputChange}
          autoFocus
          fullWidth
          label={label}
        />
      ) : (
        <Tooltip title={label} placement="top-start">
          <div onClick={handleClick}>{content || "Введите значение"}</div>
        </Tooltip>
      )}
      {isEditing && (
        <>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Сохранить
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setIsEditing(false)}
          >
            Отменить
          </Button>
        </>
      )}
    </Box>
  );
};
