// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-5">cargando...</p>;
  }

  if (!user) {
    // Si no hay usuario, redirige a login
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, renderiza los componentes hijos
  return children;
};
