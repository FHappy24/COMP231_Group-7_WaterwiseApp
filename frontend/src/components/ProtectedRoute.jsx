import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, custodianOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
        </div>
        
      
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

//   if (custodianOnly && !user.isCustodian) {
//     return ;
//   }

  return children;
};

export default ProtectedRoute;