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
} from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { DbCollections } from "./constants";
import { v4 as uuid } from "uuid";

export interface ExerciseResponse {
  id: string;
  like: string[];
  dislike: string[];
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
}
const date = Timestamp.fromDate(new Date());

export interface UpdateExerciseBody {
  img: string;
  name: string;
  description?: string;
  keyPoints?: string;
  tag?: string[];
  age?: string[];
  link?: string;
}

export const exerciseCollection = collection(db, DbCollections.exercises);

export const createExercise = async (coachId: string | undefined) => {
  if (!coachId) return;
  const response = await addDoc(exerciseCollection, {
    coachId: coachId,
    create: Timestamp.fromDate(new Date()),
  });
  return response.id;
};

export const getExercisesFromDb = async () => {
  const querySnapshot = await getDocs(collection(db, DbCollections.exercises));
  return querySnapshot;
};

export const getExercisesById = async (id: string) => {
  const docRef = doc(db, DbCollections.exercises, id);
  const querySnapshot = await getDoc(docRef);
  console.log(querySnapshot.data());
};

export const updateExercise = async (
  id: string,
  exercise: UpdateExerciseBody
) => {
  const docRef = doc(db, DbCollections.exercises, id);
  await updateDoc(docRef, {
    ...exercise,
    modify: serverTimestamp(),
  });
};

export const deleteExercise = async (id: string) => {
  const docRef = doc(db, DbCollections.exercises, id);
  await deleteDoc(docRef);
};

export const uploadImg = async (file: File, id: string) => {
  const fileRef = ref(storage, id);
  //   listAll(fileRef).then((x) =>
  //     x.items.forEach((x) => getDownloadURL(x).then(console.log))
  //   );
  const fileFromDb = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
};
