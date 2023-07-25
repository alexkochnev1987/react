import { setUserDefaultData } from '@/components/forms/constants-set-user-form';
import { CustomUser } from '@/service/user.service';
import { getUserDocRef, setUser, updateUser } from '@/repository/user';
import { useDocument } from 'react-firebase-hooks/firestore';

export const useSetUserActions = () => {
  const [value, loading, error] = useDocument(getUserDocRef());
  const userData = value?.data();
  const setData = (userData: CustomUser | undefined) => {
    return userData ? (data: any) => updateUser(data) : (data: any) => setUser(data);
  };
  const setValues = (userData: CustomUser | undefined) => {
    if (userData) {
      const { name, surName, team, age, birthDay } = userData;
      const dayBirth = birthDay ? birthDay.toDate() : setUserDefaultData.birthDay;
      return { name, surName, team, age, birthDay: dayBirth };
    }
    return setUserDefaultData;
  };

  return { userData, loading, error, setData, setValues };
};
