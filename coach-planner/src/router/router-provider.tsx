import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RequireAuth } from "../components/hoc/Require-auth";
import { Layout } from "../components/layout/Layout";
import ErrorPage from "../pages/Error-page";
import { Exercise } from "../pages/Exercise";
import { Login } from "../pages/Login";
import { Plan } from "../pages/Plan";
import { Registration } from "../pages/Registration";
import { UserPage } from "../pages/User-page";
import { RouteNames } from "./routes";
import { TrainingPage } from "../pages/Trainig-page";
import { ShowEvents } from "../pages/Show-events";
import { TrainingsPage } from "../pages/Trainings-page";
import { SetExercise } from "../pages/Set-exercise";
import { DrawPage } from "../pages/Draw-page";
import { Conva } from "../components/Conva/Conva";

const PrivateRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <UserPage />
          </RequireAuth>
        ),
        children: [
          { path: "/", element: <Exercise /> },
          {
            path: RouteNames.myExercises,
            element: <Exercise />,
          },
          {
            path: RouteNames.myExercises + RouteNames.id,
            element: <SetExercise />,
          },
          {
            path: RouteNames.plan,
            element: <Plan />,
          },
          {
            path: RouteNames.plan + RouteNames.id,
            element: <ShowEvents />,
          },

          {
            path: RouteNames.trainings,
            element: <TrainingsPage />,
          },
          {
            path: RouteNames.trainings + RouteNames.id,
            element: <TrainingPage />,
          },
          {
            path: RouteNames.draw,
            element: <DrawPage />,
          },
          {
            path: RouteNames.conva,
            element: <Conva />,
          },
        ],
      },
      {
        path: RouteNames.login,
        element: <Login />,
      },
      {
        path: RouteNames.registration,
        element: <Registration />,
      },
    ],
  },
]);

export const MyRouterProvider = () => {
  return <RouterProvider router={PrivateRouter} />;
};
