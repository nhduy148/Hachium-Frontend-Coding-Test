import { ThemeMode } from '@libs/types';
import { PaletteOptions, ThemeOptions, alpha, createTheme, darken, lighten, responsiveFontSizes } from '@mui/material';
import { blue, green, grey, red, yellow } from '@mui/material/colors';

//#region Custom MUI
declare module '@mui/material/styles' {
  interface CustomPalette {
    dark: string;
    light: string;
  }
  type Palette = CustomPalette;
  type PaletteOptions = CustomPalette;
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    light: true;
    dark: true;
  }
}
declare module '@mui/material/Badge' {
  interface BadgePropsColorOverrides {
    light: true;
    dark: true;
  }
}
//#endregion

//#region Constant
const DEFAULT_FONT_SIZE = 14;
const DEFAULT_HTML_FONTSIZE = 16;
const COEF: number = DEFAULT_FONT_SIZE / 14;

function pxToRem(size: number) {
  return `${(size / DEFAULT_HTML_FONTSIZE) * COEF}rem`;
}

const DEFAULT_FONT_NAME = 'Be Vietnam Pro';
const FONT_FAMILIES: string[] = [DEFAULT_FONT_NAME, 'sans-serif'];

const DESKTOP_FONTSIZE = {
  h1: 64,
  h2: 56,
  h3: 48,
  h4: 32,
  h5: 26,
  h6: 20,
  button: 16,
  title: 18,
  subtitle1: 16,
  subtitle2: 14,
  body1: 16,
  body2: 14,
  caption: 13,
  overline: 12,
};

const BREAK_POINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1260,
  xl: 1536,
};

const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

export const APP_BAR_Z_INDEX = zIndex.drawer + 1;

const FONT_WEIGHT_LIGHT = 300;
const FONT_WEIGHT_REGULAR = 400;
const FONT_WEIGHT_MEDIUM = 500;
const FONT_WEIGHT_BOLD = 700;

const LIGHT_COLOR = '#cdced4';
const LIGHT_COLOR_LIGHT = '#f5f5f5';
const LIGHT_COLOR_DARK = '#e0e0e0';
const LIGHT_COLOR_CONTRAST_TEXT = '#000000';

const DARK_COLOR = '#25272C';
const DARK_COLOR_LIGHT = '#3f424a';
const DARK_COLOR_DARK = '#000000';
const DARK_COLOR_CONTRAST_TEXT = '#FFFFFF';

const WHITE_COLOR = '#FFFFFF';
const BLACK_COLOR = '#000000';

const TEXT_PRIMARY_COLOR = '#27272A';
const TEXT_SECONDARY_COLOR = '#7D7D7D';
const TEXT_DISABLED_COLOR = 'rgba(0, 0, 0, 0.38)';

const ERROR_COLOR = '#E03A54';
//#endregion

const generateTheme = () => {
  const PRIMARY_COLOR = '#FFC100';
  const PRIMARY_COLOR_CONTRAST_TEXT = '#27272A';

  const SECONDARY_COLOR = '#1679AB';
  const SECONDARY_COLOR_CONTRAST_TEXT = '#FFFFFF';

  const primaryLight = lighten(PRIMARY_COLOR, 0.1);
  const primaryDark = darken(PRIMARY_COLOR, 0.1);

  const secondaryLight = lighten(SECONDARY_COLOR, 0.1);
  const secondaryDark = darken(SECONDARY_COLOR, 0.1);

  const THEME_PALETTE = {
    primary: {
      main: PRIMARY_COLOR,
      light: primaryLight,
      dark: primaryDark,
      contrastText: PRIMARY_COLOR_CONTRAST_TEXT,
    },
    secondary: {
      main: SECONDARY_COLOR,
      light: secondaryLight,
      dark: secondaryDark,
      contrastText: SECONDARY_COLOR_CONTRAST_TEXT,
    },
    dark: {
      main: DARK_COLOR,
      light: DARK_COLOR_LIGHT,
      dark: DARK_COLOR_DARK,
      contrastText: DARK_COLOR_CONTRAST_TEXT,
    },
    light: {
      main: LIGHT_COLOR,
      light: LIGHT_COLOR_LIGHT,
      dark: LIGHT_COLOR_DARK,
      contrastText: LIGHT_COLOR_CONTRAST_TEXT,
    },
    black: {
      main: BLACK_COLOR,
      light: LIGHT_COLOR,
      dark: DARK_COLOR,
      contrastText: '#fff',
    },
    divider: '#E7EBF0',
    common: {
      black: BLACK_COLOR,
      white: WHITE_COLOR,
    },
    text: {
      primary: TEXT_PRIMARY_COLOR,
      secondary: TEXT_SECONDARY_COLOR,
      disabled: TEXT_DISABLED_COLOR,
    },
    grey: grey,
    green: green,
    red: red,
    yellow: yellow,
    blue: blue,
    error: {
      '50': '#FFF0F1',
      '100': '#FFDBDE',
      '200': '#FFBDC2',
      '300': '#FF99A2',
      '400': '#FF7A86',
      '500': '#FF505F',
      '600': '#EB0014',
      '700': '#C70011',
      '800': '#94000D',
      '900': '#570007',
      main: ERROR_COLOR,
      light: '#FF99A2',
      dark: '#C70011',
      contrastText: WHITE_COLOR,
    },
    success: {
      '50': '#E9FBF0',
      '100': '#C6F6D9',
      '200': '#9AEFBC',
      '300': '#6AE79C',
      '400': '#3EE07F',
      '500': '#21CC66',
      '600': '#1DB45A',
      '700': '#5BAB5E',
      '800': '#3B873E',
      '900': '#0F5C2E',
      main: '#1AAF85',
      light: '#6AE79C',
      dark: '#1AA251',
      contrastText: WHITE_COLOR,
    },
    warning: {
      '50': '#FFF9EB',
      '100': '#FFF3C1',
      '200': '#FFECA1',
      '300': '#FFDC48',
      '400': '#F4C000',
      '500': '#DEA500',
      '600': '#D18E00',
      '700': '#AB6800',
      '800': '#8C5800',
      '900': '#5A3600',
      main: '#DEA500',
      light: '#FFDC48',
      dark: '#AB6800',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#5487F5',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: WHITE_COLOR,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      paper: '#FFFFFF',
      default: '#F3F5F6',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  };

  const theme: ThemeOptions = {
    breakpoints: {
      keys: ['xs', 'sm', 'md', 'lg', 'xl'],
      values: BREAK_POINTS,
      unit: 'px',
    },
    direction: 'ltr',
    shape: {
      borderRadius: 8,
    },
    unstable_strictMode: true,
    typography: {
      fontFamily: FONT_FAMILIES.join(),
      htmlFontSize: DEFAULT_HTML_FONTSIZE,
      fontSize: DEFAULT_FONT_SIZE,
      fontWeightLight: FONT_WEIGHT_LIGHT,
      fontWeightRegular: FONT_WEIGHT_REGULAR,
      fontWeightMedium: FONT_WEIGHT_MEDIUM,
      fontWeightBold: FONT_WEIGHT_BOLD,
      h1: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.h1),
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 1.28,
      },
      h2: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.h2),
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.h3),
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 1.38,
      },
      h4: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.h4),
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 1.38,
      },
      h5: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.h5),
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.h6),
        fontWeight: FONT_WEIGHT_MEDIUM,
        lineHeight: 1.5,
      },
      button: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.button),
        fontWeight: FONT_WEIGHT_MEDIUM,
        lineHeight: 1.75,
      },
      subtitle1: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.subtitle1),
        fontWeight: FONT_WEIGHT_MEDIUM,
        lineHeight: 1.3333333333333333,
      },
      subtitle2: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.subtitle2),
        fontWeight: FONT_WEIGHT_MEDIUM,
        lineHeight: 1.57,
      },
      body1: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.body1),
        fontWeight: FONT_WEIGHT_REGULAR,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.body2),
        fontWeight: FONT_WEIGHT_REGULAR,
        lineHeight: 1.38,
      },
      caption: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.caption),
        fontWeight: FONT_WEIGHT_REGULAR,
        display: 'inline-block',
        lineHeight: 1.5,
      },
      overline: {
        fontSize: pxToRem(DESKTOP_FONTSIZE.overline),
        fontWeight: FONT_WEIGHT_REGULAR,
        lineHeight: 1.5,
        textTransform: 'unset',
      },
    },
    mixins: {
      toolbar: {
        minHeight: 56,
        '@media (min-width:0px) and (orientation: landscape)': {
          minHeight: 48,
        },
        '@media (min-width:600px)': {
          minHeight: 64,
        },
      },
    },
    shadows: [
      'none',
      '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);',
      '0px 0px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
      '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
      '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
      '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
      '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
      '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
      '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
      '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
      '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
      '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
      '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
      '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
      '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
      '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
      '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
      '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
      '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
      '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
      '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
      '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
    ],
    transitions: {
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    zIndex,
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          *, *::before, *::after {
            box-sizing: border-box;
          }
          *:focus-visible {
            outline: none;
          }
          html, body {
            overflow: hidden;
          }
          #root {
            overflow: auto;
            display: flex;
            flex-direction: column;
          }
          html, body, #root {
            width: 100%;
            height: 100%;
          }
          img {
            max-width: 100%;
          }
          a {
            cursor: pointer;
          }
          .center {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .absolute-fill {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
          .text-truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .scroll-y {
            overflow-y: auto;
          }
          .scroll-x {
            overflow-x: auto;
          }
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .scrollbar::-webkit-scrollbar {
            background-color: rgba(0,0,0,0);
            width: 12px;
            height: 12px;
            z-index: 999999;
          }
          .scrollbar::-webkit-scrollbar-track {
            background-color: rgba(0,0,0,0);
          }
          .scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0);
            border-radius:12px;
            border:0px solid #fff;
          }
          .scrollbar::-webkit-scrollbar-button {
            display:none;
          }

          .scrollbar:hover::-webkit-scrollbar-thumb {
            background-color: #a0a0a5;
            border:4px solid #fff;
          }
          .scrollbar::-webkit-scrollbar-thumb:hover {
            background-color:#a0a0a5;
            border:4px solid #f4f4f4
          }
          .material-symbols-outlined {
            font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24
          }
        `,
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
          InputLabelProps: {
            shrink: true,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: WHITE_COLOR,
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: WHITE_COLOR,
            '&:hover': {
              backgroundColor: WHITE_COLOR,
            },
            '&.Mui-focused': {
              backgroundColor: WHITE_COLOR,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained',
        },
        styleOverrides: {
          root: {
            textTransform: 'initial',
            fontWeight: 600,
          },
          containedInherit: {
            backgroundColor: 'transparent',
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl',
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: alpha(PRIMARY_COLOR, 0.1),
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          size: 'small',
          notched: true,
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: ERROR_COLOR,
          },
        },
      },
    },
  };

  const darkPalette: PaletteOptions = {
    mode: 'dark',
    ...THEME_PALETTE,
  };

  const lightPalette: PaletteOptions = {
    mode: 'light',
    ...THEME_PALETTE,
  };

  const dark = responsiveFontSizes(createTheme({ palette: darkPalette, ...theme }));

  const light = responsiveFontSizes(createTheme({ palette: lightPalette, ...theme }));

  return { dark, light };
};

export function getTheme(themeMode: ThemeMode) {
  const defaultTheme = generateTheme()[themeMode];
  return defaultTheme;
}
