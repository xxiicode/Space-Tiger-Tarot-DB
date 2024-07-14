import {Link } from "react-router-dom"
export const Header = () => {
    return (
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
    );
  };