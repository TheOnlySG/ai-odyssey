import React from 'react';
import { motion } from 'framer-motion';

const ColorBends = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0D0D12]">
      {/* Background Gradients */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, #312e81 0%, transparent 70%)' }}
        />
        <div 
          className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, #00d2ff 0%, transparent 70%)' }}
        />
      </div>

      {/* SVG Bending Effect */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="liquid">
            <feTurbulence baseFrequency="0.015" numOctaves="3" seed="1" type="fractalNoise">
              <animate 
                attributeName="baseFrequency" 
                dur="30s" 
                keyTimes="0;0.5;1" 
                repeatCount="indefinite" 
                values="0.015; 0.025; 0.015" 
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="25" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#liquid)" fill="transparent" />
        
        {/* Moving Lines */}
        <motion.path
          d="M -10 50 Q 50 10 110 50"
          stroke="url(#grad1)"
          strokeWidth="0.5"
          fill="none"
          animate={{
            d: [
              "M -10 50 Q 50 10 110 50",
              "M -10 30 Q 50 90 110 30",
              "M -10 50 Q 50 10 110 50"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </div>
  );
};

export default ColorBends;
