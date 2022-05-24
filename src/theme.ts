import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import type {} from '@mui/lab/themeAugmentation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'montserrat',
    },
    h1: { fontSize: '4rem', fontWeight: 200 },
    h2: { fontSize: '3rem', fontWeight: 200 },
    h3: { fontSize: '1.5rem', fontWeight: 175 },
    h4: { fontSize: '2rem' },
    h5: { fontSize: '1.5rem' },
  },
  components: {
    MuiTimelineItem: {
      styleOverrides: {
        root: {
          '&:before': { flex: 0 }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0,
          marginLeft: 3
        }
      }
    }
  }
});

export default theme;
