import { responsiveFontSizes, type PaletteMode, createTheme } from '@mui/material';
import { useMemo, useState } from 'react';

export const LIGHT_MODE: PaletteMode = 'light';
export const DARK_MODE: PaletteMode = 'dark';
export const LOCAL_STORAGE_THEME_KEY = 'theme';

const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

const defaultTheme = (getFromLocalStorage(LOCAL_STORAGE_THEME_KEY) as PaletteMode) || LIGHT_MODE;

export const useCreateTheme = () => {
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

  return { theme, colorMode };
};
