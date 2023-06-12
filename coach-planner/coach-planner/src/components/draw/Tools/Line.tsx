import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { LineTypes, setLineType } from "../../../store/slices/canvas-slice";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";

const lineTypesArray = [
  LineTypes.forward,
  LineTypes.backward,
  LineTypes.forwardPuck,
  LineTypes.backwardPuck,
  LineTypes.pass,
  LineTypes.shot,
];

export const SelectLineType = () => {
  const dispatch = useAppDispatch();
  const lineType = useAppSelector((state) => state.canvas.lineType);
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setLineType(event.target.value as LineTypes));
  };
  return (
    <Select value={lineType} label="Age" onChange={handleChange}>
      {lineTypesArray.map((x) => (
        <MenuItem value={x} key={x}>
          {x}
        </MenuItem>
      ))}
    </Select>
  );
};
