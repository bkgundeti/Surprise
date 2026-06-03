import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const FinalCelebration = ({ onReplay }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    // Continuous celebration
    const duration = 60 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#E0115F']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#E0115F']
      });

      if (Date.now() < end) {
        animationRef.current = requestAnimationFrame(frame);
      }
    };

    animationRef.current = requestAnimationFrame(frame);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      confetti.reset(); // Stop all confetti immediately on unmount
    };
  }, []);

  const handleReplay = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    confetti.reset();
    onReplay();
  };

  return (
    <div className="w-full min-h-screen bg-premium-dark text-white flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -window.innerHeight],
              opacity: [0, 0.5, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 5 + 5,
              delay: Math.random() * 5 
            }}
            className="absolute bottom-0 w-1 h-1 bg-premium-gold rounded-full"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div className="z-10 max-w-5xl space-y-10 md:space-y-16 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-serif leading-tight px-2">
            Thank You For Being Such An <br className="hidden sm:block"/>
            <span className="text-premium-rose italic">Important Part</span> Of My Life
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="text-lg sm:text-2xl md:text-5xl font-dancing text-premium-gold tracking-wide leading-relaxed px-4"
        >
          Some friendships become family. <br className="sm:hidden"/> Some people become home. <br/>
          Thank you for being both.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1.5 }}
          className="pt-6 md:pt-10"
        >
          <h1 className="text-3xl sm:text-5xl md:text-9xl font-serif text-glow mb-4">
            Forever Grateful For You,
          </h1>
          <span className="text-5xl sm:text-7xl md:text-[12rem] font-dancing text-premium-rose block mt-4 sm:mt-6">
            Bhakti
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 6, duration: 1 }}
          className="pt-10 md:pt-20"
        >
          <button 
            onClick={handleReplay}
            className="text-white/50 hover:text-premium-gold transition-all font-serif tracking-[0.4em] uppercase text-[10px] sm:text-sm border-b border-white/20 pb-2 hover:border-premium-gold hover:opacity-100"
          >
            Relive The Magic Again
          </button>
        </motion.div>
      </div>

      {/* Floating Hearts Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: window.innerHeight + 50, x: Math.random() * window.innerWidth }}
            animate={{ y: -100, rotate: 360 }}
            transition={{ repeat: Infinity, duration: Math.random() * 10 + 10, ease: "linear" }}
            className="absolute text-premium-rose/20 text-4xl"
          >
            ❤
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FinalCelebration;
