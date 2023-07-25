import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { createExercise } from '@/service/exercise.service';
import { createPlan } from '@/db/plans';
import { createTraining } from '@/db/trainings';
import { auth } from '@/lib/firebase/firebase.lib';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setImageNull } from '@/store/slices/draw-objects-slice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const getUserAction = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signOut = () => {
    auth.signOut();
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const createNewExercise = async () => {
    const newExercise = await createExercise();
    dispatch(setImageNull());
    if (newExercise) {
      navigate(`${RoutePath.exercise}/${newExercise?.id}`);
      handleCloseUserMenu();
    }
  };

  const createNewTraining = async () => {
    const trainingId = await createTraining();
    if (trainingId) {
      navigate(`${RoutePath.trainings}/${trainingId}`);
      handleCloseUserMenu();
    }
  };

  const createNewPlan = async () => {
    const planId = await createPlan('Enter Plan Name');
    if (planId) {
      navigate(`${RoutePath.plan}/${planId.id}`);
      handleCloseUserMenu();
    }
  };

  const goToProfile = () => {
    navigate(RoutePath.user);
    handleCloseUserMenu();
  };

  return {
    handleCloseUserMenu,
    handleOpenUserMenu,
    anchorElUser,
    createNewPlan,
    createNewTraining,
    createNewExercise,
    signOut,
    goToProfile,
  };
};
