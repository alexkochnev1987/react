import { Checkbox, Chip, ListItemText, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/system/Box";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { UpdateExerciseBody } from "../../../db/exercises";
import { FormFields } from "./constants";

export const SelectComponent = ({
  x,
  control,
  tag,
}: {
  x: FormFields;
  control: Control<UpdateExerciseBody, any>;
  tag: string[] | undefined;
}) => {
  const [select, setSelect] = useState(tag);

  return (
    <>
      <Controller
        name={x.name}
        control={control}
        render={({ field }) => (
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>{x.placeholder}</InputLabel>
            <Select
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(e);
                if (Array.isArray(value)) setSelect(value);
              }}
              multiple
              renderValue={(selected) => {
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {Array.isArray(selected) &&
                      selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                  </Box>
                );
              }}
            >
              {x.options &&
                x.options.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      checked={
                        select
                          ? select.indexOf(name) > -1
                            ? true
                            : false
                          : false
                      }
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      />
    </>
  );
};
