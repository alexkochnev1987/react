import React from "react";
import { Canvas } from "../components/draw/Canvas";
import { Box } from "@mui/material";
import { Toolbar } from "../components/draw/Toolbar";

export const DrawPage = () => {
  return (
    <Box width={"100%"}>
      {/* <Toolbar /> */}
      <Canvas />
    </Box>
  );
};
