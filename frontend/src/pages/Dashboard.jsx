import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { generateBlueprint } from '../apiService';

const Dashboard = () => {
    const { activeBlueprint, setActiveBlueprint, isGenerating, setIsGenerating } = useAppContext();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('PRD');
    const [activeModal, setActiveModal] = useState(null); // 'health' | 'build' | 'competitors'
    const [exportOpen, setExportOpen] = useState(false);
    const [copyDone, setCopyDone] = useState(false);

    const data = activeBlueprint?.data;
    const idea = activeBlueprint?.idea;

    // If no blueprint loaded, show an empty state prompting to generate
    if (!data) {
        return (
            <div className="font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden text-on-surface bg-background">
{/* TopNavBar */}
<nav className="fixed top-0 w-full flex justify-between items-center px-6 h-16 bg-[#131318]/70 backdrop-blur-xl z-50 border-b border-[#39383e]/20 text-sm">
<div className="flex items-center gap-6">
<div className="text-xl font-bold tracking-tighter text-[#e4e1e9] flex items-center gap-1 font-headline">
<span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                Origin
            </div>
</div>
<Link className="px-4 py-2 bg-gradient-to-br from-primary-container to-primary text-on-primary rounded font-medium hover:opacity-90 transition-opacity" to="/">Create New</Link>
</nav>
<div className="flex flex-1 items-center justify-center pt-16">
<div className="text-center max-w-md space-y-6">
    <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">auto_awesome</span>
    <h2 className="font-headline text-2xl font-bold text-on-surface">No Blueprint Generated Yet</h2>
    <p className="text-on-surface-variant text-sm">Head back to the landing page and describe your startup idea. We'll generate a full product blueprint using AI.</p>
    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-container to-primary text-on-primary rounded-lg font-medium hover:opacity-90 transition-opacity">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Go Generate
    </Link>
</div>
</div>
            </div>
        );
    }

    // Compute radar points from data
    const radarValues = data.radarAnalysis || {};
    const rLabels = ['utility', 'marketSize', 'defensibility', 'monetization', 'techRisk', 'urgency'];
    const rAngles = rLabels.map((_, i) => (Math.PI * 2 * i) / 6 - Math.PI / 2);
    const rPoints = rLabels.map((key, i) => {
        const val = (radarValues[key] || 0) / 10;
        const x = 50 + val * 35 * Math.cos(rAngles[i]);
        const y = 50 + val * 35 * Math.sin(rAngles[i]);
        return { x, y };
    });
    const radarPolygon = rPoints.map(p => `${p.x},${p.y}`).join(' ');

    const handleRegenerate = async () => {
        if (isGenerating || !idea) return;
        setIsGenerating(true);
        try {
            const result = await generateBlueprint(idea);
            setActiveBlueprint(result);
        } catch (err) {
            alert('Regeneration failed: ' + err.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const mvpFeatures = (data.features || []).filter(f => f.phase === 'MVP');

    // ── Export Handlers ──
    const handleExportPDF = () => {
        setExportOpen(false);
        window.print();
    };

    const handleExportMarkdown = () => {
        setExportOpen(false);
        const prd = data.prd || {};
        const metrics = data.metrics || {};
        const radar = data.radarAnalysis || {};
        const features = data.features || [];
        const competitors = data.competitors || [];

        let md = `# ${prd.productName || 'Blueprint'}
> ${prd.tagline || ''}

---

## 📊 Metrics
| Metric | Value |
|---|---|
| Health Score | ${metrics.healthScore}/100 |
| Build Time | ${metrics.buildTimeWeeks} weeks |
| Big Players | ${metrics.competitorsCount} |
| MVP Features | ${metrics.mvpFeaturesCount} |

---

## 📄 Problem Statement
${prd.problemStatement || ''}

## 🎯 Target Persona
**${prd.targetPersona || ''}**
${prd.targetPersonaImageText || ''}

## 😖 User Pain Points
${(prd.userPainPoints || []).map(p => `- ${p}`).join('\n')}

## 📈 Market Gap
${prd.marketGap || ''}

## 🚀 Market Opportunity
${prd.marketOpportunity || ''}

## 💡 Core Hypothesis
> ${prd.coreHypothesis || ''}

## 🔭 Long-Term Vision
${prd.longTermVision || ''}

---

## ⚙️ Tech Stack
| Layer | Technology |
|---|---|
| Frontend | ${prd.technicalSpec?.techStack?.frontend || ''} |
| Backend | ${prd.technicalSpec?.techStack?.backend || ''} |
| Database | ${prd.technicalSpec?.techStack?.database || ''} |
| Infrastructure | ${prd.technicalSpec?.techStack?.infrastructure || ''} |

---

## 🗺️ Feature Roadmap
${features.map(f => `- **[${f.phase}]** ${f.title} _(${f.complexity})_ — ${f.description}`).join('\n')}

---

## 🏆 Competitors
${competitors.map(c => `- **${c.name}** (${c.typeLabel}) · 🔴 ${c.weakness} · 🟢 ${c.strength}`).join('\n')}

---

## 📡 Viability Radar
${Object.entries(radar).map(([k, v]) => `- ${k}: ${v}/10`).join('\n')}
`;

        const blob = new Blob([md], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(prd.productName || 'blueprint').replace(/\s+/g, '_')}_blueprint.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleCopyLink = () => {
        setExportOpen(false);
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopyDone(true);
            setTimeout(() => setCopyDone(false), 2000);
        });
    };

    return (
        <div className="font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden text-on-surface bg-background">
            
{/* TopNavBar */}
<nav className="fixed top-0 w-full flex justify-between items-center px-6 h-16 bg-[#131318]/70 backdrop-blur-xl z-50 border-b border-[#39383e]/20 text-sm">
<div className="flex items-center gap-6">
<div className="text-xl font-bold tracking-tighter text-[#e4e1e9] flex items-center gap-1 font-headline">
<span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                Origin
            </div>
<div className="hidden md:flex gap-6 font-['Plus_Jakarta_Sans'] tracking-tight">
<Link className="text-[#d2bbff] border-b-2 border-[#7c3aed] pb-1" to="/dashboard">Dashboard</Link>
<Link className="text-[#94a3b8] hover:text-[#e4e1e9] transition-colors" to="/history">History</Link>
</div>
</div>
<div className="flex items-center gap-4">
<button className="text-on-surface-variant hover:text-on-surface transition-colors"><span className="material-symbols-outlined">notifications</span></button>
<button className="text-on-surface-variant hover:text-on-surface transition-colors"><span className="material-symbols-outlined">settings</span></button>
<Link className="px-4 py-2 bg-gradient-to-br from-primary-container to-primary text-on-primary rounded font-medium hover:opacity-90 transition-opacity" to="/">Create New</Link>
</div>
</nav>
<div className="flex flex-1 overflow-hidden relative">

{/* SideNavBar */}
<aside className="bg-[#1b1b20] font-['Inter'] text-sm h-screen w-64 border-r-[0.5px] border-white/5 flex flex-col fixed left-0 top-0 pt-20 hidden md:flex shrink-0 z-40 shadow-2xl">
<div className="px-6 pb-6">
<Link to="/" className="w-full bg-gradient-to-r from-primary-container to-primary text-on-primary py-2 px-4 rounded-lg font-medium tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined text-[18px]">add</span>
                    New Project
                </Link>
</div>
<nav className="flex-1 flex flex-col gap-1 px-3">
<Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#d2bbff] bg-white/5">
<span className="material-symbols-outlined">dashboard</span>Dashboard
</Link>
<Link to="/history" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all">
<span className="material-symbols-outlined">history</span>History
</Link>
<Link to="/analytics" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all">
<span className="material-symbols-outlined">insights</span>Analytics
</Link>
<Link to="/features-roadmap" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all">
<span className="material-symbols-outlined">architecture</span>Architecture
</Link>
<Link to="/ai-assistant" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all">
<span className="material-symbols-outlined">psychiatry</span>AI Assistant
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

<main className="flex-1 max-w-[1600px] mx-auto w-full pt-24 px-6 pb-24 md:ml-64 relative z-10 overflow-y-auto">
{/* Context Bar */}
<header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
<div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-full border-[0.5px] border-outline-variant/30">
<span className="material-symbols-outlined text-primary text-sm">psychology</span>
<span className="text-sm text-on-surface-variant">{idea}</span>
</div>
<div className="flex items-center gap-3">
<button onClick={handleRegenerate} disabled={isGenerating} className="px-4 py-2 rounded border-[0.5px] border-outline-variant/30 text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2 text-sm disabled:opacity-50">
{isGenerating ? <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-[18px]">refresh</span>}
                    {isGenerating ? 'Regenerating...' : 'Regenerate'}
                </button>
<Link to="/" className="px-4 py-2 rounded border-[0.5px] border-outline-variant/30 text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2 text-sm">
<span className="material-symbols-outlined text-[18px]">edit</span>
                    New Idea
                </Link>
</div>
</header>
{/* ── Modal Overlay ── */}
{activeModal && (
    <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={() => setActiveModal(null)}
    >
        <div
            className="bg-[#1b1b20] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-6 relative"
            onClick={e => e.stopPropagation()}
        >
            <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
            >
                <span className="material-symbols-outlined">close</span>
            </button>

            {/* Health Score Modal */}
            {activeModal === 'health' && (() => {
                const radar = data.radarAnalysis || {};
                const score = data.metrics?.healthScore ?? 0;
                const scoreColor = score >= 75 ? 'text-secondary' : score >= 50 ? 'text-primary' : 'text-error';
                const factors = [
                    { label: 'Utility', val: radar.utility, icon: 'bolt', note: 'How directly the product solves a real pain.' },
                    { label: 'Market Size', val: radar.marketSize, icon: 'pie_chart', note: 'Addressable market breadth.' },
                    { label: 'Defensibility', val: radar.defensibility, icon: 'shield', note: 'Moat against competitor replication.' },
                    { label: 'Monetization', val: radar.monetization, icon: 'payments', note: 'Clarity and strength of revenue model.' },
                    { label: 'Tech Risk', val: radar.techRisk, icon: 'code', note: 'Engineering complexity & feasibility.' },
                    { label: 'Urgency', val: radar.urgency, icon: 'timer', note: 'Market pull and timing of the idea.' },
                ];
                return (<>
                    <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant mb-1">Health Score Breakdown</div>
                        <div className={`text-5xl font-headline font-bold ${scoreColor}`}>{score}<span className="text-xl text-on-surface-variant font-body">/100</span></div>
                        <p className="text-xs text-on-surface-variant mt-2">Score is a weighted composite of six viability dimensions rated by the AI on a 0–10 scale.</p>
                    </div>
                    <div className="space-y-3">
                        {factors.map(f => (
                            <div key={f.label}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="flex items-center gap-1.5 text-on-surface font-medium">
                                        <span className="material-symbols-outlined text-primary text-sm">{f.icon}</span>
                                        {f.label}
                                    </span>
                                    <span className="font-mono text-on-surface-variant">{f.val ?? '—'}/10</span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-white/5">
                                    <div
                                        className="h-1.5 rounded-full bg-gradient-to-r from-primary-container to-primary transition-all"
                                        style={{ width: `${((f.val || 0) / 10) * 100}%` }}
                                    />
                                </div>
                                <div className="text-[10px] text-on-surface-variant/60 mt-0.5 italic">{f.note}</div>
                            </div>
                        ))}
                    </div>
                </>);
            })()}

            {/* Build Time Modal */}
            {activeModal === 'build' && (() => {
                const features = data.features || [];
                const mvpCount = features.filter(f => f.phase === 'MVP').length;
                const v1Count = features.filter(f => f.phase === 'V1').length;
                const futureCount = features.filter(f => f.phase === 'Future').length;
                const complexity = { High: features.filter(f => f.complexity === 'High').length, Medium: features.filter(f => f.complexity === 'Medium').length, Low: features.filter(f => f.complexity === 'Low').length };
                return (<>
                    <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant mb-1">Build Timeline Estimate</div>
                        <div className="text-5xl font-headline font-bold text-on-surface">{data.metrics?.buildTimeWeeks ?? '—'}<span className="text-xl text-on-surface-variant font-body"> wks</span></div>
                        <p className="text-xs text-on-surface-variant mt-2">Estimated end-to-end delivery duration for an MVP-complete build by a lean team of 2–3 engineers.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { phase: 'MVP', count: mvpCount, color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/20', sublabel: '~40% of timeline' },
                            { phase: 'V1', count: v1Count, color: 'text-primary', bg: 'bg-primary/10 border-primary/20', sublabel: '~35% of timeline' },
                            { phase: 'Future', count: futureCount, color: 'text-on-surface-variant', bg: 'bg-white/5 border-white/10', sublabel: 'Post-launch' },
                        ].map(p => (
                            <div key={p.phase} className={`rounded-xl border p-4 ${p.bg} text-center`}>
                                <div className={`text-2xl font-bold font-headline ${p.color}`}>{p.count}</div>
                                <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant mt-1">{p.phase}</div>
                                <div className="text-[9px] text-on-surface-variant/50 mt-0.5">{p.sublabel}</div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Complexity Mix</div>
                        {Object.entries(complexity).map(([lvl, cnt]) => (
                            <div key={lvl} className="flex items-center justify-between text-xs">
                                <span className={`font-medium ${lvl === 'High' ? 'text-error' : lvl === 'Medium' ? 'text-primary' : 'text-secondary'}`}>{lvl}</span>
                                <span className="font-mono text-on-surface-variant">{cnt} feature{cnt !== 1 ? 's' : ''}</span>
                            </div>
                        ))}
                    </div>
                </>);
            })()}

            {/* Competitors / Big Players Modal */}
            {activeModal === 'competitors' && (<>
                <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant mb-1">Big Players in the Space</div>
                    <div className="text-5xl font-headline font-bold text-on-surface">{data.metrics?.competitorsCount ?? '—'}<span className="text-xl text-on-surface-variant font-body"> identified</span></div>
                    <p className="text-xs text-on-surface-variant mt-2">Known market incumbents and their exploitable gaps your product should target.</p>
                </div>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {(data.competitors || []).map((c, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-on-surface text-sm">{c.name}</span>
                                <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">{c.typeLabel}</span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <span className="text-[11px] text-error bg-error/10 border border-error/20 px-2 py-1 rounded flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">remove_circle</span> {c.weakness}
                                </span>
                                <span className="text-[11px] text-secondary bg-secondary/10 border border-secondary/20 px-2 py-1 rounded flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">check_circle</span> {c.strength}
                                </span>
                            </div>
                        </div>
                    ))}
                    {(!data.competitors || data.competitors.length === 0) && (
                        <p className="text-sm text-on-surface-variant italic text-center py-6">No competitors mapped.</p>
                    )}
                </div>
            </>)}
        </div>
    </div>
)}

{/* Metrics Row */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {/* Health Score Card */}
    <button
        onClick={() => setActiveModal('health')}
        className="bg-surface-container p-6 rounded-xl border-[0.5px] border-outline-variant/10 flex flex-col justify-between min-h-[120px] text-left hover:border-secondary/40 hover:bg-surface-container-high transition-all group cursor-pointer"
    >
        <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">Health Score</div>
            <span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-secondary transition-colors text-sm">open_in_new</span>
        </div>
        <div className="text-4xl font-headline font-bold tracking-tighter mt-2 text-secondary">{data.metrics?.healthScore ?? '—'}<span className="text-lg text-on-surface-variant font-body">/100</span></div>
        <div className="text-[10px] text-on-surface-variant/50 mt-1 font-mono group-hover:text-secondary/70 transition-colors">Click · see breakdown →</div>
    </button>

    {/* Build Time Card */}
    <button
        onClick={() => setActiveModal('build')}
        className="bg-surface-container p-6 rounded-xl border-[0.5px] border-outline-variant/10 flex flex-col justify-between min-h-[120px] text-left hover:border-primary/40 hover:bg-surface-container-high transition-all group cursor-pointer"
    >
        <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">Build Time</div>
            <span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-primary transition-colors text-sm">open_in_new</span>
        </div>
        <div className="text-4xl font-headline font-bold tracking-tighter mt-2 text-on-surface">{data.metrics?.buildTimeWeeks ?? '—'} <span className="text-lg text-on-surface-variant font-body font-normal">wks</span></div>
        <div className="text-[10px] text-on-surface-variant/50 mt-1 font-mono group-hover:text-primary/70 transition-colors">Click · phase breakdown →</div>
    </button>

    {/* Big Players Card */}
    <button
        onClick={() => setActiveModal('competitors')}
        className="bg-surface-container p-6 rounded-xl border-[0.5px] border-outline-variant/10 flex flex-col justify-between min-h-[120px] text-left hover:border-tertiary/40 hover:bg-surface-container-high transition-all group cursor-pointer"
    >
        <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">Big Players</div>
            <span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-tertiary transition-colors text-sm">open_in_new</span>
        </div>
        <div className="text-4xl font-headline font-bold tracking-tighter mt-2 text-on-surface">{data.metrics?.competitorsCount ?? '—'}</div>
        <div className="text-[10px] text-on-surface-variant/50 mt-1 font-mono group-hover:text-tertiary/70 transition-colors">Click · view players →</div>
    </button>

    {/* MVP Features Card - inline mini list */}
    <div className="bg-surface-container p-6 rounded-xl border-[0.5px] border-outline-variant/10 flex flex-col min-h-[120px] gap-3">
        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">MVP Features</div>
        <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
            {mvpFeatures.slice(0, 3).map((f, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                    <span className="text-xs text-on-surface truncate">{f.title}</span>
                    <span className={`text-[9px] shrink-0 font-mono uppercase px-1.5 py-0.5 rounded ${f.complexity === 'High' ? 'text-error bg-error/10' : f.complexity === 'Medium' ? 'text-primary bg-primary/10' : 'text-secondary bg-secondary/10'}`}>{f.complexity}</span>
                </div>
            ))}
            {mvpFeatures.length > 3 && (
                <div className="text-[10px] text-on-surface-variant/50 font-mono">+{mvpFeatures.length - 3} more</div>
            )}
            {mvpFeatures.length === 0 && (
                <div className="text-[10px] text-on-surface-variant/50 italic">None specified</div>
            )}
        </div>
    </div>
</div>
{/* Radars Row */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
{/* Concept Radar */}
<div className="bg-surface-container p-6 rounded-xl border-[0.5px] border-outline-variant/10 h-[400px] flex flex-col">
<h3 className="font-headline text-lg font-semibold mb-6 flex items-center justify-between">
                    Concept Viability
                    <span className="material-symbols-outlined text-on-surface-variant">radar</span>
</h3>
<div className="flex-1 relative flex items-center justify-center">
<svg className="w-full h-full max-w-[280px] max-h-[280px]" fill="none" viewBox="0 0 100 100">
<polygon fill="none" points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" stroke="#35343a" strokeWidth="0.5"></polygon>
<polygon fill="none" points="50,32.5 65,41.25 65,58.75 50,67.5 35,58.75 35,41.25" stroke="#35343a" strokeWidth="0.5"></polygon>
{rAngles.map((a, i) => <line key={i} stroke="#35343a" strokeWidth="0.5" x1="50" y1="50" x2={50 + 35 * Math.cos(a)} y2={50 + 35 * Math.sin(a)}></line>)}
<polygon fill="rgba(76, 215, 246, 0.1)" points={radarPolygon} stroke="#d2bbff" strokeWidth="1.5"></polygon>
{rPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} fill="#d2bbff" r="2"></circle>)}
</svg>
<span className="absolute top-0 text-[10px] text-on-surface-variant font-mono">Utility ({radarValues.utility}/10)</span>
<span className="absolute right-0 top-1/4 text-[10px] text-on-surface-variant font-mono">Market ({radarValues.marketSize}/10)</span>
<span className="absolute right-0 bottom-1/4 text-[10px] text-on-surface-variant font-mono">Defense ({radarValues.defensibility}/10)</span>
<span className="absolute bottom-0 text-[10px] text-on-surface-variant font-mono">Money ({radarValues.monetization}/10)</span>
<span className="absolute left-0 bottom-1/4 text-[10px] text-on-surface-variant font-mono">Risk ({radarValues.techRisk}/10)</span>
<span className="absolute left-0 top-1/4 text-[10px] text-on-surface-variant font-mono">Urgency ({radarValues.urgency}/10)</span>
</div>
</div>
{/* Competitor Landscape */}
<div className="bg-surface-container p-6 rounded-xl border-[0.5px] border-outline-variant/10 h-[400px] flex flex-col">
<h3 className="font-headline text-lg font-semibold mb-6 flex items-center justify-between">
                    Competitor Landscape
                    <span className="material-symbols-outlined text-on-surface-variant">compare</span>
</h3>
<div className="flex flex-col gap-4 overflow-y-auto pr-2">
{(data.competitors || []).map((c, i) => (
<div key={i} className="bg-surface-container-high p-4 rounded-lg flex flex-col gap-3">
<div className="flex justify-between items-center">
<span className="font-medium">{c.name}</span>
<span className="text-xs text-on-surface-variant px-2 py-1 bg-surface-container-highest rounded">{c.typeLabel}</span>
</div>
<div className="flex gap-2 text-xs flex-wrap">
<span className="text-error bg-error/10 px-2 py-1 rounded border-[0.5px] border-error/20">{c.weakness}</span>
<span className="text-tertiary bg-tertiary/10 px-2 py-1 rounded border-[0.5px] border-tertiary/20">{c.strength}</span>
</div>
</div>
))}
{(!data.competitors || data.competitors.length === 0) && <p className="text-sm text-on-surface-variant">No competitors found.</p>}
</div>
</div>
</div>
{/* Tab Panel */}
<div className="bg-surface-container rounded-xl border-[0.5px] border-outline-variant/10 overflow-hidden">
<div className="flex border-b-[0.5px] border-outline-variant/20 bg-surface-container-low px-4">
{['PRD', 'Features'].map(tab => (
    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>{tab}</button>
))}
</div>
{activeTab === 'PRD' && (
<div className="p-6 md:p-10 space-y-16">
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
        
        {/* Hero Branding */}
        <div className="text-center md:text-left border-b border-outline-variant/20 pb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 text-[10px] font-mono uppercase tracking-widest text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Official Product Blueprint
            </div>
            <h2 className="text-5xl font-headline font-bold tracking-tight mb-4 text-on-surface leading-tight">
                {data.prd?.productName || 'Strategic Blueprint'}
            </h2>
            <p className="text-xl text-on-surface-variant font-medium italic max-w-2xl">
                {data.prd?.tagline || 'Precision Specification for Market Entry'}
            </p>
        </div>

        {/* Executive Summary / Problem Statement */}
        <section className="space-y-6">
            <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary font-mono font-bold">
                <span className="w-8 h-[1px] bg-primary"></span>
                Executive Summary & Problem Statement
            </h4>
            <div className="prose prose-invert max-w-none">
                <p className="text-lg text-on-surface-variant leading-relaxed whitespace-pre-wrap font-body">
                    {data.prd?.problemStatement || 'Analyzing systemic challenges...'}
                </p>
            </div>
        </section>

        {/* User Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Persona Card */}
            <section className="space-y-6">
                <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary font-mono font-bold">
                    <span className="w-8 h-[1px] bg-primary"></span>
                    Target Audience
                </h4>
                <div className="bg-surface-container-high p-8 rounded-2xl border border-outline-variant/10 shadow-xl">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary border border-primary/20">
                            <span className="material-symbols-outlined text-4xl">face</span>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-on-surface">{data.prd?.targetPersona || 'Key Stakeholder'}</div>
                            <div className="text-sm text-primary font-mono mt-1 uppercase tracking-wider">Primary Persona</div>
                        </div>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed text-[15px]">
                        {data.prd?.targetPersonaImageText || 'Defining user characteristics...'}
                    </p>
                </div>
            </section>

            {/* Pain Points */}
            <section className="space-y-6">
                <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary font-mono font-bold">
                    <span className="w-8 h-[1px] bg-primary"></span>
                    Critical Pain Points
                </h4>
                <div className="space-y-3">
                    {(data.prd?.userPainPoints || []).map((point, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/5">
                            <div className="w-6 h-6 rounded-full bg-error/10 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-xs text-error">close</span>
                            </div>
                            <p className="text-sm text-on-surface-variant">{point}</p>
                        </div>
                    ))}
                    {(!data.prd?.userPainPoints || data.prd.userPainPoints.length === 0) && (
                        <p className="italic text-on-surface-variant/50 text-sm">Identifying friction points...</p>
                    )}
                </div>
            </section>
        </div>

        {/* Market Intelligence */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
                <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-secondary font-mono font-bold">
                    <span className="w-8 h-[1px] bg-secondary"></span>
                    The Market Gap
                </h4>
                <p className="text-[15px] text-on-surface-variant leading-relaxed bg-surface-container/50 p-6 rounded-2xl border border-outline-variant/10 italic">
                    {data.prd?.marketGap || 'Analyzing existing solutions...'}
                </p>
            </div>
            <div className="space-y-4">
                <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-secondary font-mono font-bold">
                    <span className="w-8 h-[1px] bg-secondary"></span>
                    Market Opportunity
                </h4>
                <p className="text-[15px] text-on-surface-variant leading-relaxed p-6">
                    {data.prd?.marketOpportunity || 'Surfacing market triggers...'}
                </p>
            </div>
        </section>

        {/* Strategic Vision */}
        <section className="space-y-8 bg-surface-container-lowest p-10 rounded-3xl border border-outline-variant/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">telescope</span>
            </div>
            <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-tertiary font-mono font-bold">
                        <span className="w-8 h-[1px] bg-tertiary"></span>
                        Strategic Hypothesis
                    </h4>
                    <p className="text-2xl font-headline font-semibold text-on-surface leading-snug">
                       &ldquo;{data.prd?.coreHypothesis || 'Forging core bet...'}&rdquo;
                    </p>
                </div>
                <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-tertiary font-mono font-bold">
                        <span className="w-8 h-[1px] bg-tertiary"></span>
                        Long-Term Vision
                    </h4>
                    <p className="text-[15px] text-on-surface-variant leading-relaxed max-w-3xl">
                        {data.prd?.longTermVision || 'Scaling product horizons...'}
                    </p>
                </div>
            </div>
        </section>

        {/* Risk Portfolio */}
        <section className="space-y-6">
            <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-error font-mono font-bold">
                <span className="w-8 h-[1px] bg-error"></span>
                Risk Portfolio & Mitigation
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(data.prd?.mitigations || []).map((m, i) => (
                    <div key={i} className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/10 space-y-4">
                        <div className="flex items-center gap-2 text-error font-bold text-xs uppercase tracking-widest font-mono">
                            <span className="material-symbols-outlined text-sm">warning</span>
                            Risk
                        </div>
                        <p className="text-sm text-on-surface font-medium border-b border-outline-variant/20 pb-4">{m.risk}</p>
                        <div className="flex items-center gap-2 text-success font-bold text-xs uppercase tracking-widest font-mono">
                            <span className="material-symbols-outlined text-sm text-secondary">verified_user</span>
                            Mitigation
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed">{m.solution}</p>
                    </div>
                ))}
                {(!data.prd?.mitigations || data.prd.mitigations.length === 0) && (
                    <p className="italic text-on-surface-variant/50 text-sm">Calculating systemic risks...</p>
                )}
            </div>
        </section>

        {/* Engineering Blueprint (Backend Integration) */}
        <section className="space-y-10 border-t border-outline-variant/20 pt-16">
            <div className="space-y-2">
                <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary font-mono font-bold">
                    <span className="w-8 h-[1px] bg-primary"></span>
                    Engineering Blueprint
                </h4>
                <p className="text-sm text-on-surface-variant font-medium">Precision Backend and Infrastructure Specification</p>
            </div>

            {/* Tech Stack Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Frontend', value: data.prd?.technicalSpec?.techStack?.frontend, icon: 'laptop_mac' },
                    { label: 'Backend', value: data.prd?.technicalSpec?.techStack?.backend, icon: 'dns' },
                    { label: 'Database', value: data.prd?.technicalSpec?.techStack?.database, icon: 'database' },
                    { label: 'Infrastructure', value: data.prd?.technicalSpec?.techStack?.infrastructure, icon: 'cloud' }
                ].map((item, i) => (
                    <div key={i} className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/10 flex flex-col gap-3">
                        <span className="material-symbols-outlined text-primary/40">{item.icon}</span>
                        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">{item.label}</div>
                        <div className="text-sm font-bold text-on-surface">{item.value || 'Configuring...'}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Data Architecture */}
                <div className="space-y-6">
                    <h5 className="text-sm font-bold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">schema</span>
                        Primary Data Entities
                    </h5>
                    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-surface-container/50 text-on-surface-variant uppercase font-mono text-[9px]">
                                <tr>
                                    <th className="px-5 py-3 font-bold">Table</th>
                                    <th className="px-5 py-3 font-bold">Responsibility</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                {(data.prd?.technicalSpec?.databaseArchitecture || []).map((db, i) => (
                                    <tr key={i} className="hover:bg-surface-container/30 transition-colors">
                                        <td className="px-5 py-4 text-on-surface font-mono">{db.table}</td>
                                        <td className="px-5 py-4 text-on-surface-variant leading-relaxed">{db.description}</td>
                                    </tr>
                                ))}
                                {(!data.prd?.technicalSpec?.databaseArchitecture || data.prd.technicalSpec.databaseArchitecture.length === 0) && (
                                    <tr><td colSpan="2" className="px-5 py-8 text-center text-on-surface-variant/50 italic font-mono uppercase tracking-widest">Compiling schema...</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* API Strategy */}
                <div className="space-y-6">
                    <h5 className="text-sm font-bold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">hub</span>
                        External Service Matrix
                    </h5>
                    <div className="grid grid-cols-1 gap-4">
                        {(data.prd?.technicalSpec?.apiIntegrations || []).map((api, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/5">
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm font-bold text-on-surface">{api.service}</div>
                                    <div className="text-xs text-on-surface-variant">{api.purpose}</div>
                                </div>
                                <span className="material-symbols-outlined text-success text-[18px]">link</span>
                            </div>
                        ))}
                        {(!data.prd?.technicalSpec?.apiIntegrations || data.prd.technicalSpec.apiIntegrations.length === 0) && (
                             <div className="text-center py-10 text-on-surface-variant/50 italic font-mono text-xs uppercase tracking-widest">Mapping integrations...</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Security Arch */}
            <div className="bg-gradient-to-br from-primary/10 to-transparent p-8 rounded-3xl border border-primary/20 space-y-4">
                <div className="flex items-center gap-3 text-primary font-bold text-xs uppercase tracking-[0.2em] font-mono">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    Security & Compliance Architecture
                </div>
                <p className="text-sm text-on-surface-variant leading-loose max-w-4xl">
                    {data.prd?.technicalSpec?.securityModel || 'Drafting security protocols...'}
                </p>
            </div>
        </section>

        {/* Success Benchmarks */}
        <section className="space-y-6">
            <h4 className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-on-surface-variant font-mono font-bold">
                <span className="w-8 h-[1px] bg-outline-variant"></span>
                Success Benchmarks
            </h4>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-surface-container/50 text-on-surface-variant text-[10px] uppercase font-mono tracking-[0.2em]">
                        <tr>
                            <th className="px-8 py-4 font-bold">Success Indicator</th>
                            <th className="px-8 py-4 font-bold">Baseline (Current)</th>
                            <th className="px-8 py-4 font-bold text-secondary">Target (Post-MVP)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10 font-mono text-xs">
                        <tr className="bg-surface-container/20 group hover:bg-surface-container transition-colors">
                            <td className="px-8 py-6 text-on-surface font-bold">Core Viability Metric</td>
                            <td className="px-8 py-6 text-on-surface-variant">{data.prd?.successBaseline || 'Analysing...'}</td>
                            <td className="px-8 py-6 text-secondary font-bold">{data.prd?.successTarget || 'Calculating...'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</div>
)}
{activeTab === 'Features' && (
<div className="p-6 md:p-10">
<div className="max-w-4xl space-y-4">
<h2 className="text-3xl font-headline font-bold tracking-tight mb-4">MVP Feature Set</h2>
{mvpFeatures.map((f, i) => (
    <div key={i} className="bg-surface-container-high p-5 rounded-xl border-[0.5px] border-outline-variant/10 flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <h5 className="font-medium text-on-surface">{f.title}</h5>
            <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${f.complexity === 'High' ? 'text-error bg-error/10' : f.complexity === 'Medium' ? 'text-primary bg-primary/10' : 'text-secondary bg-secondary/10'}`}>{f.complexity}</span>
        </div>
        <p className="text-xs text-on-surface-variant">{f.description}</p>
    </div>
))}
{mvpFeatures.length === 0 && <p className="text-sm text-on-surface-variant">No MVP features specified.</p>}
</div>
</div>
)}
</div>
</main>
</div>
{/* ── Export Dropdown ── */}
<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
    {/* Dropdown menu - appears above button */}
    {exportOpen && (
        <div className="bg-[#1b1b20] border border-white/10 rounded-2xl shadow-2xl overflow-hidden w-52 animate-in slide-in-from-bottom-2">
            <button
                onClick={handleExportPDF}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-on-surface hover:bg-white/5 transition-colors"
            >
                <span className="material-symbols-outlined text-[18px] text-error">picture_as_pdf</span>
                <div className="text-left">
                    <div className="font-medium">Export as PDF</div>
                    <div className="text-[10px] text-on-surface-variant">Full dashboard printout</div>
                </div>
            </button>
            <div className="h-[0.5px] bg-white/5" />
            <button
                onClick={handleExportMarkdown}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-on-surface hover:bg-white/5 transition-colors"
            >
                <span className="material-symbols-outlined text-[18px] text-secondary">markdown</span>
                <div className="text-left">
                    <div className="font-medium">Export as Markdown</div>
                    <div className="text-[10px] text-on-surface-variant">Download .md file</div>
                </div>
            </button>
            <div className="h-[0.5px] bg-white/5" />
            <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-on-surface hover:bg-white/5 transition-colors"
            >
                <span className="material-symbols-outlined text-[18px] text-primary">{copyDone ? 'check_circle' : 'link'}</span>
                <div className="text-left">
                    <div className="font-medium">{copyDone ? 'Copied!' : 'Copy Link'}</div>
                    <div className="text-[10px] text-on-surface-variant">Share this blueprint</div>
                </div>
            </button>
        </div>
    )}
    {/* Single Export Button */}
    <button
        onClick={() => setExportOpen(o => !o)}
        className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary rounded-full font-medium text-sm hover:bg-primary transition-all shadow-[0_4px_24px_rgba(124,58,237,0.4)] hover:shadow-[0_4px_32px_rgba(124,58,237,0.6)]"
    >
        <span className="material-symbols-outlined text-[18px]">ios_share</span>
        Export Blueprint
        <span className="material-symbols-outlined text-[14px] transition-transform" style={{transform: exportOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>expand_less</span>
    </button>
</div>
{/* Click outside to close export */}
{exportOpen && <div className="fixed inset-0 z-[39]" onClick={() => setExportOpen(false)} />}

        </div>
    );
};

export default Dashboard;

