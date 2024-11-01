import { Link } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth';

export const Admin = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>; // O una animación de carga
  }

  console.log('Usuario autenticado:', user); // Esto mostrará el objeto del usuario
  console.log("Accediendo a la sección Admin...");

  return (
    <>
      <h1>Admin Section</h1>
      <p>Crear cartas, editar y dar permisos</p>
      {user ? (
        <ul>
          <li className="btn btn-light"><Link to="/admin/cardsDB">Base de Datos Completa de Cartas</Link></li>
          <li className="btn btn-light"><Link to="/admin/cards/create">Crear NUEVA carta</Link></li>
        </ul>
      ) : (
        <p>No tienes acceso a esta sección. Por favor, inicia sesión.</p>
      )}
    </>
  );
};
