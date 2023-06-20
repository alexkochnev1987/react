import { TextField } from "@mui/material";
import { StringFormat } from "firebase/storage";
import { CalendarEvent } from "kalend";
import { Control, Controller } from "react-hook-form";

export const InputComponent = ({
  name,
  label,
  control,
}: {
  name: string;
  label: string;
  control: Control<CalendarEvent, any>;
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <TextField {...field} label={label} />}
      />
    </>
  );
};
