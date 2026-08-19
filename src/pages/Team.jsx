import TeamCard from '../components/TeamCard';
import CapabilitiesTree from '../components/CapabilitiesTree';
import Header from '../components/Header';
import { teamMembers } from '../data/team';
import './Team.css';

const Team = () => {
  const getMainColor = (name) => {
    if (name === 'Priyaansh') return 'var(--neon-cyan)';
    if (name === 'Pranjal') return 'var(--neon-green)';
    if (name === 'Krishna') return 'var(--neon-magenta)';
    return 'var(--neon-green)';
  };

  const getRoles = (name) => {
    if (name === 'Priyaansh') return ['UI/UX', 'Frontend'];
    if (name === 'Pranjal') return ['Backend', 'AI/ML'];
    if (name === 'Krishna') return ['AI/ML', 'Research'];
    return [];
  };

  return (
    <div className="team-page animate-fade-in">
      <Header />
      
      <section className="container">
        <div className="members-grid delay-1 animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', padding: '2rem' }}>
          {teamMembers.map(member => (
            <TeamCard 
              key={member.id} 
              name={member.name} 
              roles={getRoles(member.name)}
              mainColor={getMainColor(member.name)}
            />
          ))}
        </div>
      </section>

      <section className="container skills-section delay-2 animate-fade-in">
        <CapabilitiesTree />
      </section>
    </div>
  );
};

export default Team;
