import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../assets/Connection/firebaseConfig'; // Importa la configuración de Firebase
import { signOut } from 'firebase/auth'; // Importa el método signOut

export const Header = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión
      console.log('session closed');
    } catch (error) {
      console.error('error trying to close session', error);
    }
  };

  return (
    <>
      <header className=" mb-2">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <h1 className="h3">
                SpaceTiger Tarot<span className="text-accent">Database</span>
              </h1>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/library">
                    Library
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/search">
                    Search
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-muted" href="/admin">
                    Admin
                  </a>
                </li>
                {user && (
                  <button onClick={handleLogout} className="btn btn-outline-secondary btn-sm">
                    Logout
                  </button>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
