import { useCollection } from 'react-firebase-hooks/firestore';
import { splitExercisesByTag } from './splitExercisesByTags';
import { CircularProgress, List, Stack, Switch, Typography } from '@mui/material';
import { ExpandTag } from './Expand-tag';
import { useState } from 'react';
import { getExerciseCollection } from '@/db/exercises';
import { FirebaseError } from '../FirebaseError';

export const ExerciseTree = ({ coachId }: { coachId: string }) => {
  const [exercises, loading, error] = useCollection(getExerciseCollection(coachId));

  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked((state) => !state);
  };
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <FirebaseError error={error} />;
  }
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Sort by Age</Typography>
        <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
        <Typography>Sort by tag</Typography>
      </Stack>
      <List sx={{ width: 250, bgcolor: 'background.paper' }}>
        {exercises &&
          Object.entries(splitExercisesByTag(exercises, checked))
            .filter((x) => (x ? true : false))
            .map(([key, value]) => {
              return <ExpandTag tag={key} exercises={value} key={key} />;
            })}
      </List>
    </>
  );
};
