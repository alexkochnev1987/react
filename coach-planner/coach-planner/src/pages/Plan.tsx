import React, { useState } from "react";
import { createPlan, getAllPlans, plansCollection } from "../db/plans";
import { useCollection } from "react-firebase-hooks/firestore";
import { NavLink, Outlet } from "react-router-dom";
// const events = [
//   {
//     id: 1,
//     startAt: "2021-11-21T18:00:00.000Z",
//     endAt: "2021-11-21T19:00:00.000Z",
//     timezoneStartAt: "Europe/Berlin", // optional
//     summary: "test",
//     color: "blue",
//     calendarID: "work",
//   },
//   {
//     id: 2,
//     startAt: "2021-11-21T18:00:00.000Z",
//     endAt: "2021-11-21T19:00:00.000Z",
//     timezoneStartAt: "Europe/Berlin", // optional
//     summary: "test",
//     description: "my description",
//     color: "blue",
//   },
//   {
//     id: 3,
//     startAt: "2023-05-09T01:00:00.000Z",
//     endAt: "2023-05-09T02:00:00.000Z",
//     timezoneStartAt: "Europe/Berlin",
//     summary: "first task",
//     color: "red",
//   },
//   {
//     id: 4,
//     startAt: "2023-05-09T01:00:00.000Z",
//     endAt: "2023-05-09T02:00:00.000Z",
//     timezoneStartAt: "Europe/Berlin",
//     summary: "first task",
//     color: "red",
//     children: {
//       daysView: <CalendarEventComponent />,
//     },
//   },
//   {
//     id: 5,
//     startAt: "2023-05-09T02:00:00.000Z",
//     endAt: "2023-05-09T03:00:00.000Z",
//     summary: "testHidden",
//     color: "blue",
//     calendarID: "work",
//   },
// ];

export const Plan = () => {
  const [plans] = useCollection(plansCollection);

  return (
    <div style={{ height: "100vh" }}>
      {plans &&
        plans.docs.map((x) => (
          <NavLink to={x.id} key={x.id}>
            {(x.data() as { name: string }).name}
          </NavLink>
        ))}
      <Outlet />
    </div>
  );
};
