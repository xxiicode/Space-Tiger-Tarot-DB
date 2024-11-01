// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>; // Puedes mostrar un spinner o un mensaje de carga
  }

  if (!user) {
    // Si no hay usuario, redirige a login
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, renderiza los componentes hijos
  return children;
};
