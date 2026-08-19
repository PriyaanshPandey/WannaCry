import { achievements } from '../data/achievements';
import './Achievements.css';

const Achievements = () => {
  return (
    <div className="achievements-page animate-fade-in">
      <section className="container">
        <div className="page-header">
          <h1 className="page-title">OUR ACHIEVEMENTS</h1>
          <p className="page-subtitle">
            The work.<br />
            The challenges.<br />
            <span className="highlight">The milestones.</span>
          </p>
        </div>

        <div className="achievements-list delay-1 animate-fade-in">
          {achievements.length === 0 ? (
            <div className="no-achievements">
              <div className="terminal-text">{'> system.query("achievements")'}</div>
              <div className="terminal-text error">Error: No records found. Status: BUILDING.</div>
            </div>
          ) : (
            achievements.map(achievement => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-meta">
                  <span className="achievement-year">{achievement.year}</span>
                  <span className="achievement-category">{achievement.category}</span>
                </div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-desc">{achievement.description}</p>
                
                <div className="achievement-footer">
                  <div className="achievement-result">
                    <span className="result-label">RESULT:</span> {achievement.result}
                  </div>
                  <div className="achievement-team">
                    {achievement.members.map((m, idx) => (
                      <span key={idx} className="team-member-badge">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Achievements;
