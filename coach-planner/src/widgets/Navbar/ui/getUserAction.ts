import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { createExercise } from '@/db/exercises';
import { createPlan } from '@/db/plans';
import { createTraining } from '@/db/trainings';
import { auth } from '@/firebase';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setImageNull } from '@/store/slices/draw-objects-slice';
import { selectUser } from '@/store/slices/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const getUserAction = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userUiid = useAppSelector(selectUser);

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
    const newExercise = await createExercise(userUiid);
    dispatch(setImageNull());
    if (newExercise) {
      navigate(`${RoutePath.exercise}/${newExercise?.id}`);
      handleCloseUserMenu();
    }
  };

  const createNewTraining = async () => {
    const trainingId = await createTraining(userUiid);
    if (trainingId) {
      navigate(`${RoutePath.trainings}/${trainingId}`);
      handleCloseUserMenu();
    }
  };

  const createNewPlan = async () => {
    const planId = await createPlan(userUiid, 'Enter Plan Name');
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
