import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, BrainCircuit, ExternalLink } from 'lucide-react';
import './TeamCard.css';

const roleColors = {
  'Frontend': 'var(--neon-cyan)',
  'Backend': 'var(--neon-green)',
  'AI/ML': 'var(--neon-magenta)',
  'UI/UX': 'var(--neon-cyan)',
  'Research': 'var(--neon-magenta)'
};

const getRoleIcon = (role) => {
  if (role.includes('Frontend') || role.includes('UI/UX')) return <Terminal size={20} />;
  if (role.includes('Backend')) return <Database size={20} />;
  if (role.includes('AI/ML') || role.includes('Research')) return <BrainCircuit size={20} />;
  return <Terminal size={20} />;
};

const decodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

export default function TeamCard({ name, roles, mainColor }) {
  const [displayText, setDisplayText] = useState(name);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        prev.split('')
          .map((letter, index) => {
            if (index < iteration) {
              return name[index];
            }
            return decodeChars[Math.floor(Math.random() * 46)];
          })
          .join('')
      );
      
      if (iteration >= name.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setDisplayText(name);
  };

  return (
    <motion.div 
      className="team-card"
      whileHover={{ y: -10 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ '--card-accent': mainColor }}
    >
      <div className="card-glitch-border"></div>
      <div className="card-content">
        <div className="avatar-container">
          <div className="avatar-placeholder">
            <span className="avatar-initials">{name.slice(0, 2).toUpperCase()}</span>
            <div className="scanline-overlay"></div>
          </div>
        </div>
        
        <div className="member-info">
          <h2 className="member-name font-mono">{displayText}</h2>
          
          <div className="member-roles">
            {roles.map(role => (
              <span 
                key={role} 
                className="role-badge" 
                style={{ borderColor: roleColors[role], color: roleColors[role] }}
              >
                {getRoleIcon(role)}
                {role}
              </span>
            ))}
          </div>
        </div>
        
        <div className="card-action">
          <button className="access-btn">
            <span className="bracket">[</span> 
            ACCESS DOSSIER 
            <span className="bracket">]</span>
            <span className="cursor-block">_</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
