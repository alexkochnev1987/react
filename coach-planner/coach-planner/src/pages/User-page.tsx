import { Button } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { RouteNames } from "../router/routes";

export const UserPage = () => {
  return (
    <div>
      <h2>UserPage</h2>
      <Button color="inherit" variant="outlined" size="small">
        <Link to={RouteNames.exercise} color="inherit">
          Exercise
        </Link>
      </Button>
      <Button color="inherit" variant="outlined" size="small">
        <Link to={RouteNames.plan} color="inherit">
          Plan
        </Link>
      </Button>
      <Outlet />
    </div>
  );
};
