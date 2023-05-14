import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  ExerciseParamsDefault,
  IExerciseParams,
} from "../components/exercise-params/constants";
import { ExerciseResponse } from "./exercises";
import { db } from "../firebase";
import { DbCollections } from "./constants";
import { v4 as uuidv4 } from "uuid";
import { executeReducerBuilderCallback } from "@reduxjs/toolkit/dist/mapBuilders";

export interface TrainingExerciseData {
  exercise: ExerciseResponse;
  params: IExerciseParams;
  uuid: string;
}

export interface TrainingResponse {
  id: string;
  like?: string[];
  dislike?: string[];
  coachId: string;
  name?: string;
  description?: string;
  comments?: string;
  tag?: string[];
  age?: string[];
  link?: string;
  create: string;
  modify?: string;
  coachImage?: string;
  exercises: TrainingExerciseData[];
}

export interface CreateTrainingRequest {
  coachId: string;
  coachImage?: string;
}

export const trainingsCollection = collection(db, DbCollections.trainings);
export const getTrainingRef = (id: string | undefined) => {
  if (!id) throw Error("Exercise ID is undefined");
  return doc(trainingsCollection, id);
};

export const getTrainingById = async (id: string) => {
  const docRef = getTrainingRef(id);
  const training = await getDoc(docRef);
  return { id: training.id, ...training.data() } as TrainingResponse;
};

export const createTraining = async ({
  coachId,
  coachImage = undefined,
}: CreateTrainingRequest) => {
  if (!coachId) return;
  await addDoc(trainingsCollection, {
    coachId: coachId,
    coachImage,
    create: Timestamp.fromDate(new Date()),
  });
};

export const updateTraining = async (
  id: string,
  training: Partial<TrainingResponse>
) => {
  const docRef = getTrainingRef(id);

  const newTraining = {
    ...training,
    modify: serverTimestamp(),
  };

  await updateDoc(docRef, newTraining);
};

export const addExerciseInTraining = async (
  exercise: ExerciseResponse,
  id: string
) => {
  const { exercises } = await getTrainingById(id);

  const newArray = Array.isArray(exercises)
    ? [
        ...exercises,
        { exercise, params: ExerciseParamsDefault, uuid: uuidv4() },
      ]
    : [{ exercise, params: ExerciseParamsDefault, uuid: uuidv4() }];
  updateTraining(id, { exercises: newArray });
};

export const updateExerciseInTraining = async (
  exercise: TrainingExerciseData,
  id: string
) => {
  const { exercises } = await getTrainingById(id);

  const newArray = [...exercises].map((x) =>
    x.uuid === exercise.uuid ? exercise : x
  );

  updateTraining(id, { exercises: newArray });
};

export const deleteExerciseInTraining = async (uuid: string, id: string) => {
  const { exercises } = await getTrainingById(id);
  const newArray = [...exercises].filter((x) => x.uuid !== uuid);
  updateTraining(id, { exercises: newArray });
};

export const shiftExerciseRight = (
  exercises: TrainingExerciseData[],
  exerciseUuid: string
) => {
  const index = exercises.findIndex((x) => x.uuid === exerciseUuid);
  if (index < exercises.length - 1) {
    const arr = [...exercises];
    let temp = arr[index];
    arr[index] = arr[index + 1];
    arr[index + 1] = temp;
    return arr;
  }
  return exercises;
};

export const shiftExerciseLeft = (
  exercises: TrainingExerciseData[],
  exerciseUuid: string
) => {
  const index = exercises.findIndex((x) => x.uuid === exerciseUuid);
  if (index > 0) {
    const arr = [...exercises];
    let temp = arr[index];
    arr[index] = arr[index - 1];
    arr[index - 1] = temp;
    return arr;
  }
  return exercises;
};

export const shiftExercise = async (
  trainingId: string,
  uuidExercise: string,
  callback: (
    exercises: TrainingExerciseData[],
    exerciseUuid: string
  ) => TrainingExerciseData[]
) => {
  const { exercises } = await getTrainingById(trainingId);
  const newArray = callback(exercises, uuidExercise);
  updateTraining(trainingId, { exercises: newArray });
};
