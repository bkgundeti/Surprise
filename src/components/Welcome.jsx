import React from 'react';
import { motion } from 'framer-motion';

const Welcome = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-premium-dark relative overflow-hidden"
    >
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1a1a1a_0%,_#000_100%)]"></div>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-premium-gold rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5
            }}
            animate={{ 
              y: [null, "-100%"],
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-premium-rose/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-premium-gold/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 text-center px-6 max-w-4xl"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 className="text-premium-gold font-serif tracking-[0.4em] uppercase text-sm md:text-base mb-6 opacity-80">
            A Special Journey For
          </h2>
          <h1 className="text-6xl md:text-9xl font-serif mb-12 text-glow relative">
            Bhakti
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute -bottom-4 left-0 h-px bg-gradient-to-r from-transparent via-premium-gold to-transparent opacity-50"
            />
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className="text-white/60 font-serif italic text-lg md:text-xl mb-16 tracking-wide">
            "Some moments are worth remembering forever."
          </p>

          <motion.button
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(212, 175, 55, 0.1)",
              boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-12 py-5 border border-premium-gold text-premium-gold font-bold rounded-full tracking-[0.3em] uppercase transition-all duration-500 hover:text-white"
          >
            Begin The Journey
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Footer-like subtle text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3 }}
        className="absolute bottom-10 text-[10px] tracking-[0.5em] uppercase text-white pointer-events-none"
      >
        Scroll to discover
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
