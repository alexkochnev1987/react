import { Typography } from '@mui/material';

export const HintMessage = ({ error, hint }: { error: string | undefined; hint: string }) => {
  return error ? (
    <Typography component="p" color={'tomato'} variant="subtitle2" px={2}>
      {error}
    </Typography>
  ) : (
    <Typography component="p" variant="subtitle2" px={2}>
      {hint}
    </Typography>
  );
};
