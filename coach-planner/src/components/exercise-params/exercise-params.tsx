import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IExerciseParams,
  ExerciseParamsArray,
  ExerciseParamsDefault,
  ExerciseParamsFormKeyArray,
  radioParams,
  selectOptions,
  energySupplyOptions,
  energySupplyParams,
  EnergySupply,
  LoadIntensity,
} from "./constants";
import { InputNumberComponent } from "./Input-number";
import { RadioIntensity } from "./Radio-intensity";
import {
  Box,
  Button,
  ClickAwayListener,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useClickOutside } from "../../hooks/use-click-outside";
import { setRest } from "../../utils/setRest";
import { setEnergySupply } from "../../utils/setEnergySupply";
import { countExerciseTime } from "../../utils/countExerciseTime";
import { SelectComponent } from "./Select-componet";

export const energyOptions = [
  EnergySupply.CP,
  EnergySupply.CPLa,
  EnergySupply.LA,
  EnergySupply.O2,
  EnergySupply.Rest,
];

export const intensityOptions = [
  LoadIntensity.max,
  LoadIntensity.sub,
  LoadIntensity.high,
  LoadIntensity.low,
  LoadIntensity.min,
];

export const ExerciseParams = ({
  params,
  submit,
}: {
  submit: (data: IExerciseParams) => void;
  params?: IExerciseParams;
}) => {
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<IExerciseParams>({
    defaultValues: params
      ? { ...ExerciseParamsDefault, ...params }
      : ExerciseParamsDefault,
    mode: "all",
  });
  const [modeManual, setModeManual] = useState(
    params ? (params.modeManual ? params.modeManual : false) : false
  );
  const onSubmit: SubmitHandler<IExerciseParams> = (data) => {
    const myParams = { ...data, modeManual: modeManual };
    submit(myParams);
    setFormActive(false);
  };

  const { explanation, repetitions, work, rest, loadIntensity } = watch();
  const totalTime = countExerciseTime(explanation, repetitions, work, rest);

  const [formActive, setFormActive] = useState(false);

  const handleFocus = () => {
    setFormActive(true);
  };

  const handleBlur = () => {
    const fields = Object.keys(
      ExerciseParamsDefault
    ) as ExerciseParamsFormKeyArray[];
    fields.forEach((x) =>
      setValue(x, params ? params[x] : ExerciseParamsDefault[x])
    );
    setFormActive(false);
  };
  const refForm = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModeManual(event.target.checked);
  };

  // const selectRef = useRef(null);

  // useClickOutside(refForm, handleBlur, selectRef);
  useEffect(() => {
    if (!modeManual) {
      setValue("rest", setRest(work, loadIntensity));
      setValue("energySupply", setEnergySupply(work, loadIntensity));
    }
  }, [work, loadIntensity]);

  return (
    <ClickAwayListener onClickAway={handleBlur}>
      {/* <Box sx={{ maxWidth: "280px" }}> */}

      <form
        onFocus={handleFocus}
        onSubmit={handleSubmit(onSubmit)}
        ref={refForm}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              <FormControlLabel
                control={
                  <Switch checked={modeManual} onChange={handleChange} />
                }
                label={modeManual ? "Мануал" : "Авто"}
              />
              Total:{totalTime} min
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <SelectComponent
              label="Intensity"
              items={intensityOptions}
              callback={(value) => setValue("loadIntensity", value)}
              value={getValues("loadIntensity")}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectComponent
              label="Energy"
              manual={!modeManual}
              items={energyOptions}
              callback={(value) =>
                setValue("energySupply", value as EnergySupply)
              }
              value={getValues("energySupply")}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {ExerciseParamsArray.map((x) => (
                <Grid item xs={3} key={x.name}>
                  <InputNumberComponent
                    mode={modeManual}
                    x={x}
                    control={control}
                    errors={errors}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {formActive && (
            <Container disableGutters>
              <Button variant="contained" color="error" onClick={handleBlur}>
                Отмена
              </Button>
              <Button type="submit" variant="contained" color="success">
                Сохранить
              </Button>
            </Container>
          )}
        </Grid>
      </form>
      {/* </Box> */}
    </ClickAwayListener>
  );
};
