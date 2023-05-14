import { DocumentData, QuerySnapshot } from "firebase/firestore";
import Kalend, {
  CalendarEvent,
  CalendarView,
  OnEventClickData,
  OnNewEventClickData,
} from "kalend";
import React, { useCallback, useState } from "react";
import { AddTrainingDialog } from "../dialogs/calendar-dialog/Add-training-in-plan-dialog";
import { getEventsCollectionLink, updateEvent } from "../../db/events";
import { useCollection } from "react-firebase-hooks/firestore";
import "kalend/dist/styles/index.css";

export const ShowCalendar = ({ planId }: { planId: string }) => {
  const [myEvents] = useCollection(getEventsCollectionLink(planId));
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<Partial<CalendarEvent>>({ color: "blue" });
  const onEventClick = (data: OnEventClickData) => {
    setName(data);
    setOpen(true);
  };
  const parseDocumentData = () => {
    if (myEvents)
      return myEvents.docs.map(
        (x) => ({ ...x.data(), id: x.id } as CalendarEvent)
      );
  };
  const calendarEvents = useCallback(parseDocumentData, [myEvents]);
  const onNewEventClick = (data: OnNewEventClickData) => {
    const newEvent: Partial<CalendarEvent> = {
      startAt: data.startAt ? data.startAt : "",
      endAt: data.endAt ? data.endAt : "",
      color: "blue",
    };
    setName(newEvent);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AddTrainingDialog open={open} onClose={handleClose} eventParams={name} />
      {calendarEvents() && (
        <Kalend
          showTimeLine={true}
          autoScroll={true}
          focusHour={10}
          onEventClick={onEventClick}
          onNewEventClick={onNewEventClick}
          events={calendarEvents()}
          initialDate={new Date().toISOString()}
          hourHeight={50}
          initialView={CalendarView.WEEK}
          disabledViews={[CalendarView.DAY]}
          timeFormat={"24"}
          weekDayStart={"Monday"}
          calendarIDsHidden={["work"]}
          language={"en"}
        />
      )}
    </>
  );
};
