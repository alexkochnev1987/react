import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

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

const dialogTitle = 'Do you want close this page?';
const dialogMessage = 'All unsaved data will be lose.';
const cancelContent = 'Cancel';
const submitContent = 'Accept';

export default ({ content, open, onClose, submit }: SubmitDialogProps) => {
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
        <Button onClick={submit} color="error" variant="contained">
          {content?.submit ? content.submit : submitContent}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
