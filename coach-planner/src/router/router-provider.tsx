import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RequireAuth } from '../components/hoc/Require-auth';
import { RouteNames } from './routes';
import Layout from '../components/layout/Layout';
import UserPage from '../pages/User-page';
import Exercise from '../pages/Exercise';
import { CircularProgress } from '@mui/material';

const ErrorPageAsync = lazy(() => import('../pages/Error-page'));
const ExerciseAsync = lazy(() => import('../pages/Exercise'));
const SetUserAsync = lazy(() => import('../pages/Set-user'));
const SetExerciseAsync = lazy(() => import('../pages/Set-exercise'));
const PlanAsync = lazy(() => import('../pages/Plan'));
const ShowEventsAsync = lazy(() => import('../pages/Show-events'));
const TrainingsPageAsync = lazy(() => import('../pages/Trainings-page'));
const TrainingPageAsync = lazy(() => import('../pages/Training-page'));
const LoginAsync = lazy(() => import('../pages/Login'));
const RegistrationAsync = lazy(() => import('../pages/Registration'));

const PrivateRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <Suspense fallback={<CircularProgress />}>
        <ErrorPageAsync />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <RequireAuth>
            <UserPage />
          </RequireAuth>
        ),
        children: [
          { path: '/', element: <Exercise /> },
          {
            path: RouteNames.myExercises,
            element: <ExerciseAsync />,
          },
          {
            path: RouteNames.user,
            element: <SetUserAsync />,
          },
          {
            path: RouteNames.myExercises + RouteNames.id,
            element: <SetExerciseAsync />,
          },
          {
            path: RouteNames.plan,
            element: <PlanAsync />,
          },
          {
            path: RouteNames.plan + RouteNames.id,
            element: <ShowEventsAsync />,
          },
          {
            path: RouteNames.trainings,
            element: <TrainingsPageAsync />,
          },
          {
            path: RouteNames.trainings + RouteNames.id,
            element: <TrainingPageAsync />,
          },
        ],
      },
      {
        path: RouteNames.login,
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LoginAsync />
          </Suspense>
        ),
      },
      {
        path: RouteNames.registration,
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RegistrationAsync />
          </Suspense>
        ),
      },
    ],
  },
]);

export const MyRouterProvider = () => {
  return <RouterProvider router={PrivateRouter} />;
};
