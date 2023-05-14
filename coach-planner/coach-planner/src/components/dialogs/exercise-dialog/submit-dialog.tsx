import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface SubmitDialogProps {
  open: boolean;
  onClose: () => void;
  close: () => void;
}

export const SubmitDialog = ({ open, onClose, close }: SubmitDialogProps) => {
  const cancel = () => {
    console.log("close");
    close();
  };
  const submit = () => {
    close();
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Вы уверены, что хотите закрыть страницу?</DialogTitle>
      <DialogContent>
        <p>Все несохраненные данные будут потеряны.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => cancel()} color="primary">
          Отмена
        </Button>
        <Button onClick={() => submit()} color="primary">
          Закрыть страницу
        </Button>
      </DialogActions>
    </Dialog>
  );
};
