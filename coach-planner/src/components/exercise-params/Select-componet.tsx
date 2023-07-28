import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const SelectComponent = ({
  callback,
  value,
  items,
  manual,
  label,
}: {
  label: string;
  value: string;
  callback: (value: string) => void;
  items: string[];
  manual?: boolean;
}) => {
  return (
    <FormControl size="small" sx={{ width: '110px' }}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        disabled={manual}
        value={value}
        onChange={(date) => {
          callback(date.target.value);
        }}
      >
        {items.map((x) => (
          <MenuItem key={x} value={x}>
            {x}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
