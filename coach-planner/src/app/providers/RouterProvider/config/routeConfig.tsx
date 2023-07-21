import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RoutePath } from './constants';
import { RequireAuth } from '@/components/hoc/RequireAuth';
import Layout from '@/components/layout/Layout';
import UserPage from '@/pages/PageWrappers/UserPage';
import ErrorPage from '@/pages/ErrorPage/Error-page';
import { CenteredLoader } from '@/shared/ui/CenteredLoader';

const ExerciseAsync = lazy(() => import('@/pages/ExercisesPage/ExercisesPage'));
const SetUserAsync = lazy(() => import('@/pages/SetUserPage/SetUserPage'));
const SetExerciseAsync = lazy(() => import('@/pages/SetExercisePage/SetExercisePage'));
const PlanAsync = lazy(() => import('@/pages/PlanPage/PlanPage'));
const ShowEventsAsync = lazy(() => import('@/pages/ShowEventsPage/ShowEventsPage'));
const TrainingsPageAsync = lazy(() => import('@/pages/TrainingsPage/TrainingsPage'));
const TrainingPageAsync = lazy(() => import('@/pages/TrainingPage/TrainingPage'));
const LoginAsync = lazy(() => import('@/pages/Login'));
const RegistrationAsync = lazy(() => import('@/pages/Registration'));

export const Router = createBrowserRouter([
  {
    path: RoutePath.main,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: RoutePath.main,
        element: (
          <RequireAuth>
            <UserPage />
          </RequireAuth>
        ),
        children: [
          { path: RoutePath.main, element: <ExerciseAsync /> },
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
          <Suspense fallback={<CenteredLoader />}>
            <LoginAsync />
          </Suspense>
        ),
      },
      {
        path: RoutePath.registration,
        element: (
          <Suspense fallback={<CenteredLoader />}>
            <RegistrationAsync />
          </Suspense>
        ),
      },
    ],
  },
]);
