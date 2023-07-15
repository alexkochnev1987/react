import { RouterProvider } from 'react-router-dom';
import { Router } from '../lib/routeConfig';

export const AppRouter = () => {
  return <RouterProvider router={Router} />;
};
