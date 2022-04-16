import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import Link from '../Link';
import { AppContext } from './AppProvider';

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);
  const {state} = useContext(AppContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  sx={{ backgroundColor: '#222222'}}>
        <Toolbar>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          >
            <MenuItem onClick={handleClose}><Link href={`/${state?.id}`} color="secondary">Home</Link></MenuItem>
            {state?.id && (state?.isAttending != false) &&
              <MenuItem onClick={handleClose}><Link href={`/rsvp/${state?.id}`} color="secondary">RSVP</Link></MenuItem>}
            <MenuItem onClick={handleClose}><Link href={`/order/${state?.id}`} color="secondary">Order of service</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href={`/registry/${state?.id}`} color="secondary">Registry</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href={`/location/${state?.id}`} color="secondary">Location</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href={`/songs/${state?.id}`} color="secondary">Songs</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href={`/readings/${state?.id}`} color="secondary">Readings</Link></MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="justify">
            Shaun &#38; Char
          </Typography>
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
