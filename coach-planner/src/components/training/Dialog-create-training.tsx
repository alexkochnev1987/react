import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { createUniqueTraining } from '../../db/trainings';
import { useNavigate } from 'react-router-dom';

export const DialogCreateTraining = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const navigate = useNavigate();

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

  const title = 'Enter Unique Training Name';

  return (
    <Box px={2}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
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
          <Button onClick={createNewTraining} disabled={!name}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
