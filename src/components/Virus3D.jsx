import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';

const VirusMesh = ({ scrollProgress }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Base rotation plus scroll-based rotation speed
      meshRef.current.rotation.y = time * 0.2 + scrollProgress * 2;
      meshRef.current.rotation.z = time * 0.1 + scrollProgress;
      
      // Make it react AGGRESSIVELY to mouse position
      const targetX = (state.mouse.x * Math.PI);
      const targetY = (state.mouse.y * Math.PI);
      
      meshRef.current.rotation.x += 0.1 * (targetY - meshRef.current.rotation.x);
      meshRef.current.rotation.y += 0.1 * (targetX - meshRef.current.rotation.y);
      
      // Scale based on scroll and hover
      const scale = 1 + scrollProgress * 0.5 + (hovered ? 0.2 : 0);
      meshRef.current.scale.set(scale, scale, scale);
    }
    
    if (materialRef.current) {
      // Increase distortion based on scroll and hover
      materialRef.current.distort = 0.4 + scrollProgress * 0.8 + (hovered ? 0.3 : 0);
      materialRef.current.speed = 2 + scrollProgress * 5 + (hovered ? 3 : 0);
    }
  });

  return (
    <Sphere 
      ref={meshRef} 
      args={[1.5, 64, 64]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        ref={materialRef}
        color={hovered ? "#ffffff" : "#00ff9d"}
        emissive="#00ff9d"
        emissiveIntensity={0.5}
        wireframe={true}
        distort={0.6}
        speed={2.5}
        roughness={0.2}
      />
    </Sphere>
  );
};

const Virus3D = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress from 0 to 1
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollY(currentScroll / totalScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00ff9d" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#003322" />
        <VirusMesh scrollProgress={scrollY} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Virus3D;
