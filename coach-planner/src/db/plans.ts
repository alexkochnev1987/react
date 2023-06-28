import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { DbCollections } from './constants';
import { addDocFunction, deleteDocFunction, updateDocFunction } from './firestore';

export const plansCollection = collection(db, DbCollections.plans);
export const getPlanDocRef = (id: string) => doc(plansCollection, id);

export const createPlan = (coachId: string, name: string) => {
  if (!coachId) return;
  addDocFunction(plansCollection, { coachId: coachId, name: name });
};

export const updatePlan = (id: string, name: string) => {
  const docRef = getPlanDocRef(id);

  const newTraining = {
    name,
    modify: serverTimestamp(),
  };
  updateDocFunction(docRef, newTraining);
};

export const deletePlan = (id: string) => {
  const docRef = doc(plansCollection, id);
  deleteDocFunction(docRef);
};
