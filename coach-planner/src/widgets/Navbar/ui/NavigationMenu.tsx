import { IconButton, Link, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Fade from '@mui/material/Fade';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoutePath } from '@/app/providers/RouterProvider/lib/constants';

const NavRoutes = [
  {
    name: 'Exercises',
    link: RoutePath.exercise,
  },
  {
    name: 'Plan',
    link: RoutePath.plan,
  },
  {
    name: 'Trainings',
    link: RoutePath.trainings,
  },
  {
    name: 'Set user',
    link: RoutePath.user,
  },
];

export const NavigationMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {NavRoutes.map((x) => (
          <MenuItem onClick={handleClose} key={x.name}>
            <Link component={NavLink} to={x.link}>
              {x.name}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};