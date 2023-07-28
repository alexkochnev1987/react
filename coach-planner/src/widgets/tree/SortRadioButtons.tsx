import { ChangeEvent, FC } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from '@mui/material';

interface SortRadioButtonsProps {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FilterBy = {
  NAME: 'name',
  AGE: 'age',
  TAG: 'tag',
} as const;

type ObjectValues<T> = T[keyof T];
type FilterValues = ObjectValues<typeof FilterBy>;

const radioArray: { value: FilterValues; label: string }[] = [
  { value: 'age', label: 'Age' },
  { value: 'tag', label: 'Tag' },
  { value: 'name', label: 'Name' },
];

const SortRadioButtons: FC<SortRadioButtonsProps> = ({ value, handleChange }) => {
  const groupBy = 'Group exercise by';
  return (
    <FormControl>
      <FormLabel>{groupBy}</FormLabel>
      <RadioGroup row value={value} onChange={handleChange}>
        {radioArray.map(({ value, label }) => (
          <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SortRadioButtons;
