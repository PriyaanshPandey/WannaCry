import MemberCard from '../components/MemberCard';
import SkillVisualizer from '../components/SkillVisualizer';
import { teamMembers, skillCategories } from '../data/team';
import './Team.css';

const Team = () => {
  return (
    <div className="team-page animate-fade-in">
      <section className="container">
        <div className="page-header">
          <h1 className="page-title">MEET WANNACRY</h1>
          <p className="page-subtitle">
            Three people.<br />
            Different strengths.<br />
            <span className="highlight">One team.</span>
          </p>
        </div>

        <div className="members-grid delay-1 animate-fade-in">
          {teamMembers.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      <section className="container skills-section delay-2 animate-fade-in">
        <div className="section-header">
          <h2>TEAM CAPABILITIES</h2>
          <div className="header-line"></div>
        </div>
        
        <SkillVisualizer categories={skillCategories} />
      </section>
    </div>
  );
};

export default Team;
