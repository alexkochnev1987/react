import { setUserDefaultData } from '@/components/forms/constants-set-user-form';
import { CustomUser, getUserDocRef, setUser, updateUser } from '@/db/user';
import { useUserUiid } from '@/shared/hooks/useUserUiid';
import { useDocument } from 'react-firebase-hooks/firestore';

export const useSetUserActions = () => {
  const userUiid = useUserUiid();
  const [value, loading, error] = useDocument(getUserDocRef(userUiid));
  const userData = value?.data();
  const setData = (userData: CustomUser | undefined) => {
    return userData ? (data: any) => updateUser(userUiid, data) : (data: any) => setUser(userUiid, data);
  };
  const setValues = (userData: CustomUser | undefined) => {
    if (userData) {
      const { name, surName, team, age } = userData;
      return { name, surName, team, age };
    }
    return setUserDefaultData;
  };

  return { userData, loading, error, setData, setValues, userUiid };
};
