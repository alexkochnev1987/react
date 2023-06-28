import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const MainPage = () => {
  return (
    <Box
      display="flex"
      sx={{ flex: 1 }}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="10px"
    >
      <Outlet />
    </Box>
  );
};
