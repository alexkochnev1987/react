import Kalend, { CalendarEvent, CalendarView, OnEventClickData, OnNewEventClickData } from 'kalend';
import React, { useCallback, useState } from 'react';
import { AddTrainingDialog } from '../dialogs/calendar-dialog/Add-training-in-plan-dialog';
import { getEventsCollectionLink } from '../../db/events';
import { useCollection } from 'react-firebase-hooks/firestore';
import 'kalend/dist/styles/index.css';
import { countMinutesByDate } from '../../utils/countMinutesByDate';
import { PageChangeData } from 'kalend/common/interface';

export const ShowCalendar = ({ planId }: { planId: string }) => {
  const [myEvents] = useCollection(getEventsCollectionLink(planId));
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<Partial<CalendarEvent>>({ color: 'blue' });
  const onEventClick = (data: OnEventClickData) => {
    setName(data);
    setOpen(true);
  };
  const [dateRange, setDateRange] = useState<{
    rangeFrom: string;
    rangeTo: string;
  }>();
  const parseDocumentData = () => {
    if (myEvents) return myEvents.docs.map((x) => ({ ...x.data(), id: x.id } as CalendarEvent));
  };
  const calendarEvents = useCallback(parseDocumentData, [myEvents]);
  const onNewEventClick = (data: OnNewEventClickData) => {
    const newEvent: Partial<CalendarEvent> = {
      startAt: data.startAt ? data.startAt : '',
      endAt: data.endAt ? data.endAt : '',
      color: 'blue',
    };
    setName(newEvent);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  calendarEvents()
    ?.filter((event) => {
      return (
        dateRange &&
        new Date(event.startAt) >= new Date(dateRange?.rangeFrom) &&
        new Date(event.startAt) <= new Date(dateRange?.rangeTo)
      );
    })
    .map((event) => ({
      startDate: event.startAt,
      duration: countMinutesByDate(event.startAt, event.endAt),
      trainingId: event.training,
    }));

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
          timeFormat={'24'}
          weekDayStart={'Monday'}
          calendarIDsHidden={['work']}
          language={'en'}
          onPageChange={(v: PageChangeData) => {
            setDateRange({ rangeFrom: v.rangeFrom, rangeTo: v.rangeTo });
          }}
        />
      )}
    </>
  );
};
