import TerminalBlock from '../components/TerminalBlock';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const terminalLines = [
    'initializing WannaCry...',
    '',
    'members: 03',
    'projects: --',
    'hackathons: --',
    'status: BUILDING',
    '',
    'system.ready()'
  ];

  return (
    <div className="home animate-fade-in">
      <section className="hero container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-glitch">WANNACRY</span>
          </h1>
          
          <div className="hero-text delay-1 animate-fade-in">
            <p className="hero-tagline">
              We don't spread viruses.<br />
              <span className="highlight">We spread ideas.</span>
            </p>
            
            <p className="hero-description">
              Three minds building, experimenting and creating with technology.
            </p>
          </div>
          
          <div className="hero-actions delay-2 animate-fade-in">
            <Link to="/team" className="btn btn-primary">[ MEET THE TEAM ]</Link>
            <Link to="/achievements" className="btn btn-outline">[ OUR ACHIEVEMENTS ]</Link>
          </div>
          
          <div className="micro-interactions delay-3 animate-fade-in">
            <div className="terminal-text">$ whoami</div>
            <div className="terminal-text answer">wannacry</div>
            <div className="terminal-text">$ mission</div>
            <div className="terminal-text answer">CREATE • LEARN • INNOVATE</div>
          </div>
        </div>
        
        <div className="hero-visual delay-2 animate-fade-in">
          <TerminalBlock lines={terminalLines} typingSpeed={40} initialDelay={800} />
        </div>
      </section>

      <section className="stats container delay-4 animate-fade-in">
        <div className="stat-box">
          <div className="stat-value">03</div>
          <div className="stat-label">TEAM MEMBERS</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">∞</div>
          <div className="stat-label">IDEAS</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">--</div>
          <div className="stat-label">PROJECTS</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">--</div>
          <div className="stat-label">ACHIEVEMENTS</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
