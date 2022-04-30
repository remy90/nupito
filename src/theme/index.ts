import typography from '../theme/typography';
import {createTheme } from '@mui/material/styles';
import { paddingBottom, paddingTop } from '../styles/sxConstants';

export const theme = createTheme({
  palette: {
    error: {
      main: '#dc4000',
    },
  },
  breakpoints: {
    values: {
      xs: 20,
      sm: 31.25,
      md: 56.25,
      lg: 75,
      xl: 96
    },
    unit: 'rem'
  },
  typography: {
    allVariants: {
      fontFamily: typography.fontFamily,
    },
    h1: { // Title
      fontSize: `${typography.h1.large.fontSize}rem`,
      lineHeight: `${typography.h1.large.lineHeight}rem`,
      fontWeight: typography.h1.large.fontWeight,
      MarginTop: '0.438rem',
      MarginBottom: '0.688rem',
    },
    h2: { // Sub Heading
      fontSize: `${typography.h2.fontSize}rem`,
      lineHeight: `${typography.h2.lineHeight}rem`,
      fontWeight: typography.h2.fontWeight,
      ...paddingTop,
      ...paddingBottom,
    },
    h3: { // Small title
      fontSize: `${typography.regular.size}rem`,
      lineHeight: `${typography.regular.lineHeight}rem`,
      fontWeight: 600,
      ...paddingTop,
      ...paddingBottom,
    },
    body1: {
      fontSize: `${typography.regular.size}rem`,
      lineHeight: `${typography.regular.lineHeight}rem`,
      fontWeight: 'normal',
      ...paddingTop,
      ...paddingBottom,
    }
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          ...paddingTop,
          ...paddingBottom,
        },
      },
    },
  },
});
