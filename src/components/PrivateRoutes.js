import React from 'react';
import { Navigate,Outlet,useParams} from 'react-router-dom';
import AuthService from './AuthService';
const PrivateRoutes = ({}) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const { id } = useParams();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ id }} />
  );
};

export default PrivateRoutes;

