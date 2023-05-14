import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { DbCollections } from "./constants";

export const plansCollection = collection(db, DbCollections.plans);

export const createPlan = async (coachId: string, name: string) => {
  if (!coachId) return;
  await addDoc(plansCollection, {
    coachId: coachId,
    name: name,
    create: Timestamp.fromDate(new Date()),
  });
};

export const getAllPlans = async (coachId: string) => {
  const q = query(plansCollection, where("coachId", "==", coachId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};
