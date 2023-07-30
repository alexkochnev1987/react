import { Box, CircularProgress } from '@mui/material';

export const CenteredLoader = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      flex={1}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <CircularProgress />
    </Box>
  );
};
