import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Avatar, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";

import { RouteNames } from "../../router/routes";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

export function Navbar() {
  const appName = "CoachPlanner";
  const [user] = useAuthState(auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {appName}
          </Typography>
          {user ? (
            <>
              {user.photoURL && <Avatar src={user.photoURL} />}
              <Button
                onClick={() => auth.signOut()}
                size="small"
                color="inherit"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" size="small">
              <Link to={RouteNames.login} color="inherit">
                Login
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
