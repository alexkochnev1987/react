import { Card, Fab, Grid, SwipeableDrawer, useTheme } from '@mui/material';
import { deleteTraining } from '../../db/trainings';
import { ExerciseParamsCard } from '../SetTrainingCard/Exercise-params-card';
import { countEnergySupplyTime } from '../../utils/countEnergySupplyTime';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { SubmitDialog } from '../../components/dialogs/exercise-dialog/submit-dialog';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Chart } from '../../features/Chart/Chart';
import { TrainingResponse } from '../../db/constants';
import { RoutePath } from '@/app/providers/RouterProvider/lib/constants';
import { ExerciseTree } from '@/widgets/Tree/Exercise-tree';
import { TrainingCardParams } from '../SetTrainingCard/TrainingCardParams';

const deleteTrainingContent = {
  title: 'Вы хотите удалить тренироовку',
  message: 'Тренировка будет удалена безвозвратно',
  submit: 'Подтвердить',
  cancel: 'Отмена',
};

export const EditTraining = ({ training }: { training: TrainingResponse }) => {
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
      <Card sx={{ overflow: 'visible', position: 'relative' }}>
        <Grid
          container
          position={'sticky'}
          padding={1}
          spacing={1}
          m={0}
          sx={{
            width: '100%',
            top: 0,
            background: theme.palette.background.paper,
            zIndex: theme.zIndex.appBar,
            boxSizing: 'border-box',
          }}
        >
          <Grid item textAlign={'center'} margin={'auto'}>
            <Fab size="small" onClick={() => setOpenDialog(true)} color="error">
              <DeleteForeverIcon />
            </Fab>
          </Grid>
          <Grid item xs={7}>
            <TrainingCardParams training={training} color="primary" />
          </Grid>
          <Grid item xs={3}>
            <Chart params={countEnergySupplyTime(exercises)} />
          </Grid>
          <Grid item xs={0.5} textAlign={'center'} margin={'auto'}>
            <Fab onClick={toggleDrawer(true)} color="primary" size="small">
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        {exercises &&
          exercises.map((x) => <ExerciseParamsCard coachId={coachId} trainingId={id} key={x.uuid} exercise={x} />)}
      </Card>
    </>
  );
};
