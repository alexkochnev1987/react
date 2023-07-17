import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';
import { type UserCredential } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useIsUserLogin = (user: UserCredential | undefined) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(setUser(user.user.uid));
      navigate('/');
    }
  }, [user, navigate]);
};
