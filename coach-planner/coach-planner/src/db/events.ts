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
import { CalendarEvent } from "kalend";
import { MyCalendarEvents } from "../components/dialogs/calendar-dialog/Event-form";

// export interface CalendarEvent {
//   id: any;
//   startAt: string;
//   endAt: string;
//   timezoneStartAt?: string;
//   timezoneEndAt?: string;
//   summary: string;
//   color: string;
//   type?: CALENDAR_EVENT_TYPE;
//   internalID?: string;
//   children?: {
//       agendaView?: ReactNode;
//       daysView?: ReactNode;
//       monthView?: ReactNode;
//   };
//   [key: string]: any;
// }

export const getEventsCollectionLink = (id: string) =>
  collection(db, DbCollections.plans, id, DbCollections.events);

export const createEvent = async (
  planId: string,
  event: Partial<MyCalendarEvents>
) => {
  if (!planId) return;
  await addDoc(getEventsCollectionLink(planId), {
    ...event,
    create: Timestamp.fromDate(new Date()),
  });
};

export const updateEvent = async (
  planId: string,
  event: Partial<MyCalendarEvents>
) => {
  const docRef = doc(getEventsCollectionLink(planId), event.id);
  updateDoc(docRef, { ...event, modify: serverTimestamp() });
};

export const deleteEvent = async (planId: string, eventId: string) => {
  const docRef = doc(getEventsCollectionLink(planId), eventId);
  await deleteDoc(docRef);
};
