import { DbCollections, TrainingResponse } from '@/db/constants';
import {
  addDoc,
  deleteDoc,
  getCollectionRef,
  getDoc,
  getDocRef,
  getInitPath,
  serverTimestamp,
  updateDoc,
} from '@/lib/firebase/firebase.lib';

const getTrainingsPath = () => getInitPath() + DbCollections.trainings;
const getTrainingsCollection = () => getCollectionRef(getTrainingsPath());

const getTrainingRef = (id: string) => {
  return getDocRef(getTrainingsCollection(), id);
};

const getTrainingById = async (id: string) => {
  const docRef = getTrainingRef(id);
  const training = await getDoc(docRef);
  return training;
};

const createTraining = async (trainingData: Partial<TrainingResponse>) => {
  const training = await addDoc(getTrainingsCollection(), {
    ...trainingData,
    create: serverTimestamp(),
  });
  return training;
};

const deleteTraining = async (trainingId: string) => {
  const docRef = getDocRef(getTrainingsCollection(), trainingId);
  await deleteDoc(docRef);
};

const updateTraining = async (id: string, training: Partial<TrainingResponse>) => {
  const docRef = getTrainingRef(id);

  const newTraining = {
    ...training,
    modify: serverTimestamp(),
  };

  await updateDoc(docRef, newTraining);
};

export const TrainingRepo = {
  deleteTraining,
  updateTraining,
  createTraining,
  getTrainingById,
};
