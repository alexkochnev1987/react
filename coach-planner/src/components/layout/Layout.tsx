import { Container } from '@mui/material';
import { MainPage } from '../../pages/Main-page';
import { Navbar } from '../navbar/Navbar';
import { Footer } from '../Footer';

export const Layout = () => {
  return (
    <Container
      disableGutters={true}
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
        flexDirection: 'column',
        color: 'text.default',
      }}
    >
      <Navbar />
      <MainPage />
      <Footer />
    </Container>
  );
};
