import {
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { CalendarEvent } from "kalend";
import { Control, Controller } from "react-hook-form";
import { MyCalendarEvents } from "./Event-form";

export const SelectColor = ({
  control,
  colors,
}: {
  control: Control<MyCalendarEvents, any>;
  colors: string[];
}) => {
  return (
    <>
      <Controller
        name="color"
        control={control}
        render={({ field }) => (
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>Select color</InputLabel>
            <Select {...field}>
              {colors.map((color) => (
                <MenuItem key={color} value={color}>
                  <div
                    style={{
                      backgroundColor: color,
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  ></div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </>
  );
};
