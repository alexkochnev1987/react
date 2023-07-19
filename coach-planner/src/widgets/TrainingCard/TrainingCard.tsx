import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { TrainingResponse } from '@/db/constants';
import { Button, Card, CardActionArea, Fab, Grid, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Chart } from '@/features/Chart/Chart';
import { countEnergySupplyTime } from '@/utils/countEnergySupplyTime';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { TrainingCardParams } from '../SetTrainingCard/TrainingCardParams';

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

interface TrainingCardProps {
  training: TrainingResponse;
}

export const TrainingCard: FC<TrainingCardProps> = ({ training }) => {
  const navigate = useNavigate();
  const [isEdited, setIsEdited] = useState(false);
  const navigateTo = () => {
    navigate(RoutePath.trainings + RoutePath.main + training.id);
  };

  return (
    <Card>
      <Grid container p={1} spacing={1}>
        <Grid item xs={8}>
          <TrainingCardParams training={training} color="primary" />
        </Grid>
        <Grid item xs={3}>
          <Chart params={countEnergySupplyTime(training.exercises)} />
        </Grid>
        <Grid item xs={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Fab color="primary" onClick={navigateTo}>
            <EditIcon />
          </Fab>
        </Grid>
      </Grid>
    </Card>
  );
};
