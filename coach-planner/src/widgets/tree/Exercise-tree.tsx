import { useCollection } from 'react-firebase-hooks/firestore';
import { splitExercisesByTag } from './splitExercisesByTags';
import { CircularProgress, List, Stack, Switch, Typography } from '@mui/material';
import { ExpandTag } from './Expand-tag';
import { ChangeEvent, useState } from 'react';
import { FirebaseError } from '../FirebaseError';
import { getExerciseCollection } from '@/repository/exercise';
import SortRadioButtons from './SortRadioButtons';
import { useParams } from 'react-router-dom';

export const ExerciseTree = () => {
  const ascLabel = 'Ascending';
  const descLabel = 'Descending';
  const { id } = useParams();
  const [exercises, loading, error] = useCollection(getExerciseCollection());

  const [filterBy, setFilterBy] = useState('name');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterBy(event.target.value);
  };

  const [ascending, setAscending] = useState(true);

  const handleOrder = () => {
    setAscending((state) => !state);
  };
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <FirebaseError message={error.message} />;
  }
  return (
    <>
      <Stack spacing={1} alignItems="center" p={1}>
        <SortRadioButtons value={filterBy} handleChange={handleChange} />
        <Stack direction="row" alignItems={'center'}>
          <Typography>{ascLabel}</Typography>
          <Switch
            checked={ascending}
            onChange={handleOrder}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography>{descLabel}</Typography>
        </Stack>
        <List sx={{ width: 250, bgcolor: 'background.paper' }}>
          {exercises && splitExercisesByTag(exercises, id, filterBy, ascending)}
        </List>
      </Stack>
    </>
  );
};
