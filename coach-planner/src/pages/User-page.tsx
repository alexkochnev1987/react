import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';

export const UserPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
