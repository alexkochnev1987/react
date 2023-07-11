import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

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
