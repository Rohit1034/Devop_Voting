import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';

const PublicRoute = ({ children }) => {
  const { user, loading, initialized } = useAuth();

  if (loading || !initialized) {
    return <LoadingSpinner fullScreen message="Initializing app..." />;
  }

  if (user) {
    // Redirect to home page if already logged in
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

export default PublicRoute;
