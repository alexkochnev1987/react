import { Outlet } from 'react-router-dom';

import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { Navbar } from '@/widgets/Navbar';

const UserPage = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<CircularProgress />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default UserPage;
