import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden dot-bg text-on-surface bg-surface-dim">
      {/* Ambient Glow */}
      <div className="absolute inset-0 glow-overlay pointer-events-none z-0"></div>
      
      {/* TopNavBar */}
      <header className="bg-[#131318]/70 backdrop-blur-xl docked full-width top-0 z-50 border-b border-[#39383e]/20 flat no shadows fixed w-full flex justify-between items-center px-6 h-16 font-headline tracking-tight">
        <div className="flex items-center gap-6">
          <Link className="text-xl font-bold tracking-tighter text-[#e4e1e9] flex items-center gap-1" to="/">
            Spec<span className="text-primary-container material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>Forge
          </Link>
          <nav className="hidden md:flex gap-6 items-center ml-4 border-l border-outline-variant/30 pl-6 h-6">
            <Link className="text-on-surface-variant hover:text-on-surface transition-colors duration-200 text-sm font-medium" to="/">History</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link className="hidden md:flex items-center justify-center h-9 px-4 text-sm font-medium text-primary border-[0.5px] border-outline-variant/30 rounded-lg hover:bg-surface-container-low transition-colors" to="/dashboard">
            Sign in
          </Link>
          <Link className="flex items-center justify-center h-9 px-5 bg-gradient-to-br from-primary-container to-primary text-on-primary text-sm font-medium rounded-lg hover:opacity-90 transition-opacity" to="/dashboard">
            Create New
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-24 relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border-[0.5px] border-outline-variant/20 shadow-[0_4px_32px_rgba(124,58,237,0.1)]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-mono text-primary uppercase tracking-widest">AI-Powered · Free to try</span>
          </div>

          {/* Headline */}
          <h1 className="font-headline text-[36px] md:text-6xl font-extrabold tracking-[-0.02em] leading-tight text-on-surface max-w-3xl">
            Turn any idea into a complete dev blueprint
          </h1>

          {/* Subline */}
          <p className="text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            PRD. Architecture. Roadmap. Investor pitch. All from one sentence.
          </p>

          {/* Input Area */}
          <div className="w-full max-w-[560px] mt-8 relative group">
            {/* Outer Glow for Input */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-500 rounded-xl"></div>
            
            <div className="relative flex items-center bg-surface-container-lowest border-[0.5px] border-outline-variant/50 focus-within:border-primary/50 focus-within:shadow-[0_0_12px_rgba(210,187,255,0.1)] rounded-xl overflow-hidden transition-all duration-300">
              <span className="material-symbols-outlined text-on-surface-variant ml-4 absolute left-0 pointer-events-none">auto_awesome</span>
              <input className="w-full h-14 pl-12 pr-[130px] bg-transparent border-none text-on-surface text-base placeholder-on-surface-variant/50 focus:ring-0 outline-none" placeholder="Describe your app idea..." type="text"/>
              <Link className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center gap-2 px-4 bg-gradient-to-r from-primary-container to-primary text-on-primary font-medium text-sm rounded-lg hover:opacity-90 transition-opacity" to="/dashboard">
                  Generate
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Try Hint */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-on-surface-variant font-mono">
              <span className="opacity-50">Try:</span>
              <button className="hover:text-primary transition-colors">"A minimalist habit tracker for designers"</button>
              <span className="opacity-30">|</span>
              <button className="hover:text-primary transition-colors">"An AI CRM for local plumbers"</button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-16 pt-8 border-t-[0.5px] border-outline-variant/20 w-full max-w-2xl">
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border-[0.5px] border-outline-variant/10">
              <span className="material-symbols-outlined text-secondary text-sm">inventory_2</span>
              <span className="text-sm font-medium text-on-surface">2,400+ blueprints</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border-[0.5px] border-outline-variant/10">
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm">category</span>
              <span className="text-sm font-medium text-on-surface">8 output types</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border-[0.5px] border-outline-variant/10">
              <span className="material-symbols-outlined text-primary text-sm">timer</span>
              <span className="text-sm font-medium text-on-surface">&lt; 30 sec</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0D0D12] full-width py-12 border-t border-[#39383e]/10 flat z-10 w-full">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <Link className="font-mono text-[10px] uppercase tracking-widest text-[#4b5563] hover:text-[#d2bbff] transition-colors" to="/">Privacy</Link>
            <Link className="font-mono text-[10px] uppercase tracking-widest text-[#4b5563] hover:text-[#d2bbff] transition-colors" to="/">Terms</Link>
            <Link className="font-mono text-[10px] uppercase tracking-widest text-[#4b5563] hover:text-[#d2bbff] transition-colors" to="/">API</Link>
            <Link className="font-mono text-[10px] uppercase tracking-widest text-[#4b5563] hover:text-[#d2bbff] transition-colors" to="/">Changelog</Link>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#4b5563]">
            © 2024 SpecForge AI. Kinetic Monolith Design.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
