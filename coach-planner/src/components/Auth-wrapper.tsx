import React, { ReactNode } from 'react';
import { Avatar, Box, CircularProgress, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const AuthWrapper = ({ text, loading, children }: { text: string; loading: boolean; children: ReactNode }) => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {loading ? <CircularProgress color="inherit" /> : <LockOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          {text}
        </Typography>
      </Box>
      {children}
    </Container>
  );
};
