import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const Cake = ({ onNext }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  const blowCandles = () => {
    setCandlesBlown(true);
    setShowSmoke(true);
    
    // Premium Confetti and Fireworks
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 50 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 70 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.3 } });
    }, 250);

    setTimeout(() => {
      setShowSmoke(false);
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-premium-dark px-4 overflow-hidden"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <motion.h2 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-3xl md:text-5xl font-serif text-premium-gold mb-16 uppercase tracking-[0.4em] text-glow"
        >
          Make A Wish
        </motion.h2>
        
        {/* Premium Realistic Cake Container */}
        <div className="relative w-72 h-72 md:w-[28rem] md:h-[28rem] mx-auto">
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            <defs>
              <linearGradient id="cakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4A2C2A" />
                <stop offset="50%" stopColor="#6D403D" />
                <stop offset="100%" stopColor="#4A2C2A" />
              </linearGradient>
              <linearGradient id="frostingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E0115F" />
                <stop offset="50%" stopColor="#FF4D8D" />
                <stop offset="100%" stopColor="#E0115F" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Plate */}
            <ellipse cx="100" cy="180" rx="80" ry="15" fill="#333" />
            <ellipse cx="100" cy="178" rx="75" ry="12" fill="#555" />
            
            {/* Cake Base Layer */}
            <path d="M40 130 L160 130 L160 170 Q160 180 100 180 Q40 180 40 170 Z" fill="url(#cakeGradient)" />
            
            {/* Middle Frosting */}
            <rect x="40" y="125" width="120" height="10" rx="5" fill="#FFF" opacity="0.9" />
            
            {/* Top Layer */}
            <path d="M50 85 L150 85 L150 130 Q150 140 100 140 Q50 140 50 130 Z" fill="url(#frostingGradient)" />
            
            {/* Drip Details */}
            <path d="M50 95 Q60 120 70 100 Q80 130 90 105 Q100 135 110 100 Q120 125 130 95 Q140 115 150 90" fill="none" stroke="#FF80AB" strokeWidth="5" strokeLinecap="round" />

            {/* Decorative Cherries/Cream */}
            <circle cx="60" cy="85" r="6" fill="#FFF" opacity="0.8" />
            <circle cx="85" cy="82" r="6" fill="#FFF" opacity="0.8" />
            <circle cx="115" cy="82" r="6" fill="#FFF" opacity="0.8" />
            <circle cx="140" cy="85" r="6" fill="#FFF" opacity="0.8" />

            {/* Premium Candles */}
            {!candlesBlown && (
              <g filter="url(#glow)">
                <g>
                  <rect x="70" y="45" width="6" height="40" rx="3" fill="#D4AF37" />
                  <motion.path
                    d="M73 45 Q78 35 73 25 Q68 35 73 45"
                    fill="#FFA500"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                      skewX: [-5, 5, -5]
                    }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  />
                  <motion.path
                    d="M73 40 Q76 35 73 30 Q70 35 73 40"
                    fill="#FFFF00"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.4 }}
                  />
                </g>
                
                <g>
                  <rect x="97" y="35" width="6" height="50" rx="3" fill="#D4AF37" />
                  <motion.path
                    d="M100 35 Q105 20 100 10 Q95 20 100 35"
                    fill="#FF4500"
                    animate={{ 
                      scale: [1, 1.25, 1],
                      opacity: [0.9, 1, 0.9],
                      skewX: [5, -5, 5]
                    }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                  />
                  <motion.path
                    d="M100 30 Q103 20 100 15 Q97 20 100 30"
                    fill="#FFFF00"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 0.3, delay: 0.1 }}
                  />
                </g>
                
                <g>
                  <rect x="124" y="45" width="6" height="40" rx="3" fill="#D4AF37" />
                  <motion.path
                    d="M127 45 Q132 35 127 25 Q122 35 127 45"
                    fill="#FFA500"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                      skewX: [-5, 5, -5]
                    }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  />
                  <motion.path
                    d="M127 40 Q130 35 127 30 Q124 35 127 40"
                    fill="#FFFF00"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.4, delay: 0.2 }}
                  />
                </g>
              </g>
            )}

            {/* Realistic Smoke Animation */}
            {showSmoke && (
              <g>
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={73 + (i % 3) * 27}
                    cy={35 - (i > 2 ? 15 : 0)}
                    r={3 + i}
                    fill="#AAA"
                    initial={{ opacity: 0.6, y: 0, x: 0 }}
                    animate={{ 
                      opacity: 0,
                      y: -60,
                      x: (Math.random() - 0.5) * 40
                    }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                ))}
              </g>
            )}
          </svg>
        </div>

        <div className="mt-20">
          {!candlesBlown ? (
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              onClick={blowCandles}
              className="px-12 py-5 bg-premium-gold text-premium-dark font-black rounded-full shadow-2xl tracking-[0.2em] uppercase transition-all duration-300 border-2 border-premium-gold"
            >
              Blow The Candles 🕯️
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, backgroundColor: "#FFF", color: "#E0115F" }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
              className="px-12 py-5 bg-premium-rose text-white font-black rounded-full shadow-2xl tracking-[0.2em] uppercase transition-all duration-300 border-2 border-premium-rose"
            >
              Enter The Celebration ✨
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--premium-rose)_0%,_transparent_70%)] opacity-10"></div>
      </div>
    </motion.div>
  );
};

export default Cake;
