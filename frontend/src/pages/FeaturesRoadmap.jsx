import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesRoadmap = () => {
    return (
        <div className="font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden text-on-surface bg-background">
            
{/* TopNavBar Shared Component */}
<nav className="bg-[#131318]/70 backdrop-blur-md font-['Plus_Jakarta_Sans'] text-sm tracking-tight docked full-width top-0 z-50 border-b-[0.5px] border-white/10 flat no shadows flex justify-between items-center px-8 h-16 w-full shrink-0">
<div className="flex items-center gap-8">
<div className="text-xl font-black tracking-tighter text-[#e4e1e9]">SpecForge</div>
<div className="hidden md:flex items-center bg-surface-container-low rounded-full px-4 py-1.5 ghost-border text-on-surface-variant w-64 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
<span className="material-symbols-outlined text-lg mr-2">search</span>
<input className="bg-transparent border-none outline-none text-sm w-full placeholder-on-surface-variant/50 font-body text-on-surface" placeholder="Search blueprints..." type="text"/>
</div>
</div>
<div className="hidden md:flex items-center gap-6">
<Link className="text-[#94949e] hover:text-[#e4e1e9] transition-colors duration-200 active:scale-95 transition-transform" to="/dashboard">Dashboard</Link>
<Link className="text-[#94949e] hover:text-[#e4e1e9] transition-colors duration-200 active:scale-95 transition-transform" to="/dashboard">History</Link>
<Link className="text-[#94949e] hover:text-[#e4e1e9] transition-colors duration-200 active:scale-95 transition-transform" to="/dashboard">Resources</Link>
</div>
<div className="flex items-center gap-4">
<button className="text-[#94949e] hover:text-[#e4e1e9] transition-colors duration-200">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="text-[#94949e] hover:text-[#e4e1e9] transition-colors duration-200">
<span className="material-symbols-outlined">settings</span>
</button>
<div className="h-8 w-8 rounded-full bg-surface-container-highest overflow-hidden ghost-border">
<img alt="User profile" className="w-full h-full object-cover" data-alt="professional headshot of a person with neutral background, soft lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb9w2fmMUl8sZk9ug6d_2mV6Pl1FbVTGGgMoD8Pu9JPC4qwkP7b1cyJLBp2AZnNI7uJxzleumMPyNoFA2pBKw8PmI3w0DlvpEXeu67V_Mb93B_EjIOFMAe2DRzRpE4GTnvaeOwKLVY-uXjkIH70EuZfrbpeWWHnX49neD3dJk0PcvEqH9q0GXHbVhDghozMit2mNppLr-TPpFtidYqlfhb9l9W-St8XFoVsH_-0KEAQI5CjTe2Xan63DfsaOCLX_5X4M0ab6qpcGo7"/>
</div>
</div>
</nav>
<div className="flex flex-1 overflow-hidden relative">
{/* SideNavBar Shared Component */}
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
<div className="text-xs font-bold text-[#e4e1e9]">SpecForge</div>
<div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Precision Forge</div>
</div>
</div>
</div>
</aside>
<main className="flex-1 md:ml-64 overflow-y-auto w-full p-10 max-w-7xl mx-auto space-y-12">
{/* Section 1: Header */}
<section className="flex items-end justify-between">
<div className="space-y-2">
<h2 className="font-headline text-5xl tracking-tight font-bold text-on-surface">Features &amp; Roadmap</h2>
<p className="font-body text-sm text-on-surface-variant max-w-xl">AI-scoped features tracked against MVP, V1, and Future releases.</p>
</div>
<div className="flex items-center gap-4">
<div className="flex bg-surface-container-low rounded-lg p-1 ghost-border">
<button className="px-4 py-1.5 text-sm font-medium bg-surface-container text-on-surface rounded shadow-sm">Board</button>
<button className="px-4 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">List</button>
</div>
<button className="px-5 py-2 bg-gradient-primary text-[#25005a] rounded-lg font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined text-[18px]">add</span>
                    Add Feature
                </button>
</div>
</section>
{/* Section 2: Row 1 - Metrics */}
<section className="grid grid-cols-4 gap-6">
<div className="bg-surface-container rounded-xl p-6 ghost-border flex flex-col gap-2 relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span className="text-sm font-label text-on-surface-variant">Total Features</span>
<span className="font-mono text-4xl text-on-surface tracking-tighter">24</span>
</div>
<div className="bg-surface-container rounded-xl p-6 ghost-border flex flex-col gap-2 relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span className="text-sm font-label text-on-surface-variant">MVP Target</span>
<span className="font-mono text-4xl text-secondary tracking-tighter">07</span>
</div>
<div className="bg-surface-container rounded-xl p-6 ghost-border flex flex-col gap-2">
<span className="text-sm font-label text-on-surface-variant">Avg Complexity</span>
<div className="flex items-center gap-2 mt-1">
<span className="font-mono text-xl text-on-surface">Medium</span>
<div className="flex gap-1">
<div className="w-1.5 h-4 bg-primary rounded-sm"></div>
<div className="w-1.5 h-4 bg-primary rounded-sm"></div>
<div className="w-1.5 h-4 bg-surface-bright rounded-sm"></div>
</div>
</div>
</div>
<div className="bg-surface-container rounded-xl p-6 ghost-border flex flex-col gap-2">
<span className="text-sm font-label text-on-surface-variant">Est. Build Time</span>
<span className="font-mono text-4xl text-on-surface tracking-tighter">14<span className="text-lg text-on-surface-variant ml-1">wks</span></span>
</div>
</section>
{/* Section 3: Row 2 - Phase Overview */}
<section className="bg-surface-container rounded-xl p-6 ghost-border ambient-shadow">
<h3 className="font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">layers</span>
                Build Phase Overview
            </h3>
<div className="space-y-6">
{/* MVP */}
<div className="space-y-2">
<div className="flex justify-between text-sm">
<span className="font-medium text-on-surface">MVP (Now)</span>
<span className="font-mono text-on-surface-variant">7 / 7</span>
</div>
<div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full w-[100%] shadow-[0_0_10px_rgba(210,187,255,0.4)]"></div>
</div>
</div>
{/* V1 */}
<div className="space-y-2">
<div className="flex justify-between text-sm">
<span className="font-medium text-on-surface">Version 1 (Next)</span>
<span className="font-mono text-on-surface-variant">4 / 12</span>
</div>
<div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-secondary rounded-full w-[33%]"></div>
</div>
</div>
{/* Future */}
<div className="space-y-2">
<div className="flex justify-between text-sm">
<span className="font-medium text-on-surface-variant">Future (Later)</span>
<span className="font-mono text-on-surface-variant">0 / 5</span>
</div>
<div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-surface-bright rounded-full w-0"></div>
</div>
</div>
</div>
</section>
{/* Section 4: Row 3 - Kanban Board */}
<section className="grid grid-cols-3 gap-6">
{/* Column 1: MVP */}
<div className="flex flex-col gap-4">
<div className="border-t-2 border-primary pt-3 flex justify-between items-center">
<h4 className="font-headline font-semibold text-on-surface">MVP - Now</h4>
<span className="font-mono text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface-variant">7</span>
</div>
{/* Card */}
<div className="bg-surface-container-high rounded-xl p-5 ghost-border ambient-shadow space-y-4 hover:border-primary/50 transition-colors cursor-pointer group">
<div className="flex justify-between items-start">
<span className="text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">Auth</span>
<span className="text-xs bg-surface-bright text-on-surface-variant px-2 py-0.5 rounded-full">High</span>
</div>
<div>
<h5 className="font-medium text-on-surface mb-1 group-hover:text-primary transition-colors">SSO Integration</h5>
<p className="text-xs text-on-surface-variant line-clamp-2">Implement Google and GitHub OAuth providers for seamless onboarding.</p>
</div>
<div className="flex justify-between items-center pt-2 border-t-[0.5px] border-outline-variant/10">
<span className="flex items-center gap-1 text-xs text-secondary">
<div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> In Progress
                        </span>
<img alt="Assignee" className="w-6 h-6 rounded-full border-[0.5px] border-outline-variant/30" data-alt="professional headshot of a man with a slight smile wearing a dark shirt" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAddpDYPBQhTj08PnjiXTLJ9veWdyGEhTxq0z08hDYLMYO4Q-OnhVFqENHScUjJ4OHF9E-a0dw0T-KIeRmJg3a4rbZ3zfMu3XCllPzVo3Wei-RiJ0CESEDs_fvXbI7X6wbHpxvzpzhWkILWSehjQWJWO6M901LSGeuEd58-FOyu-goDRhkp5CF1Rqwk8y7M9NFiVsMepyGSbXYwEuhllBxRFv_nM3uoF-a_ob_Zbkfn_fDiGglPxe2voago4ly56CwmAgLh4uREBTZC"/>
</div>
</div>
{/* Card */}
<div className="bg-surface-container-high rounded-xl p-5 ghost-border ambient-shadow space-y-4 hover:border-primary/50 transition-colors cursor-pointer group">
<div className="flex justify-between items-start">
<span className="text-[10px] uppercase tracking-wider font-semibold text-tertiary bg-tertiary/10 px-2 py-0.5 rounded border border-tertiary/20">Dashboard</span>
<span className="text-xs bg-surface-bright text-on-surface-variant px-2 py-0.5 rounded-full">Med</span>
</div>
<div>
<h5 className="font-medium text-on-surface mb-1 group-hover:text-primary transition-colors">Core Metrics View</h5>
<p className="text-xs text-on-surface-variant line-clamp-2">Display high-level aggregate data with date range filtering.</p>
</div>
<div className="flex justify-between items-center pt-2 border-t-[0.5px] border-outline-variant/10">
<span className="flex items-center gap-1 text-xs text-on-surface-variant">
<div className="w-1.5 h-1.5 rounded-full bg-outline-variant"></div> To Do
                        </span>
<div className="w-6 h-6 rounded-full bg-surface-bright flex items-center justify-center text-[10px] text-on-surface-variant border-[0.5px] border-outline-variant/30">+</div>
</div>
</div>
</div>
{/* Column 2: V1 */}
<div className="flex flex-col gap-4">
<div className="border-t-2 border-secondary pt-3 flex justify-between items-center">
<h4 className="font-headline font-semibold text-on-surface">Version 1 - Next</h4>
<span className="font-mono text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface-variant">12</span>
</div>
{/* Card */}
<div className="bg-surface-container-high rounded-xl p-5 ghost-border ambient-shadow space-y-4 hover:border-primary/50 transition-colors cursor-pointer group opacity-80">
<div className="flex justify-between items-start">
<span className="text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">AI</span>
<span className="text-xs bg-surface-bright text-on-surface-variant px-2 py-0.5 rounded-full">High</span>
</div>
<div>
<h5 className="font-medium text-on-surface mb-1 group-hover:text-primary transition-colors">Auto-Categorization</h5>
<p className="text-xs text-on-surface-variant line-clamp-2">Use LLM to automatically tag and sort incoming user feedback.</p>
</div>
<div className="flex justify-between items-center pt-2 border-t-[0.5px] border-outline-variant/10">
<span className="flex items-center gap-1 text-xs text-on-surface-variant">
<div className="w-1.5 h-1.5 rounded-full bg-outline-variant"></div> To Do
                        </span>
</div>
</div>
</div>
{/* Column 3: Future */}
<div className="flex flex-col gap-4">
<div className="border-t-2 border-surface-bright pt-3 flex justify-between items-center">
<h4 className="font-headline font-semibold text-on-surface-variant">Future - Later</h4>
<span className="font-mono text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface-variant opacity-50">5</span>
</div>
{/* Card */}
<div className="bg-surface-container-high rounded-xl p-5 ghost-border space-y-4 opacity-50">
<div className="flex justify-between items-start">
<span className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant bg-surface-bright px-2 py-0.5 rounded">Mobile</span>
<span className="text-xs bg-surface-bright text-on-surface-variant px-2 py-0.5 rounded-full">Med</span>
</div>
<div>
<h5 className="font-medium text-on-surface mb-1">Native iOS App</h5>
<p className="text-xs text-on-surface-variant line-clamp-2">Port core web functionality to native iOS experience.</p>
</div>
</div>
</div>
</section>
{/* Section 5: Row 4 - Analytics */}
<section className="grid grid-cols-2 gap-6">
<div className="bg-surface-container rounded-xl p-6 ghost-border">
<h3 className="font-headline font-medium text-sm text-on-surface mb-6">Complexity Distribution</h3>
<div className="space-y-4">
<div className="flex h-8 w-full rounded overflow-hidden">
<div className="bg-secondary/80 w-[20%] flex items-center justify-center text-xs font-mono text-on-secondary-container">L</div>
<div className="bg-primary/80 w-[50%] flex items-center justify-center text-xs font-mono text-on-primary-container">M</div>
<div className="bg-error/80 w-[30%] flex items-center justify-center text-xs font-mono text-on-error-container">H</div>
</div>
<div className="flex justify-between text-xs text-on-surface-variant font-mono">
<span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-secondary/80"></div> Low (20%)</span>
<span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary/80"></div> Medium (50%)</span>
<span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-error/80"></div> High (30%)</span>
</div>
</div>
</div>
<div className="bg-surface-container rounded-xl p-6 ghost-border">
<h3 className="font-headline font-medium text-sm text-on-surface mb-4">Category Breakdown</h3>
<div className="space-y-3">
<div className="flex items-center gap-4">
<span className="text-xs w-20 text-on-surface-variant">Core UI</span>
<div className="flex-grow h-1.5 bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-primary w-[40%] rounded-full"></div>
</div>
<span className="font-mono text-xs w-6 text-right">8</span>
</div>
<div className="flex items-center gap-4">
<span className="text-xs w-20 text-on-surface-variant">AI Engine</span>
<div className="flex-grow h-1.5 bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-secondary w-[30%] rounded-full"></div>
</div>
<span className="font-mono text-xs w-6 text-right">6</span>
</div>
<div className="flex items-center gap-4">
<span className="text-xs w-20 text-on-surface-variant">Auth &amp; Sec</span>
<div className="flex-grow h-1.5 bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-[20%] rounded-full"></div>
</div>
<span className="font-mono text-xs w-6 text-right">4</span>
</div>
</div>
</div>
</section>
</main>
</div>
        </div>
    );
};

export default FeaturesRoadmap;
