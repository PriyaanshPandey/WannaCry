import { Play, Info } from 'lucide-react';
import './NetflixHero.css';

export default function NetflixHero() {
  return (
    <div className="netflix-hero">
      <div className="hero-vignette"></div>
      <div className="hero-content">
        <h1 className="hero-title">WANNACRY</h1>
        
        <div className="hero-meta">
          <span className="match-score">98% Match</span>
          <span className="year">2026</span>
          <span className="rating">TV-MA</span>
          <span className="seasons">3 Seasons</span>
          <span className="quality">HD</span>
        </div>

        <p className="hero-synopsis">
          Three people. Different strengths. One team. A gripping documentary following a high-stakes hackathon team pushing the boundaries of AI, Frontend, and Backend engineering.
        </p>

        <div className="hero-buttons">
          <button className="play-button">
            <Play size={24} fill="currentColor" />
            <span>Play</span>
          </button>
          <button className="info-button">
            <Info size={24} />
            <span>More Info</span>
          </button>
        </div>
      </div>
      <div className="hero-fade-bottom"></div>
    </div>
  );
}
