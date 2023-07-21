import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../widgets/Footer';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary/ErrorBoundary';
import { FallbackComponent } from '@/app/providers/ErrorBoundary/FallbackComponent';

const Layout = () => {
  return (
    <ErrorBoundary fallback={FallbackComponent}>
      <Container
        disableGutters={true}
        sx={{
          minHeight: '100vh',
          bgcolor: (t) => t.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          flex={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Container>
    </ErrorBoundary>
  );
};

export default Layout;
