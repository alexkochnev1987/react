import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export interface dialogContent {
  title: string;
  message: string;
  submit?: string;
  cancel?: string;
}

interface SubmitDialogProps {
  open: boolean;
  onClose: () => void;

  submit: () => void;
  content?: dialogContent;
}

const dialogTitle = "Вы уверены, что хотите закрыть страницу?";
const dialogMessage = "Все несохраненные данные будут потеряны.";
const cancelContent = "Отмена";
const submitContent = "Подтвердить";

export const SubmitDialog = ({
  content,
  open,
  onClose,
  submit,
}: SubmitDialogProps) => {
  const cancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{content?.title ? content?.title : dialogTitle}</DialogTitle>
      <DialogContent>
        <p>{content?.message ? content.message : dialogMessage}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => cancel()} color="primary">
          {content?.cancel ? content.cancel : cancelContent}
        </Button>
        <Button onClick={submit} color="primary">
          {content?.submit ? content.submit : submitContent}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
