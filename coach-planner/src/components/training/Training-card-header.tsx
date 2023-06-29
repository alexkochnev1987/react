import { Box, TextField, Typography } from '@mui/material';

export const TrainingCardHeader = ({ name, time }: { name: string | undefined; time: number }) => {
  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Typography variant="h2">{name || 'NAME NOT FOUND'}</Typography>
      <TextField
        size="small"
        sx={{ width: '55px' }}
        id="outlined-basic"
        label="Total"
        variant="outlined"
        value={time}
        disabled
      />
    </Box>
  );
};
