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
          {
            path: RouteNames.exercise,
            element: <Exercise />,
          },
          {
            path: RouteNames.plan,
            element: <Plan />,
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

const GeneralRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
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
  const auth = getAuth();

  return <RouterProvider router={PrivateRouter} />;
};
