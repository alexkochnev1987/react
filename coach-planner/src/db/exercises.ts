import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase';
import { DbCollections, ExerciseResponse, UpdateExerciseBody } from './constants';
import { addDocFunction, deleteDocFunction, updateDocFunction } from './firestore';

export const exerciseCollection = collection(db, DbCollections.exercises);
export const getExerciseDocRef = (id: string) => doc(db, DbCollections.exercises, id);
export const getExercisesByCoachId = (coachId: string) => query(exerciseCollection, where('coachId', '==', coachId));

export const createExercise = async (coachId: string | undefined, coachImage?: string | null | undefined) => {
  if (!coachId) return;
  const image = coachImage || '';
  const result = await addDocFunction(exerciseCollection, { coachImage: image, coachId: coachId });
  return result;
};

export const getExercisesById = async (id: string) => {
  const docRef = doc(db, DbCollections.exercises, id);
  const response = await getDoc(docRef);

  return { id: response.id, ...response.data() } as ExerciseResponse;
};

export const updateExercise = (id: string, exercise: Partial<UpdateExerciseBody>) => {
  const docRef = doc(db, DbCollections.exercises, id);
  updateDocFunction(docRef, exercise);
};

export const deleteExercise = (id: string) => {
  const docRef = doc(db, DbCollections.exercises, id);
  deleteDocFunction(docRef);
};

export const uploadBlob = async (file: Blob, id: string) => {
  try {
    const fileRef = ref(storage, id);
    const result = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(result.ref);
    return url;
  } catch (error) {
    console.log(error);
  }
};
