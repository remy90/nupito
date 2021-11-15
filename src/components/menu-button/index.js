
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const MenuButton = () => {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
      onClick={() => console.log('whopee')}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default MenuButton;