import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Analytics = () => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [animatedValues, setAnimatedValues] = useState({});
    const [graphsMounted, setGraphsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setGraphsMounted(true), 150);
        return () => clearTimeout(timer);
    }, []);

    // Simple counter hook simulator for "creating data" effect
    useEffect(() => {
        if (expandedCard !== null && !isGenerating) {
            let start = 0;
            const interval = setInterval(() => {
                start += 1;
                setAnimatedValues(prev => ({ ...prev, [expandedCard]: Math.min(start * 14, 100) }));
                if (start * 14 >= 100) clearInterval(interval);
            }, 50);
            return () => clearInterval(interval);
        }
    }, [expandedCard, isGenerating]);

    const handleExpand = (id) => {
        if (expandedCard === id) {
            setExpandedCard(null);
        } else {
            setExpandedCard(id);
            setAnimatedValues(prev => ({ ...prev, [id]: 0 }));
            setIsGenerating(true);
            setTimeout(() => {
                setIsGenerating(false);
            }, 800);
        }
    };
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
{/* Main Content Area */}
<main className="flex-1 md:ml-64 overflow-y-auto w-full">
<div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-6">
{/* Page Header */}
<header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
<div>
<h1 className="font-headline text-[24px] font-bold tracking-tight text-on-surface mb-1">Analytics</h1>
<p className="text-on-surface-variant text-[13px]">Deep insights across all your generated blueprints</p>
</div>
<div className="flex items-center gap-3">
<div className="relative">
<select className="appearance-none bg-surface-container ghost-border rounded-lg py-2 pl-4 pr-10 text-sm text-on-surface focus:outline-none focus:border-primary font-body">
<option>Last 30 days</option>
<option>Last 7 days</option>
<option>All time</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
</div>
<button className="px-4 py-2 rounded-full border border-primary-container text-primary text-sm font-medium hover:bg-primary-container/10 transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">download</span>
                            Export Report
                        </button>
</div>
</header>
{/* Row 1: Top Metrics Bento Grid Expandable */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
    {[
        {
            id: 1,
            label: "Total Specs Generated",
            mainVal: "38",
            sub: <span className="text-tertiary text-xs flex items-center mb-1"><span className="material-symbols-outlined text-[14px]">arrow_upward</span>12 this week</span>,
            expandedData: "Breakdown: 20 PRDs, 10 Architectures, 8 Roadmaps. Conversion rate increased by 14% over the last 30 days."
        },
        {
            id: 2,
            label: "Avg Idea Health Score",
            mainVal: "74",
            sub: <div className="w-full bg-surface-container-lowest h-1 rounded-full mt-2 overflow-hidden"><div className="bg-secondary h-full rounded-full" style={{ width: '74%' }}></div></div>,
            expandedData: "Scores improved across the board. Technical Risk criteria is showing the most improvement (+22%)."
        },
        {
            id: 3,
            label: "Most Used Output",
            mainVal: "PRD",
            sub: <span className="text-on-surface-variant text-[10px] uppercase tracking-wider">Product Requirements</span>,
            expandedData: "PRD generation accounts for 62% of your activity, followed by Competitive Landscape at 18%."
        },
        {
            id: 4,
            label: "Total Exports",
            mainVal: "91",
            sub: <span className="text-on-surface-variant text-xs mb-1">Across all formats</span>,
            expandedData: "PDF is the most popular format (45x), followed by Markdown (31x)."
        },
        {
            id: 5,
            label: "Avg Generation Time",
            mainVal: "18s",
            sub: <span className="text-on-surface-variant text-xs mb-1">GPT-4 Turbo optimized</span>,
            expandedData: "Down from 24s. Recent prompt caching optimizations have decreased latency."
        }
    ].map(card => {
        const isExp = expandedCard === card.id;
        return (
            <div 
                key={card.id}
                onClick={() => handleExpand(card.id)}
                className={`bg-surface-container rounded-xl p-5 ghost-border flex flex-col relative overflow-hidden group hover:bg-surface-container-high transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer ${isExp ? 'col-span-2 md:col-span-3 lg:col-span-5 h-48 z-10 scale-[1.01] shadow-[0_8px_30px_rgb(0,0,0,0.4)] border-primary/30' : 'h-32'}`}
            >
                {/* Background glow when expanded */}
                {isExp && <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-50 transition-opacity duration-1000"></div>}
                
                <div className="flex flex-col justify-between h-full relative z-10 w-full">
                    <div>
                        <span className="text-on-surface-variant text-xs font-medium font-label">{card.label}</span>
                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 mt-1">
                            <span className="font-mono text-3xl font-medium text-on-surface tracking-tight">
                                {isExp && isGenerating ? (
                                    <span className="animate-pulse text-primary/50">--</span>
                                ) : (
                                    <span className="animate-[pulse_0.3s_ease-out]">{card.mainVal}</span>
                                )}
                            </span>
                        </div>
                    </div>

                    {!isExp && (
                        <div className="w-full mt-auto">
                            {card.sub}
                        </div>
                    )}

                    {/* Expanded Content View */}
                    <div className={`mt-4 w-full transition-all duration-500 ${isExp ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        {isGenerating ? (
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2 items-center text-xs text-primary font-mono tracking-widest animate-pulse">
                                    <span className="material-symbols-outlined text-[14px]">sync</span>
                                    <span>Synthesizing vectors...</span>
                                </div>
                                <div className="w-full bg-surface-container-lowest h-1 rounded-full overflow-hidden">
                                     <div className="h-full bg-primary animate-[slideRight_1.5s_ease-in-out_infinite]" style={{ width: '50%', transformOrigin: 'left' }}></div>
                                </div>
                            </div>
                        ) : (
                            <div className="pt-2 border-t border-outline-variant/20 flex flex-col gap-2">
                                <div className="text-sm text-on-surface-variant leading-relaxed">
                                    {card.expandedData}
                                </div>
                                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full mt-2 overflow-hidden">
                                     <div className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${animatedValues[card.id] || 0}%` }}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    })}
</div>
{/* Row 2: Main Charts */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
{/* Line Chart Canvas (Conceptual) */}
<div className="bg-surface-container rounded-xl p-5 ghost-border h-72 flex flex-col">
<div className="flex justify-between items-center mb-4">
<h3 className="text-sm font-medium text-on-surface">Specs generated over time</h3>
<span className="material-symbols-outlined text-on-surface-variant text-[18px]">more_horiz</span>
</div>
<div className="flex-1 relative w-full h-full flex items-end">
{/* Abstract Line Chart Representation */}
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/10 to-transparent bottom-0 left-0 right-0 h-3/4 rounded-b-lg"></div>
{/* Grid lines */}
<div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none">
<div className="w-full ghost-border-b border-dashed h-0"></div>
<div className="w-full ghost-border-b border-dashed h-0"></div>
<div className="w-full ghost-border-b border-dashed h-0"></div>
<div className="w-full ghost-border-b border-dashed h-0"></div>
</div>
{/* Synthetic SVG Line */}
<svg className="absolute inset-0 w-full h-full preserve-3d overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
<path d="M0,80 C10,70 20,90 30,60 C40,30 50,50 60,40 C70,30 80,60 90,20 C95,10 100,20 100,20" fill="none" stroke="#7c3aed" strokeLinecap="round" strokeWidth="0.5" style={{ strokeDasharray: 300, strokeDashoffset: graphsMounted ? 0 : 300, transition: 'stroke-dashoffset 2.5s cubic-bezier(0.22, 1, 0.36, 1)' }}></path>
</svg>
{/* X Axis Labels */}
<div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] font-mono text-on-surface-variant -mb-6">
<span>Day 1</span>
<span>Day 15</span>
<span>Day 30</span>
</div>
</div>
</div>
{/* Bar Chart Canvas */}
<div className="bg-surface-container rounded-xl p-5 ghost-border h-72 flex flex-col">
<div className="flex justify-between items-center mb-6">
<h3 className="text-sm font-medium text-on-surface">Idea health score distribution</h3>
<span className="material-symbols-outlined text-on-surface-variant text-[18px]">more_horiz</span>
</div>
<div className="flex-1 flex flex-col justify-between pb-2">
<div className="flex items-center gap-3">
<span className="text-xs font-mono w-12 text-right text-on-surface-variant">90-100</span>
<div className="flex-1 h-3 bg-surface-container-lowest rounded-full overflow-hidden">
<div className="h-full bg-tertiary transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[100ms]" style={{ width: graphsMounted ? '15%' : '0%' }}></div>
</div>
<span className="text-xs font-mono w-6">15%</span>
</div>
<div className="flex items-center gap-3">
<span className="text-xs font-mono w-12 text-right text-on-surface-variant">70-89</span>
<div className="flex-1 h-3 bg-surface-container-lowest rounded-full overflow-hidden">
<div className="h-full bg-secondary transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[200ms]" style={{ width: graphsMounted ? '45%' : '0%' }}></div>
</div>
<span className="text-xs font-mono w-6">45%</span>
</div>
<div className="flex items-center gap-3">
<span className="text-xs font-mono w-12 text-right text-on-surface-variant">50-69</span>
<div className="flex-1 h-3 bg-surface-container-lowest rounded-full overflow-hidden">
<div className="h-full bg-[#f59e0b] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[300ms]" style={{ width: graphsMounted ? '30%' : '0%' }}></div>
</div>
<span className="text-xs font-mono w-6">30%</span>
</div>
<div className="flex items-center gap-3">
<span className="text-xs font-mono w-12 text-right text-on-surface-variant">&lt;50</span>
<div className="flex-1 h-3 bg-surface-container-lowest rounded-full overflow-hidden">
<div className="h-full bg-error transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[400ms]" style={{ width: graphsMounted ? '10%' : '0%' }}></div>
</div>
<span className="text-xs font-mono w-6">10%</span>
</div>
</div>
</div>
</div>
{/* Row 7: Performance Table */}
<div className="bg-surface-container rounded-xl p-6 ghost-border">
<div className="flex justify-between items-center mb-6">
<h3 className="text-base font-medium text-on-surface">All specs — performance table</h3>
<button className="text-xs font-medium text-primary hover:text-primary-fixed transition-colors">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="text-xs text-on-surface-variant font-medium ghost-border-b">
<th className="pb-3 px-2 w-12">#</th>
<th className="pb-3 px-2">Idea</th>
<th className="pb-3 px-2">Category</th>
<th className="pb-3 px-2 text-center">Health</th>
<th className="pb-3 px-2 text-right">Exports</th>
<th className="pb-3 px-2 text-center">Status</th>
</tr>
</thead>
<tbody className="text-sm font-body">
<tr className="hover:bg-surface-container-high transition-colors group">
<td className="py-3 px-2 font-mono text-xs text-on-surface-variant">01</td>
<td className="py-3 px-2 font-medium text-on-surface">AI Legal Assistant</td>
<td className="py-3 px-2 text-on-surface-variant text-xs">SaaS / B2B</td>
<td className="py-3 px-2 text-center"><span className="w-2 h-2 rounded-full bg-tertiary inline-block"></span></td>
<td className="py-3 px-2 font-mono text-right">14</td>
<td className="py-3 px-2 text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-primary-container/20 text-primary">Shared</span>
</td>
</tr>
<tr className="hover:bg-surface-container-high transition-colors bg-surface-container-low group">
<td className="py-3 px-2 font-mono text-xs text-on-surface-variant">02</td>
<td className="py-3 px-2 font-medium text-on-surface">Local Service Marketplace</td>
<td className="py-3 px-2 text-on-surface-variant text-xs">Marketplace</td>
<td className="py-3 px-2 text-center"><span className="w-2 h-2 rounded-full bg-secondary inline-block"></span></td>
<td className="py-3 px-2 font-mono text-right">8</td>
<td className="py-3 px-2 text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-surface-variant text-on-surface-variant">Private</span>
</td>
</tr>
<tr className="hover:bg-surface-container-high transition-colors group">
<td className="py-3 px-2 font-mono text-xs text-on-surface-variant">03</td>
<td className="py-3 px-2 font-medium text-on-surface">Creator Economy CRM</td>
<td className="py-3 px-2 text-on-surface-variant text-xs">SaaS Tools</td>
<td className="py-3 px-2 text-center"><span className="w-2 h-2 rounded-full bg-[#f59e0b] inline-block"></span></td>
<td className="py-3 px-2 font-mono text-right">3</td>
<td className="py-3 px-2 text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-primary-container/20 text-primary">Shared</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/* Footer Shared Component */}
<footer className="bg-[#131318] font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest w-full py-6 border-t-[0.5px] border-white/5 ghost border 0.5px flat no shadows flex justify-between items-center px-12 w-full mt-auto">
<span className="text-[#5a5a62]">© 2024 SpecForge. Precision Instrumentation.</span>
<div className="flex gap-6">
<Link className="text-[#5a5a62] hover:text-[#e4e1e9] transition-opacity duration-200" to="/dashboard">Terms of Service</Link>
<Link className="text-[#5a5a62] hover:text-[#e4e1e9] transition-opacity duration-200" to="/dashboard">Privacy Policy</Link>
<Link className="text-[#5a5a62] hover:text-[#e4e1e9] transition-opacity duration-200" to="/dashboard">Security Compliance</Link>
</div>
</footer>
</main>
</div>

        </div>
    );
};

export default Analytics;
