import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';

export const Layout = () => {
  return (
    <Container
      disableGutters={true}
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Outlet />
      <Footer />
    </Container>
  );
};
