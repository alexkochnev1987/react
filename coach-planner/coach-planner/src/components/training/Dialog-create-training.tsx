import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { createUniqueTraining } from "../../db/trainings";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import {
  Severity,
  ToastrState,
  setToastr,
} from "../../store/slices/toastr-slice";
const createError: ToastrState = {
  message: "Exercise with this name exist",
  open: true,
  severity: Severity.error,
};

export const DialogCreateTraining = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewTraining = async () => {
    if (name && user?.uid) {
      const trainingId = await createUniqueTraining({
        coachId: user?.uid,
        name,
      });

      if (trainingId) {
        navigate(trainingId);
        handleClose();
      }
    }
  };

  const title = "Enter Unique Training Name";

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            label="Training Name"
            variant="outlined"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={createNewTraining} autoFocus disabled={!name}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
