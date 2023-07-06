import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage, userId } from '../firebase';
import { DbCollections, ExerciseResponse, UpdateExerciseBody } from './constants';
import { addDocFunction, deleteDocFunction, updateDocFunction } from './firestore';

const exercisePath = `${DbCollections.users}/${localStorage.getItem(userId)}/${DbCollections.exercises}`;

export const exerciseCollection = collection(db, exercisePath);
export const getExerciseDocRef = (id: string) => doc(exerciseCollection, id);
export const getExercisesByCoachId = (coachId: string) => query(exerciseCollection, where('coachId', '==', coachId));

export const createExercise = async (coachId: string | undefined, coachImage?: string | null | undefined) => {
  if (!coachId) return;
  const image = coachImage || '';
  const result = await addDocFunction(exerciseCollection, { coachImage: image, coachId: coachId });
  return result;
};

export const getExercisesById = async (id: string) => {
  const docRef = getExerciseDocRef(id);
  const response = await getDoc(docRef);

  return { id: response.id, ...response.data() } as ExerciseResponse;
};

export const updateExercise = (id: string, exercise: Partial<UpdateExerciseBody>) => {
  const docRef = doc(exerciseCollection, id);
  updateDocFunction(docRef, exercise);
};

export const deleteExercise = (id: string) => {
  const docRef = getExerciseDocRef(id);
  deleteImage(id);
  deleteDocFunction(docRef);
};

export const uploadBlob = async (file: Blob, id: string) => {
  try {
    const link = `${localStorage.getItem(userId)}/${id}`;
    const fileRef = ref(storage, link);
    const result = await uploadBytes(fileRef, file);
    const img = await getDownloadURL(result.ref);
    return { img, link };
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (id: string) => {
  const link = `${localStorage.getItem(userId)}/${id}`;
  const fileRef = ref(storage, link);
  try {
    await deleteObject(fileRef);
  } catch (error) {
    console.log(error);
  }
};
