import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { trainingsCollection } from '../db/trainings';
import { NavLink } from 'react-router-dom';
import { Link, MenuItem } from '@mui/material';
import { DialogCreateTraining } from '../components/training/Dialog-create-training';
import { RoutePath } from '@/app/providers/RouterProvider/lib/constants';

const TrainingsPage = () => {
  const [trainings] = useCollection(trainingsCollection);

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
