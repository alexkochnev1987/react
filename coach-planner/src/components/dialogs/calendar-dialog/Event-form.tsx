import { CalendarEvent } from 'kalend';
import { CALENDAR_EVENT_TYPE } from 'kalend/common/enums';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { SelectColor } from './SelectEventColor';
import { Button } from '@mui/material';

import { InputDate } from './Input-date';
import { SelectTraining } from './Select-training';
import { createEvent, updateEvent } from '../../../db/events';
import { useCollection } from 'react-firebase-hooks/firestore';
import { trainingsCollection } from '../../../db/trainings';

import { IExerciseParams } from '../../training/Training-params';

interface EventFormProps {
  event: Partial<CalendarEvent>;
  submit: () => void;
  close: () => void;
  id: string;
}

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

export const EventForm = ({ event, submit, close, id }: EventFormProps) => {
  const [trainings] = useCollection(trainingsCollection);
  const defaultValues = { ...initialValue, ...event };
  const {
    handleSubmit,
    setValue,
    // control,
    // formState: { errors },
  } = useForm<MyCalendarEvents>({
    defaultValues: defaultValues,
    mode: 'all',
  });

  const onSubmit: SubmitHandler<CalendarEvent> = (data) => {
    if (data.id) {
      updateEvent(id, data);
      return submit();
    }
    createEvent(id, data);
    submit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {trainings && <SelectTraining setValue={setValue} id={defaultValues.training} trainings={trainings} />}
      <InputDate startAt={defaultValues.startAt} endAt={defaultValues.endAt} setValue={setValue} />
      {/* <SelectColor control={control} colors={colors} /> */}
      <Button type="submit" variant="contained">
        Save
      </Button>
      <Button type="button" variant="outlined" onClick={close}>
        Cancel
      </Button>
    </form>
  );
};
