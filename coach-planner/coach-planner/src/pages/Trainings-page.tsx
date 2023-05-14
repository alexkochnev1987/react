import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { trainingsCollection } from "../db/trainings";
import { NavLink, Outlet } from "react-router-dom";
import { Button, Link, Menu, MenuItem } from "@mui/material";

export const TrainingsPage = () => {
  const [trainings] = useCollection(trainingsCollection);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div>
        <Button
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Show trainings
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {trainings &&
            trainings.docs.map((x) => (
              <MenuItem onClick={handleClose} key={x.id}>
                <Link component={NavLink} to={x.id}>
                  {(x.data() as { name: string }).name}
                </Link>
              </MenuItem>
            ))}
        </Menu>
      </div>
      <Outlet />
    </>
  );
};
