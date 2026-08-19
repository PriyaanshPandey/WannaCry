import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  ArrowUpRight, 
  ChevronDown, 
  Sparkles, 
  Code2, 
  Trophy, 
  Award, 
  Zap, 
  Crown,
  Flame
} from 'lucide-react';
import { achievements, timelineMilestones } from '../data/achievements';
import { teamMembers } from '../data/team';
import './Achievements.css';

const FILTER_OPTIONS = ['ALL', 'PRIYAANSH', 'PRANJAL', 'KRISHNA'];

const CATEGORY_MAP = {
  Hackathon: { icon: Trophy, color: '#00FF88', glow: 'rgba(0, 255, 136, 0.25)', label: 'HACKATHON' },
  Project: { icon: Code2, color: '#00E5FF', glow: 'rgba(0, 229, 255, 0.25)', label: 'PROJECT' },
  Certification: { icon: Award, color: '#C084FC', glow: 'rgba(192, 132, 252, 0.25)', label: 'CERTIFICATION' },
  Competition: { icon: Zap, color: '#FBBF24', glow: 'rgba(251, 191, 36, 0.25)', label: 'COMPETITION' },
  Research: { icon: Sparkles, color: '#00FF88', glow: 'rgba(0, 255, 136, 0.25)', label: 'RESEARCH' }
};

// ==========================================
// 1. CYBER CONSTELLATION BACKGROUND CANVAS
// ==========================================
const CyberConstellation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(Math.floor(width / 35), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8,
      color: Math.random() > 0.5 ? '#00FF88' : '#00E5FF'
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('pointermove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect near particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Connect with mouse cursor
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.25 * (1 - mdist / 160)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="cyber-constellation-canvas" aria-hidden="true" />;
};

// ==========================================
// 2. CINEMATIC INTRO COMPONENT
// ==========================================
const CinematicIntro = ({ onComplete }) => {
  const [introText, setIntroText] = useState('W');
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const steps = ['W', 'WA', 'WAN', 'WANNA', 'WANNACRY'];
    let stepIndex = 0;

    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setIntroText(steps[stepIndex]);
      } else {
        clearInterval(interval);
        setPhase('reveal');
        setTimeout(() => {
          setPhase('exit');
          setTimeout(onComplete, 400);
        }, 600);
      }
    }, 110);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`cinematic-intro ${phase}`}>
      <div className="intro-content">
        {phase === 'typing' ? (
          <h1 className="intro-glitch-text">{introText}</h1>
        ) : (
          <div className="intro-reveal-box">
            <span className="intro-brand">WANNACRY®</span>
            <h1 className="intro-sub">ACHIEVEMENTS</h1>
          </div>
        )}
      </div>
      <div className="intro-scanline"></div>
    </div>
  );
};

// ==========================================
// 3. ENHANCED HOLOGRAPHIC 3D CARD
// ==========================================
const ModernAchievementCard = ({ item, index, isFeatured = false, onHoverChange }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, mouseX: 50, mouseY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const mouseX = (x / rect.width) * 100;
    const mouseY = (y / rect.height) * 100;

    // 3D Tilt calculation (-7deg to +7deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTilt({ x: rotateX, y: rotateY, mouseX, mouseY });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange('VIEW');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, mouseX: 50, mouseY: 50 });
    onHoverChange('DEFAULT');
  };

  const categoryInfo = CATEGORY_MAP[item.category] || {
    icon: Flame,
    color: '#00FF88',
    glow: 'rgba(0, 255, 136, 0.25)',
    label: item.category.toUpperCase()
  };
  const CategoryIcon = categoryInfo.icon;

  return (
    <article
      ref={cardRef}
      className={`holo-achievement-card ${isFeatured ? 'featured-card' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        '--card-mouse-x': `${tilt.mouseX}%`,
        '--card-mouse-y': `${tilt.mouseY}%`,
        '--accent-color': categoryInfo.color,
        '--accent-glow': categoryInfo.glow,
        animationDelay: `${0.05 * (index + 1)}s`
      }}
    >
      {/* Animated Glowing Laser Border Trace & Foil Sheen */}
      <div className="card-border-tracer" aria-hidden="true"></div>
      <div className="card-foil-sheen" aria-hidden="true"></div>
      <div className="card-ambient-glow" aria-hidden="true"></div>
      <div className="card-laser-edge" aria-hidden="true"></div>
      <div className="card-scanline-laser" aria-hidden="true"></div>

      {/* Card Content Layout */}
      <div className="card-inner-content">
        {/* Top Bar: Emblem + Category + Year */}
        <div className="card-top-row">
          <div className="card-emblem-cluster">
            <div className="category-emblem" style={{ color: categoryInfo.color }}>
              {isFeatured ? <Crown size={15} className="crown-glow-anim" /> : <CategoryIcon size={14} />}
            </div>
            <span className="category-pill-name">{categoryInfo.label}</span>
          </div>

          <div className="card-top-meta">
            <span className="meta-year">{item.year}</span>
            <span className="meta-num">{item.num || `0${index + 1}`}</span>
          </div>
        </div>

        {/* Headline & Impact Info */}
        <div className="card-main-info">
          <div className="status-badge-row">
            <span className="live-beacon">
              <span className="beacon-core"></span>
              <span className="beacon-wave"></span>
            </span>
            <span className="result-text">{item.result || item.level}</span>
          </div>

          <h3 className="card-main-title glitch-hover-title" data-text={item.title}>
            {item.title}
          </h3>
          <p className="card-main-headline">{item.headline}</p>

          {/* Minimalist Technology Tags */}
          {item.tags && (
            <div className="card-tags-flow">
              {item.tags.map((tag, tIdx) => (
                <span key={tIdx} className="modern-tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Operator Avatars + Magnetic Action Link */}
        <div className="card-bottom-row">
          <div className="operators-cluster">
            <span className="operators-label">OPERATORS:</span>
            <div className="operators-pill-group">
              {item.members.map((member, mIdx) => (
                <div 
                  key={mIdx} 
                  className={`operator-chip chip-${member.toLowerCase()}`}
                  title={`Operator: ${member}`}
                >
                  <span className="chip-avatar-dot"></span>
                  <span className="chip-name">{member}</span>
                </div>
              ))}
            </div>
          </div>

          <a 
            href={item.link || 'https://github.com/PriyaanshPandey/WannaCry'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="action-magnetic-btn"
            aria-label={`View details for ${item.title}`}
          >
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </article>
  );
};

// ==========================================
// 4. STATS NUMBER COUNTER COMPONENT
// ==========================================
const StatCounter = ({ endValue, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        const duration = 1200;
        const startTime = performance.now();

        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * endValue);
          setCount(current);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(endValue);
          }
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [endValue, hasAnimated]);

  return (
    <div ref={ref} className="stat-item">
      <div className="stat-number">
        {count < 10 && !suffix ? `0${count}` : count}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

// ==========================================
// MAIN ACHIEVEMENTS PAGE COMPONENT
// ==========================================
const Achievements = () => {
  const [introFinished, setIntroFinished] = useState(() => {
    return Boolean(sessionStorage.getItem('wc_intro_seen'));
  });
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredMember, setHoveredMember] = useState(null);
  const [cursorData, setCursorData] = useState({ x: -100, y: -100, label: 'DEFAULT', visible: false });

  const filterBarRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('wc_intro_seen', 'true');
    setIntroFinished(true);
  }, []);

  // Filtered achievements
  const filteredAchievements = useMemo(() => {
    if (activeFilter === 'ALL') return achievements;
    return achievements.filter(item => 
      item.members.some(m => m.toUpperCase() === activeFilter)
    );
  }, [activeFilter]);

  // Update sliding glass indicator on active filter change
  useEffect(() => {
    if (!filterBarRef.current) return;
    const activeBtn = filterBarRef.current.querySelector('.filter-tab.active');
    if (activeBtn) {
      setPillStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth
      });
    }
  }, [activeFilter, introFinished]);

  // Smooth custom cursor tracking
  useEffect(() => {
    const handlePointerMove = (e) => {
      setCursorData(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        visible: true
      }));
    };

    const handlePointerLeave = () => {
      setCursorData(prev => ({ ...prev, visible: false }));
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('mouseleave', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  const handleCursorLabel = (label) => {
    setCursorData(prev => ({ ...prev, label }));
  };

  const getMemberAchievementCount = (name) => {
    return achievements.filter(item => item.members.includes(name)).length;
  };

  // Identify featured champion item
  const featuredItem = useMemo(() => {
    return filteredAchievements.find(a => a.category === 'Hackathon') || filteredAchievements[0];
  }, [filteredAchievements]);

  const regularItems = useMemo(() => {
    return filteredAchievements.filter(a => a.id !== (featuredItem ? featuredItem.id : null));
  }, [filteredAchievements, featuredItem]);

  return (
    <div className="awwwards-achievements-page">
      {/* 1. Cinematic Intro Overlay */}
      {!introFinished && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* 2. Interactive Background Cyber Constellation & Ambient Beams */}
      <CyberConstellation />
      <div className="technical-grid-bg" aria-hidden="true">
        <div className="ambient-beam beam-1"></div>
        <div className="ambient-beam beam-2"></div>
      </div>

      {/* 3. Custom Desktop Cursor */}
      <div 
        className={`custom-cursor ${cursorData.visible ? 'visible' : ''} cursor-${cursorData.label.toLowerCase()}`}
        style={{
          transform: `translate3d(${cursorData.x}px, ${cursorData.y}px, 0)`
        }}
        aria-hidden="true"
      >
        <div className="cursor-dot"></div>
        {cursorData.label !== 'DEFAULT' && (
          <span className="cursor-badge">{cursorData.label}</span>
        )}
      </div>

      <div className="content-container">
        {/* ==========================================
            4. HERO SECTION (EDITORIAL & SPACIOUS)
            ========================================== */}
        <section className="editorial-hero">
          <div className="hero-top-eyebrow">
            <span className="hero-index">03</span>
            <span className="hero-tagline">// WANNACRY REPOSITORY</span>
          </div>

          <h1 className="hero-monolith-title kinetic-title">
            ACHIEVEMENTS
          </h1>

          <div className="hero-statement">
            <p className="statement-sub">
              BUILT DIFFERENTLY.
            </p>
            <p className="statement-desc">
              We do not just hold certificates. We design, break, model, and dominate real-world engineering arenas.
            </p>
          </div>

          <div className="hero-scroll-indicator">
            <span className="scroll-text">EXPLORE RECORDED WINS</span>
            <ChevronDown size={14} className="scroll-arrow" />
          </div>
        </section>

        {/* ==========================================
            5. INTERACTIVE TEAM IDENTITIES (SPATIAL)
            ========================================== */}
        <section className="spatial-team-section">
          <div className="section-eyebrow">
            <span>[ 01 // CORE OPERATORS ]</span>
          </div>
          
          <div className="spatial-team-canvas">
            {teamMembers.map((member) => {
              const isHovered = hoveredMember === member.name;
              const isDimmed = hoveredMember && !isHovered;
              const count = getMemberAchievementCount(member.name);
              const isActiveInFilter = activeFilter === member.name.toUpperCase();

              return (
                <div
                  key={member.id}
                  className={`floating-identity-pill pill-${member.id} ${isHovered ? 'active' : ''} ${isDimmed ? 'dimmed' : ''} ${isActiveInFilter ? 'selected' : ''}`}
                  onMouseEnter={() => {
                    setHoveredMember(member.name);
                    handleCursorLabel('OPERATOR');
                  }}
                  onMouseLeave={() => {
                    setHoveredMember(null);
                    handleCursorLabel('DEFAULT');
                  }}
                  onClick={() => {
                    setActiveFilter(member.name.toUpperCase());
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Filter achievements by ${member.name}`}
                >
                  <div className="identity-avatar">
                    <span className="avatar-initial">{member.name.charAt(0)}</span>
                    <span className="identity-pulse-ring"></span>
                  </div>
                  
                  <div className="identity-details">
                    <div className="identity-name-row">
                      <span className="identity-name">{member.name}</span>
                      <span className="identity-count">[{count < 10 ? `0${count}` : count} WINS]</span>
                    </div>
                    <span className="identity-role">{member.role.split('•')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            6. ACHIEVEMENT STATISTICS (MONUMENTAL)
            ========================================== */}
        <section className="monumental-stats-section">
          <div className="stats-grid">
            <StatCounter endValue={achievements.length} label="ACHIEVEMENTS" />
            <StatCounter endValue={3} label="MINDS" />
            <StatCounter endValue={1} label="SYNCHRONIZED TEAM" />
            <StatCounter endValue={100} label="PRODUCTION QUALITY" suffix="%" />
          </div>
        </section>

        {/* ==========================================
            7. LIQUID FILTER BAR & ARTISTIC SHOWCASE
            ========================================== */}
        <section className="achievements-gallery-section" id="achievements-gallery">
          <div className="gallery-header-bar">
            <div className="gallery-title-box">
              <span className="section-num">[ 02 // MILESTONES ]</span>
              <h2 className="gallery-heading">RECORDED WINS</h2>
            </div>

            {/* Liquid Sliding Filter Bar */}
            <div className="liquid-filter-wrapper" ref={filterBarRef}>
              <div 
                className="liquid-sliding-pill" 
                style={{ 
                  transform: `translateX(${pillStyle.left}px)`,
                  width: `${pillStyle.width}px` 
                }}
                aria-hidden="true"
              />
              {FILTER_OPTIONS.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    className={`filter-tab ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                    onMouseEnter={() => handleCursorLabel('FILTER')}
                    onMouseLeave={() => handleCursorLabel('DEFAULT')}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Showcase Layout (Hero Spotlight + Asymmetric Holographic Stream) */}
          <div className="achievements-showcase-layout">
            {/* Featured Hero Highlight Card */}
            {featuredItem && (
              <div className="showcase-featured-slot">
                <ModernAchievementCard 
                  item={featuredItem} 
                  index={0} 
                  isFeatured={true}
                  onHoverChange={handleCursorLabel}
                />
              </div>
            )}

            {/* Secondary Stream Grid */}
            <div className="showcase-stream-grid">
              {regularItems.map((item, index) => (
                <ModernAchievementCard 
                  key={item.id} 
                  item={item} 
                  index={index + 1} 
                  isFeatured={false}
                  onHoverChange={handleCursorLabel}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            8. TIMELINE STORYTELLING SECTION
            ========================================== */}
        <section className="timeline-story-section">
          <div className="section-eyebrow">
            <span>[ 03 // TRAJECTORY ]</span>
          </div>
          <h2 className="timeline-section-title">THE EXPEDITION</h2>

          <div className="timeline-track-container">
            <div className="timeline-line-track"></div>
            <div className="timeline-nodes">
              {timelineMilestones.map((m, idx) => (
                <div key={idx} className="timeline-node">
                  <div className="node-marker">
                    <span className="marker-dot"></span>
                    <span className="marker-ring"></span>
                  </div>
                  <div className="node-content">
                    <span className="node-year">{m.year}</span>
                    <h3 className="node-stage">{m.stage}</h3>
                    <p className="node-highlight">{m.highlight}</p>
                    <span className="node-status">[{m.status}]</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            9. WANNACRY DNA / KINETIC TYPOGRAPHY
            ========================================== */}
        <section className="dna-kinetic-section">
          <div className="dna-eyebrow">OUR DNA</div>
          <div className="dna-word-stack">
            <div className="dna-word" data-word="BUILD.">BUILD.</div>
            <div className="dna-word" data-word="BREAK.">BREAK.</div>
            <div className="dna-word" data-word="LEARN.">LEARN.</div>
            <div className="dna-word" data-word="REPEAT.">REPEAT.</div>
          </div>
        </section>

        {/* ==========================================
            10. FINAL CINEMATIC CTA
            ========================================== */}
        <section className="cinematic-footer-cta">
          <div className="cta-ambient-glow"></div>
          <div className="cta-content">
            <span className="cta-status">CURRENT STATE: EXECUTING</span>
            <h2 className="cta-title">STILL BUILDING.</h2>
            <div className="cta-team-manifest">
              <span>PRIYAANSH</span>
              <span className="bullet">•</span>
              <span>PRANJAL</span>
              <span className="bullet">•</span>
              <span>KRISHNA</span>
            </div>
            
            <a 
              href="https://github.com/PriyaanshPandey/WannaCry"
              target="_blank" 
              rel="noopener noreferrer"
              className="magnetic-cta-btn"
              onMouseEnter={() => handleCursorLabel('EXPLORE')}
              onMouseLeave={() => handleCursorLabel('DEFAULT')}
            >
              <span>EXPLORE GITHUB REPOSITORY</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Achievements;
