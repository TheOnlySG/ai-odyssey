import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NetflixIntro = ({ onComplete }) => {
  const [stage, setStage] = useState('entering');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('exiting');
      setTimeout(onComplete, 600); // Wait for exit animation
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVariants = {
    entering: { scale: 0.95, opacity: 1 },
    exiting: { 
      scale: 1.3, 
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" }
    }
  };

  const letterVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: (i) => ({
      height: "100%",
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: i * 0.08,
        ease: [0.19, 1, 0.22, 1]
      }
    })
  };

  const letters = "ORIGIN".split("");

  return (
    <div className="fixed inset-0 z-[100] bg-[#0D0D12] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {stage === 'entering' && (
          <motion.div 
            variants={containerVariants}
            initial={{ scale: 0.9, opacity: 0 }}
            animate="entering"
            exit="exiting"
            className="relative flex items-end justify-center gap-1 h-32 md:h-48"
          >
            {letters.map((char, i) => (
              <div key={i} className="relative w-12 md:w-24 h-full flex flex-col justify-end">
                {/* Large, Cinematic Red Letters with Reveal */}
                <motion.span 
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-cinema text-7xl md:text-[12rem] text-transparent bg-clip-text bg-gradient-to-b from-[#7dd3fc] to-[#7c3aed] select-none flex items-center justify-center drop-shadow-[0_0_40px_rgba(125,211,252,0.4)]"
                >
                  {char}
                </motion.span>
              </div>
            ))}
            
            {/* Cinematic Lens Flare/Glow (Cool Tone) */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 4, opacity: 0.3 }}
              transition={{ delay: 1, duration: 2 }}
              className="absolute inset-0 bg-gradient-to-t from-[#00d2ff] to-transparent blur-3xl rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NetflixIntro;
