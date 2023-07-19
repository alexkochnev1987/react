import { Box, Grid, TextField } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { MyCalendarEvents } from './Event-form';

import { FC } from 'react';

interface InputDateProps {
  startAt: string;
  endAt?: string;
  setValue: UseFormSetValue<MyCalendarEvents>;
  children?: ReactNode;
}

export const InputDate: FC<InputDateProps> = ({ startAt, endAt, setValue, children }) => {
  const [date, setDate] = useState(new Date(startAt).toISOString().slice(0, 10));
  const [time, setTime] = useState(new Date(startAt).toLocaleTimeString());
  const setDurationFirsTime = () => {
    return endAt ? (new Date(endAt).getTime() - new Date(startAt).getTime()) / 60000 : 60;
  };
  const [duration, setDuration] = useState(setDurationFirsTime());

  const setEndDateTime = (date: string, time: string, duration: number) => {
    const millisecond = 1000;
    const secondInMinute = 60;
    const selectedDate = new Date(date);
    const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10));
    selectedDate.setHours(hours, minutes, 0, 0);
    return new Date(new Date(selectedDate).getTime() + duration * millisecond * secondInMinute).toISOString();
  };

  const setStartTime = (date: string, time: string) => {
    const selectedDate = new Date(date);
    const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10));
    selectedDate.setHours(hours, minutes, 0, 0);
    return selectedDate.toISOString();
  };

  const onChangeDate = (date: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDate(date.target.value);
    setValue('startAt', setStartTime(date.target.value, time));
    setValue('endAt', setEndDateTime(date.target.value, time, duration));
  };

  const onChangeTime = (time: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTime(time.target.value);
    setValue('startAt', setStartTime(date, time.target.value));
    setValue('endAt', setEndDateTime(date, time.target.value, duration));
  };

  const onChangeDuration = (duration: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDuration(Number(duration.target.value));
    setValue('endAt', setEndDateTime(date, time, Number(duration.target.value)));
  };

  return (
    <Box sx={{ display: 'flex' }} gap={1}>
      <TextField type="date" label="Date" value={date} onChange={onChangeDate} sx={{ minWidth: '140px' }} />
      <TextField sx={{ minWidth: '120px' }} type="time" label="Start time" value={time} onChange={onChangeTime} />
      <TextField
        sx={{ minWidth: '80px' }}
        type="number"
        value={duration}
        label="Duration"
        inputProps={{ min: 0, max: 240, step: 5 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onChangeDuration}
      />
      {children}
    </Box>
  );
};
