import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Navbar } from '@/widgets/Navbar';
import { CenteredLoader } from '@/shared/ui/CenteredLoader';

const UserPage = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<CenteredLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default UserPage;
