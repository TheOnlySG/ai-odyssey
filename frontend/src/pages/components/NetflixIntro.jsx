import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShinyText from './ShinyText';

const NetflixIntro = ({ onComplete }) => {
  const [stage, setStage] = useState('entering');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increase progress bar over time
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer = setTimeout(() => {
      setStage('exiting');
      setTimeout(onComplete, 800); 
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0D0D12] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {stage === 'entering' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-8"
          >
            {/* Name: ORIGIN with Shiny Effect */}
            <div className="relative">
              <ShinyText 
                text="ORIGIN" 
                speed={3} 
                className="text-7xl md:text-[10rem] font-black tracking-tighter text-[#5227FF] drop-shadow-[0_0_50px_rgba(82,39,255,0.5)]"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              />
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-sm md:text-lg font-mono tracking-[0.4em] uppercase text-cyan-400 opacity-80"
            >
              one idea, complete blueprint
            </motion.div>

            {/* Progress Bar */}
            <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mt-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#5227FF] to-cyan-400"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5227FF]/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

export default NetflixIntro;
