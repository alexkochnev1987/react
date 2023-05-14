import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  EnergySupply,
  ExerciseParamsFormFields,
  IExerciseParams,
  LoadIntensity,
  MyColors,
  selectOptions,
} from "./constants";
import { errorMessage } from "../dialogs/exercise-dialog/constants";

export const RadioIntensity = ({
  mode,
  x,
  errors,
  control,
  options,
}: {
  mode: boolean;
  options: { value: EnergySupply | LoadIntensity; color: MyColors }[];
  errors: FieldErrors<IExerciseParams>;
  x: ExerciseParamsFormFields;
  control: Control<IExerciseParams, any>;
}) => {
  return (
    <>
      <Controller
        name={x.name}
        control={control}
        render={({ field }) => (
          <RadioGroup {...field}>
            {options.map((name) => (
              <FormControlLabel
                disabled={!mode}
                value={name.value}
                control={<Radio color={name.color} />}
                label={name.value}
                key={name.value}
              />
            ))}
          </RadioGroup>
        )}
      />
      {errors[x.name] && (
        <p style={{ color: "red" }} role="alert">
          {errorMessage}
        </p>
      )}
    </>
  );
};
