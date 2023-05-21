import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { trainingsCollection } from "../db/trainings";
import { NavLink, Outlet } from "react-router-dom";
import { Button, Link, Menu, MenuItem } from "@mui/material";
import { DialogCreateTraining } from "../components/training/Dialog-create-training";
import { RouteNames } from "../router/routes";

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

  const createTraining = () => {};
  return (
    <div>
      <DialogCreateTraining />
      {trainings &&
        trainings.docs.map((x) => (
          <MenuItem onClick={handleClose} key={x.id}>
            <Link component={NavLink} to={RouteNames.trainings + "/" + x.id}>
              {(x.data() as { name: string }).name}
            </Link>
          </MenuItem>
        ))}
    </div>
  );
};
