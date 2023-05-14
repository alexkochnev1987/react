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
      <Box sx={{ maxWidth: "280px" }}>
        <FormControlLabel
          control={<Switch checked={modeManual} onChange={handleChange} />}
          label={modeManual ? "Мануал" : "Авто"}
        />

        <form
          onFocus={handleFocus}
          onSubmit={handleSubmit(onSubmit)}
          ref={refForm}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <RadioIntensity
                mode={true}
                x={radioParams}
                control={control}
                errors={errors}
                options={selectOptions}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2} p={1}>
                {ExerciseParamsArray.map((x) => (
                  <Grid item xs={12} key={x.name}>
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
            <Grid item xs={12}>
              <RadioIntensity
                mode={modeManual}
                options={energySupplyOptions}
                x={energySupplyParams}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Время упражнения :{totalTime} мин
              </Typography>
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
      </Box>
    </ClickAwayListener>
  );
};
