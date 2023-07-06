import { Container, Paper, Typography } from '@mui/material';
import { SetUserForm } from '../components/forms/Set-user-form';
import {
  SetUserFields,
  SetUserFormData,
  setUserDefaultData,
  setUserSchema,
} from '../components/forms/constants-set-user-form';
import { LoadImage } from '../components/forms/Load-image';

export const SetUser = () => {
  const mainText = 'Set user data';
  const callback = (data: SetUserFormData) => console.log(data);

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            {mainText}
          </Typography>
          <LoadImage />
          <SetUserForm
            schema={setUserSchema}
            fields={SetUserFields}
            callback={callback}
            defaultValues={setUserDefaultData}
          />
        </Paper>
      </Container>
    </>
  );
};
