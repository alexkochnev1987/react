import { Button, Container, Typography } from '@mui/material';

export const FirebaseError = ({ message }: { message: string }) => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color={'tomato'}
        sx={{ wordWrap: 'break-word' }}
      >
        {message}
      </Typography>
      <Typography component="p" variant="h4" align="center">
        <Button variant="contained" color="success" onClick={() => location.reload()}>
          Reload Page
        </Button>
      </Typography>
    </Container>
  );
};
