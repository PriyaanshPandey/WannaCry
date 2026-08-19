import React from 'react';
import NetflixNav from '../components/NetflixNav';
import NetflixHero from '../components/NetflixHero';
import NetflixRow from '../components/NetflixRow';
import { teamMembers } from '../data/team';
import './NetflixTeam.css';

const Team = () => {
  const aiTeam = teamMembers.filter(m => m.skills.includes('AI/ML'));
  const frontendTeam = teamMembers.filter(m => m.skills.includes('Frontend') || m.skills.includes('UI/UX'));
  const backendTeam = teamMembers.filter(m => m.skills.includes('Backend') || m.skills.includes('Database'));

  return (
    <div className="netflix-theme-page">
      <NetflixNav />
      <NetflixHero />
      
      <div className="netflix-rows-container" style={{ marginTop: '-30px', paddingBottom: '50px', position: 'relative', zIndex: 10 }}>
        <NetflixRow title="Meet The Team" data={teamMembers} />
        {aiTeam.length > 0 && <NetflixRow title="AI & Machine Learning" data={aiTeam} />}
        {frontendTeam.length > 0 && <NetflixRow title="Frontend & UI/UX" data={frontendTeam} />}
        {backendTeam.length > 0 && <NetflixRow title="Backend & Systems" data={backendTeam} />}
      </div>
    </div>
  );
};

export default Team;

