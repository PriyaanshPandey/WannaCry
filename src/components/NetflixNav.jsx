import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import './NetflixNav.css';

export default function NetflixNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`netflix-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-left">
        <NavLink to="/" className="nav-logo" style={{ textDecoration: 'none', color: '#E50914' }}>WANNACRY</NavLink>
        <ul className="nav-links">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/team" className={({ isActive }) => isActive ? 'active' : ''}>Team</NavLink></li>
          <li><NavLink to="/achievements" className={({ isActive }) => isActive ? 'active' : ''}>Achievements</NavLink></li>
          <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </div>
      <div className="nav-right">
        <Search size={20} className="nav-icon" />
        <span className="nav-text">Kids</span>
        <Bell size={20} className="nav-icon" />
        <div className="nav-profile">
          <User size={24} />
        </div>
      </div>
    </nav>
  );
}
