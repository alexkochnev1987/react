import { useAppDispatch } from '@/store/hooks';
import { fetchUserExercises } from '@/store/slices/userExercisesSlice';
import { useEffect } from 'react';

// export const useGetExercises = () => {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(fetchUserExercises());
//   }, []);
// };
