import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0) {
    const userRoles = [];
    if (Array.isArray(user.roles)) {
      userRoles.push(...user.roles);
    }
    if (typeof user.role === 'string' && user.role) {
      userRoles.push(user.role);
    }

    const hasRole = userRoles.some((r) => roles.includes(r));
    if (!hasRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
