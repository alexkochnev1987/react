import { Button, Dialog, DialogTitle } from "@mui/material";
import { CalendarEvent } from "kalend";
import { EventForm } from "./Event-form";
import { useParams } from "react-router-dom";
import { deleteEvent } from "../../../db/events";

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  eventParams: Partial<CalendarEvent>;
  // submit: () => void;
}

export const AddTrainingDialog = (props: SimpleDialogProps) => {
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
    if (id && eventId) deleteEvent(id, eventId);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <DialogTitle>
        Add training to calendar
        <Button variant="contained" color="error" onClick={deleteMyEvent}>
          Delete
        </Button>
      </DialogTitle>
      {id && (
        <EventForm
          submit={submitForm}
          event={eventParams}
          close={onClose}
          id={id}
        />
      )}
    </Dialog>
  );
};
