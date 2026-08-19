import { useState, useEffect } from 'react';
import './TerminalBlock.css';

const TerminalBlock = ({ lines = [], typingSpeed = 30, initialDelay = 500 }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout;
    
    if (displayedLines.length === 0) {
      timeout = setTimeout(() => setIsTyping(true), initialDelay);
    }

    if (isTyping && currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        timeout = setTimeout(() => {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            if (newLines[currentLineIndex] === undefined) {
              newLines[currentLineIndex] = '';
            }
            newLines[currentLineIndex] += currentLine[currentCharIndex];
            return newLines;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 150); // slight pause between lines
      }
    }

    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, isTyping, lines, initialDelay, typingSpeed, displayedLines.length]);

  return (
    <div className="terminal-block">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn close"></span>
          <span className="terminal-btn minimize"></span>
          <span className="terminal-btn maximize"></span>
        </div>
        <div className="terminal-title">wannacry.exe</div>
      </div>
      <div className="terminal-body">
        {displayedLines.map((line, index) => (
          <div key={index} className="terminal-line">
            <span className="terminal-prompt">{'> '}</span>
            {line}
          </div>
        ))}
        {currentLineIndex < lines.length && (
          <span className="terminal-cursor">█</span>
        )}
      </div>
    </div>
  );
};

export default TerminalBlock;
