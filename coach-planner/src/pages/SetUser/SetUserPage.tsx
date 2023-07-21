import { CircularProgress, Container, Paper, Typography } from '@mui/material';
import { SetUserForm } from '../../components/forms/Set-user-form';
import { SetUserFields, setUserSchema } from '../../components/forms/constants-set-user-form';
import { LoadImage } from '../../components/forms/Load-image';
import { FirebaseError } from '../../widgets/FirebaseError';
import { useSetUserActions } from './useSetUserActions';

const SetUser = () => {
  const mainText = 'Set user data';
  const { userUiid, userData, loading, error, setData, setValues } = useSetUserActions();

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <FirebaseError error={error} />;
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          {mainText}
        </Typography>
        <LoadImage user={userData} userUiid={userUiid} />
        <SetUserForm
          schema={setUserSchema}
          fields={SetUserFields}
          callback={setData(userData)}
          defaultValues={setValues(userData)}
        />
      </Paper>
    </Container>
  );
};

export default SetUser;
