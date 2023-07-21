import { Container, Typography } from '@mui/material';
import { FirestoreError } from 'firebase/firestore';

export const FirebaseError = ({ error }: { error: FirestoreError }) => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Typography component="h1" variant="h4" align="center" color={'tomato'}>
        {error.message}
      </Typography>
    </Container>
  );
};
