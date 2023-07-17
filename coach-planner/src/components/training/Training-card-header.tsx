import { Box, TextField, Typography } from '@mui/material';

export const TrainingCardHeader = ({ name, time }: { name: string | undefined; time: number }) => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} p={2}>
      <Typography variant="h3">{name || 'NAME NOT FOUND'}</Typography>
      <TextField sx={{ width: '55px' }} label="Total" variant="outlined" value={time} disabled />
    </Box>
  );
};
