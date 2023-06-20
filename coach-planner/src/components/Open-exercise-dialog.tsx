import { Button } from "@mui/material";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { ExerciseResponse, createExercise } from "../db/exercises";
import { ExerciseDialog } from "./dialogs/exercise-dialog/create-exercise";

export const OpenExerciseDialog = ({
  exerciseResponse,
  callback,
  buttonLabel,
}: {
  buttonLabel: string;
  callback?: (exercise: ExerciseResponse) => void;
  exerciseResponse?: ExerciseResponse;
}) => {
  const [open, setOpen] = React.useState(false);
  const [user] = useAuthState(auth);
  const [exercise, setExercise] = useState<ExerciseResponse>();

  const createExerciseOpenDialog = async () => {
    if (!exerciseResponse) {
      const photo = user?.photoURL || "";
      const newExercise = await createExercise(user?.uid, photo);
      // setExercise(newExercise);
      return setOpen(true);
    }

    setExercise(exerciseResponse);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {exercise && (
        <ExerciseDialog
          open={open}
          onClose={handleClose}
          exercise={exercise}
          onsubmit={callback}
        />
      )}

      <Button variant="outlined" onClick={createExerciseOpenDialog}>
        {buttonLabel}
      </Button>
    </>
  );
};
