import { Dialog, DialogTitle } from "@mui/material";
import { CalendarEvent } from "kalend";
import { EventForm } from "./Event-form";

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  eventParams: Partial<CalendarEvent>;
}

export const AddPlanDialog = (props: SimpleDialogProps) => {
  const { onClose, open, eventParams } = props;

  const handleClose = () => {
    onClose();
  };

  const submitForm = async () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <DialogTitle>Add training to calendar</DialogTitle>
      <EventForm submit={submitForm} event={eventParams} />
    </Dialog>
  );
};
