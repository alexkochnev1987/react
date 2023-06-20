import { Button, SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";
import { SelectLineType } from "./Tools/Line";
import { Color } from "./Tools/Color";
const drawerWidth = 240;

export const Toolbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenDrawer(open);
    };
  return (
    <>
      <Button
        onClick={() => {
          setOpenDrawer(true);
        }}
      >
        Open toolbar
      </Button>
      <SwipeableDrawer
        anchor={"left"}
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <SelectLineType />
        <Color />
      </SwipeableDrawer>
    </>
  );
};
