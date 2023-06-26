import { Box, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import React from 'react';
import { setColor } from '../../../store/slices/canvas-slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ColorTypes } from '../../../store/slices/constants';
const colorTypesArray = [ColorTypes.black, ColorTypes.blue, ColorTypes.green, ColorTypes.red, ColorTypes.white];
export const SelectColor = () => {
  const dispatch = useAppDispatch();
  const lineColor = useAppSelector((state) => state.canvas.color);
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setColor(event.target.value as ColorTypes));
  };
  return (
    <Select value={lineColor} label="Age" onChange={handleChange}>
      {colorTypesArray.map((x) => (
        <MenuItem value={x} key={x}>
          <Box
            width={`25px`}
            height={`25px`}
            bgcolor={x}
            border={x === ColorTypes.white ? '1px solid' : 'none'}
            borderRadius={'50%'}
          />
        </MenuItem>
      ))}
    </Select>
  );
};
