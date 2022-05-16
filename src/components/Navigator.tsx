import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import Link from '../Link';
import { AppContext } from './AppProvider';
import useUser from '../lib/useUser';
import { ColouredWord } from './ColouredWord';

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);
  const {state} = useContext(AppContext);
  const {user} = useUser();

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
            <MenuItem onClick={handleClose}><Link href={'/'} color="secondary">Home</Link></MenuItem>
            {user?.isLoggedIn && user.id && // (state?.guest?.isAttending != false) &&
                <MenuItem onClick={handleClose}><Link href={'/rsvp/'} color="secondary">RSVP</Link></MenuItem>
            }
            {user?.isLoggedIn && state.guest.id && <MenuItem onClick={handleClose}><Link href={`/${state.guest.id}`} color="secondary">{state.guest.firstName}&apos;s page</Link></MenuItem>}
            {user?.isLoggedIn && user.id && state.guest.isFed &&
                <MenuItem onClick={handleClose}><Link href={'/order/'} color="secondary">Order of service</Link></MenuItem>
            }
            <MenuItem onClick={handleClose}><Link href={'/registry/'} color="secondary">Registry</Link></MenuItem>
            {user?.isLoggedIn && user.id &&
                <MenuItem onClick={handleClose}><Link href={'/location/'} color="secondary">Location</Link></MenuItem>
            }
            {user?.isLoggedIn && user.id &&
                <MenuItem onClick={handleClose}><Link href={'/accommodation/'} color="secondary">Accommodation</Link></MenuItem>
            }
            {/* <MenuItem onClick={handleClose}><Link href={'/songs/'} color="secondary">Songs</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href={'/readings/'} color="secondary">Readings</Link></MenuItem> */}
          </Menu>
          <Link color='inherit' underline='none' variant="h6"  href={'/'} sx={{ flexGrow: 1 }}  type="button" align="justify">
            Shaun &amp; Charlotte
          </Link>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
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
