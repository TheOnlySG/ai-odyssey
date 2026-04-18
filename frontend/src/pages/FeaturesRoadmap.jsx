import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesRoadmap = () => {
    return (
        <div className="font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden text-on-surface bg-background">
            
{/* Shared Component: SideNavBar */}
<nav className="fixed left-0 top-0 h-full flex flex-col p-4 w-64 border-r-[0.5px] border-[#39383e]/10 bg-[#1b1b20]/70 backdrop-blur-xl z-50">
<div className="mb-8 px-4 flex items-center gap-3">
<div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-on-primary font-headline font-bold">K</div>
<div>
<h1 className="text-xl font-bold tracking-tighter text-[#e4e1e9] font-['Plus_Jakarta_Sans']">Kinetic</h1>
<p className="text-xs text-[#9a9a9a]">Pro Instrument</p>
</div>
</div>
<button className="mb-8 w-full py-2.5 px-4 bg-gradient-primary text-[#25005a] rounded-lg font-medium text-sm transition-transform scale-95 active:scale-90 hover:opacity-90 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">add</span>
            New Feature
        </button>
<div className="flex flex-col gap-1 flex-grow font-['Plus_Jakarta_Sans'] text-sm tracking-tight">
<Link className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#9a9a9a] hover:text-[#e4e1e9] hover:bg-[#1f1f24] transition-colors duration-200" to="/dashboard">
<span className="material-symbols-outlined text-[20px]">dashboard</span>
                Dashboard
            </Link>
<Link className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#d2bbff] bg-[#1f1f24] border-r-2 border-[#7c3aed]" to="/dashboard">
<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>list_alt</span>
                Features
            </Link>
<Link className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#9a9a9a] hover:text-[#e4e1e9] hover:bg-[#1f1f24] transition-colors duration-200" to="/dashboard">
<span className="material-symbols-outlined text-[20px]">rebase_edit</span>
                Roadmap
            </Link>
<Link className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#9a9a9a] hover:text-[#e4e1e9] hover:bg-[#1f1f24] transition-colors duration-200" to="/dashboard">
<span className="material-symbols-outlined text-[20px]">insights</span>
                Analytics
            </Link>
<Link className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#9a9a9a] hover:text-[#e4e1e9] hover:bg-[#1f1f24] transition-colors duration-200" to="/dashboard">
<span className="material-symbols-outlined text-[20px]">settings</span>
                Settings
            </Link>
</div>
<div className="mt-auto flex flex-col gap-1 border-t-[0.5px] border-[#39383e]/10 pt-4 font-['Plus_Jakarta_Sans'] text-sm tracking-tight">
<Link className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#9a9a9a] hover:text-[#e4e1e9] hover:bg-[#1f1f24] transition-colors duration-200" to="/dashboard">
<span className="material-symbols-outlined text-[20px]">description</span>
                Docs
            </Link>
<Link className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#9a9a9a] hover:text-[#e4e1e9] hover:bg-[#1f1f24] transition-colors duration-200" to="/dashboard">
<span className="material-symbols-outlined text-[20px]">help_outline</span>
                Support
            </Link>
</div>
</nav>
{/* Shared Component: TopAppBar */}
<header className="fixed top-0 right-0 left-64 flex justify-between items-center px-8 z-40 h-16 border-b-[0.5px] border-[#39383e]/10 bg-[#131318]/70 backdrop-blur-md w-[calc(100%-16rem)]">
<div className="flex items-center gap-8">
<span className="font-['Plus_Jakarta_Sans'] font-black tracking-tight text-[#e4e1e9] text-lg">Monolith</span>
<nav className="hidden md:flex items-center gap-6 font-['Inter'] text-sm font-medium">
<Link className="text-[#d2bbff] border-b border-[#7c3aed] pb-1 cursor-pointer opacity-80 hover:opacity-100 hover:text-[#4cd7f6] transition-all" to="/dashboard">Overview</Link>
<Link className="text-[#9a9a9a] pb-1 cursor-pointer opacity-80 hover:opacity-100 hover:text-[#4cd7f6] transition-all" to="/dashboard">Changelog</Link>
<Link className="text-[#9a9a9a] pb-1 cursor-pointer opacity-80 hover:opacity-100 hover:text-[#4cd7f6] transition-all" to="/dashboard">Feedback</Link>
</nav>
</div>
<div className="flex items-center gap-6">
<div className="relative hidden lg:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
<input className="bg-surface-container-low border-none rounded-full py-1.5 pl-10 pr-4 text-sm text-on-surface focus:ring-1 focus:ring-primary w-48 transition-all" placeholder="Search..." type="text"/>
</div>
<div className="flex items-center gap-4 text-[#d2bbff]">
<button className="cursor-pointer opacity-80 hover:opacity-100 hover:text-[#4cd7f6] transition-all flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">notifications</span>
</button>
<button className="cursor-pointer opacity-80 hover:opacity-100 hover:text-[#4cd7f6] transition-all flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">bolt</span>
</button>
<img alt="User Profile" className="w-8 h-8 rounded-full border border-surface-bright object-cover" data-alt="professional headshot of a young woman with dark hair against a neutral gray background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzG-3C6BniTB6i_UcKiPrgzkLo98b0MoPQKaFaIDJq4PRFNdgPO1dhUrnbwCV8n8sAdJs6yg4wO6dMONRG-vfviyN6u4UZsPvL_-8w_rMjYcJK4pzb8WwJup0ECe5l6I2wYxqqPibXczCJINI48KyF7rU6RpG1Ro0r8qiL1IE34w3lSuLj5UqUC4eywqVawP6PSlPFBppCWVJwGsobw_jW-BGqjX40an_lUNwq-txLoFPOHuYurOQYDJsBviyEROMluOlLoFnH3v3K"/>
</div>
</div>
</header>
{/* Main Canvas */}
<main className="ml-64 mt-16 p-10 max-w-7xl mx-auto space-y-12">
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
    );
};

export default FeaturesRoadmap;
