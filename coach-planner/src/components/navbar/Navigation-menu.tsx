import { IconButton, Link, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Fade from '@mui/material/Fade';
import React from 'react';
import { RouteNames } from '../../router/routes';
import { NavLink } from 'react-router-dom';

const NavRoutes = [
  {
    name: 'Exercises',
    link: RouteNames.myExercises,
  },
  {
    name: 'Plan',
    link: RouteNames.plan,
  },
  {
    name: 'Trainings',
    link: RouteNames.trainings,
  },
  {
    name: 'Set user',
    link: RouteNames.user,
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
        id="fade-menu"
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
