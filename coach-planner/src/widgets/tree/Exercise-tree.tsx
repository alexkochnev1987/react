import { useCollection } from 'react-firebase-hooks/firestore';
import { splitExercisesByTag } from './splitExercisesByTags';
import { CircularProgress, List, Stack, Switch, Typography } from '@mui/material';
import { ExpandTag } from './Expand-tag';
import { useState } from 'react';
import { FirebaseError } from '../FirebaseError';
import { getExerciseCollection } from '@/repository/exercise';

export const ExerciseTree = () => {
  const [exercises, loading, error] = useCollection(getExerciseCollection());

  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked((state) => !state);
  };
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <FirebaseError message={error.message} />;
  }
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Sort by Age</Typography>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
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
