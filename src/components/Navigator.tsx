import React, { useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import Link from '../Link';
import { AppContext } from './AppProvider';
import useUser from '../lib/useUser';

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);
  const {state, dispatch} = useContext(AppContext);
  const {user} = useUser();

  // state is occasionally initial default, so a fallback is required
  useEffect(() => {
    if (!state.guest.id) {
      dispatch({type: 'UPDATE_GUEST', value: {...JSON.parse(localStorage.getItem('shaun_char_guest_2022') ?? '{}')}});
    }
  }, [state.guest.id]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  sx={{ backgroundColor: '#B9A181'}}>
        <Toolbar>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          >
            <MenuItem onClick={handleClose}><Link href={'/'}  sx={{width: '100%', height: '100%'}} color="secondary">Home</Link></MenuItem>
            {user?.isLoggedIn && // (state?.guest?.isAttending != false) &&
              <MenuItem onClick={handleClose}><Link href={'/rsvp/'}  sx={{width: '100%'}} color="secondary">RSVP</Link></MenuItem>
            }
            {user?.isLoggedIn && <MenuItem onClick={handleClose}><Link href={`/${user.id}`}  sx={{width: '100%'}} color="secondary">{state.guest.firstName ? `${state.guest.firstName}'s page` : 'Your'} page</Link></MenuItem>}
            {user?.isLoggedIn && state.guest.isFed &&
              <MenuItem onClick={handleClose}><Link href={'/order/'}  sx={{width: '100%'}} color="secondary">Order of service</Link></MenuItem>
            }
            <MenuItem onClick={handleClose}><Link href={'/registry/'}  sx={{width: '100%'}} color="secondary">Registry</Link></MenuItem>
            {user?.isLoggedIn &&
              <MenuItem onClick={handleClose}><Link href={'/location/'} sx={{width: '100%'}} color="secondary">Location</Link></MenuItem>
            }
            {user?.isLoggedIn &&
              <MenuItem onClick={handleClose}><Link href={'/accommodation/'}  sx={{width: '100%'}} color="secondary">Accommodation</Link></MenuItem>
            }
            {/* <MenuItem onClick={handleClose}><Link href={'/songs/'}  sx={{width: '100%'}} color="secondary">Songs</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href={'/readings/'}  sx={{width: '100%'}} color="secondary">Readings</Link></MenuItem> */}
          </Menu>
          <Link color='#3a3a3a' underline='none' variant="h6"  href={'/'} sx={{ flexGrow: 1 }}  type="button" align="justify">
            Charlotte &amp; Shaun
          </Link>
          <IconButton
            size="small"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: '#3a3a3a' }}
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
