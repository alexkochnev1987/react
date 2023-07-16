import { ColorTypes, LineTypes } from '@/store/slices/constants';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';
import { ReactComponent as Line } from '@/shared/assets/icons/line.svg';
import { selectLineDashArray } from '../lib/selectLineDashArray';

export enum SelectTypes {
  LINE = 'line',
  COLOR = 'color',
  SIZE = 'size',
}

interface SelectLineProps {
  selectType: SelectTypes;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const lineTypesArray = [
  LineTypes.forward,
  LineTypes.forwardPuck,
  LineTypes.pass,
  LineTypes.backwardPuck,
  // LineTypes.backward,
  // LineTypes.shot,
];

const colorTypesArray = [ColorTypes.black, ColorTypes.blue, ColorTypes.green, ColorTypes.red];

export const SelectLine: FC<SelectLineProps> = ({ selectType, value, onChange }) => {
  const width: Record<SelectTypes, number> = {
    [SelectTypes.COLOR]: 50,
    [SelectTypes.LINE]: 100,
    [SelectTypes.SIZE]: 50,
  };

  const label: Record<SelectTypes, string> = {
    [SelectTypes.COLOR]: 'Color',
    [SelectTypes.LINE]: 'Line type',
    [SelectTypes.SIZE]: 'Size',
  };

  const children: Record<SelectTypes, JSX.Element[]> = {
    [SelectTypes.COLOR]: colorTypesArray.map((x) => (
      <MenuItem value={x} key={x}>
        <Box width={`20px`} height={`20px`} bgcolor={x} borderRadius={'50%'} />
      </MenuItem>
    )),
    [SelectTypes.LINE]: lineTypesArray.map((x) => (
      <MenuItem value={x} key={x}>
        <Line strokeDasharray={selectLineDashArray(x).join(' ')} />
      </MenuItem>
    )),
    [SelectTypes.SIZE]: ['1', '2', '3', '4'].map((x) => (
      <MenuItem value={Number(x)} key={x}>
        {x}
      </MenuItem>
    )),
  };

  return (
    <FormControl sx={{ minWidth: width[selectType] }} size="small">
      <InputLabel>{label[selectType]}</InputLabel>
      <Select value={value} label="Select line type" onChange={onChange}>
        {children[selectType]}
      </Select>
    </FormControl>
  );
};
