import {
  Timestamp,
  addDoc,
  deleteDoc,
  getCollectionRef,
  getDocRef,
  serverTimestamp,
  updateDoc,
} from '@/lib/firebase/firebase.lib';
import { DbCollections } from './constants';
import { getInitPath } from '../lib/firebase/firestore';

export interface PlanResponse {
  coachId: string;
  create: Timestamp;
  id: string;
  modify: Timestamp;
  name: string;
}

export const getPlansCollection = () => {
  const path = getInitPath() + DbCollections.plans;
  return getCollectionRef(path);
};
export const getPlanDocRef = (id: string) => getDocRef(getPlansCollection(), id);

export const createPlan = (name: string) => {
  return addDoc(getPlansCollection(), { name: name, create: serverTimestamp() });
};

export const updatePlan = async (id: string, name?: string) => {
  const docRef = getPlanDocRef(id);
  const trainingObj = name ? { name } : {};

  const newTraining = {
    ...trainingObj,
    modify: serverTimestamp(),
  };
  await updateDoc(docRef, newTraining);
};

export const deletePlan = (id: string) => {
  const docRef = getPlanDocRef(id);
  deleteDoc(docRef);
};
