import React, { ReactNode, createContext, useMemo, useState } from 'react';
import { responsiveFontSizes, type PaletteMode, createTheme, ThemeProvider } from '@mui/material';
interface DefaultContextValue {
  toggleColorMode: () => void;
}

const defaultContext: DefaultContextValue = {
  toggleColorMode: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const ColorModeContext = createContext(defaultContext);
const lightMode: PaletteMode = 'light';
const darkMode: PaletteMode = 'dark';

export const ThemeProviderComponent = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(lightMode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === lightMode ? darkMode : lightMode));
      },
    }),
    [],
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
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
