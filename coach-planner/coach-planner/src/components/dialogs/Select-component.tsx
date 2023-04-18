import { Checkbox, Chip, ListItemText, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/system/Box";
import React, { useEffect, useRef, useState } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  UseFormWatch,
} from "react-hook-form";
import { UpdateExerciseBody } from "../../db/exercises";
import { FormFields } from "./Exercise-form";

export const SelectComponent = ({
  x,
  control,
  selectValue,
  tag,
}: {
  x: FormFields;
  control: Control<UpdateExerciseBody, any>;
  selectValue: string | (string | undefined)[] | undefined;
  tag: string[] | undefined;
}) => {
  const isChecked = (name: string) => {
    if (selectValue) {
      return selectValue.indexOf(name) > -1 ? true : false;
    }
    return tag ? tag.indexOf(name) > -1 : false;
  };

  return (
    <Box key={x.name} sx={{ p: 2, width: "auto" }}>
      <Controller
        name={x.name}
        control={control}
        render={({ field }) => (
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>{x.placeholder}</InputLabel>
            <Select
              {...field}
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {Array.isArray(selected) &&
                    selected.map((value) => <Chip key={value} label={value} />)}
                </Box>
              )}
            >
              {x.options &&
                x.options.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={isChecked(name)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      />
    </Box>
  );
};
