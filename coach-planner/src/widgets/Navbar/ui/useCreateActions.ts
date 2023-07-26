import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { createPlan } from '@/db/plans';
import { createTraining } from '@/db/trainings';
import { createExercise } from '@/service/exercise.service';
import { useAppDispatch } from '@/store/hooks';
import { setImageNull } from '@/store/slices/draw-objects-slice';
import { useNavigate } from 'react-router-dom';

export const useCreateActions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const createNewExercise = async () => {
    const newExercise = await createExercise();
    dispatch(setImageNull());
    if (newExercise) {
      navigate(`${RoutePath.exercise}/${newExercise?.id}`);
    }
  };

  const createNewTraining = async () => {
    const trainingId = await createTraining();
    if (trainingId) {
      navigate(`${RoutePath.trainings}/${trainingId}`);
    }
  };

  const createNewPlan = async () => {
    const planId = await createPlan('Enter Plan Name');
    if (planId) {
      navigate(`${RoutePath.plan}/${planId.id}`);
    }
  };

  return { createNewExercise, createNewTraining, createNewPlan };
};
