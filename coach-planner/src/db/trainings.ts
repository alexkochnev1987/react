import { ExerciseParamsDefault } from '../components/exercise-params/constants';

import {
  deleteDoc,
  getCollectionRef,
  getDoc,
  getDocRef,
  getDocs,
  query,
  serverTimestamp,
  where,
  addDoc,
  updateDoc,
} from '@/lib/firebase/firebase.lib';
import {
  CreateTrainingRequest,
  DbCollections,
  ExerciseResponse,
  TrainingExerciseData,
  TrainingResponse,
} from './constants';
import { v4 as uuidv4 } from 'uuid';
import { getInitPath } from '../lib/firebase/firestore';

const getTrainingsPath = () => getInitPath() + DbCollections.trainings;
export const getTrainingsCollection = () => getCollectionRef(getTrainingsPath());

export const getTrainingRef = (id: string | undefined) => {
  if (!id) throw Error('Exercise ID is undefined');
  return getDocRef(getTrainingsCollection(), id);
};

export const getTrainingById = async (id: string) => {
  const docRef = getTrainingRef(id);
  const training = await getDoc(docRef);
  return { id: training.id, ...training.data() } as TrainingResponse;
};

export const createTraining = async () => {
  const training = await addDoc(getTrainingsCollection(), {
    create: serverTimestamp(),
    name: 'Enter Training name',
  });
  return training?.id;
};

export const deleteTraining = (trainingId: string) => {
  const docRef = getDocRef(getTrainingsCollection(), trainingId);
  deleteDoc(docRef);
};

export const getTrainingByName = async ({ name }: CreateTrainingRequest) => {
  const q = query(getTrainingsCollection(), where('name', '==', name));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length ? querySnapshot.docs[0].id : false;
};

export const updateTraining = async (id: string, training: Partial<TrainingResponse>) => {
  const docRef = getTrainingRef(id);

  const newTraining = {
    ...training,
    modify: serverTimestamp(),
  };

  updateDoc(docRef, newTraining);
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

export const shiftExercise = async (
  trainingId: string,
  uuidExercise: string,
  callback: typeof shiftExerciseLeft,
) => {
  const { exercises } = await getTrainingById(trainingId);
  const newArray = callback(exercises, uuidExercise);
  updateTraining(trainingId, { exercises: newArray });
};
