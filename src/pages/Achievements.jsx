import { useState, useMemo } from 'react';
import { 
  Trophy, 
  Award, 
  Code, 
  Zap, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Users, 
  Terminal,
  Filter
} from 'lucide-react';
import { achievements } from '../data/achievements';
import './Achievements.css';

// Category theme mapping with icons and neon hues
const CATEGORY_MAP = {
  Hackathon: {
    icon: Trophy,
    className: 'badge-hackathon',
    label: 'HACKATHON'
  },
  Project: {
    icon: Code,
    className: 'badge-project',
    label: 'PROJECT'
  },
  Certification: {
    icon: Award,
    className: 'badge-certification',
    label: 'CERTIFICATION'
  },
  Competition: {
    icon: Zap,
    className: 'badge-competition',
    label: 'COMPETITION'
  },
  Research: {
    icon: Sparkles,
    className: 'badge-research',
    label: 'RESEARCH'
  }
};

// Distinct styling per team member for avatar pills
const MEMBER_STYLES = {
  Priyaansh: {
    initial: 'P',
    className: 'avatar-priyaansh'
  },
  Pranjal: {
    initial: 'P',
    className: 'avatar-pranjal'
  },
  Krishna: {
    initial: 'K',
    className: 'avatar-krishna'
  }
};

const FILTER_OPTIONS = ['All', 'Priyaansh', 'Pranjal', 'Krishna'];

const Achievements = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Filtered achievements based on selected team member
  const filteredAchievements = useMemo(() => {
    if (activeFilter === 'All') return achievements;
    return achievements.filter(item => 
      item.members && item.members.includes(activeFilter)
    );
  }, [activeFilter]);

  // Counts for each filter button
  const filterCounts = useMemo(() => {
    const counts = { All: achievements.length };
    FILTER_OPTIONS.slice(1).forEach(name => {
      counts[name] = achievements.filter(
        item => item.members && item.members.includes(name)
      ).length;
    });
    return counts;
  }, []);

  const getCategoryDetails = (category) => {
    return CATEGORY_MAP[category] || {
      icon: Trophy,
      className: 'badge-default',
      label: (category || 'MILESTONE').toUpperCase()
    };
  };

  const getMemberStyle = (name) => {
    return MEMBER_STYLES[name] || {
      initial: name ? name.charAt(0).toUpperCase() : '?',
      className: 'avatar-default'
    };
  };

  return (
    <div className="achievements-page">
      {/* Faint ambient depth glow orbs breaking up flat grid */}
      <div className="ambient-orb orb-primary" aria-hidden="true"></div>
      <div className="ambient-orb orb-secondary" aria-hidden="true"></div>

      <section className="container achievements-container">
        {/* Page Header */}
        <div className="page-header animate-fade-in">
          <div className="header-badge">
            <Terminal size={14} />
            <span>SYSTEM.LOGS // RECORDED_WINS</span>
          </div>
          <h1 className="page-title">OUR ACHIEVEMENTS</h1>
          <p className="page-subtitle">
            The work.<br />
            The challenges.<br />
            <span className="highlight">The milestones.</span>
          </p>
        </div>

        {/* Interactive Team Filter Bar */}
        <div className="filter-wrapper animate-fade-in delay-1">
          <div className="filter-label">
            <Filter size={14} />
            <span>FILTER_BY_OPERATOR:</span>
          </div>
          <div className="filter-bar" role="tablist" aria-label="Filter achievements by team member">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter;
              const count = filterCounts[filter] || 0;
              return (
                <button
                  key={filter}
                  role="tab"
                  aria-selected={isActive}
                  className={`filter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  <span className="filter-text">{filter.toUpperCase()}</span>
                  <span className="filter-count">[{count < 10 ? `0${count}` : count}]</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Achievements Grid */}
        <div 
          key={activeFilter} 
          className="achievements-grid-wrapper animate-fade-in delay-2"
        >
          {filteredAchievements.length === 0 ? (
            <div className="no-achievements animate-fade-in">
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span className="terminal-title">query_status.sh</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-line prompt">
                  {`> system.query("achievements", { member: "${activeFilter}" })`}
                </div>
                <div className="terminal-line error">
                  [!] 0 records found for operator "{activeFilter}". Status: STANDBY_OR_BUILDING.
                </div>
                <button 
                  className="terminal-reset-btn"
                  onClick={() => setActiveFilter('All')}
                >
                  [ RESET FILTER TO ALL ]
                </button>
              </div>
            </div>
          ) : (
            <div className="achievements-grid">
              {filteredAchievements.map((achievement, index) => {
                const categoryData = getCategoryDetails(achievement.category);
                const CategoryIcon = categoryData.icon;

                return (
                  <article 
                    key={achievement.id} 
                    className="achievement-card"
                    style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                  >
                    {/* Card Top Meta Header */}
                    <div className="achievement-meta">
                      <div className="achievement-year">
                        <Calendar size={13} />
                        <span>{achievement.year}</span>
                      </div>
                      <div className={`achievement-badge ${categoryData.className}`}>
                        <CategoryIcon size={12} />
                        <span>{categoryData.label}</span>
                      </div>
                    </div>

                    {/* Card Main Content */}
                    <div className="achievement-content">
                      <h2 className="achievement-title">{achievement.title}</h2>
                      <p className="achievement-desc">{achievement.description}</p>
                    </div>

                    {/* Card Footer: Result + Team Avatar Pills */}
                    <div className="achievement-footer">
                      <div className="achievement-result-box">
                        <span className="result-label">RESULT:</span>
                        <div className="result-value">
                          <CheckCircle2 size={14} className="result-icon" />
                          <span>{achievement.result}</span>
                        </div>
                      </div>

                      <div className="achievement-team-section">
                        <div className="team-section-label">
                          <Users size={12} />
                          <span>TEAM:</span>
                        </div>
                        <div className="achievement-team-pills">
                          {achievement.members.map((member, idx) => {
                            const memberInfo = getMemberStyle(member);
                            return (
                              <div 
                                key={idx} 
                                className={`team-avatar-pill ${memberInfo.className}`}
                                title={`Team Member: ${member}`}
                              >
                                <span className="avatar-circle">
                                  {memberInfo.initial}
                                </span>
                                <span className="avatar-name">{member}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Achievements;
