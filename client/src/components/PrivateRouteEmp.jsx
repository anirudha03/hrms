import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUserEmp } = useSelector((state) => state.employee);
  return currentUserEmp ? <Outlet /> : <Navigate to='/' />;
}