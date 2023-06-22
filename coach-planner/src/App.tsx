import { type PaletteMode, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import { createContext, useMemo, useState } from 'react';
import { MyRouterProvider } from './router/router-provider';
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

function App() {
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
      <ThemeProvider theme={theme}>
        <MyRouterProvider />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
