import React from 'react';
import { Link } from 'react-router-dom';

const AiAssistant = () => {
    return (
        <div className="font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden text-on-surface bg-background">
            
{/* Background Layer: Dashboard Content (Dimmed) */}
<div className="flex w-full h-full relative">
{/* Shared Component: SideNavBar */}
<nav className="bg-[#1b1b20] font-['Inter'] text-sm h-screen w-64 left-0 border-r border-[#39383e]/10 tonal shift via surface_container_low shadow-[4px_0_24px_rgba(0,0,0,0.3)] fixed left-0 top-0 flex flex-col h-full py-6 z-10 transition-all duration-300 ease-in-out hidden md:flex">
{/* Header */}
<div className="px-6 mb-8">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-container to-primary flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary text-xl" data-icon="square" data-weight="fill">square</span>
</div>
<div>
<h1 className="text-[#d2bbff] font-bold font-headline tracking-tight">Origin</h1>
<p className="text-xs text-on-surface-variant">AI Architect</p>
</div>
</div>
</div>
{/* Main Navigation */}
<ul className="flex flex-col gap-1 px-3 flex-1">
<li>
{/* Active State */}
<Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-[#7c3aed]/10 to-transparent text-[#d2bbff] border-l-2 border-[#7c3aed]" to="/dashboard">
<span className="material-symbols-outlined text-lg" data-icon="dashboard">dashboard</span>
<span>Overview</span>
</Link>
</li>
<li>
<Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#94a3b8] hover:bg-[#1f1f24] transition-colors" to="/dashboard">
<span className="material-symbols-outlined text-lg" data-icon="architecture">architecture</span>
<span>Blueprints</span>
</Link>
</li>
<li>
<Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#94a3b8] hover:bg-[#1f1f24] transition-colors" to="/dashboard">
<span className="material-symbols-outlined text-lg" data-icon="history">history</span>
<span>Timeline</span>
</Link>
</li>
<li>
<Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#94a3b8] hover:bg-[#1f1f24] transition-colors" to="/dashboard">
<span className="material-symbols-outlined text-lg" data-icon="monitoring">monitoring</span>
<span>Analytics</span>
</Link>
</li>
</ul>
{/* Footer / CTA */}
<div className="px-4 mt-auto mb-4">
<button className="w-full py-2.5 rounded-lg bg-surface-container-high text-on-surface text-sm font-medium hover:bg-surface-bright transition-colors flex items-center justify-center gap-2 ghost-border">
<span className="material-symbols-outlined text-[16px]" data-icon="bolt">bolt</span>
                    Upgrade to Pro
                </button>
</div>
{/* Footer Links */}
<ul className="flex flex-col gap-1 px-3">
<li>
<Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#94a3b8] hover:bg-[#1f1f24] transition-colors" to="/dashboard">
<span className="material-symbols-outlined text-[18px]" data-icon="settings">settings</span>
<span>Settings</span>
</Link>
</li>
<li>
<Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#94a3b8] hover:bg-[#1f1f24] transition-colors" to="/dashboard">
<span className="material-symbols-outlined text-[18px]" data-icon="help_outline">help_outline</span>
<span>Support</span>
</Link>
</li>
</ul>
</nav>
{/* Main Workspace (Dashboard Mock) */}
<main className="md:ml-64 flex-1 p-8 h-full overflow-y-auto">
<header className="flex justify-between items-center mb-8">
<div>
<h2 className="text-3xl font-headline font-bold tracking-tight text-on-surface">Project Alpha</h2>
<p className="text-on-surface-variant text-sm mt-1">System Architecture Blueprint</p>
</div>
</header>
{/* Bento Grid Placeholder */}
<div className="grid grid-cols-12 gap-4">
<div className="col-span-8 h-64 bg-surface-container rounded-xl ghost-border p-6 flex flex-col">
<h3 className="font-headline font-medium text-on-surface mb-4">Architecture Topology</h3>
<div className="flex-1 rounded-lg bg-surface-container-low ghost-border flex items-center justify-center">
<span className="font-mono text-on-surface-variant text-xs">graph_render_canvas</span>
</div>
</div>
<div className="col-span-4 h-64 bg-surface-container rounded-xl ghost-border p-6">
<h3 className="font-headline font-medium text-on-surface mb-4">Health Metrics</h3>
<div className="space-y-4">
<div className="flex justify-between items-center">
<span className="text-sm text-on-surface-variant">Latency</span>
<span className="font-mono text-secondary"></span>
</div>
<div className="flex justify-between items-center">
<span className="text-sm text-on-surface-variant">Uptime</span>
<span className="font-mono text-tertiary">99.9%</span>
</div>
</div>
</div>
</div>
</main>
{/* Ambient Backdrop for Overlay */}
<div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] z-40 transition-opacity duration-300"></div>
</div>
{/* AI Co-Founder Drawer */}
{/* SideNavBar */}
<aside className="bg-[#1b1b20] font-['Inter'] text-sm h-screen w-64 border-r-[0.5px] border-white/5 mx-0 flex flex-col fixed left-0 top-0 pt-20 hidden md:flex shrink-0 z-40 shadow-2xl">
<div className="px-6 pb-6">
<button className="w-full bg-gradient-to-r from-primary-container to-primary text-on-primary py-2 px-4 rounded-lg font-medium tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined text-[18px]">add</span>
                    New Project
                </button>
</div>
<nav className="flex-1 flex flex-col gap-1 px-3">
<Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all duration-300 ease-in-out">
<span className="material-symbols-outlined">dashboard</span>
                    Dashboard
                </Link>
<Link to="/history" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all duration-300 ease-in-out">
<span className="material-symbols-outlined">history</span>
                    History
                </Link>
<Link to="/analytics" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all duration-300 ease-in-out">
<span className="material-symbols-outlined">insights</span>
                    Analytics
                </Link>
<Link to="/features-roadmap" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all duration-300 ease-in-out">
<span className="material-symbols-outlined">architecture</span>
                    Architecture
                </Link>
</nav>
<div className="p-6 mt-auto">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center ghost-border text-primary">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>view_in_ar</span>
</div>
<div>
<div className="text-xs font-bold text-[#e4e1e9]">Origin</div>
<div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Precision Forge</div>
</div>
</div>
</div>
</aside>

        </div>
    );
};

export default AiAssistant;

