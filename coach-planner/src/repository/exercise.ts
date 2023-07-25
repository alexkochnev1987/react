import { DbCollections, UpdateExerciseBody } from '@/db/constants';
import {
  addDoc,
  deleteDoc,
  deleteObject,
  getCollectionRef,
  getDoc,
  getDocRef,
  getDocs,
  getDownloadURL,
  getInitPath,
  getStorageRef,
  getUserUiid,
  serverTimestamp,
  updateDoc,
  uploadBytes,
} from '@/lib/firebase/firebase.lib';

export { deleteObject, getDownloadURL, uploadBytes } from 'firebase/storage';

const exercisePath = () => getInitPath() + DbCollections.exercises;
export const getExerciseCollection = () => getCollectionRef(exercisePath());

export const getExerciseDocRef = (id: string) => getDocRef(getExerciseCollection(), id);

export const addDocExercise = async (exercise: Partial<UpdateExerciseBody>) => {
  const result = await addDoc(getExerciseCollection(), {
    ...exercise,
    create: serverTimestamp(),
  });
  return result;
};

export const getDocExerciseById = async (id: string) => {
  const docRef = getExerciseDocRef(id);
  const response = await getDoc(docRef);
  return response;
};

export const getUserDocsExercises = async () => {
  const exerciseUserCollection = await getDocs(getExerciseCollection());
  return exerciseUserCollection;
};

export const updateDocExercise = async (
  id: string,
  exercise: Partial<UpdateExerciseBody>,
): Promise<void> => {
  const docRef = getExerciseDocRef(id);
  await updateDoc(docRef, { ...exercise, modify: serverTimestamp() });
};

export const deleteImage = async (id: string) => {
  const userUiid = getUserUiid();
  const link = `${userUiid}/${id}`;
  const fileRef = getStorageRef(link);
  await deleteObject(fileRef);
};

export const deleteExerciseAndImageDoc = async (id: string): Promise<void> => {
  const docRef = getExerciseDocRef(id);
  const img = deleteImage(id);
  const doc = deleteDoc(docRef);
  await Promise.all([doc, img]);
};

export const uploadExerciseBlob = async (file: Blob, id: string) => {
  const userUiid = getUserUiid();
  const link = `${userUiid}/${id}`;
  const fileRef = getStorageRef(link);
  const result = await uploadBytes(fileRef, file);
  const img = await getDownloadURL(result.ref);
  return { img, link };
};
