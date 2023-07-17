import { collection, doc, getDoc, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { ExerciseParamsDefault } from '../components/exercise-params/constants';

import { db, userId } from '../firebase';
import {
  CreateTrainingRequest,
  DbCollections,
  ExerciseResponse,
  TrainingExerciseData,
  TrainingResponse,
} from './constants';
import { v4 as uuidv4 } from 'uuid';
import { addDocFunction, deleteDocFunction, initPath, updateDocFunction } from './firestore';

const trainingsPath = initPath + DbCollections.trainings;
export const trainingsCollection = collection(db, trainingsPath);

export const getTrainingRef = (id: string | undefined) => {
  if (!id) throw Error('Exercise ID is undefined');
  return doc(trainingsCollection, id);
};

export const getTrainingById = async (id: string) => {
  const docRef = getTrainingRef(id);
  const training = await getDoc(docRef);
  return { id: training.id, ...training.data() } as TrainingResponse;
};

export const createTraining = ({ coachId, name }: CreateTrainingRequest) => {
  if (!coachId) return;
  addDocFunction(trainingsCollection, { coachId, name });
};

export const deleteTraining = (trainingId: string) => {
  const docRef = doc(trainingsCollection, trainingId);
  deleteDocFunction(docRef);
  // await deleteDoc(docRef);
};

export const getTrainingByName = async ({ coachId, name }: CreateTrainingRequest) => {
  const q = query(trainingsCollection, where('name', '==', name));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length ? querySnapshot.docs[0].id : false;
};

export const createUniqueTraining = async ({ coachId, name }: CreateTrainingRequest) => {
  const exist = await getTrainingByName({ coachId, name });
  if (exist) {
    throw Error('Training wit this name exist');
  }
  createTraining({ coachId, name });
  const trainingId = await getTrainingByName({ coachId, name });
  return trainingId;
};

export const updateTraining = async (id: string, training: Partial<TrainingResponse>) => {
  const docRef = getTrainingRef(id);

  const newTraining = {
    ...training,
    modify: serverTimestamp(),
  };

  updateDocFunction(docRef, newTraining);
};

export const addExerciseInTraining = async (exercise: ExerciseResponse, id: string) => {
  const { exercises } = await getTrainingById(id);

  const newArray = Array.isArray(exercises)
    ? [...exercises, { exercise, params: ExerciseParamsDefault, uuid: uuidv4() }]
    : [{ exercise, params: ExerciseParamsDefault, uuid: uuidv4() }];
  updateTraining(id, { exercises: newArray });
};

export const updateExerciseInTraining = async (exercise: TrainingExerciseData, id: string) => {
  const { exercises } = await getTrainingById(id);

  const newArray = [...exercises].map((x) => (x.uuid === exercise.uuid ? exercise : x));

  updateTraining(id, { exercises: newArray });
};

export const deleteExerciseInTraining = async (uuid: string, id: string) => {
  const { exercises } = await getTrainingById(id);
  const newArray = [...exercises].filter((x) => x.uuid !== uuid);
  updateTraining(id, { exercises: newArray });
};

export const shiftExerciseRight = (exercises: TrainingExerciseData[], exerciseUuid: string) => {
  const index = exercises.findIndex((x) => x.uuid === exerciseUuid);
  if (index < exercises.length - 1) {
    const arr = [...exercises];
    const temp = arr[index];
    arr[index] = arr[index + 1];
    arr[index + 1] = temp;
    return arr;
  }
  return exercises;
};

export const shiftExerciseLeft = (exercises: TrainingExerciseData[], exerciseUuid: string) => {
  const index = exercises.findIndex((x) => x.uuid === exerciseUuid);
  if (index > 0) {
    const arr = [...exercises];
    const temp = arr[index];
    arr[index] = arr[index - 1];
    arr[index - 1] = temp;
    return arr;
  }
  return exercises;
};

export const shiftExercise = async (trainingId: string, uuidExercise: string, callback: typeof shiftExerciseLeft) => {
  const { exercises } = await getTrainingById(trainingId);
  const newArray = callback(exercises, uuidExercise);
  updateTraining(trainingId, { exercises: newArray });
};
