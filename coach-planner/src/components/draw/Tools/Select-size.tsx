import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setWidth } from "../../../store/slices/canvas-slice";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

export const SelectSize = () => {
  const dispatch = useAppDispatch();
  const lineWidth = useAppSelector((state) => state.canvas.lineWidth);
  const handleChange = (event: SelectChangeEvent) => {
    const value = Number(event.target.value);
    dispatch(setWidth(value));
  };
  return (
    <Select value={`${lineWidth}`} label="Age" onChange={handleChange}>
      {["1", "2", "3", "4"].map((x) => (
        <MenuItem value={Number(x)} key={x}>
          {x}
        </MenuItem>
      ))}
    </Select>
  );
};
