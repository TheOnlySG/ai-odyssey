import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// ─── Derive plain-English user journey steps from blueprint ───────────────────
function deriveJourneySteps(data) {
    const prd = data?.prd || {};
    const techStack = prd.technicalSpec?.techStack || {};
    const apis = prd.technicalSpec?.apiIntegrations || [];
    const features = data?.features || [];
    const productName = prd.productName || 'the app';

    const mvpFeatures = features.filter(f => f.phase === 'MVP');
    const coreUi = mvpFeatures.filter(f => f.category === 'Core UI');
    const aiEngine = mvpFeatures.filter(f => f.category === 'AI Engine');
    const authApi = apis.find(a => /auth|login|user|identity/i.test(a.service + a.purpose));
    const aiApi = apis.find(a => /ai|gemini|openai|gpt|claude|llm|ml/i.test(a.service + a.purpose));

    const steps = [];

    // Step 1 – Entry
    steps.push({
        icon: 'waving_hand',
        color: '#d2bbff',
        colorBg: 'rgba(210,187,255,0.10)',
        action: `User opens ${productName}`,
        what: `The person lands on the home screen and sees a clean, welcoming interface ready to guide them forward — no setup needed.`,
        tech: [techStack.frontend || 'Frontend App', techStack.infrastructure || 'Cloud Hosting'],
        techLabel: 'What makes this run',
        details: [
            `The ${techStack.frontend || 'frontend'} renders the UI from ${techStack.infrastructure || 'cloud servers'} in milliseconds.`,
            'Pages are pre-built for near-instant load, even on slow connections.',
        ],
    });

    // Step 2 – Sign up / Auth
    if (authApi || apis.length > 0) {
        steps.push({
            icon: 'lock_open',
            color: '#4cd7f6',
            colorBg: 'rgba(76,215,246,0.10)',
            action: 'User signs up or logs in',
            what: `They create an account or sign in with a few taps. Their identity is checked instantly — no waiting, no complicated verification steps.`,
            tech: [authApi ? authApi.service : 'Authentication Service', techStack.backend || 'Backend API'],
            techLabel: 'What keeps this secure',
            details: [
                `${authApi ? authApi.service : 'A secure auth service'} handles credentials — passwords are never stored as plain text.`,
                `The ${techStack.backend || 'backend'} issues a signed session token so the user stays logged in safely.`,
            ],
        });
    }

    // Steps 3-N – Core UI MVP features (what the user directly sees/does)
    coreUi.slice(0, 3).forEach(f => {
        steps.push({
            icon: 'touch_app',
            color: '#a78bfa',
            colorBg: 'rgba(167,139,250,0.10)',
            action: f.title,
            what: f.description,
            tech: [techStack.frontend || 'Frontend', techStack.backend || 'Backend API'],
            techLabel: 'Behind the scenes',
            details: [
                `When the user taps or submits, the ${techStack.frontend || 'app'} sends a request to the ${techStack.backend || 'server'}.`,
                `The server validates it and sends back a response — typically in under 200ms.`,
            ],
        });
    });

    // AI step
    if (aiEngine.length > 0 || aiApi) {
        const aiFeature = aiEngine[0];
        steps.push({
            icon: 'smart_toy',
            color: '#ffd966',
            colorBg: 'rgba(255,217,102,0.10)',
            action: aiFeature ? aiFeature.title : 'AI processes the request',
            what: aiFeature
                ? aiFeature.description
                : `The AI engine reads the user's input and generates a smart, personalised response in seconds — no manual effort required.`,
            tech: [aiApi ? aiApi.service : 'AI / ML Engine', techStack.backend || 'Backend'],
            techLabel: 'How the AI works',
            details: [
                `The ${techStack.backend || 'server'} sends the user's input to ${aiApi ? aiApi.service : 'the AI model'}.`,
                `The model generates a response which is streamed back to the screen in real-time — like ChatGPT's typing effect.`,
            ],
        });
    }

    // Non-UI MVP features (business logic)
    const logicFeatures = mvpFeatures.filter(
        f => f.category !== 'Core UI' && f.category !== 'AI Engine'
    ).slice(0, 2);
    logicFeatures.forEach(f => {
        steps.push({
            icon: 'manufacturing',
            color: '#c3f0a7',
            colorBg: 'rgba(195,240,167,0.10)',
            action: f.title,
            what: f.description,
            tech: [techStack.backend || 'Backend', techStack.database || 'Database'],
            techLabel: 'How this is handled',
            details: [
                `The business rules run quietly on the ${techStack.backend || 'server'} — the user never sees the complexity.`,
                `Any results or changes are saved to ${techStack.database || 'the database'} immediately for next time.`,
            ],
        });
    });

    // Data persistence step
    if (techStack.database) {
        steps.push({
            icon: 'database',
            color: '#34d399',
            colorBg: 'rgba(52,211,153,0.10)',
            action: 'Everything is saved automatically',
            what: `All the user's data — preferences, history, progress — is stored silently in the background. Nothing is ever lost between sessions.`,
            tech: [techStack.database, 'Encrypted at rest'],
            techLabel: 'Where the data lives',
            details: [
                `All information is stored in ${techStack.database} with automatic backups so nothing is ever lost.`,
                `Sensitive data is encrypted — users own and control their information at all times.`,
            ],
        });
    }

    // External service integrations
    const nonAuthApis = apis.filter(a => a !== authApi && a !== aiApi).slice(0, 2);
    nonAuthApis.forEach(api => {
        steps.push({
            icon: 'hub',
            color: '#f0a2c0',
            colorBg: 'rgba(240,162,192,0.10)',
            action: `${api.service} is called in the background`,
            what: `${api.purpose}. The user never has to think about this — it just happens automatically while they focus on their goal.`,
            tech: [api.service, techStack.backend || 'Backend'],
            techLabel: 'What this API does',
            details: [
                `The ${techStack.backend || 'server'} calls ${api.service}'s API securely using server-side credentials.`,
                `Results are processed and the user sees only the final, clean output.`,
            ],
        });
    });

    // Final – result delivered to user
    steps.push({
        icon: 'celebration',
        color: '#fb923c',
        colorBg: 'rgba(251,146,60,0.10)',
        action: 'User gets their result — instantly',
        what: `The final output appears on screen. The user can act on it, share it, save it, or continue their workflow. No technical knowledge required at any point.`,
        tech: [techStack.frontend || 'Frontend UI', techStack.infrastructure || 'CDN / Edge'],
        techLabel: 'How it reaches the user fast',
        details: [
            `The UI updates instantly without a full page reload — feels like a native app.`,
            `Delivered through ${techStack.infrastructure || 'global cloud infrastructure'} so it's fast no matter where the user is.`,
        ],
    });

    return steps;
}

// ─── ER Diagram helper ─────────────────────────────────────────────────────────
function deriveRelations(tables) {
    const relations = [];
    tables.forEach((t, i) => {
        tables.forEach((t2, j) => {
            if (i >= j) return;
            const d1 = (t.description + ' ' + t.table).toLowerCase();
            const d2 = (t2.description + ' ' + t2.table).toLowerCase();
            const t1name = t.table.toLowerCase().replace(/s$/, '');
            const t2name = t2.table.toLowerCase().replace(/s$/, '');
            if (d1.includes(t2name) || d2.includes(t1name)) {
                relations.push({ from: i, to: j });
            }
        });
    });
    return relations;
}

// ─── User Journey Story Map ────────────────────────────────────────────────────
const ArchitectureFlow = ({ data }) => {
    const steps = useMemo(() => deriveJourneySteps(data), [data]);
    const [expandedStep, setExpandedStep] = useState(null);

    return (
        <section className="bg-surface-container rounded-2xl ghost-border overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b border-outline-variant/10 flex items-center justify-between">
                <div>
                    <h3 className="font-headline font-bold text-on-surface text-lg flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">route</span>
                        How This Product Works
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1">
                        A plain-language walkthrough of the entire user journey — click any step to see what powers it under the hood
                    </p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {steps.length} Steps · PRD-Driven
                </span>
            </div>

            <div className="p-6">
                <div className="flex flex-col">
                    {steps.map((step, i) => {
                        const isOpen = expandedStep === i;
                        const isLast = i === steps.length - 1;
                        return (
                            <div key={i} className="flex gap-5">
                                {/* Timeline spine */}
                                <div className="flex flex-col items-center shrink-0">
                                    <button
                                        onClick={() => setExpandedStep(isOpen ? null : i)}
                                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-110 focus:outline-none"
                                        style={{
                                            background: isOpen ? step.color + '25' : step.colorBg,
                                            borderColor: isOpen ? step.color : step.color + '35',
                                            boxShadow: isOpen ? `0 0 16px ${step.color}50` : 'none',
                                        }}
                                    >
                                        <span className="material-symbols-outlined text-[18px]" style={{ color: step.color }}>
                                            {step.icon}
                                        </span>
                                    </button>
                                    {!isLast && (
                                        <div
                                            className="w-[2px] my-1 rounded-full flex-1"
                                            style={{ background: `linear-gradient(to bottom, ${step.color}30, ${steps[i+1].color}15)`, minHeight: '24px' }}
                                        />
                                    )}
                                </div>

                                {/* Card */}
                                <div className="flex-1 pb-5">
                                    <button
                                        onClick={() => setExpandedStep(isOpen ? null : i)}
                                        className="w-full text-left focus:outline-none"
                                    >
                                        <div
                                            className="rounded-xl border px-5 py-4 transition-all duration-200"
                                            style={{
                                                background: isOpen ? step.color + '0a' : 'rgba(255,255,255,0.02)',
                                                borderColor: isOpen ? step.color + '55' : step.color + '18',
                                            }}
                                        >
                                            {/* Step label + action title */}
                                            <div className="flex items-center justify-between gap-3 mb-2">
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    <span
                                                        className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded shrink-0"
                                                        style={{ color: step.color, background: step.color + '18' }}
                                                    >
                                                        Step {i + 1}
                                                    </span>
                                                    <h4 className="font-headline font-bold text-on-surface text-sm leading-tight truncate">
                                                        {step.action}
                                                    </h4>
                                                </div>
                                                <span
                                                    className="material-symbols-outlined text-[16px] shrink-0 transition-transform duration-200"
                                                    style={{
                                                        color: step.color + '70',
                                                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    }}
                                                >
                                                    expand_more
                                                </span>
                                            </div>

                                            {/* Plain-English description — always visible */}
                                            <p className="text-sm text-on-surface-variant leading-relaxed">
                                                {step.what}
                                            </p>

                                            {/* Tech stack chips — always visible, quiet */}
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {step.tech.map((t, ti) => (
                                                    <span
                                                        key={ti}
                                                        className="text-[10px] font-mono px-2 py-0.5 rounded border"
                                                        style={{
                                                            color: step.color + 'bb',
                                                            borderColor: step.color + '22',
                                                            background: step.color + '0a',
                                                        }}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Expanded technical detail section */}
                                            {isOpen && (
                                                <div
                                                    className="mt-4 pt-4 border-t space-y-2.5"
                                                    style={{ borderColor: step.color + '20' }}
                                                >
                                                    <div
                                                        className="text-[9px] font-mono uppercase tracking-widest font-bold mb-3"
                                                        style={{ color: step.color + '90' }}
                                                    >
                                                        ⚙ {step.techLabel}
                                                    </div>
                                                    {step.details.map((d, di) => (
                                                        <div key={di} className="flex items-start gap-2 text-xs text-on-surface-variant leading-relaxed">
                                                            <span
                                                                className="material-symbols-outlined text-[13px] mt-0.5 shrink-0"
                                                                style={{ color: step.color }}
                                                            >
                                                                arrow_right
                                                            </span>
                                                            {d}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// ─── ER Diagram Component ──────────────────────────────────────────────────────
const ERDiagram = ({ data }) => {
    const tables = data?.prd?.technicalSpec?.databaseArchitecture || [];
    const relations = useMemo(() => deriveRelations(tables), [tables]);
    const [hoveredTable, setHoveredTable] = useState(null);

    const tableColors = [
        { border: '#d2bbff', text: '#d2bbff', bg: 'rgba(210,187,255,0.08)' },
        { border: '#4cd7f6', text: '#4cd7f6', bg: 'rgba(76,215,246,0.08)' },
        { border: '#c3f0a7', text: '#c3f0a7', bg: 'rgba(195,240,167,0.08)' },
        { border: '#ffd966', text: '#ffd966', bg: 'rgba(255,217,102,0.08)' },
        { border: '#f0a2c0', text: '#f0a2c0', bg: 'rgba(240,162,192,0.08)' },
        { border: '#94a3b8', text: '#94a3b8', bg: 'rgba(148,163,184,0.08)' },
    ];

    const relatedIds = hoveredTable !== null
        ? relations
            .filter(r => r.from === hoveredTable || r.to === hoveredTable)
            .flatMap(r => [r.from, r.to])
            .filter(id => id !== hoveredTable)
        : [];

    if (tables.length === 0) return null;

    return (
        <section className="bg-surface-container rounded-2xl ghost-border overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b border-outline-variant/10 flex items-center justify-between">
                <div>
                    <h3 className="font-headline font-bold text-on-surface text-lg flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[20px]">schema</span>
                        Database Structure
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1">The data tables that power this product — hover any table to see how it connects to others</p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">{tables.length} Tables</span>
            </div>

            <div className="p-6">
                {relations.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/40 self-center mr-1">Connections:</span>
                        {relations.map((r, i) => (
                            <span key={i} className="text-[10px] font-mono text-on-surface-variant bg-white/5 border border-white/10 px-2 py-1 rounded flex items-center gap-1">
                                <span style={{ color: tableColors[r.from % tableColors.length].text }}>{tables[r.from]?.table}</span>
                                <span className="text-on-surface-variant/40 mx-0.5">↔</span>
                                <span style={{ color: tableColors[r.to % tableColors.length].text }}>{tables[r.to]?.table}</span>
                            </span>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tables.map((table, i) => {
                        const c = tableColors[i % tableColors.length];
                        const isHovered = hoveredTable === i;
                        const isRelated = relatedIds.includes(i);
                        const isDimmed = hoveredTable !== null && !isHovered && !isRelated;

                        return (
                            <div
                                key={i}
                                onMouseEnter={() => setHoveredTable(i)}
                                onMouseLeave={() => setHoveredTable(null)}
                                className="rounded-xl border transition-all duration-200 cursor-default"
                                style={{
                                    background: c.bg,
                                    borderColor: isHovered ? c.border : isRelated ? c.border + '80' : c.border + '30',
                                    opacity: isDimmed ? 0.3 : 1,
                                    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                                    boxShadow: isHovered ? `0 0 20px ${c.border}30` : 'none',
                                }}
                            >
                                <div className="px-4 pt-3 pb-2 border-b flex items-center gap-2" style={{ borderColor: c.border + '20' }}>
                                    <span className="material-symbols-outlined text-[14px]" style={{ color: c.text }}>table_chart</span>
                                    <span className="font-mono text-sm font-semibold" style={{ color: c.text }}>{table.table}</span>
                                    {isRelated && (
                                        <span className="ml-auto text-[9px] font-mono uppercase tracking-widest" style={{ color: c.text }}>linked ↔</span>
                                    )}
                                </div>
                                <div className="px-4 py-3">
                                    <p className="text-xs text-on-surface-variant leading-relaxed">{table.description}</p>
                                </div>
                                <div className="px-4 pb-3">
                                    <div className="flex items-center gap-1 text-[9px] font-mono text-on-surface-variant/40 bg-white/5 rounded px-2 py-1 w-fit">
                                        <span className="material-symbols-outlined text-[10px]">key</span>
                                        {table.table.toLowerCase().replace(/s$/, '')}_id · PK
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────
const FeaturesRoadmap = () => {
    const { activeBlueprint } = useAppContext();
    const data = activeBlueprint?.data;

    const features = data?.features || [];
    const mvpFeatures = features.filter(f => f.phase === 'MVP');
    const v1Features = features.filter(f => f.phase === 'V1');
    const futureFeatures = features.filter(f => f.phase === 'Future');

    const lowComplexity = features.filter(f => f.complexity === 'Low').length;
    const medComplexity = features.filter(f => f.complexity === 'Medium').length;
    const highComplexity = features.filter(f => f.complexity === 'High').length;
    const totalCount = features.length || 1;

    const categories = features.reduce((acc, f) => {
        acc[f.category] = (acc[f.category] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden text-on-surface bg-background">

{/* TopNavBar */}
<nav className="bg-[#131318]/70 backdrop-blur-md font-['Plus_Jakarta_Sans'] text-sm tracking-tight z-50 border-b-[0.5px] border-white/10 flex justify-between items-center px-8 h-16 w-full shrink-0">
<div className="flex items-center gap-8">
<div className="text-xl font-black tracking-tighter text-[#e4e1e9]">Origin</div>
<div className="hidden md:flex items-center bg-surface-container-low rounded-full px-4 py-1.5 ghost-border text-on-surface-variant w-64">
<span className="material-symbols-outlined text-lg mr-2">search</span>
<input className="bg-transparent border-none outline-none text-sm w-full placeholder-on-surface-variant/50 font-body text-on-surface" placeholder="Search blueprints..." type="text"/>
</div>
</div>
<div className="hidden md:flex items-center gap-6">
<Link className="text-[#94949e] hover:text-[#e4e1e9] transition-colors" to="/dashboard">Dashboard</Link>
<Link className="text-[#94949e] hover:text-[#e4e1e9] transition-colors" to="/history">History</Link>
</div>
</nav>

<div className="flex flex-1 overflow-hidden relative">
{/* SideNavBar */}
<aside className="bg-[#1b1b20] font-['Inter'] text-sm h-screen w-64 border-r-[0.5px] border-white/5 flex flex-col fixed left-0 top-0 pt-20 hidden md:flex shrink-0 z-40 shadow-2xl">
<div className="px-6 pb-6">
<Link to="/" className="w-full bg-gradient-to-r from-primary-container to-primary text-on-primary py-2 px-4 rounded-lg font-medium tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined text-[18px]">add</span>New Project
</Link>
</div>
<nav className="flex-1 flex flex-col gap-1 px-3">
<Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all duration-300 ease-in-out">
<span className="material-symbols-outlined">dashboard</span>Dashboard
</Link>
<Link to="/history" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all duration-300 ease-in-out">
<span className="material-symbols-outlined">history</span>History
</Link>
<Link to="/analytics" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all duration-300 ease-in-out">
<span className="material-symbols-outlined">insights</span>Analytics
</Link>
<Link to="/features-roadmap" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-primary bg-primary-container/10 transition-all duration-300 ease-in-out">
<span className="material-symbols-outlined">architecture</span>Architecture
</Link>
<Link to="/ai-assistant" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all duration-300 ease-in-out">
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

<main className="flex-1 md:ml-64 overflow-y-auto w-full p-10 max-w-7xl mx-auto space-y-12">

{/* Header */}
<section className="flex items-end justify-between">
<div className="space-y-2">
<h2 className="font-headline text-5xl tracking-tight font-bold text-on-surface">Architecture</h2>
<p className="font-body text-sm text-on-surface-variant max-w-xl">How this product works, its data model, and full feature roadmap — all derived from your blueprint.</p>
</div>
<Link to="/dashboard" className="px-5 py-2 bg-primary-container text-on-primary rounded-lg font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined text-[18px]">arrow_back</span>Dashboard
</Link>
</section>

{!activeBlueprint ? (
    <div className="bg-surface-container-low rounded-xl p-16 text-center border border-dashed border-outline-variant/30">
        <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4 block">architecture</span>
        <h3 className="text-lg font-headline font-medium text-on-surface mb-2">No Active Blueprint</h3>
        <p className="text-sm text-on-surface-variant mb-6">Generate a blueprint first to visualize its system architecture.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
            Generate Blueprint
        </Link>
    </div>
) : (
<>
{/* ── How This Product Works (User Journey Story Map) ── */}
<ArchitectureFlow data={data} />

{/* ── Database Structure (ER Diagram) ── */}
<ERDiagram data={data} />

{/* Metrics */}
<section className="grid grid-cols-4 gap-6">
<div className="bg-surface-container rounded-xl p-6 ghost-border flex flex-col gap-2 relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span className="text-sm text-on-surface-variant">Total Features</span>
<span className="font-mono text-4xl text-on-surface tracking-tighter">{features.length}</span>
</div>
<div className="bg-surface-container rounded-xl p-6 ghost-border flex flex-col gap-2 relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<span className="text-sm text-on-surface-variant">MVP Target</span>
<span className="font-mono text-4xl text-secondary tracking-tighter">{data?.metrics?.mvpFeaturesCount || mvpFeatures.length}</span>
</div>
<div className="bg-surface-container rounded-xl p-6 ghost-border flex flex-col gap-2">
<span className="text-sm text-on-surface-variant">Avg Complexity</span>
<span className="font-mono text-xl text-on-surface mt-1">{highComplexity > lowComplexity ? 'High' : 'Medium'}</span>
</div>
<div className="bg-surface-container rounded-xl p-6 ghost-border flex flex-col gap-2">
<span className="text-sm text-on-surface-variant">Est. Build Time</span>
<span className="font-mono text-4xl text-on-surface tracking-tighter">{data?.metrics?.buildTimeWeeks?.split('-')[0] || 0}<span className="text-lg text-on-surface-variant ml-1">wks</span></span>
</div>
</section>

{/* Build Phase Overview */}
<section className="bg-surface-container rounded-xl p-6 ghost-border">
<h3 className="font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">layers</span>Build Phase Overview
</h3>
<div className="space-y-6">
<div className="space-y-2">
<div className="flex justify-between text-sm">
<span className="font-medium text-on-surface">MVP (Now)</span>
<span className="font-mono text-on-surface-variant">{mvpFeatures.length} / {features.length}</span>
</div>
<div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{ width: `${(mvpFeatures.length/totalCount)*100}%` }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-sm">
<span className="font-medium text-on-surface">Version 1 (Next)</span>
<span className="font-mono text-on-surface-variant">{v1Features.length} / {features.length}</span>
</div>
<div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-secondary rounded-full" style={{ width: `${(v1Features.length/totalCount)*100}%` }}></div>
</div>
</div>
<div className="space-y-2">
<div className="flex justify-between text-sm">
<span className="font-medium text-on-surface-variant">Future (Later)</span>
<span className="font-mono text-on-surface-variant">{futureFeatures.length} / {features.length}</span>
</div>
<div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-surface-bright rounded-full" style={{ width: `${(futureFeatures.length/totalCount)*100}%` }}></div>
</div>
</div>
</div>
</section>

{/* Kanban Board */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="flex flex-col gap-4">
<div className="border-t-2 border-primary pt-3 flex justify-between items-center">
<h4 className="font-headline font-semibold text-on-surface">MVP - Now</h4>
<span className="font-mono text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface-variant">{mvpFeatures.length}</span>
</div>
{mvpFeatures.map((f, i) => (
    <div key={i} className="bg-surface-container-high rounded-xl p-5 ghost-border space-y-3 hover:border-primary/50 transition-colors cursor-pointer group">
    <div className="flex justify-between items-start">
    <span className="text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{f.category}</span>
    <span className="text-xs bg-surface-bright text-on-surface-variant px-2 py-0.5 rounded-full">{f.complexity}</span>
    </div>
    <h5 className="font-medium text-on-surface group-hover:text-primary transition-colors">{f.title}</h5>
    <p className="text-xs text-on-surface-variant line-clamp-2">{f.description}</p>
    </div>
))}
</div>
<div className="flex flex-col gap-4">
<div className="border-t-2 border-secondary pt-3 flex justify-between items-center">
<h4 className="font-headline font-semibold text-on-surface">Version 1 - Next</h4>
<span className="font-mono text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface-variant">{v1Features.length}</span>
</div>
{v1Features.map((f, i) => (
    <div key={i} className="bg-surface-container-high rounded-xl p-5 ghost-border space-y-3 hover:border-secondary/50 transition-colors cursor-pointer group opacity-80">
    <div className="flex justify-between items-start">
    <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded border border-secondary/20">{f.category}</span>
    <span className="text-xs bg-surface-bright text-on-surface-variant px-2 py-0.5 rounded-full">{f.complexity}</span>
    </div>
    <h5 className="font-medium text-on-surface group-hover:text-secondary transition-colors">{f.title}</h5>
    <p className="text-xs text-on-surface-variant line-clamp-2">{f.description}</p>
    </div>
))}
</div>
<div className="flex flex-col gap-4">
<div className="border-t-2 border-surface-bright pt-3 flex justify-between items-center">
<h4 className="font-headline font-semibold text-on-surface-variant">Future - Later</h4>
<span className="font-mono text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface-variant opacity-50">{futureFeatures.length}</span>
</div>
{futureFeatures.map((f, i) => (
    <div key={i} className="bg-surface-container-high rounded-xl p-5 ghost-border space-y-3 opacity-50">
    <div className="flex justify-between items-start">
    <span className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant bg-surface-bright px-2 py-0.5 rounded border border-outline-variant/20">{f.category}</span>
    <span className="text-xs bg-surface-bright text-on-surface-variant px-2 py-0.5 rounded-full">{f.complexity}</span>
    </div>
    <h5 className="font-medium text-on-surface">{f.title}</h5>
    <p className="text-xs text-on-surface-variant line-clamp-2">{f.description}</p>
    </div>
))}
</div>
</section>

{/* Analytics */}
<section className="grid grid-cols-2 gap-6">
<div className="bg-surface-container rounded-xl p-6 ghost-border">
<h3 className="font-headline font-medium text-sm text-on-surface mb-6">Complexity Distribution</h3>
<div className="space-y-4">
<div className="flex h-8 w-full rounded overflow-hidden">
<div className="bg-secondary/80 flex items-center justify-center text-xs font-mono" style={{ width: `${(lowComplexity/totalCount)*100}%` }}>L</div>
<div className="bg-primary/80 flex items-center justify-center text-xs font-mono" style={{ width: `${(medComplexity/totalCount)*100}%` }}>M</div>
<div className="bg-error/80 flex items-center justify-center text-xs font-mono" style={{ width: `${(highComplexity/totalCount)*100}%` }}>H</div>
</div>
<div className="flex justify-between text-xs text-on-surface-variant font-mono">
<span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-secondary/80"></div> Low ({Math.round((lowComplexity/totalCount)*100)}%)</span>
<span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary/80"></div> Med ({Math.round((medComplexity/totalCount)*100)}%)</span>
<span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-error/80"></div> High ({Math.round((highComplexity/totalCount)*100)}%)</span>
</div>
</div>
</div>
<div className="bg-surface-container rounded-xl p-6 ghost-border">
<h3 className="font-headline font-medium text-sm text-on-surface mb-4">Category Breakdown</h3>
<div className="space-y-3">
{Object.entries(categories).slice(0,4).map(([cat, count], idx) => {
    const colors = ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-[#f59e0b]'];
    const p = (count/totalCount)*100;
    return (
    <div key={cat} className="flex items-center gap-4">
        <span className="text-xs w-20 text-on-surface-variant truncate">{cat}</span>
        <div className="flex-grow h-1.5 bg-surface-container-low rounded-full overflow-hidden">
        <div className={`h-full ${colors[idx % colors.length]} rounded-full`} style={{ width: `${p}%` }}></div>
        </div>
        <span className="font-mono text-xs w-6 text-right">{count}</span>
    </div>
    );
})}
</div>
</div>
</section>
</>
)}

</main>
</div>
        </div>
    );
};

export default FeaturesRoadmap;
