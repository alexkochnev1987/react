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
import { getPlansCollection } from './plans';

export const getEventsCollectionLink = (planId: string) =>
  getCollectionRef(`${getPlansCollection()}/${planId}/${DbCollections.events}`);

export const createEvent = (userUiid: string, planId: string, event: Partial<MyCalendarEvents>) => {
  if (!planId) return;
  const docRef = getEventsCollectionLink(planId);
  addDoc(docRef, { ...event, create: serverTimestamp() });
};

export const updateEvent = (planId: string, event: Partial<MyCalendarEvents>) => {
  const docRef = getDocRef(getEventsCollectionLink(planId), event.id);
  updateDoc(docRef, { ...event, modify: serverTimestamp() });
};

export const deleteEvent = (planId: string, eventId: string) => {
  const docRef = getDocRef(getEventsCollectionLink(planId), eventId);
  deleteDoc(docRef);
};
