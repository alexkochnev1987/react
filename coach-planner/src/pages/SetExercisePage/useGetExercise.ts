import { useAppDispatch } from '@/store/hooks';
import { fetchExercise } from '@/store/slices/exerciseSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const useGetExercise = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(fetchExercise(id));
  }, []);
};
