import { CircularProgress, Container, Paper, Typography } from '@mui/material';
import { SetUserForm } from '../components/forms/Set-user-form';
import { SetUserFields, setUserDefaultData, setUserSchema } from '../components/forms/constants-set-user-form';
import { LoadImage } from '../components/forms/Load-image';
import { CustomUser, setUser, updateUser, userDocRef } from '../db/user';
import { useDocument } from 'react-firebase-hooks/firestore';
import { FirebaseError } from '../components/Firebase-error';
import { DocumentSnapshot } from 'firebase/firestore';

const SetUser = () => {
  const mainText = 'Set user data';
  const [userData, loading, error] = useDocument(userDocRef);
  const setData = (userData: DocumentSnapshot<CustomUser> | undefined) => {
    return userData?.data() ? updateUser : setUser;
  };
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <FirebaseError error={error} />;
  }

  const setValues = (userData: DocumentSnapshot<CustomUser> | undefined) => {
    const data = userData?.data();
    if (data) {
      const { name, surName, team, age } = data;
      return { name, surName, team, age };
    }
    return setUserDefaultData;
  };
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          {mainText}
        </Typography>
        <LoadImage user={userData?.data()} />
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
