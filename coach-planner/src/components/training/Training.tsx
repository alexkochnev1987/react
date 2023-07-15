import { Card, CardHeader, Fab, SwipeableDrawer } from '@mui/material';
import { deleteTraining } from '../../db/trainings';
import { ExerciseParamsCard } from './Exercise-params-card';
import { countEnergySupplyTime } from '../../utils/countEnergySupplyTime';

import { ExerciseTree } from '../tree/Exercise-tree';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { SubmitDialog } from '../dialogs/exercise-dialog/submit-dialog';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TrainingCardHeader } from './Training-card-header';
import { Chart } from './Chart';
import { TrainingResponse } from '../../db/constants';
import { RoutePath } from '@/app/providers/RouterProvider/lib/constants';

const deleteTrainingContent = {
  title: 'Вы хотите удалить тренироовку',
  message: 'Тренировка будет удалена безвозвратно',
  submit: 'Подтвердить',
  cancel: 'Отмена',
};

export const Training = ({ training }: { training?: TrainingResponse }) => {
  const navigate = useNavigate();
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
  if (!training) {
    return null;
  }
  const { id, coachId, exercises, name } = training;

  const deleteMyTraining = () => {
    deleteTraining(id);
    navigate(RoutePath.trainings);
  };
  const totalTime = Object.values(countEnergySupplyTime(exercises)).reduce((prev, curr) => prev + curr, 0);

  return (
    <>
      <Chart params={countEnergySupplyTime(exercises)} />
      <SubmitDialog
        content={deleteTrainingContent}
        open={openDialog}
        submit={deleteMyTraining}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
      <Card sx={{ overflow: 'visible' }}>
        <SwipeableDrawer anchor={'right'} open={openDrawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
          {<ExerciseTree coachId={coachId} />}
        </SwipeableDrawer>
        <CardHeader
          style={{
            position: 'sticky',
            top: '100px',
            background: 'white',
            zIndex: 1051,
          }}
          avatar={
            <Fab size="small" onClick={() => setOpenDialog(true)} color="error">
              <DeleteForeverIcon />
            </Fab>
          }
          title={<TrainingCardHeader name={name} time={totalTime} />}
          action={
            <Fab onClick={toggleDrawer(true)} color="primary" size="small">
              <AddIcon />
            </Fab>
          }
        />
        {exercises && exercises.map((x) => <ExerciseParamsCard trainingId={id} key={x.uuid} exercise={x} />)}
      </Card>
    </>
  );
};
