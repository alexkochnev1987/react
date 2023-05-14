import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { useEffect, useState } from "react";
import {
  createExercise,
  ExerciseResponse,
  updateExercise,
  UpdateExerciseBody,
  uploadImg,
} from "../../../db/exercises";
import { CreateExerciseComponent } from "./Create-exercise-component";
import { SubmitDialog } from "./submit-dialog";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  exercise: ExerciseResponse;
  onsubmit?: (x: ExerciseResponse) => void;
}

export const ExerciseDialog = (props: SimpleDialogProps) => {
  const { onClose, open, onsubmit, exercise } = props;
  const [openSubmit, setOpenSubmit] = useState(false);

  const handleClose = () => {
    setOpenSubmit(true);
  };

  const submitForm = async (data: UpdateExerciseBody) => {
    if (exercise?.id) {
      const newExercise = await updateExercise(exercise.id, data);
      if (onsubmit) {
        onsubmit(newExercise);
      }
    }
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <SubmitDialog
        open={openSubmit}
        onClose={onClose}
        close={() => {
          setOpenSubmit(false);
        }}
      />
      <DialogTitle>Create exercise</DialogTitle>
      <CreateExerciseComponent exercise={exercise} submit={submitForm} />
    </Dialog>
  );
};
