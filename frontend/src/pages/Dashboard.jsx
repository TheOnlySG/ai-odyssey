import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden text-on-surface bg-background">
            
{/* TopNavBar */}
<nav className="fixed top-0 w-full flex justify-between items-center px-6 h-16 bg-[#131318]/70 backdrop-blur-xl docked full-width top-0 z-50 border-b border-[#39383e]/20 flat no shadows text-sm">
<div className="flex items-center gap-6">
<div className="text-xl font-bold tracking-tighter text-[#e4e1e9] flex items-center gap-1 font-headline">
<span className="material-symbols-outlined text-primary" data-icon="bolt" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                SpecForge
            </div>
<div className="hidden md:flex gap-6 font-['Plus_Jakarta_Sans'] tracking-tight">
<Link className="text-[#d2bbff] border-b-2 border-[#7c3aed] pb-1 flex items-center gap-2 hover:bg-[#1f1f24] transition-colors duration-200" to="/dashboard">Dashboard</Link>
<Link className="text-[#94a3b8] hover:text-[#e4e1e9] flex items-center gap-2 hover:bg-[#1f1f24] transition-colors duration-200" to="/dashboard">History</Link>
<Link className="text-[#94a3b8] hover:text-[#e4e1e9] flex items-center gap-2 hover:bg-[#1f1f24] transition-colors duration-200" to="/dashboard">Resources</Link>
</div>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-2">
<button className="text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
</button>
</div>
<button className="px-4 py-2 bg-gradient-to-br from-primary-container to-primary text-on-primary rounded font-medium hover:opacity-90 transition-opacity">Create New</button>
<div className="h-8 w-8 rounded-full bg-surface-variant border-[0.5px] border-outline-variant overflow-hidden shrink-0">
<img alt="User avatar" className="w-full h-full object-cover" data-alt="Portrait of young woman with short dark hair in professional setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk-Hc_ajLs9aLDMVZ1Mxk-KHHu0Tyck6683l2w0jIxYw--iT6NfohtM0dKRmJJUO9_sBkqL9aAfV_d_aYCFkintt_dxfucJH0lZDjiS2jkK3oDimu4LCz78VDFBnhtRaU2Nq7bqUxqOKOWJsvI7dhLPQBzvBK85QASHUc-GUijEAbyli33xPWUW9Lj28u48BEzTDMkR0RoEQX-UrlRrobWra8tHYo4ev20xl_6hHn7U0c5uIVWKVtD7Ge3pieKBgZbaCsL3_MqQWkf"/>
</div>
</div>
</nav>
<div className="flex flex-1 overflow-hidden relative">

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

{/* SideNavBar (Hidden on md for Dashboard to focus on content, but keeping structure as requested if needed, opting to hide it to match "Dashboard" full width feel in instructions) */}
<main className="flex-1 max-w-[1600px] mx-auto w-full pt-24 px-6 pb-24 md:ml-64 relative z-10 overflow-y-auto">
{/* Context Bar */}
<header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
<div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-full border-[0.5px] border-outline-variant/30">
<span className="material-symbols-outlined text-primary text-sm" data-icon="psychology">psychology</span>
<span className="text-sm text-on-surface-variant">AI tool for therapist patient tracking</span>
</div>
<div className="flex items-center gap-3">
<button className="px-4 py-2 rounded border-[0.5px] border-outline-variant/30 text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2 text-sm">
<span className="material-symbols-outlined text-[18px]" data-icon="refresh">refresh</span>
                    Regenerate
                </button>
<button className="px-4 py-2 rounded border-[0.5px] border-outline-variant/30 text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2 text-sm">
<span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
                    Edit Idea
                </button>
<button className="px-4 py-2 rounded border-[0.5px] border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-2 text-sm font-medium">
                    Ask AI Co-Founder ✦
                </button>
</div>
</header>
{/* Metrics Row */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
<div className="bg-surface-container p-6 rounded-xl border-[0.5px] border-outline-variant/10 flex flex-col justify-between min-h-[120px]">
<div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">Health Score</div>
<div className="text-4xl font-headline font-bold tracking-tighter mt-2 text-secondary">78<span className="text-lg text-on-surface-variant font-body">/100</span></div>
</div>
<div className="bg-surface-container p-6 rounded-xl border-[0.5px] border-outline-variant/10 flex flex-col justify-between min-h-[120px]">
<div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">Build Time</div>
<div className="text-4xl font-headline font-bold tracking-tighter mt-2 text-on-surface">6-8 <span className="text-lg text-on-surface-variant font-body font-normal">wks</span></div>
</div>
<div className="bg-surface-container p-6 rounded-xl border-[0.5px] border-outline-variant/10 flex flex-col justify-between min-h-[120px]">
<div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">Competitors</div>
<div className="text-4xl font-headline font-bold tracking-tighter mt-2 text-on-surface">4</div>
</div>
<div className="bg-surface-container p-6 rounded-xl border-[0.5px] border-outline-variant/10 flex flex-col justify-between min-h-[120px]">
<div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">MVP Features</div>
<div className="text-4xl font-headline font-bold tracking-tighter mt-2 text-on-surface">7</div>
</div>
</div>
{/* Radars Row */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
{/* Concept Radar (Simulated) */}
<div className="bg-surface-container p-6 rounded-xl border-[0.5px] border-outline-variant/10 h-[400px] flex flex-col">
<h3 className="font-headline text-lg font-semibold mb-6 flex items-center justify-between">
                    Concept Viability
                    <span className="material-symbols-outlined text-on-surface-variant" data-icon="radar">radar</span>
</h3>
<div className="flex-1 relative flex items-center justify-center">
{/* Abstract Radar SVG Representation */}
<svg className="w-full h-full max-w-[280px] max-h-[280px]" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
{/* Grid Lines */}
<polygon fill="none" points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="#35343a" strokeWidth="0.5"></polygon>
<polygon fill="none" points="50,30 67,40 67,60 50,70 33,60 33,40" stroke="#35343a" strokeWidth="0.5"></polygon>
<line stroke="#35343a" strokeWidth="0.5" x1="50" x2="50" y1="50" y2="10"></line>
<line stroke="#35343a" strokeWidth="0.5" x1="50" x2="85" y1="50" y2="30"></line>
<line stroke="#35343a" strokeWidth="0.5" x1="50" x2="85" y1="50" y2="70"></line>
<line stroke="#35343a" strokeWidth="0.5" x1="50" x2="50" y1="50" y2="90"></line>
<line stroke="#35343a" strokeWidth="0.5" x1="50" x2="15" y1="50" y2="70"></line>
<line stroke="#35343a" strokeWidth="0.5" x1="50" x2="15" y1="50" y2="30"></line>
{/* Data Area */}
<polygon fill="rgba(76, 215, 246, 0.1)" points="50,20 75,35 60,65 50,85 25,60 30,35" stroke="#d2bbff" strokeWidth="1.5"></polygon>
{/* Dots */}
<circle cx="50" cy="20" fill="#d2bbff" r="2"></circle>
<circle cx="75" cy="35" fill="#d2bbff" r="2"></circle>
<circle cx="60" cy="65" fill="#d2bbff" r="2"></circle>
<circle cx="50" cy="85" fill="#d2bbff" r="2"></circle>
<circle cx="25" cy="60" fill="#d2bbff" r="2"></circle>
<circle cx="30" cy="35" fill="#d2bbff" r="2"></circle>
</svg>
{/* Labels */}
<span className="absolute top-0 text-[10px] text-on-surface-variant font-mono">Utility</span>
<span className="absolute right-0 top-1/4 text-[10px] text-on-surface-variant font-mono">Market Size</span>
<span className="absolute right-0 bottom-1/4 text-[10px] text-on-surface-variant font-mono">Defensibility</span>
<span className="absolute bottom-0 text-[10px] text-on-surface-variant font-mono">Monetization</span>
<span className="absolute left-0 bottom-1/4 text-[10px] text-on-surface-variant font-mono">Tech Risk</span>
<span className="absolute left-0 top-1/4 text-[10px] text-on-surface-variant font-mono">Urgency</span>
</div>
</div>
{/* Competitor Analysis */}
<div className="bg-surface-container p-6 rounded-xl border-[0.5px] border-outline-variant/10 h-[400px] flex flex-col">
<h3 className="font-headline text-lg font-semibold mb-6 flex items-center justify-between">
                    Competitor Landscape
                    <span className="material-symbols-outlined text-on-surface-variant" data-icon="compare">compare</span>
</h3>
<div className="flex flex-col gap-4 overflow-y-auto pr-2">
{/* Notion */}
<div className="bg-surface-container-high p-4 rounded-lg flex flex-col gap-3">
<div className="flex justify-between items-center">
<span className="font-medium">Notion</span>
<span className="text-xs text-on-surface-variant px-2 py-1 bg-surface-container-highest rounded">Generalist</span>
</div>
<div className="flex gap-2 text-xs">
<span className="text-error bg-error/10 px-2 py-1 rounded border-[0.5px] border-error/20">Poor HIPAA compliance</span>
<span className="text-tertiary bg-tertiary/10 px-2 py-1 rounded border-[0.5px] border-tertiary/20">Highly flexible</span>
</div>
</div>
{/* Fibery */}
<div className="bg-surface-container-high p-4 rounded-lg flex flex-col gap-3">
<div className="flex justify-between items-center">
<span className="font-medium">Fibery</span>
<span className="text-xs text-on-surface-variant px-2 py-1 bg-surface-container-highest rounded">Product Workspace</span>
</div>
<div className="flex gap-2 text-xs">
<span className="text-error bg-error/10 px-2 py-1 rounded border-[0.5px] border-error/20">Steep learning curve</span>
<span className="text-tertiary bg-tertiary/10 px-2 py-1 rounded border-[0.5px] border-tertiary/20">Deep relations</span>
</div>
</div>
{/* Coda */}
<div className="bg-surface-container-high p-4 rounded-lg flex flex-col gap-3">
<div className="flex justify-between items-center">
<span className="font-medium">Coda</span>
<span className="text-xs text-on-surface-variant px-2 py-1 bg-surface-container-highest rounded">Doc App</span>
</div>
<div className="flex gap-2 text-xs">
<span className="text-error bg-error/10 px-2 py-1 rounded border-[0.5px] border-error/20">Mobile app limited</span>
<span className="text-tertiary bg-tertiary/10 px-2 py-1 rounded border-[0.5px] border-tertiary/20">Strong automations</span>
</div>
</div>
</div>
</div>
</div>
{/* Tab Panel */}
<div className="bg-surface-container rounded-xl border-[0.5px] border-outline-variant/10 overflow-hidden">
{/* Tab Headers */}
<div className="flex border-b-[0.5px] border-outline-variant/20 bg-surface-container-low px-4">
<button className="px-6 py-4 text-primary border-b-2 border-primary font-medium text-sm">PRD</button>
<button className="px-6 py-4 text-on-surface-variant hover:text-on-surface transition-colors text-sm">Features</button>
<button className="px-6 py-4 text-on-surface-variant hover:text-on-surface transition-colors text-sm">Architecture</button>
<button className="px-6 py-4 text-on-surface-variant hover:text-on-surface transition-colors text-sm">GTM Strategy</button>
</div>
{/* Tab Content (PRD Active) */}
<div className="p-6 md:p-10">
<div className="max-w-4xl">
<h2 className="text-3xl font-headline font-bold tracking-tight mb-8">Product Requirements Document v1.0</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
{/* Problem Statement */}
<div>
<h4 className="text-xs uppercase tracking-widest text-on-surface-variant font-mono mb-3">Problem Statement</h4>
<p className="text-sm text-on-surface-variant leading-relaxed">
                                Therapists spend an average of 15 minutes per session writing notes. Existing generalized tools lack specific psychiatric frameworks, and specialized tools are clunky and lack modern AI summarization, leading to clinician burnout and less precise patient continuity.
                            </p>
</div>
{/* Target Audience */}
<div>
<h4 className="text-xs uppercase tracking-widest text-on-surface-variant font-mono mb-3">Target Persona</h4>
<div className="bg-surface-container-high p-4 rounded-lg flex items-start gap-4 border-[0.5px] border-outline-variant/10">
<div className="w-12 h-12 rounded bg-surface-variant overflow-hidden shrink-0">
<img alt="Persona" className="w-full h-full object-cover grayscale opacity-80" data-alt="Middle aged female doctor in clinic setting looking thoughtful" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuIEAYboykcrYzk9eLmUsRYgnyJ2QzAj-OvNMNZJe8MIswPWKqFAF8n3bLyg-0MD50Cbs77KQi9q1PCQ4rWpZiXX8CpUHunvtlaz1zbxPIPH5vxa6fGNJjzeYcdFSYDnIy_e_7A1_AWr4XXPLxYjTc_zpJyaygnfi6WMnLO0wk1EwIS31aChIrG5Kms0ZDt4Q4tLAuRdGKxxWE4kt4obrGMjrkGywEaPRZDYvUsPbXGgQTN6G_FDuaqWNdUGn39IQSjKpzuPoriRro"/>
</div>
<div>
<div className="font-medium text-sm">Dr. Sarah Jenkins</div>
<div className="text-xs text-on-surface-variant mt-1">Private Practice Therapist. Sees 25 patients/week. Values minimal clicking and high security.</div>
</div>
</div>
</div>
</div>
<h4 className="text-xs uppercase tracking-widest text-on-surface-variant font-mono mb-4">Success Metrics</h4>
<div className="bg-surface-container-lowest rounded-lg border-[0.5px] border-outline-variant/10 overflow-hidden">
<table className="w-full text-sm text-left">
<thead className="bg-surface-container-low text-on-surface-variant text-xs uppercase font-mono">
<tr>
<th className="px-6 py-3 font-normal">Metric</th>
<th className="px-6 py-3 font-normal">Baseline</th>
<th className="px-6 py-3 font-normal">Target</th>
</tr>
</thead>
<tbody className="divide-y-[0.5px] divide-outline-variant/10 font-mono text-xs">
<tr className="bg-surface-container">
<td className="px-6 py-4 text-on-surface">Time per session note</td>
<td className="px-6 py-4 text-on-surface-variant">15 mins</td>
<td className="px-6 py-4 text-tertiary">&lt; 4 mins</td>
</tr>
<tr className="bg-surface-container-low">
<td className="px-6 py-4 text-on-surface">HIPAA Compliance Check</td>
<td className="px-6 py-4 text-on-surface-variant">Manual</td>
<td className="px-6 py-4 text-tertiary">Automated</td>
</tr>
<tr className="bg-surface-container">
<td className="px-6 py-4 text-on-surface">Daily Active Usage (DAU)</td>
<td className="px-6 py-4 text-on-surface-variant">N/A</td>
<td className="px-6 py-4 text-tertiary">&gt; 80% workdays</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</main>
</div>
{/* Bottom Export Bar */}
<div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-container-high/90 backdrop-blur-md px-2 py-2 rounded-full border-[0.5px] border-outline-variant/30 flex items-center gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-40">
<button className="px-4 py-2 rounded-full text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]" data-icon="picture_as_pdf">picture_as_pdf</span>
            PDF
        </button>
<div className="w-[1px] h-4 bg-outline-variant/30 mx-1"></div>
<button className="px-4 py-2 rounded-full text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]" data-icon="markdown">markdown</span>
            Markdown
        </button>
<div className="w-[1px] h-4 bg-outline-variant/30 mx-1"></div>
<button className="px-4 py-2 rounded-full text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]" data-icon="folder_zip">folder_zip</span>
            ZIP
        </button>
<div className="w-[1px] h-4 bg-outline-variant/30 mx-1"></div>
<button className="px-4 py-2 rounded-full text-xs font-medium bg-primary-container text-on-primary hover:bg-primary transition-colors flex items-center gap-2 shadow-[0_0_12px_rgba(124,58,237,0.3)]">
<span className="material-symbols-outlined text-[16px]" data-icon="link">link</span>
            Copy Link
        </button>
</div>
{/* Footer */}
<footer className="mt-auto py-12 border-t border-[#39383e]/10 bg-[#0D0D12] w-full text-center">
<div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
<div className="flex gap-6 font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-[#4b5563]">
<Link className="hover:text-[#d2bbff] transition-colors" to="/dashboard">Privacy</Link>
<Link className="hover:text-[#d2bbff] transition-colors" to="/dashboard">Terms</Link>
<Link className="hover:text-[#d2bbff] transition-colors" to="/dashboard">API</Link>
<Link className="hover:text-[#d2bbff] transition-colors" to="/dashboard">Changelog</Link>
</div>
<p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-[#4b5563]">© 2024 SpecForge AI. Kinetic Monolith Design.</p>
</div>
</footer>

        </div>
    );
};

export default Dashboard;
