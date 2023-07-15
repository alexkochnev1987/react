import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RoutePath } from './constants';
import { RequireAuth } from '@/components/hoc/Require-auth';
import Layout from '@/components/layout/Layout';
import Exercise from '@/pages/Exercise';

import UserPage from '@/pages/User-page';
import { CircularProgress } from '@mui/material';
const ErrorPageAsync = lazy(() => import('@/pages/Error-page'));
const ExerciseAsync = lazy(() => import('@/pages/Exercise'));
const SetUserAsync = lazy(() => import('@/pages/Set-user'));
const SetExerciseAsync = lazy(() => import('@/pages/Set-exercise'));
const PlanAsync = lazy(() => import('@/pages/Plan'));
const ShowEventsAsync = lazy(() => import('@/pages/Show-events'));
const TrainingsPageAsync = lazy(() => import('@/pages/Trainings-page'));
const TrainingPageAsync = lazy(() => import('@/pages/Training-page'));
const LoginAsync = lazy(() => import('@/pages/Login'));
const RegistrationAsync = lazy(() => import('@/pages/Registration'));

export const Router = createBrowserRouter([
  {
    path: RoutePath.main,
    element: <Layout />,
    errorElement: (
      <Suspense fallback={<CircularProgress />}>
        <ErrorPageAsync />
      </Suspense>
    ),
    children: [
      {
        path: RoutePath.main,
        element: (
          <RequireAuth>
            <UserPage />
          </RequireAuth>
        ),
        children: [
          { path: RoutePath.main, element: <Exercise /> },
          {
            path: RoutePath.exercise,
            element: <ExerciseAsync />,
          },
          {
            path: RoutePath.user,
            element: <SetUserAsync />,
          },
          {
            path: RoutePath.exercise + RoutePath.id,
            element: <SetExerciseAsync />,
          },
          {
            path: RoutePath.plan,
            element: <PlanAsync />,
          },
          {
            path: RoutePath.plan + RoutePath.id,
            element: <ShowEventsAsync />,
          },
          {
            path: RoutePath.trainings,
            element: <TrainingsPageAsync />,
          },
          {
            path: RoutePath.trainings + RoutePath.id,
            element: <TrainingPageAsync />,
          },
        ],
      },
      {
        path: RoutePath.login,
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LoginAsync />
          </Suspense>
        ),
      },
      {
        path: RoutePath.registration,
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RegistrationAsync />
          </Suspense>
        ),
      },
    ],
  },
]);
