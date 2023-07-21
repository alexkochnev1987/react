import { Timestamp, collection, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { DbCollections } from './constants';
import { addDocFunction, deleteDocFunction, updateDocFunction } from './firestore';

export interface PlanResponse {
  coachId: string;
  create: Timestamp;
  id: string;
  modify: Timestamp;
  name: string;
}

export const getPlansCollection = (userUiid: string) => {
  const path = `${DbCollections.users}/${userUiid}/${DbCollections.plans}`;
  return collection(db, path);
};
export const getPlanDocRef = (userUiid: string, id: string) => doc(getPlansCollection(userUiid), id);

export const createPlan = (coachId: string, name: string) => {
  if (!coachId) return;
  return addDocFunction(getPlansCollection(coachId), { coachId: coachId, name: name });
};

export const updatePlan = (userUiid: string, id: string, name: string) => {
  const docRef = getPlanDocRef(userUiid, id);

  const newTraining = {
    name,
    modify: serverTimestamp(),
  };
  updateDocFunction(docRef, newTraining);
};

export const deletePlan = (userUiid: string, id: string) => {
  const docRef = doc(getPlansCollection(userUiid), id);
  deleteDocFunction(docRef);
};
