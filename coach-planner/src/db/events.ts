import {
  addDoc,
  db,
  deleteDoc,
  getCollectionRef,
  getDocRef,
  serverTimestamp,
  updateDoc,
} from '@/lib/firebase/firebase.lib';
import { DbCollections } from './constants';
import { MyCalendarEvents } from '../components/dialogs/calendar-dialog/Event-form';
import { getPlansCollection, updatePlan } from './plans';

export const getEventsCollectionLink = (planId: string) =>
  getCollectionRef(`${getPlansCollection()}/${planId}/${DbCollections.events}`);

export const createEvent = async (planId: string, event: Partial<MyCalendarEvents>) => {
  if (!planId) return;
  const docRef = getEventsCollectionLink(planId);

  await addDoc(docRef, { ...event, create: serverTimestamp() });
  await updatePlan(planId);
};

export const updateEvent = async (planId: string, event: Partial<MyCalendarEvents>) => {
  const docRef = getDocRef(getEventsCollectionLink(planId), event.id);
  await updateDoc(docRef, { ...event, modify: serverTimestamp() });
  await updatePlan(planId);
};

export const deleteEvent = async (planId: string, eventId: string) => {
  const docRef = getDocRef(getEventsCollectionLink(planId), eventId);
  await deleteDoc(docRef);
  await updatePlan(planId);
};
