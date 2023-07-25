import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setImage } from '@/store/slices/draw-objects-slice';
import { exerciseState, fetchExercise, updateExerciseFunction } from '@/store/slices/exerciseSlice';
import {
  deleteUserExercise,
  fetchUserExercises,
  userExercisesState,
} from '@/store/slices/userExercisesSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
  return { dispatch, deleteUserExercise, updateExerciseFunction, setImage };
};
