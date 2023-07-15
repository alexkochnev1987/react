import React, { FC, PropsWithChildren } from 'react';
import { ThemeColorContext } from '../lib/ThemeColorContext';
import { ThemeProvider } from '@mui/material';
import { useCreateTheme } from '../lib/useCreateTheme';

export const ThemeProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  const { colorMode, theme } = useCreateTheme();

  return (
    <ThemeColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeColorContext.Provider>
  );
};
