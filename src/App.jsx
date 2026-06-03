import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Welcome from './components/Welcome';
import DateReveal from './components/DateReveal';
import Cake from './components/Cake';
import Celebration from './components/Celebration';
import GiftBoxSection from './components/GiftBoxSection';
import MemoryJourney from './components/MemoryJourney';
import FinalCelebration from './components/FinalCelebration';

function App() {
  const [stage, setStage] = useState(1);
  const voiceRef = useRef(new Audio('/audio/birthday-message.mp3'));
  // Using a very stable, direct link to a calm track
  const bgMusicRef = useRef(new Audio('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Impact/Kevin_MacLeod_-_04_-_Mesmerize.mp3'));

  const startJourney = () => {
    const bgMusic = bgMusicRef.current;
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    
    // Force interaction-based play
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Playback failed. User interaction needed:", error);
      });
    }
    setStage(2);
  };

  const nextStage = () => {
    // Ensure music is still playing on transitions
    if (bgMusicRef.current.paused) {
      bgMusicRef.current.play().catch(() => {});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStage((prev) => prev + 1);
  };

  useEffect(() => {
    const voiceMessage = voiceRef.current;
    voiceMessage.loop = false;

    if (stage === 4) {
      voiceMessage.play().catch(e => console.error("Voice message blocked:", e));
    }

    if (stage === 1) {
      voiceMessage.pause();
      voiceMessage.currentTime = 0;
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    }
  }, [stage]);

  return (
    <main className="min-h-screen w-full bg-premium-dark text-white overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {stage === 1 && <Welcome key="welcome" onNext={startJourney} />}
        {stage === 2 && <DateReveal key="date" onNext={nextStage} />}
        {stage === 3 && <Cake key="cake" onNext={nextStage} />}
        {stage === 4 && <Celebration key="celebration" onNext={nextStage} />}
        {stage === 5 && <GiftBoxSection key="gift" onNext={nextStage} />}
        {stage === 6 && <MemoryJourney key="memory" onNext={nextStage} />}
        {stage === 7 && <FinalCelebration key="final" onReplay={() => setStage(1)} />}
      </AnimatePresence>
    </main>
  );
}

export default App;
