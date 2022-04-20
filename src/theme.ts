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
  components: {
    MuiTimelineItem: {
      styleOverrides: {
        root: {
          '&:before': { flex: 0 }
        }
      }
    }
  }
});

export default theme;
