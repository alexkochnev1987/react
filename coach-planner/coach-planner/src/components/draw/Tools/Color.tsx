import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ColorTypes, setColorWidth } from "../../../store/slices/canvas-slice";
import { Box, Button } from "@mui/material";

const colorTypesArray = [
  ColorTypes.black,
  ColorTypes.blue,
  ColorTypes.green,
  ColorTypes.red,
  ColorTypes.white,
];
export const Color = () => {
  const dispatch = useAppDispatch();
  const clickHandler = (lineWidth: number, color: ColorTypes) => {
    dispatch(setColorWidth({ color, lineWidth }));
  };

  const color = useAppSelector((state) => state.canvas.color);
  const lineWidth = useAppSelector((state) => state.canvas.lineWidth);
  return (
    <>
      {colorTypesArray.map((x, index) => (
        <Box key={x} display={"flex"}>
          {[1, 2, 3, 4].map((index) => (
            <Button
              onClick={() => clickHandler(index, x)}
              key={index}
              sx={{
                border:
                  color === x && lineWidth === index ? "2px solid" : "none",
              }}
            >
              <Box
                width={`${index * 5}px`}
                height={`${index * 5}px`}
                bgcolor={x}
                border={x === ColorTypes.white ? "1px solid" : "none"}
                borderRadius={"50%"}
              />
            </Button>
          ))}
        </Box>
      ))}
    </>
  );
};
