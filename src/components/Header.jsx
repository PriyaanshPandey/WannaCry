import { motion } from 'framer-motion';
import GlitchText from './GlitchText';
import './Header.css';

export default function Header() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header 
      className="hacker-header"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="terminal-prompt-container">
        <motion.div className="terminal-line" variants={textVariants}>
          <span className="prompt-user">root@wannacry</span>
          <span className="prompt-colon">:</span>
          <span className="prompt-path">~</span>
          <span className="prompt-symbol">$</span>
          <span className="prompt-cmd"> ./execute_team_protocol.sh</span>
        </motion.div>
        
        <motion.div className="terminal-line output" variants={textVariants}>
          <span className="output-arrow">{'>'}</span> 
          <GlitchText as="span" periodic={true}>[3] Entities located.</GlitchText> Synergizing capabilities...
        </motion.div>
        
        <motion.div className="terminal-line cursor-line" variants={textVariants}>
          <span className="blinking-cursor">_</span>
        </motion.div>
      </div>
    </motion.header>
  );
}
