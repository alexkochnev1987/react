import {
  addDoc,
  db,
  deleteDoc,
  getCollectionRef,
  getDocRef,
  getInitPath,
  serverTimestamp,
  updateDoc,
} from '@/lib/firebase/firebase.lib';
import { DbCollections } from './constants';
import { MyCalendarEvents } from '../components/dialogs/calendar-dialog/Event-form';
import { getPlansCollection, updatePlan } from './plans';

export const getEventsCollectionRef = (planId: string) =>
  getCollectionRef(`${getInitPath()}${DbCollections.plans}/${planId}/${DbCollections.events}`);

export const getEventsDocRef = () => {};

export const createEvent = async (planId: string, event: Partial<MyCalendarEvents>) => {
  if (!planId) return;
  const docRef = getEventsCollectionRef(planId);

  await addDoc(docRef, { ...event, create: serverTimestamp() });
  await updatePlan(planId);
};

export const updateEvent = async (planId: string, event: Partial<MyCalendarEvents>) => {
  const docRef = getDocRef(getEventsCollectionRef(planId), event.id);
  await updateDoc(docRef, { ...event, modify: serverTimestamp() });
  await updatePlan(planId);
};

export const deleteEvent = async (planId: string, eventId: string) => {
  const docRef = getDocRef(getEventsCollectionRef(planId), eventId);
  await deleteDoc(docRef);
  await updatePlan(planId);
};
