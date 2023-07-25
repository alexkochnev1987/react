import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { CalendarEvent } from 'kalend';
import { EventForm } from './Event-form';
import { useParams } from 'react-router-dom';
import { deleteEvent } from '../../../db/events';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/userExercisesSlice';

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  eventParams: Partial<CalendarEvent>;
}

export const AddTrainingDialog = (props: SimpleDialogProps) => {
  const userUiid = useAppSelector(selectUser);
  const { id } = useParams();
  const { onClose, open, eventParams } = props;

  const handleClose = () => {
    onClose();
  };

  const submitForm = async () => {
    onClose();
  };

  const deleteMyEvent = () => {
    const eventId = eventParams?.id;
    if (id && eventId) deleteEvent(userUiid, id, eventId);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <DialogTitle textAlign={'center'}>
        Add training to calendar
        <Button
          onClick={deleteMyEvent}
          color="error"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <DeleteForeverIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        {id && (
          <EventForm
            submit={submitForm}
            event={eventParams}
            close={onClose}
            calendarId={id}
            userUiid={userUiid}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
