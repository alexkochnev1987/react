import { Box, IconButton, Link, Menu, MenuItem } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { NavRoutes } from './Navbar';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

interface BurgerProps {
  children?: ReactNode;
}

export const Burger: FC<BurgerProps> = ({ children }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
        sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      {children}
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {NavRoutes.map((page) => (
          <MenuItem key={page.name} onClick={handleCloseNavMenu}>
            <Link
              component={NavLink}
              to={page.link}
              underline={location.pathname === page.link ? 'always' : 'hover'}
              sx={{ color: (t) => t.palette.primary.main }}
            >
              {page.name}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
