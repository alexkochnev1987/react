import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { MyRouterProvider } from "./router/router-provider";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode,
          },
        })
      ),
    [mode]
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
