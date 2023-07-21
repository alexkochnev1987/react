import { Box, Link, Typography } from '@mui/material';
import React, { useEffect } from 'react';

export const Footer = () => {
  return (
    <Box
      component="footer"
      p={2}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/alexkochnev1987">
          Alex Kochnev
        </Link>
        {' 2023.'}
      </Typography>
    </Box>
  );
};
