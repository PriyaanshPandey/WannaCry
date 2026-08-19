import { useState } from 'react';
import { Terminal, ExternalLink, X } from 'lucide-react';
import './MemberCard.css';

const MemberCard = ({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <div className="member-card" onClick={toggleModal}>
        <div className="member-card-inner">
          <div className="member-image-placeholder">
            {member.image ? (
              <img src={member.image} alt={member.name} />
            ) : (
              <div className="placeholder-initial">{member.name.charAt(0)}</div>
            )}
          </div>
          <div className="member-info">
            <h3 className="member-name">{member.name}</h3>
            <p className="member-role">{member.role}</p>
          </div>
          <div className="member-hover-reveal">
            <span>[ VIEW DETAILS ]</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={toggleModal}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              <h2 className="modal-name">{member.name.toUpperCase()}</h2>
              <p className="modal-role">{member.role}</p>
            </div>
            
            <div className="modal-body">
              <p className="modal-bio">{member.shortBio}</p>
              
              <div className="modal-skills-section">
                <h4>SKILLS</h4>
                <div className="modal-skills-list">
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="modal-socials">
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <Terminal size={20} /> GitHub
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={20} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberCard;
