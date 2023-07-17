import { useCollection } from 'react-firebase-hooks/firestore';
import { NavLink } from 'react-router-dom';
import { CircularProgress, Link, MenuItem } from '@mui/material';
import { DialogCreateTraining } from '../components/training/Dialog-create-training';
import { RoutePath } from '@/app/providers/RouterProvider/lib/constants';
import { getTrainingsCollection } from '@/db/trainings';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/userSlice';
import { FirebaseError } from '@/components/Firebase-error';

const TrainingsPage = () => {
  const userUiid = useAppSelector(selectUser);
  const [trainings, loading, error] = useCollection(getTrainingsCollection(userUiid));
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <FirebaseError error={error} />;
  }

  return (
    <div>
      <DialogCreateTraining />
      {trainings &&
        trainings.docs.map((x) => (
          <MenuItem key={x.id}>
            <Link component={NavLink} to={RoutePath.trainings + RoutePath.main + x.id}>
              {(x.data() as { name: string }).name}
            </Link>
          </MenuItem>
        ))}
    </div>
  );
};

export default TrainingsPage;
