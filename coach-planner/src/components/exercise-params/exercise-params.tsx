import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  IExerciseParams,
  ExerciseParamsArray,
  ExerciseParamsDefault,
  ExerciseParamsFormKeyArray,
  EnergySupply,
  LoadIntensity,
} from './constants';
import { InputNumberComponent } from './Input-number';
import {
  Box,
  Button,
  ClickAwayListener,
  Container,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from '@mui/material';
import { setEnergySupply } from '../../utils/setEnergySupply';
import { countExerciseTime } from '../../utils/countExerciseTime';
import { SelectComponent } from './Select-componet';
import { setRest } from '../../utils/setRest';
import { EditContentButtons } from '@/entities/EditContentButtons';
import { DescriptionField } from '@/shared/ui/DescriptionField';

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
    formState: { errors },
  } = useForm<IExerciseParams>({
    defaultValues: params ? { ...ExerciseParamsDefault, ...params } : ExerciseParamsDefault,
    mode: 'all',
  });
  const [modeManual, setModeManual] = useState(
    params ? (params.modeManual ? params.modeManual : false) : false,
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
    const fields = Object.keys(ExerciseParamsDefault) as ExerciseParamsFormKeyArray[];
    fields.forEach((x) => setValue(x, params ? params[x] : ExerciseParamsDefault[x]));
    setFormActive(false);
  };
  const refForm = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModeManual(event.target.checked);
  };

  useEffect(() => {
    if (!modeManual) {
      setValue('rest', setRest(work, loadIntensity));
      setValue('energySupply', setEnergySupply(work, loadIntensity));
    }
  }, [work, loadIntensity, modeManual, setValue]);

  return (
    <ClickAwayListener onClickAway={handleBlur}>
      <form onFocus={handleFocus} onSubmit={handleSubmit(onSubmit)} ref={refForm}>
        <Grid container alignItems={'center'} pb={1}>
          <Grid item xs={4}>
            <FormControlLabel
              labelPlacement="top"
              control={<Switch checked={modeManual} onChange={handleChange} size="small" />}
              label={modeManual ? 'Manual' : 'Auto'}
            />
          </Grid>
          <Grid item xs>
            <DescriptionField label={'Total'}>{totalTime} min</DescriptionField>
          </Grid>
        </Grid>
        <Box display={'flex'} flexWrap={'wrap'} gap={1}>
          <SelectComponent
            label="Intensity"
            items={intensityOptions}
            callback={(value) => setValue('loadIntensity', value)}
            value={getValues('loadIntensity')}
          />
          <SelectComponent
            label="Energy"
            manual={!modeManual}
            items={energyOptions}
            callback={(value) => setValue('energySupply', value as EnergySupply)}
            value={getValues('energySupply')}
          />
          {ExerciseParamsArray.map((x) => (
            <InputNumberComponent
              key={x.name}
              mode={modeManual}
              x={x}
              control={control}
              errors={errors}
            />
          ))}
          <Box display={'flex'} gap={1} width={'100%'} flexWrap={'wrap'}>
            <Button
              variant="contained"
              color="error"
              onClick={handleBlur}
              disabled={!formActive}
              sx={{ width: '110px' }}
            >
              Cancel
            </Button>
            <Button
              sx={{ width: '110px' }}
              type="submit"
              variant="contained"
              color="success"
              disabled={!formActive}
            >
              Save
            </Button>
          </Box>
        </Box>
      </form>
    </ClickAwayListener>
  );
};
