import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { ExerciseResponse } from '@/db/constants';
import { AllDrawType } from '@/features/DrawExercise/lib/helpers';
import { Timestamp } from '@/lib/firebase/firebase.lib';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  exerciseState,
  fetchExercise,
  loadingExerciseState,
  updateExerciseFunction,
} from '@/store/slices/exerciseSlice';
import {
  deleteUserExercise,
  fetchUserExercises,
  userExercisesState,
} from '@/store/slices/userExercisesSlice';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addExerciseInOpenFolder, deleteExerciseFromOpenFolder } from './openExercise.service';
import { ExerciseForPage } from './parseExerciseResponse';

export const getUserExercisesFromStore = () => useAppSelector(userExercisesState);
export const getExerciseFromStore = () => useAppSelector(exerciseState);

export const loadExercisesFromServer = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserExercises());
  }, [dispatch]);
};

export const loadExerciseFromServer = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(fetchExercise(id));
  }, [dispatch]);
};

export const useExerciseStore = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteExercise = () => {
    if (id) {
      dispatch(deleteUserExercise(id));
      navigate(RoutePath.exercise);
    }
  };
  const updateExercise = (
    content: string | AllDrawType | string[] | undefined | Timestamp,
    fieldName: keyof ExerciseResponse,
  ) => {
    if (id)
      dispatch(
        updateExerciseFunction({
          id: id,
          exercise: { [fieldName]: content },
        }),
      );
  };

  return { deleteExercise, updateExercise };
};

export const useDeleteExercise = (id: string) => {
  const loading = useAppSelector(loadingExerciseState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deleteExercise = () => {
    dispatch(deleteUserExercise(id));
    navigate(RoutePath.exercise);
  };

  const openExercise = async (exercise: ExerciseForPage) => {
    await addExerciseInOpenFolder(exercise);
    dispatch(
      updateExerciseFunction({
        id: id,
        exercise: { open: true },
      }),
    );
  };

  const hideExercise = async (id: string) => {
    await deleteExerciseFromOpenFolder(id);
    dispatch(
      updateExerciseFunction({
        id: id,
        exercise: { open: false },
      }),
    );
  };
  return { loading, deleteExercise, openExercise, hideExercise };
};
