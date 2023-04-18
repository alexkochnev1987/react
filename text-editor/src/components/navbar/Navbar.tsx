import React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navbarItems } from './navbar-items';
import { navbarStyles } from './styles';
import { NavLink } from 'react-router-dom';

export const Navbar = ({ openNav }: { openNav: boolean }) => {
  return (
    <Drawer sx={navbarStyles} variant='temporary' anchor='left' open={openNav} data-testid='navbar'>
      <Toolbar />
      <Divider />
      <List>
        {navbarItems.map((item) => (
          <NavLink key={item.id} to={item.route}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};
