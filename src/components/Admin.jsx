import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Admin = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (!loading) {
    return (
      <section className='container-xl'>
        <h1>Admin Section</h1>
        <nav className="nav nav-tabs mt-4">
          <Link className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`} to="/admin">User</Link>
          <Link className={`nav-link ${location.pathname === '/admin/cardsDB' ? 'active' : ''}`} to="/admin/cardsDB">Full database</Link>
          <Link className={`nav-link ${location.pathname === '/admin/cards/create' ? 'active' : ''}`} to="/admin/cards/create">Create new card</Link>
        </nav>
        {location.pathname === '/admin' && (
          <div className='p-3 py-5 bg-terciary'>
            <p>Logged User: <span className='text-accent fw-bold'>{user.email.split('@')[0]}</span></p>
            <p>Email conected: <span className='text-accent fw-bold'>{user.email}</span></p>

            <p>To add new users, they must be added to "Firebase" platform.</p>

          </div>
        )}
        <Outlet />
      </section>
    );
  }

};
