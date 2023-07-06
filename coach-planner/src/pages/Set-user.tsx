import { CircularProgress, Container, Paper, Typography } from '@mui/material';
import { SetUserForm } from '../components/forms/Set-user-form';
import {
  SetUserFields,
  SetUserFormData,
  setUserDefaultData,
  setUserSchema,
} from '../components/forms/constants-set-user-form';
import { LoadImage } from '../components/forms/Load-image';
import { userDocRef } from '../db/user';
import { useDocument } from 'react-firebase-hooks/firestore';

export const SetUser = () => {
  const mainText = 'Set user data';
  const callback = (data: SetUserFormData) => console.log(data);
  const [snapshot, loading, error] = useDocument(userDocRef);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4" align="center" color={'tomato'}>
          {error.message}
        </Typography>
      </Container>
    );
  }
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          {mainText}
        </Typography>
        <LoadImage user={snapshot?.data()} />
        <SetUserForm
          schema={setUserSchema}
          fields={SetUserFields}
          callback={callback}
          defaultValues={setUserDefaultData}
        />
      </Paper>
    </Container>
  );
};
