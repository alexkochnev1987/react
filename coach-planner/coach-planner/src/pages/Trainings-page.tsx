import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { trainingsCollection } from "../db/trainings";
import { NavLink, Outlet } from "react-router-dom";
import { Button, Link, Menu, MenuItem } from "@mui/material";
import { DialogCreateTraining } from "../components/training/Dialog-create-training";
import { RouteNames } from "../router/routes";

export const TrainingsPage = () => {
  const [trainings] = useCollection(trainingsCollection);

  return (
    <div>
      <DialogCreateTraining />
      {trainings &&
        trainings.docs.map((x) => (
          <MenuItem key={x.id}>
            <Link component={NavLink} to={RouteNames.trainings + "/" + x.id}>
              {(x.data() as { name: string }).name}
            </Link>
          </MenuItem>
        ))}
    </div>
  );
};
