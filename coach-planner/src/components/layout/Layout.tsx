import { Container } from '@mui/material';
import { MainPage } from '../../pages/Main-page';
import { Navbar } from '../navbar/Navbar';

export const Layout = () => {
  return (
    <Container
      disableGutters={true}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        // overflow: "hidden",
      }}
    >
      <Navbar />
      <MainPage />
    </Container>
  );
};
