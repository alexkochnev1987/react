import { CalendarEvent } from "kalend";
import { CALENDAR_EVENT_TYPE } from "kalend/common/enums";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SelectColor } from "./SelectEventColor";
import { Button, TextField } from "@mui/material";

import { InputDate } from "./Input-date";
import { SelectTraining } from "./Select-training";
import { createEvent, updateEvent } from "../../../db/events";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { trainingsCollection } from "../../../db/trainings";

interface EventFormProps {
  event: Partial<CalendarEvent>;
  submit: () => void;
  close: () => void;
  id: string;
}

// export interface CalendarEvent {
//   id: any;
//   startAt: string;
//   endAt: string;
//   timezoneStartAt?: string;
//   timezoneEndAt?: string;
//   summary: string;
//   color: string;
//   type?: CALENDAR_EVENT_TYPE;
//   internalID?: string;
//   [key: string]: any;
// }

const colors: string[] = [
  "blue",
  "indigo",
  "orange",
  "red",
  "pink",
  "crimson",
  "dodgerblue",
  "brown",
  "purple",
  "tomato",
  "salmon",
  "gray",
];

export interface MyCalendarEvents extends CalendarEvent {
  training: string;
}

const initialValue: MyCalendarEvents = {
  id: "",
  startAt: "",
  endAt: "",
  summary: "",
  training: "",
  color: colors[0],
  type: CALENDAR_EVENT_TYPE.EVENT,
};

export const EventForm = ({ event, submit, close, id }: EventFormProps) => {
  const [trainings, loading, error] = useCollection(trainingsCollection);
  const defaultValues = { ...initialValue, ...event };
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<MyCalendarEvents>({
    defaultValues: defaultValues,
    mode: "all",
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
      <InputDate
        startAt={defaultValues.startAt}
        endAt={defaultValues.endAt}
        setValue={setValue}
      />
      <SelectColor control={control} colors={colors} />
      {trainings && (
        <SelectTraining
          setValue={setValue}
          id={defaultValues.training}
          trainings={trainings}
        />
      )}
      <Button type="submit" variant="contained">
        Save
      </Button>
      <Button type="button" variant="outlined" onClick={close}>
        Cancel
      </Button>
    </form>
  );
};
