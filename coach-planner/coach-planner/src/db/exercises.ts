import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { DbCollections } from "./constants";
import { v4 as uuid } from "uuid";

export interface ExerciseResponse {
  id: string;
  like?: string[];
  dislike?: string[];
  coachId: string;
  name: string;
  img: string;
  description?: string;
  keyPoints?: string;
  tag?: string[];
  age?: string[];
  link?: string;
  create: string;
  modify?: string;
  coachImage?: string;
}

export interface UpdateExerciseBody {
  img: string;
  name: string;
  description?: string;
  keyPoints?: string;
  tag?: string[];
  age?: string[];
  link?: string;
  coachImage?: string;
}

export const exerciseCollection = collection(db, DbCollections.exercises);
export const getExerciseDocRef = (id: string) =>
  doc(db, DbCollections.exercises, id);
export const getExercisesByCoachId = (coachId: string) =>
  query(exerciseCollection, where("coachId", "==", coachId));

export const getExercisesFromDb = async () => {
  const querySnapshot = await getDocs(collection(db, DbCollections.exercises));
  return querySnapshot.docs.map(
    (x) => ({ id: x.id, ...x.data() } as ExerciseResponse)
  );
};

export const createExercise = async (
  coachId: string | undefined,
  coachImage: string | null | undefined
) => {
  if (!coachId) return;
  const image = coachImage || "";
  const response = await addDoc(exerciseCollection, {
    coachId: coachId,
    coachImage: image,
    create: Timestamp.fromDate(new Date()),
  });
  return response.id;
  // const exercise = await getExercisesById(response.id);
  // return exercise;
};

export const getExercisesById = async (id: string) => {
  const docRef = doc(db, DbCollections.exercises, id);
  const response = await getDoc(docRef);

  return { id: response.id, ...response.data() } as ExerciseResponse;
};

export const updateExercise = async (
  id: string,
  exercise: Partial<UpdateExerciseBody>
) => {
  const docRef = doc(db, DbCollections.exercises, id);
  await updateDoc(docRef, {
    ...exercise,
    modify: serverTimestamp(),
  });
  // const newExercise = await getExercisesById(id);
  // return newExercise;
};

export const deleteExercise = async (id: string) => {
  const docRef = doc(db, DbCollections.exercises, id);
  await deleteDoc(docRef);
};

export const uploadImg = async (file: File, id: string) => {
  const fileRef = ref(storage, id);
  const fileFromDb = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
};
