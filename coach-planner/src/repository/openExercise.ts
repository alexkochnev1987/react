import { DbCollections } from '@/db/constants';
import {
  addDoc,
  deleteDoc,
  getCollectionRef,
  getDoc,
  getDocRef,
  getDocs,
  query,
  where,
} from '@/lib/firebase/firebase.lib';
import { ExerciseForPage } from '@/service/parseExerciseResponse';

export const getOpenExerciseCollection = () => getCollectionRef(DbCollections.openExercise);

export const getOpenExerciseDocRef = (id: string) => getDocRef(getOpenExerciseCollection(), id);

export const addDocOpenExercise = async (exercise: ExerciseForPage) => {
  const result = await addDoc(getOpenExerciseCollection(), exercise);
  return result;
};

export const deleteDocOpenExercise = async (id: string): Promise<void> => {
  const q = query(getOpenExerciseCollection(), where('id', '==', id));
  const docRef = await getDocs(q);
  const exerciseId = docRef.docs[0].id;
  await deleteDoc(getDocRef(getOpenExerciseCollection(), exerciseId));
};
