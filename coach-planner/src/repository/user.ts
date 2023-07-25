import { DbCollections } from '@/db/constants';
import { CustomUser, UserData, userConverter } from '@/service/user.service';
import {
  getCollectionRef,
  getDocRef,
  getDownloadURL,
  getStorageRef,
  getUserData,
  getUserUiid,
  setDoc,
  updateDoc,
  uploadBytes,
} from '@/lib/firebase/firebase.lib';

const getUserEmail = () => getUserData()?.email;

export const getUserCollection = () =>
  getCollectionRef(DbCollections.users).withConverter(userConverter);
export const getUserDocRef = () =>
  getDocRef(getUserCollection(), getUserUiid()).withConverter(userConverter);
export const setUser = (data: Partial<CustomUser>) => {
  setDoc(getUserDocRef(), data);
};

export const updateUser = async (data: Partial<UserData>) => {
  await updateDoc(getUserDocRef(), data);
};

export const uploadUserImg = async (file: File) => {
  const userUiid = getUserUiid();
  const link = `${userUiid}//myPhoto`;
  const fileRef = getStorageRef(link);
  const result = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(result.ref);
  return url;
};

export const UserRepo = {
  getUserEmail,
  uploadUserImg,
  updateUser,
};
