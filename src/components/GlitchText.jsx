import { useState, useEffect } from 'react';
import './GlitchText.css';

export default function GlitchText({ children, className = '', as: Component = 'span', periodic = false }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!periodic) return;
    
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.5) triggerGlitch();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [periodic]);

  return (
    <Component 
      className={`${className} glitch-hover ${isGlitching ? 'glitching' : ''}`}
      data-text={typeof children === 'string' ? children : ''}
    >
      {children}
    </Component>
  );
}
