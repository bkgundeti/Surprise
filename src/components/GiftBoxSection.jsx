import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Stars, Sparkles, Environment, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const GiftBox = ({ isOpen }) => {
  const meshRef = useRef();
  const lidGroupRef = useRef();

  useFrame((state) => {
    if (!isOpen) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    } else {
      lidGroupRef.current.position.y = THREE.MathUtils.lerp(lidGroupRef.current.position.y, 6, 0.05);
      lidGroupRef.current.position.z = THREE.MathUtils.lerp(lidGroupRef.current.position.z, -2, 0.05);
      lidGroupRef.current.rotation.x = THREE.MathUtils.lerp(lidGroupRef.current.rotation.x, -Math.PI / 1.5, 0.05);
    }
  });

  return (
    <group ref={meshRef} scale={window.innerWidth < 768 ? 1.2 : 1.5}>
      {/* Box Base */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#E0115F" 
          metalness={0.7} 
          roughness={0.2} 
          emissive="#400" 
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Ribbons */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2.05, 2.05, 0.4]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.4, 2.05, 2.05]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Lid Group */}
      <group ref={lidGroupRef} position={[0, 0.6, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 0.6, 2.2]} />
          <meshStandardMaterial color="#E0115F" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.25, 0.65, 0.45]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.45, 0.65, 2.25]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Bow */}
        <group position={[0, 0.4, 0]}>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <torusGeometry args={[0.3, 0.1, 16, 32]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh rotation={[0, -Math.PI / 4, 0]}>
            <torusGeometry args={[0.3, 0.1, 16, 32]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>

      {isOpen && (
        <pointLight position={[0, 0, 0]} intensity={10} color="#D4AF37" />
      )}
    </group>
  );
};

const GiftBoxSection = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(onNext, 3000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full bg-premium-dark relative flex items-center justify-center overflow-hidden"
    >
      {/* Interaction Overlay - Makes clicking easier on all devices */}
      <div 
        className="absolute inset-0 z-20 cursor-pointer" 
        onClick={handleOpen}
      />

      <div className="absolute inset-0 z-0">
        <Canvas shadows gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
            <Environment preset="night" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
            <spotLight position={[-10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={10} size={2} speed={0.4} color="#D4AF37" />

            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <GiftBox isOpen={isOpen} />
            </Float>

            <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
          </Suspense>
        </Canvas>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          >
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-64 h-64 bg-premium-gold rounded-full filter blur-[100px]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-20 left-0 w-full text-center pointer-events-none z-10">
        {!isOpen && (
          <motion.div
            animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="space-y-4 px-4"
          >
            <h3 className="text-white text-2xl md:text-4xl font-serif tracking-widest text-glow">A Surprise Awaits</h3>
            <p className="text-premium-gold text-xs md:text-sm tracking-[0.5em] uppercase opacity-70">Tap Anywhere To Open</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GiftBoxSection;
