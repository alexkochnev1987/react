import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage, userId } from '../firebase';
import { DbCollections } from './constants';
import { collection, doc, setDoc } from 'firebase/firestore';

export interface UserData {
  img: string;
  name: string;
  age: number;
  team: string;
  surName: string;
}

export const userCollection = collection(db, DbCollections.users);
export const plansCollection = collection(db, DbCollections.plans);
export const userDocRef = doc(userCollection, `${localStorage.getItem(userId)}`);
export const updateUser = async (data: Partial<UserData>) => {
  await setDoc(userDocRef, { ...data });
};

export const uploadImg = async (file: File) => {
  const link = `${localStorage.getItem(userId)}/myPhoto`;
  const fileRef = ref(storage, link);
  const result = await uploadBytes(fileRef, file);
  console.log(result);

  const url = await getDownloadURL(result.ref);
  return url;
};
