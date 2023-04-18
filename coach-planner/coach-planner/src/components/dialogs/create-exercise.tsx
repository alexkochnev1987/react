import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { useState } from "react";
import {
  updateExercise,
  UpdateExerciseBody,
  uploadImg,
} from "../../db/exercises";
import { Button } from "@mui/material";
import { ExerciseForm } from "./Exercise-form";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  idExercise: string;
  exercise?: UpdateExerciseBody;
}

export const ExerciseDialog = (props: SimpleDialogProps) => {
  const { onClose, open, idExercise, exercise } = props;
  const [image, setImage] = useState("");

  const handleClose = () => {
    onClose();
  };

  const submitForm = (data: UpdateExerciseBody) => {
    updateExercise(idExercise, data);
    onClose();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      uploadImg(files[0], idExercise).then((img) => setImage(img));
    }
  };
  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <DialogTitle>Crete exercise</DialogTitle>
      <ExerciseForm
        exercise={exercise}
        submit={submitForm}
        idExercise={idExercise}
      />
    </Dialog>
  );
};
