import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { DbCollections } from "./constants";

export const plansCollection = collection(db, DbCollections.plans);
export const getPlanDocRef = (id: string) => doc(plansCollection, id);

export const createPlan = async (coachId: string, name: string) => {
  if (!coachId) return;
  await addDoc(plansCollection, {
    coachId: coachId,
    name: name,
    create: Timestamp.fromDate(new Date()),
  });
};

export const updatePlan = async (id: string, name: string) => {
  const docRef = getPlanDocRef(id);

  const newTraining = {
    name,
    modify: serverTimestamp(),
  };
  await updateDoc(docRef, newTraining);
};

// export const getAllPlans = async (coachId: string) => {
//   const q = query(plansCollection, where("coachId", "==", coachId));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// };

export const deletePlan = (id: string) => {
  const docRef = doc(plansCollection, id);
  deleteDoc(docRef);
};
