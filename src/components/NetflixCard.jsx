import { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import './NetflixCard.css';

export default function NetflixCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);

  // Fallbacks if data doesn't map perfectly
  const title = item.name || item.title || 'Unknown';
  const subtitle = item.roles ? item.roles.join(' • ') : (item.skills ? item.skills.join(' • ') : '');
  const initials = item.initials || (item.name ? item.name.slice(0, 2).toUpperCase() : 'WC');

  return (
    <div 
      className="netflix-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-container">
        {/* Placeholder for the thumbnail */}
        <div className="card-placeholder-bg">
           <h1>{initials}</h1>
        </div>
      </div>

      {isHovered && (
        <div className="card-hover-details">
          <div className="card-hover-image">
            <div className="card-placeholder-bg">
               <h1>{initials}</h1>
            </div>
          </div>
          
          <div className="card-info">
            <div className="card-actions">
              <div className="actions-left">
                <button className="icon-btn play"><Play size={16} fill="currentColor" /></button>
                <button className="icon-btn"><Plus size={16} /></button>
                <button className="icon-btn"><ThumbsUp size={16} /></button>
              </div>
              <div className="actions-right">
                <button className="icon-btn outline"><ChevronDown size={16} /></button>
              </div>
            </div>

            <div className="card-meta">
              <span className="match">98% Match</span>
              <span className="rating">TV-MA</span>
              <span className="duration">3 Seasons</span>
            </div>

            <div className="card-tags">
              {subtitle}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
