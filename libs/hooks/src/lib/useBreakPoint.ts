import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';

export const useBreakPoint = (breakpoint: Breakpoint | [Breakpoint, Breakpoint]) => {
  const theme = useTheme();
  let mediaQuery = null;
  if (Array.isArray(breakpoint)) {
    mediaQuery = theme.breakpoints.between(breakpoint[0], breakpoint[1]);
  } else {
    mediaQuery = theme.breakpoints.up(breakpoint);
  }
  return useMediaQuery(mediaQuery);
};
