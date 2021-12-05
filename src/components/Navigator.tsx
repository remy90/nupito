import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import Link from '../Link';

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  sx={{ backgroundColor: 'navy'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}><Link href="/" color="secondary">Home</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href="/rsvp" color="secondary">RSVP</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href="/schedule" color="secondary">Schedule</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href="/registry" color="secondary">Registry</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href="/location" color="primary">Location</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href="/hymns" color="secondary">Hymns</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href="/readings" color="secondary">Readings</Link></MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="justify">
            Shaun &#38; Char
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
