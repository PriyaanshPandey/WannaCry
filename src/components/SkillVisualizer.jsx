import './SkillVisualizer.css';

const SkillVisualizer = ({ categories }) => {
  return (
    <div className="skill-visualizer">
      {categories.map((category, idx) => (
        <div key={idx} className="skill-node">
          <div className="skill-category-name">{category.name}</div>
          <div className="skill-tree">
            {category.members.map((member, mIdx) => (
              <div key={mIdx} className="skill-branch">
                <span className="branch-line">
                  {mIdx === category.members.length - 1 ? '└──' : '├──'}
                </span>
                <span className="member-node">{member}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillVisualizer;
