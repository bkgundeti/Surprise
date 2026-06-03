import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const DateReveal = ({ onNext }) => {
  const [revealed, setRevealed] = useState(false);

  // June 2026 starts on Monday (1st)
  // 1 2 3 4 [5] ...
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E0115F', '#FFFFFF']
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-premium-dark px-4 py-10 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glassmorphism p-6 md:p-10 rounded-[2rem] text-center relative max-w-xl w-full border border-white/10 shadow-2xl"
      >
        <h2 className="text-xl md:text-2xl font-serif text-premium-gold mb-8 uppercase tracking-[0.2em]">Mark Your Calendar</h2>
        
        {/* Complete June 2026 Calendar */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl text-premium-dark mb-8">
          <div className="bg-premium-rose p-4 text-white font-bold flex justify-between items-center px-6">
            <span className="text-lg">JUNE 2026</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>
          
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
              {weekDays.map(d => (
                <div key={d} className="text-[10px] md:text-xs font-bold text-gray-400 text-center">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {days.map(day => {
                const isSpecial = day === 5;
                return (
                  <motion.div
                    key={day}
                    animate={isSpecial && revealed ? { 
                      scale: [1, 1.2, 1],
                      backgroundColor: ['#fff', '#E0115F', '#E0115F'],
                      color: ['#0F0F0F', '#fff', '#fff'],
                      boxShadow: '0 0 15px rgba(224, 17, 95, 0.5)'
                    } : {}}
                    transition={{ repeat: isSpecial ? Infinity : 0, duration: 2 }}
                    className={`
                      aspect-square flex items-center justify-center text-xs md:text-sm rounded-lg font-medium
                      ${isSpecial ? 'border-2 border-premium-rose text-premium-rose z-10' : 'text-gray-700'}
                      ${day === 5 && !revealed ? 'bg-premium-rose/10' : ''}
                    `}
                  >
                    {day}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-dancing text-white">5th June — A day to celebrate you!</h3>
              <p className="text-sm text-gray-400 font-serif tracking-widest uppercase">The countdown ends here.</p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-10 py-4 bg-premium-gold text-premium-dark font-bold rounded-full shadow-lg text-sm tracking-widest uppercase"
              >
                Continue The Surprise
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default DateReveal;
