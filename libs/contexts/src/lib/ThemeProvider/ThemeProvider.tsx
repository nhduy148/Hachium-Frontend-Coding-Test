import { getTheme } from '@libs/constants';
import { ThemeMode } from '@libs/types';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { ThemeContext } from './ThemeContext';

type Props = React.PropsWithChildren<{ initialAppTheme: ThemeMode }>;

export const ThemeProvider: React.FC<Props> = ({ children, initialAppTheme }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialAppTheme);

  const setThemeName = (name: ThemeMode) => {
    setThemeMode(name);
  };

  const contextValue = {
    appTheme: themeMode,
    setTheme: setThemeName,
  };
  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={getTheme(themeMode)}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
