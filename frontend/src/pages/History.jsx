import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getHistory, getHistoryItem } from '../apiService';

const History = () => {
    const [historyItems, setHistoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setActiveBlueprint } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const data = await getHistory();
            setHistoryItems(data);
        } catch (err) {
            console.error('Failed to load history:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadItem = async (id) => {
        try {
            const item = await getHistoryItem(id);
            setActiveBlueprint({ id: item.id, idea: item.idea, data: item.data });
            navigate('/dashboard');
        } catch (err) {
            alert('Failed to load blueprint: ' + err.message);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!confirm('Delete this blueprint?')) return;
        try {
            await fetch(`http://localhost:3001/api/history/${id}`, { method: 'DELETE' });
            setHistoryItems(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            alert('Failed to delete');
        }
    };

    // Group history items by relative date
    const groupItems = (items) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const groups = { 'Today': [], 'Previous 7 Days': [], 'Older': [] };
        
        items.forEach(item => {
            const d = new Date(item.created_at);
            if (d >= today) groups['Today'].push(item);
            else if (d >= weekAgo) groups['Previous 7 Days'].push(item);
            else groups['Older'].push(item);
        });
        
        return Object.entries(groups).filter(([, items]) => items.length > 0);
    };

    const grouped = groupItems(historyItems);

    const formatTime = (dateStr) => {
        const d = new Date(dateStr);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (d >= today) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    return (
        <div className="font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden text-on-surface bg-background">
            
{/* TopNavBar */}
<nav className="bg-[#131318]/70 backdrop-blur-md font-['Plus_Jakarta_Sans'] text-sm tracking-tight z-50 border-b-[0.5px] border-white/10 flex justify-between items-center px-8 h-16 w-full shrink-0">
<div className="flex items-center gap-8">
<div className="text-xl font-black tracking-tighter text-[#e4e1e9]">Origin</div>
<div className="hidden md:flex items-center bg-surface-container-low rounded-full px-4 py-1.5 ghost-border text-on-surface-variant w-64 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
<span className="material-symbols-outlined text-lg mr-2">search</span>
<input className="bg-transparent border-none outline-none text-sm w-full placeholder-on-surface-variant/50 font-body text-on-surface" placeholder="Search blueprints..." type="text"/>
</div>
</div>
<div className="flex items-center gap-4">
<button className="text-[#94949e] hover:text-[#e4e1e9] transition-colors"><span className="material-symbols-outlined">notifications</span></button>
<button className="text-[#94949e] hover:text-[#e4e1e9] transition-colors"><span className="material-symbols-outlined">settings</span></button>
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
<Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 hover:text-[#e4e1e9] transition-all">
<span className="material-symbols-outlined">dashboard</span>Dashboard
</Link>
<Link to="/history" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#d2bbff] bg-white/5">
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
{/* Main Content */}
<main className="flex-1 md:ml-64 overflow-y-auto w-full">
<div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-8">
<header className="flex flex-col gap-2 mb-10">
<h1 className="font-headline text-[28px] font-bold tracking-tight text-on-surface">Chat History</h1>
<p className="text-on-surface-variant text-sm flex items-center gap-2">
    <span className="material-symbols-outlined text-[16px] text-primary">history</span>
    Review your past conversations, startup ideas, and generated blueprints.
</p>
</header>

{loading ? (
    <div className="flex items-center justify-center py-20">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 animate-spin">progress_activity</span>
    </div>
) : historyItems.length === 0 ? (
    <div className="text-center py-20 space-y-4">
        <span className="material-symbols-outlined text-6xl text-on-surface-variant/20">folder_off</span>
        <h2 className="font-headline text-xl font-bold text-on-surface-variant">No History Yet</h2>
        <p className="text-sm text-on-surface-variant/70">Generate your first blueprint from the landing page to see it here.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-container to-primary text-on-primary rounded-lg font-medium hover:opacity-90 transition-opacity text-sm mt-4">
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            Generate First Blueprint
        </Link>
    </div>
) : (
    <div className="flex flex-col gap-10">
        {grouped.map(([label, items]) => (
            <div key={label} className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-on-surface-variant pl-4">{label}</h3>
                <div className="flex flex-col gap-1">
                    {items.map(item => (
                        <div key={item.id} onClick={() => handleLoadItem(item.id)} className="group flex items-start gap-4 p-4 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            <div className="mt-1 shrink-0 relative z-10">
                                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 relative z-10 pt-0.5">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-on-surface text-[15px] truncate pr-4 group-hover:text-primary transition-colors">{item.idea}</h4>
                                    <span className="text-[11px] font-mono text-on-surface-variant whitespace-nowrap shrink-0">{formatTime(item.created_at)}</span>
                                </div>
                                <p className="text-[13px] text-on-surface-variant truncate pr-20">Blueprint generated · Click to load</p>
                                <div className="flex items-center gap-4 mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <button className="text-[11px] font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span> Open
                                    </button>
                                    <button onClick={(e) => handleDelete(e, item.id)} className="text-[11px] font-medium text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 ml-auto">
                                        <span className="material-symbols-outlined text-[14px]">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
)}
</div>
</main>
</div>

        </div>
    );
};

export default History;

