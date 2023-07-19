import { RouterProvider } from 'react-router-dom';
import { Router } from '../config/routeConfig';

export const AppRouter = () => {
  return <RouterProvider router={Router} />;
};
