import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel>{label}</InputLabel>
        <Select
          size="small"
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
    </div>
  );
};
