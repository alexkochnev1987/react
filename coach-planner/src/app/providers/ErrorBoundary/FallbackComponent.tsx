import { Box, Button, Container, Typography } from '@mui/material';

export interface FallbackComponentProps {
  error: Error;
}

export const FallbackComponent = ({ error }: { error: Error }) => {
  //   const { t } = useTranslation('main');
  const { t } = { t: (x: string) => x };
  const reloadPage = () => {
    location.reload();
  };
  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ wordWrap: 'break-word', height: '100vh' }}
        gap={2}
      >
        <Typography component="h1" variant="h1" align="center" color={'tomato'}>
          {t('Error happens')}
        </Typography>

        <Typography component="h3" variant="h3" align="center">
          {t('Reload Page')}
        </Typography>
        <Typography component="h4" variant="h4" align="center">
          {t('Error')}
          {error.message}
        </Typography>
        <Button color="success" onClick={reloadPage} variant="contained">
          {t('Reload Page')}
        </Button>
      </Box>
    </>
  );
};
