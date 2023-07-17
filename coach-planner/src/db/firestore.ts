import {
  CollectionReference,
  type DocumentData,
  DocumentReference,
  Timestamp,
  addDoc,
  deleteDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { DbCollections, UpdateExerciseBody } from './constants';
import { userId } from '@/firebase';
const getUserUiid = () => {
  const userUiid = localStorage.getItem(userId);

  return userUiid ? '/' + userUiid + '/' : '/';
};

export const initPath = `${DbCollections.users}${getUserUiid()}`;

export const addDocFunction = async (
  collection: CollectionReference<DocumentData>,
  args: { [key: string]: string | number },
) => {
  try {
    const result = await addDoc(collection, {
      ...args,
      create: Timestamp.fromDate(new Date()),
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const setDocFunction = async (
  collection: DocumentReference<DocumentData>,
  args: { [key: string]: string | number },
) => {
  try {
    const result = await setDoc(collection, {
      ...args,
      create: Timestamp.fromDate(new Date()),
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateDocFunction = async (
  docRef: DocumentReference<DocumentData>,
  args:
    | {
        [key: string]: string | number | string[];
      }
    | Partial<UpdateExerciseBody>,
) => {
  try {
    await updateDoc(docRef, {
      ...args,
      modify: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDocFunction = async (docRef: DocumentReference<DocumentData>) => {
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
};

export const getDocFunction = async (docRef: DocumentReference<DocumentData>) => {
  try {
    const result = await getDoc(docRef);
    return result;
  } catch (error) {
    console.error(error);
  }
};
