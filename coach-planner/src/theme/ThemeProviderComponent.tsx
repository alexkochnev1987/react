import React, { FC, PropsWithChildren, useMemo, useState } from 'react';
import { ThemeColorContext } from './ThemeColorContext';
import { responsiveFontSizes, type PaletteMode, createTheme, ThemeProvider } from '@mui/material';

export const LIGHT_MODE: PaletteMode = 'light';
export const DARK_MODE: PaletteMode = 'dark';
export const LOCAL_STORAGE_THEME_KEY = 'theme';

const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

const defaultTheme = (getFromLocalStorage(LOCAL_STORAGE_THEME_KEY) as PaletteMode) || LIGHT_MODE;

export const ThemeProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(defaultTheme);
  const colorMode = useMemo(
    () => ({
      setMode,
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode,
          },
        }),
      ),
    [mode],
  );
  return (
    <ThemeColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeColorContext.Provider>
  );
};
