import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { generateBlueprint } from '../apiService';
import NetflixIntro from './components/NetflixIntro';
import ColorBends from './components/ColorBends';

const Landing = () => {
  const [idea, setIdea] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const { setActiveBlueprint, setIsGenerating, isGenerating } = useAppContext();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!idea.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      const result = await generateBlueprint(idea);
      setActiveBlueprint(result);
      navigate('/dashboard');
    } catch (err) {
      alert('Generation failed: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTryExample = (example) => {
    setIdea(example);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleGenerate();
  };

  return (
    <div className="font-body antialiased min-h-screen flex flex-col relative overflow-hidden text-on-surface bg-[#0D0D12]">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <NetflixIntro key="intro" onComplete={() => setShowIntro(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col min-h-screen relative"
          >
            {/* Ambient Animated Background */}
            <ColorBends />
            
            {/* TopNavBar */}
            <header className="bg-transparent docked full-width top-0 z-50 border-b border-[#39383e]/10 flat no shadows fixed w-full flex justify-between items-center px-6 h-16 font-headline tracking-tight backdrop-blur-sm">
              <div className="flex items-center gap-6">
                <Link className="text-xl font-bold tracking-tighter text-[#e4e1e9] flex items-center gap-0.5 group" style={{ fontFamily: "'Bebas Neue', cursive" }} to="/">
                  <span className="text-2xl tracking-widest transition-all duration-300 group-hover:tracking-[0.15em]">ORI</span>
                  <span className="text-primary material-symbols-outlined text-2xl animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  <span className="text-2xl tracking-widest transition-all duration-300 group-hover:tracking-[0.15em]">GIN</span>
                </Link>
                <nav className="hidden md:flex gap-6 items-center ml-4 border-l border-outline-variant/30 pl-6 h-6">
                  <Link className="text-on-surface-variant hover:text-on-surface transition-colors duration-200 text-sm font-medium" to="/history">History</Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <Link className="hidden md:flex items-center justify-center h-9 px-4 text-sm font-medium text-on-surface/70 border-[0.5px] border-outline-variant/30 rounded-lg hover:bg-white/5 transition-colors" to="/dashboard">
                  Sign in
                </Link>
                <Link className="flex items-center justify-center h-9 px-5 bg-gradient-to-br from-primary-container to-primary text-on-primary text-sm font-medium rounded-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(124,58,237,0.3)]" to="/dashboard">
                  Create New
                </Link>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-24 relative z-10">
              {/* Hero Section */}
              <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
                {/* Eyebrow */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border-[0.5px] border-white/10 shadow-[0_4px_32px_rgba(0,210,255,0.1)]"
                >
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-xs font-mono text-on-surface-variant uppercase tracking-widest">Cinema Engine v1.0</span>
                </motion.div>

                {/* Headline */}
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-headline text-[48px] md:text-8xl font-extrabold tracking-[-0.04em] leading-[0.95] text-on-surface max-w-5xl uppercase"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  One Idea. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00d2ff] to-primary bg-300% animate-gradient-x">Complete Blueprint.</span>
                </motion.h1>

                {/* Subline */}
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-xl text-on-surface-variant/80 max-w-2xl leading-relaxed mt-4 font-body"
                >
                  The cinematic origin for your next venture. Generate PRDs, Architecture, and Roadmaps with AI precision.
                </motion.p>

                {/* Input Area */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-full max-w-[640px] mt-12 relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-[#00d2ff] to-primary opacity-20 blur-2xl group-focus-within:opacity-40 transition-opacity duration-500 rounded-2xl"></div>
                  
                  <div className="relative flex items-center bg-black/40 backdrop-blur-2xl border border-white/10 focus-within:border-primary/50 rounded-2xl overflow-hidden transition-all duration-300 h-20 px-4">
                    <span className="material-symbols-outlined text-primary text-3xl ml-2">auto_awesome</span>
                    <input 
                      className="w-full h-full bg-transparent border-none text-on-surface text-xl placeholder-on-surface-variant/30 focus:ring-0 outline-none ml-4" 
                      placeholder="Enter your product vision..." 
                      type="text"
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isGenerating}
                    />
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating || !idea.trim()}
                      className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-[#00d2ff] text-on-primary font-bold text-lg rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
                    >
                      {isGenerating ? (
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      ) : (
                        <>
                          Build
                          <span className="material-symbols-outlined">bolt</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Try Hint */}
                  <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-on-surface-variant/60 font-mono tracking-wider">
                    <span className="uppercase opacity-40 italic">Try:</span>
                    <button className="hover:text-primary transition-colors border-b border-white/5 pb-0.5" onClick={() => handleTryExample("A cinematic storytelling platform for AI writers")}>"Storytelling for AI writers"</button>
                    <button className="hover:text-primary transition-colors border-b border-white/5 pb-0.5" onClick={() => handleTryExample("An automated logistics hub for drones")}>"Logistics hub for drones"</button>
                  </div>
                </motion.div>
              </div>
            </main>

            {/* Footer */}
            <footer className="bg-transparent full-width py-12 border-t border-white/5 z-10 w-full backdrop-blur-sm">
              <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
                <div className="flex gap-8">
                  <Link className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40 hover:text-primary transition-colors" to="/">Status</Link>
                  <Link className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40 hover:text-primary transition-colors" to="/">System</Link>
                  <Link className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40 hover:text-primary transition-colors" to="/">Legal</Link>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-on-surface-variant/30">
                  © 2024 ORIGIN. CINEMATIC PRODUCT BLUEPRINT ENGINE.
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;

