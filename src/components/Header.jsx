import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { auth } from '../assets/Connection/firebaseConfig'; // Importa la configuración de Firebase
import { signOut } from 'firebase/auth'; // Importa el método signOut

export const Header = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión
      console.log("Sesión cerrada con éxito.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
    <header>
      <strong>Space Tiger Tarot <span>Database</span></strong>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/library">Library</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>
      </header>
      {user && (
        <div className="user-info">
          Usuario: {user.email}
          <button onClick={handleLogout} className="">Logout</button>
        </div>
      )}
    
    </>
  );
};
