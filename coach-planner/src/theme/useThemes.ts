import { useContext } from 'react';
import { ThemeColorContext } from './ThemeColorContext';
import { DARK_MODE, LIGHT_MODE, LOCAL_STORAGE_THEME_KEY } from './ThemeProviderComponent';
const setLocalStorage = (key: string, value: string) => localStorage.setItem(key, value);

export const useThemes = () => {
  const { mode, setMode } = useContext(ThemeColorContext);
  const toggleThemeMode = () => {
    const newMode = mode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE;
    if (mode) setLocalStorage(LOCAL_STORAGE_THEME_KEY, newMode);
    if (setMode) setMode(newMode);
  };

  return { mode, toggleThemeMode };
};
