import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown, Folder, FileCode, TerminalSquare } from 'lucide-react';
import './CapabilitiesTree.css';

const treeData = [
  {
    name: 'Frontend',
    type: 'folder',
    color: 'var(--neon-cyan)',
    children: [
      { name: 'UI_UX_Design.fig', type: 'file' },
      { name: 'Priyaansh.tsx', type: 'file', owner: 'Priyaansh' },
      { name: 'Animations.css', type: 'file' }
    ]
  },
  {
    name: 'Backend',
    type: 'folder',
    color: 'var(--neon-green)',
    children: [
      { name: 'API_Gateway.go', type: 'file' },
      { name: 'Pranjal.js', type: 'file', owner: 'Pranjal' },
      { name: 'Database.sql', type: 'file' }
    ]
  },
  {
    name: 'AI_ML',
    type: 'folder',
    color: 'var(--neon-magenta)',
    children: [
      { name: 'Model_Training.py', type: 'file' },
      { name: 'Research_Notes.md', type: 'file', owner: 'Krishna' },
      { name: 'Krishna.ipynb', type: 'file', owner: 'Krishna' },
      { name: 'Pranjal.py', type: 'file', owner: 'Pranjal' }
    ]
  }
];

const TreeNode = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === 'folder';

  return (
    <div className="tree-node">
      <div 
        className={`tree-item ${isFolder ? 'folder' : 'file'}`}
        style={{ paddingLeft: `${level * 1.5}rem` }}
        onClick={() => isFolder && setIsOpen(!isOpen)}
      >
        {isFolder ? (
          <>
            <span className="tree-icon-wrapper">
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
            <Folder size={16} color={node.color} className="mr-2" />
            <span className="folder-name" style={{ color: node.color }}>{node.name}/</span>
          </>
        ) : (
          <>
            <span className="tree-icon-wrapper invisible">
              <ChevronRight size={16} />
            </span>
            <FileCode size={16} className="file-icon mr-2" />
            <span className="file-name">{node.name}</span>
            {node.owner && (
              <span className="file-owner text-muted text-sm ml-4">
                // maintainer: {node.owner}
              </span>
            )}
          </>
        )}
      </div>
      
      {isFolder && isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="tree-children"
        >
          {node.children.map((child, idx) => (
            <TreeNode key={idx} node={child} level={level + 1} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default function CapabilitiesTree() {
  return (
    <section className="capabilities-section">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-title">
            <TerminalSquare size={14} className="mr-2" /> 
            wannacry_capabilities.sh
          </div>
        </div>
        
        <div className="terminal-body">
          <div className="tree-root-label">
            <span className="prompt-path">~/wannacry</span>
            <span className="prompt-symbol">$</span> tree capabilities/
          </div>
          <div className="tree-container">
            {treeData.map((node, idx) => (
              <TreeNode key={idx} node={node} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
