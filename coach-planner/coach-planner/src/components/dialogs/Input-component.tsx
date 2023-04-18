import { TextField } from "@mui/material";
import Box from "@mui/system/Box";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { UpdateExerciseBody } from "../../db/exercises";
import { errorMessage, FormFields } from "./Exercise-form";

export const InputComponent = ({
  x,
  control,
  errors,
}: {
  errors: FieldErrors<UpdateExerciseBody>;
  x: FormFields;
  control: Control<UpdateExerciseBody, any>;
}) => {
  return (
    <Box sx={{ p: 2, width: "auto" }}>
      <Controller
        name={x.name}
        control={control}
        rules={x.rules}
        render={({ field }) => (
          <TextField
            sx={x.name === "img" ? { display: "none" } : { width: "100%" }}
            {...field}
            error={!!errors[x.name]}
            label={x.placeholder}
          />
        )}
      />
      {errors[x.name] && (
        <p
          style={x.name === "img" ? { display: "none" } : { color: "red" }}
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </Box>
  );
};
