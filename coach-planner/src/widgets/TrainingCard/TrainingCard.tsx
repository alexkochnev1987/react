import { RoutePath } from '@/app/providers/RouterProvider/lib/constants';
import { TrainingResponse } from '@/db/constants';
import { Button, Card, CardActionArea, Grid } from '@mui/material';
import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Chart } from '@/features/Chart/Chart';
import { countEnergySupplyTime } from '@/utils/countEnergySupplyTime';

import { TrainingCardParams } from '../SetTrainingCard/TrainingCardParams';

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

interface TrainingCardProps {
  training: TrainingResponse;
}

export const TrainingCard: FC<TrainingCardProps> = ({ training }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate(RoutePath.trainings + RoutePath.main + training.id)}>
        <Grid container p={1} spacing={1}>
          <Grid item xs={9}>
            <TrainingCardParams training={training} color="primary" />
          </Grid>
          <Grid item xs={3}>
            <Chart params={countEnergySupplyTime(training.exercises)} />
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
