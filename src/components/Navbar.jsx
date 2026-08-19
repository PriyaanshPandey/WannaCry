import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <NavLink to="/" className="navbar-logo">
          <Terminal size={24} className="logo-icon" />
          <span className="logo-text">WannaCry</span>
        </NavLink>
        
        <ul className="navbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-prefix">/</span>Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/team" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-prefix">/</span>Team
            </NavLink>
          </li>
          <li>
            <NavLink to="/achievements" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-prefix">/</span>Achievements
            </NavLink>
          </li>
          <li>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nav-link">
              <span className="nav-prefix">/</span>GitHub
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
