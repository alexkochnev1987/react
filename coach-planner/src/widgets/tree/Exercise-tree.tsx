import { useCollection } from 'react-firebase-hooks/firestore';
import { splitExercisesByTag } from './splitExercisesByTags';
import {
  CircularProgress,
  IconButton,
  List,
  Stack,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FirebaseError } from '../FirebaseError';
import { getExerciseCollection } from '@/repository/exercise';
import SortRadioButtons from './SortRadioButtons';
import { useParams } from 'react-router-dom';
import { ReactComponent as SortUp } from '@/shared/assets/icons/sort-up.svg';
import { ReactComponent as SortDown } from '@/shared/assets/icons/sort-down.svg';

export const ExerciseTree = () => {
  const ascLabel = 'Ascending';
  const descLabel = 'Descending';
  const { id } = useParams();
  const theme = useTheme();
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
          <IconButton onClick={handleOrder} sx={{ position: 'absolute', top: 0, right: 20 }}>
            {ascending ? (
              <SortDown fill={theme.palette.primary.main} />
            ) : (
              <SortUp fill={theme.palette.primary.main} />
            )}
          </IconButton>
          {/* <Typography>{ascLabel}</Typography> */}
          {/* <Switch
            checked={ascending}
            onChange={handleOrder}
            inputProps={{ 'aria-label': 'controlled' }}
          /> */}
          {/* <Typography>{descLabel}</Typography> */}
        </Stack>
        <List sx={{ width: 250, bgcolor: 'background.paper' }}>
          {exercises && splitExercisesByTag(exercises, id, filterBy, ascending)}
        </List>
      </Stack>
    </>
  );
};
