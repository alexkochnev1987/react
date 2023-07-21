import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/userSlice';

export const useUserUiid = () => {
  const userUiid = useAppSelector(selectUser);
  return userUiid;
};
