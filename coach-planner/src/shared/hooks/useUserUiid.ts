import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/userExercisesSlice';

export const useUserUiid = () => {
  const userUiid = useAppSelector(selectUser);
  return userUiid;
};
