import { collection, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { DbCollections } from './constants';
import { MyCalendarEvents } from '../components/dialogs/calendar-dialog/Event-form';
import { addDocFunction, deleteDocFunction, updateDocFunction } from './firestore';

export const getEventsCollectionLink = (id: string) => collection(db, DbCollections.plans, id, DbCollections.events);

export const createEvent = (planId: string, event: Partial<MyCalendarEvents>) => {
  if (!planId) return;
  const docRef = getEventsCollectionLink(planId);
  addDocFunction(docRef, event);
};

export const updateEvent = (planId: string, event: Partial<MyCalendarEvents>) => {
  const docRef = doc(getEventsCollectionLink(planId), event.id);
  updateDocFunction(docRef, event);
};

export const deleteEvent = (planId: string, eventId: string) => {
  const docRef = doc(getEventsCollectionLink(planId), eventId);
  deleteDocFunction(docRef);
};
