import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/images/WhatsApp Image 2026-06-01 at 17.13.47 (1).jpeg',
  '/images/WhatsApp Image 2026-06-01 at 17.13.47.jpeg',
  '/images/WhatsApp Image 2026-06-01 at 17.19.50 (1).jpeg',
  '/images/WhatsApp Image 2026-06-01 at 17.19.50.jpeg',
  '/images/WhatsApp Image 2026-06-01 at 17.25.34.jpeg',
  '/images/WhatsApp Image 2026-06-01 at 17.37.24.jpeg',
];

const message = `❤️ Happiest Birthday Bhakti...

Today is very special day. It is the birthday of a special and wonderful person in my life.

I hope you enjoy this wonderful day. I wish your missteps turn into success, your sadness into strength and your tears into confidence. Wish you all the success for your future endeavors.

You are my comfort zone in this judgemental world. It is a blessing to have you in my life. Thank you for listening without judging, understanding me even when I cannot explain myself properly and showing the right path whenever I feel lost.

I feel incredibly lucky and grateful to have a friend like you. No matter where life takes us, you will always have a permanent place in my heart. I will always cherish our friendship and all the memories we have created together.

On your birthday, I pray to Krishna that all the happiness, love, success and kindness you give to others comes back to you a thousand times more.

Thank you for being my constant support, safe place, masti partner and best friend.

Once again, many more Happy Birthday Bhakti.

May your smile never fade and may this year bring endless joy, success, happiness and unforgettable moments.

LYSM Forever Bhakti. ❤️`;

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);
  const isAutoScrollingRef = useRef(true);

  useEffect(() => {
    // Check if user is near bottom to continue autoscrolling
    const handleScroll = (e) => {
      const el = e.target;
      if (el) {
        const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
        isAutoScrollingRef.current = isNearBottom;
      }
    };

    // Attach listener to the scrollable parent container
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 30);

      // Only autoscroll if user hasn't scrolled up significantly
      if (scrollRef.current && isAutoScrollingRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }

      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <div className="relative">
      <span className="whitespace-pre-line text-xl md:text-3xl font-serif leading-relaxed text-gray-100 text-glow-soft italic">
        {displayedText}
        {index < text.length && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-[2px] h-[1em] bg-premium-gold ml-1 translate-y-[0.2em]"
          />
        )}
      </span>
      <div ref={scrollRef} className="h-4 w-full" />
    </div>
  );
};

const MemoryJourney = ({ onNext }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < images.length) {
      const timer = setTimeout(() => setStep(step + 1), 3500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="w-full bg-premium-dark text-white min-h-screen flex items-center justify-center overflow-hidden relative">
      <AnimatePresence mode="wait">
        {step < images.length ? (
          <motion.div
            key={`img-${step}`}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-screen flex items-center justify-center p-4 md:p-10"
          >
            <div className="relative max-w-full max-h-[80vh] bg-white p-2 md:p-4 shadow-premium-rose/40 shadow-2xl rounded-sm">
              <img 
                src={images[step]} 
                alt="Memory" 
                className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-sm"
              />
              <div className="absolute inset-0 border-[8px] md:border-[12px] border-white pointer-events-none"></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-screen overflow-y-auto px-4 py-20 flex flex-col items-center"
          >
            <div className="max-w-4xl w-full glassmorphism p-8 md:p-16 rounded-[2rem] border border-white/10 shadow-2xl relative">
              <TypewriterText text={message} />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 35 }}
                className="mt-10 text-center"
              >
                <button
                  onClick={onNext}
                  className="px-12 py-5 bg-premium-rose text-white font-black rounded-full shadow-2xl tracking-[0.4em] uppercase transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-premium-rose"
                >
                  The Final Surprise
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-premium-rose/5 rounded-full blur-[180px]"></div>
      </div>
    </div>
  );
};

export default MemoryJourney;
