import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const errorMessage = (error: unknown): string => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
      return error.message;
    } else if (typeof error === 'string') {
      return error;
    } else {
      console.error(error);
      return 'Unknown error';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1">{errorMessage(error)}</Typography>
      <Typography variant="h6">Sorry, an unexpected error has occurred.</Typography>
      <Link to={'/'}>
        <Button variant="contained">Go back</Button>
      </Link>
      <img src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg" width={'100%'} alt="" />
    </Box>
  );
}
