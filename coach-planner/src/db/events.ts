import { collection, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { DbCollections } from './constants';
import { MyCalendarEvents } from '../components/dialogs/calendar-dialog/Event-form';
import { addDocFunction, deleteDocFunction, updateDocFunction } from './firestore';
import { getPlansCollection } from './plans';

export const getEventsCollectionLink = (userUiid: string, planId: string) =>
  collection(getPlansCollection(userUiid), planId, DbCollections.events);

export const createEvent = (userUiid: string, planId: string, event: Partial<MyCalendarEvents>) => {
  if (!planId) return;
  const docRef = getEventsCollectionLink(userUiid, planId);
  addDocFunction(docRef, event);
};

export const updateEvent = (userUiid: string, planId: string, event: Partial<MyCalendarEvents>) => {
  const docRef = doc(getEventsCollectionLink(userUiid, planId), event.id);
  updateDocFunction(docRef, event);
};

export const deleteEvent = (userUiid: string, planId: string, eventId: string) => {
  const docRef = doc(getEventsCollectionLink(userUiid, planId), eventId);
  deleteDocFunction(docRef);
};
