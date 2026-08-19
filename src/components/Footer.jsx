import { Link } from 'react-router-dom';
import { Terminal, ExternalLink, Hash } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h3 className="footer-logo">WannaCry</h3>
          <p className="footer-tagline">
            Three minds.<br />
            One team.<br />
            Infinite possibilities.
          </p>
        </div>
        
        <div className="footer-links">
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/team">TEAM</Link></li>
              <li><Link to="/achievements">ACHIEVEMENTS</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Socials</h4>
            <ul className="social-links">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Terminal size={18} /> GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Hash size={18} /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2026 WannaCry</p>
        <p>Built with curiosity & code.</p>
      </div>
    </footer>
  );
};

export default Footer;
