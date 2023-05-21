import { Alert, Button, Snackbar } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Severity, ToastrState, setToastr } from "../store/slices/toastr-slice";

const initialState: ToastrState = {
  message: "",
  open: false,
  severity: Severity.success,
};

export const Toastr = () => {
  const toastr = useAppSelector((state) => state.toastr);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setToastr(initialState));
  };
  return (
    <Snackbar
      open={toastr.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert
        onClose={handleClose}
        severity={toastr.severity}
        sx={{ width: "100%" }}
      >
        {toastr.message}
      </Alert>
    </Snackbar>
  );
};
