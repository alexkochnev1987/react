import { Box, Card, CardHeader, Fab, Grid, SwipeableDrawer, useTheme } from '@mui/material';
import { deleteTraining } from '../../db/trainings';
import { ExerciseParamsCard } from './Exercise-params-card';
import { countEnergySupplyTime } from '../../utils/countEnergySupplyTime';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { SubmitDialog } from '../dialogs/exercise-dialog/submit-dialog';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TrainingCardHeader } from './Training-card-header';
import { Chart } from './Chart';
import { TrainingResponse } from '../../db/constants';
import { RoutePath } from '@/app/providers/RouterProvider/lib/constants';
import { ExerciseTree } from '@/widgets/tree/Exercise-tree';

const deleteTrainingContent = {
  title: 'Вы хотите удалить тренироовку',
  message: 'Тренировка будет удалена безвозвратно',
  submit: 'Подтвердить',
  cancel: 'Отмена',
};

export const Training = ({ training }: { training: TrainingResponse }) => {
  const navigate = useNavigate();
  const { id, coachId, exercises, name } = training;
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  const deleteMyTraining = () => {
    deleteTraining(training.coachId, id);
    navigate(RoutePath.trainings);
  };
  const totalTime = Object.values(countEnergySupplyTime(exercises)).reduce((prev, curr) => prev + curr, 0);
  const theme = useTheme();
  return (
    <>
      <SwipeableDrawer anchor={'right'} open={openDrawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        {<ExerciseTree coachId={coachId} />}
      </SwipeableDrawer>
      <SubmitDialog
        content={deleteTrainingContent}
        open={openDialog}
        submit={deleteMyTraining}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
      <Card sx={{ overflow: 'visible' }}>
        <Grid
          container
          position={'sticky'}
          sx={{ top: 0, background: theme.palette.background.paper, zIndex: theme.zIndex.appBar }}
        >
          <Grid item xs={1} textAlign={'center'} margin={'auto'}>
            <Fab size="small" onClick={() => setOpenDialog(true)} color="error">
              <DeleteForeverIcon />
            </Fab>
          </Grid>
          <Grid item xs={5} textAlign={'center'} margin={'auto'}>
            <TrainingCardHeader name={name} time={totalTime} />
          </Grid>
          <Grid item xs={5}>
            <Chart params={countEnergySupplyTime(exercises)} />
          </Grid>
          <Grid item xs={1} textAlign={'center'} margin={'auto'}>
            <Fab onClick={toggleDrawer(true)} color="primary" size="small">
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        {exercises.map((x) => (
          <ExerciseParamsCard coachId={coachId} trainingId={id} key={x.uuid} exercise={x} />
        ))}
      </Card>
    </>
  );
};
