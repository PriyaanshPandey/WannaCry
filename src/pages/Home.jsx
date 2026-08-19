import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Virus3D from '../components/Virus3D';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import './Home.css';

const projects = [
  {
    id: '01',
    title: 'CYBER DOMAIN',
    description: 'A futuristic cyber security platform showcasing real-time threat analysis, glowing visuals, and an intuitive dark-mode interface.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'NEURAL NET',
    description: 'A clean, dark-themed AI visualization tool designed for effortless model training tracking, real-time data flow, and intuitive user experience.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'QUANTUM KEY',
    description: 'A bold, premium authentication gateway featuring 3D visuals, cinematic motion, and an emphasis on security storytelling.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop'
  }
];

const ScrollSection = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

  return (
    <div ref={ref} className="scroll-section">
      <motion.div className="scroll-title" style={{ y, opacity }}>
        <h2>{project.title}</h2>
      </motion.div>
      
      <motion.div className="scroll-visual" style={{ scale, opacity }}>
        <div className="project-image-container">
          <img src={project.image} alt={project.title} className="project-image" />
          <div className="project-image-overlay"></div>
        </div>
      </motion.div>
      
      <motion.div className="scroll-desc" style={{ y: useTransform(scrollYProgress, [0, 1], [-150, 150]), opacity }}>
        <p>{project.description}</p>
        <div className="scroll-index">
          <svg viewBox="0 0 100 100" className="index-circle">
            <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <circle cx="50" cy="50" r="48" fill="none" strokeWidth="2" strokeDasharray="300" strokeDashoffset="150" />
          </svg>
          <span>{project.id}</span>
        </div>
      </motion.div>
    </div>
  );
};

const Home = () => {
  // Smooth scrolling setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);

  // Mouse parallax setup for background typography
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  const textOffsetX = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
  const textOffsetY = useTransform(smoothMouseY, [-1, 1], [-30, 30]);
  const textOffsetReverseX = useTransform(smoothMouseX, [-1, 1], [30, -30]);
  const textOffsetReverseY = useTransform(smoothMouseY, [-1, 1], [30, -30]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div className="home-cyber" onMouseMove={handleMouseMove}>
      {/* 3D Background - Fixed Position */}
      <div className="canvas-container">
        <Virus3D />
      </div>

      <div className="content-layer">
        {/* Hero Section */}
        <section className="hero-section">
          <motion.div className="bg-typography">
            <motion.span 
              className="bg-text" 
              style={{ x: textOffsetX, y: textOffsetY }}
            >
              092
            </motion.span>
            <motion.span 
              className="bg-text offset" 
              style={{ x: textOffsetReverseX, y: textOffsetReverseY }}
            >
              WANNACRY
            </motion.span>
          </motion.div>

          <div className="home-cyber-content container">
            <motion.div 
              className="hero-header"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="subtitle">THE NEXT EVOLUTION OF WEB</p>
              <h1 className="hero-title">
                WE SPREAD<br />
                <span className="title-red">IDEAS.</span>
              </h1>
            </motion.div>

            <motion.div 
              className="hero-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              <div className="hero-info">
                <p>Three minds building, experimenting</p>
                <p>and creating with technology.</p>
              </div>
              
              <div className="hero-actions">
                <Link to="/team" className="btn-cyber">[ MEET THE TEAM ]</Link>
                <Link to="/achievements" className="btn-cyber-outline">[ OUR ACHIEVEMENTS ]</Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              SCROLL TO EXPLORE
            </motion.div>
          </div>
        </section>

        {/* Scroll Effects Section */}
        <section className="gallery-section">
          <div className="gallery-header container">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              OUR WORK
            </motion.h2>
          </div>
          
          <div className="scroll-container">
            {projects.map((project, index) => (
              <ScrollSection key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
