import { type PaletteMode } from '@mui/material';
import { createContext } from 'react';

interface ThemeModeContext {
  setMode?: React.Dispatch<React.SetStateAction<PaletteMode>>;
  mode?: PaletteMode;
}

export const ThemeColorContext = createContext<ThemeModeContext>({});
