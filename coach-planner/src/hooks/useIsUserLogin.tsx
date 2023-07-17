import { userId } from '@/firebase';
import { type UserCredential } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useIsUserLogin = (user: UserCredential | undefined) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      localStorage.setItem(userId, user.user.uid);
      navigate('/');
    }
  }, [user, navigate]);
};
