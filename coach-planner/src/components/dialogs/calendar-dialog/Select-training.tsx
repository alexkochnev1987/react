import React, { useState } from 'react';

import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { UseFormSetValue } from 'react-hook-form';
import { MyCalendarEvents } from './Event-form';
import { type DocumentData, QuerySnapshot } from 'firebase/firestore';
import { LoadTrainingParams } from './Load-training-params';

export const SelectTraining = ({
  setValue,
  id,
  trainings,
}: {
  id: string | undefined;
  setValue: UseFormSetValue<MyCalendarEvents>;
  trainings: QuerySnapshot<DocumentData>;
}) => {
  const selectTrainingName = (id: string | undefined) => {
    const myTraining = trainings?.docs.find((x) => x.id === id)?.data() as {
      name?: string;
    };

    return myTraining?.name ? myTraining.name : '';
  };

  const [trainingId, setTrainingId] = useState(id);
  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      {trainingId && <LoadTrainingParams id={trainingId} />}
      <FormControl fullWidth>
        <InputLabel>Select training</InputLabel>
        <Select
          label={'Select training'}
          value={trainingId}
          onChange={(date) => {
            setTrainingId(date.target.value);

            setValue('summary', selectTrainingName(date.target.value));
            setValue('training', date.target.value);
          }}
        >
          {trainings &&
            trainings.docs.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {(x.data() as { name: string }).name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};
