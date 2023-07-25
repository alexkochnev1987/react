import { CalendarEvent } from 'kalend';
import { CALENDAR_EVENT_TYPE } from 'kalend/common/enums';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Box, Button, DialogActions, Grid, MenuItem, Select, TextField } from '@mui/material';
import { InputDate } from './Input-date';
import { SelectTraining } from './Select-training';
import { createEvent, updateEvent } from '../../../db/events';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getTrainingsCollection } from '@/db/trainings';
import { IExerciseParams } from '@/components/exercise-params/constants';

const colors: string[] = [
  'blue',
  'indigo',
  'orange',
  'red',
  'pink',
  'crimson',
  'dodgerblue',
  'brown',
  'purple',
  'tomato',
  'salmon',
  'gray',
];

export interface MyCalendarEvents extends CalendarEvent {
  training: string;
  params?: IExerciseParams;
}

const initialValue: MyCalendarEvents = {
  id: '',
  startAt: '',
  endAt: '',
  summary: '',
  training: '',
  color: colors[0],
  type: CALENDAR_EVENT_TYPE.EVENT,
};
interface EventFormProps {
  event: Partial<CalendarEvent>;
  submit: () => void;
  close: () => void;
  calendarId: string;
}

export const EventForm = ({ event, submit, close, calendarId }: EventFormProps) => {
  const [trainings] = useCollection(getTrainingsCollection());
  const defaultValues = { ...initialValue, ...event };
  const {
    handleSubmit,
    setValue,
    control,
    // formState: { errors },
  } = useForm<MyCalendarEvents>({
    defaultValues: defaultValues,
    mode: 'all',
  });

  const onSubmit: SubmitHandler<CalendarEvent> = (data) => {
    if (data.id) {
      updateEvent(calendarId, data);
      return submit();
    }
    createEvent(calendarId, data);
    submit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container p={1} spacing={1}>
        <Grid item xs={12}>
          {trainings && (
            <SelectTraining setValue={setValue} id={defaultValues.training} trainings={trainings} />
          )}
        </Grid>
        <Grid item xs={12}>
          <InputDate
            startAt={defaultValues.startAt}
            endAt={defaultValues.endAt}
            setValue={setValue}
          >
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <TextField select label="Color" {...field} sx={{ minWidth: '80px' }}>
                  {colors.map((color) => (
                    <MenuItem value={color} key={color}>
                      <Box width={`20px`} height={`20px`} bgcolor={color} borderRadius={'50%'} />
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </InputDate>
        </Grid>
      </Grid>
      <DialogActions>
        <Button type="submit" variant="contained">
          Save
        </Button>
        <Button type="button" variant="outlined" onClick={close}>
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
};
