import { useDocument } from 'react-firebase-hooks/firestore';
import { Training } from '../components/training/Training';
import { useParams } from 'react-router-dom';
import { getTrainingRef } from '../db/trainings';
import { Stack } from '@mui/material';
import { TrainingResponse } from '../db/constants';

export const TrainingPage = () => {
  const { id } = useParams();
  const [value] = useDocument(getTrainingRef(id));

  return (
    <>
      <Stack spacing={1}>
        {value && <Training training={{ id: value.id, ...value.data() } as TrainingResponse} />}
      </Stack>
    </>
  );
};
