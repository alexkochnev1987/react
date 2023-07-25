import { Container, Paper, Typography } from '@mui/material';
import { SetUserForm } from '../../components/forms/Set-user-form';
import { SetUserFields, setUserSchema } from '../../components/forms/constants-set-user-form';
import { LoadImage } from '../../components/forms/Load-image';
import { useSetUserActions } from './useSetUserActions';
import { HandleDataWrapper } from '../PageWrappers/HandleDataWrapper';
import { getUserEmail } from '@/service/user.service';

const SetUser = () => {
  const mainText = 'Set user data';
  const { userData, loading, error, setData, setValues } = useSetUserActions();

  return (
    <HandleDataWrapper loading={loading} error={error}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            {mainText}
          </Typography>
          <LoadImage user={userData} />
          <Typography component="h4" variant="h6" align="center">
            <>{'Email: '}</>
            {getUserEmail()}
          </Typography>
          <SetUserForm
            schema={setUserSchema}
            fields={SetUserFields}
            callback={setData(userData)}
            defaultValues={setValues(userData)}
          />
        </Paper>
      </Container>
    </HandleDataWrapper>
  );
};

export default SetUser;
