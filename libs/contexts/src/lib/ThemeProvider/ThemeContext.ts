import { createContext } from 'react';

export const ThemeContext = createContext({
  appTheme: 'light',
  setTheme: (x: any) => x,
});
