import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage, userId } from '../firebase';
import { DbCollections, ExerciseResponse, UpdateExerciseBody } from './constants';
import { addDocFunction, deleteDocFunction, getInitPath, updateDocFunction } from './firestore';

const exercisePath = (userUiid: string) => getInitPath(userUiid) + DbCollections.exercises;
export const getExerciseCollection = (userUiid: string) => collection(db, exercisePath(userUiid));
export const getExerciseDocRef = (userUiid: string, id: string) => doc(getExerciseCollection(userUiid), id);

export const createExercise = async (coachId: string | undefined, coachImage?: string | null | undefined) => {
  if (!coachId) return;
  const image = coachImage || '';
  const result = await addDocFunction(getExerciseCollection(coachId), { coachImage: image, coachId: coachId });
  return result;
};

export const getExercisesById = async (userUiid: string, id: string) => {
  const docRef = getExerciseDocRef(userUiid, id);
  const response = await getDoc(docRef);

  return { id: response.id, ...response.data() } as ExerciseResponse;
};

export const updateExercise = (userUiid: string, id: string, exercise: Partial<UpdateExerciseBody>) => {
  const docRef = getExerciseDocRef(userUiid, id);
  updateDocFunction(docRef, exercise);
};

export const deleteExercise = (userUiid: string, id: string) => {
  const docRef = getExerciseDocRef(userUiid, id);
  deleteImage(userUiid, id);
  deleteDocFunction(docRef);
};

export const uploadBlob = async (userUiid: string, file: Blob, id: string) => {
  try {
    const link = `${userUiid}/${id}`;
    const fileRef = ref(storage, link);
    const result = await uploadBytes(fileRef, file);
    const img = await getDownloadURL(result.ref);
    return { img, link };
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (userUiid: string, id: string) => {
  const link = `${userUiid}/${id}`;
  const fileRef = ref(storage, link);
  try {
    await deleteObject(fileRef);
  } catch (error) {
    console.log(error);
  }
};
