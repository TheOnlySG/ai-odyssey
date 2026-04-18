import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { chatWithAssistant } from '../apiService';

const AiAssistant = () => {
    const { activeBlueprint } = useAppContext();
    const [messages, setMessages] = useState([
        { role: 'model', text: "Hello! I'm your AI Co-Founder. Ask me anything about your current blueprint." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !activeBlueprint) return;
        
        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            const contextData = activeBlueprint.data;
            
            const history = messages.map(m => ({ role: m.role, content: m.text }));
            const response = await chatWithAssistant(userMsg, contextData, history);
            setMessages(prev => [...prev, { role: 'model', text: response.reply }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden text-on-surface bg-background">
            {/* TopNavBar */}
            <nav className="bg-[#131318]/70 backdrop-blur-md font-['Plus_Jakarta_Sans'] text-sm tracking-tight docked full-width top-0 z-50 border-b-[0.5px] border-white/10 flat no shadows flex justify-between items-center px-8 h-16 w-full shrink-0">
                <div className="flex items-center gap-8">
                    <div className="text-xl font-black tracking-tighter text-[#e4e1e9]">Origin</div>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <Link className="text-[#94949e] hover:text-[#e4e1e9] transition-colors" to="/dashboard">Dashboard</Link>
                    <Link className="text-[#94949e] hover:text-[#e4e1e9] transition-colors" to="/history">History</Link>
                    <Link className="text-[#94949e] hover:text-[#e4e1e9] transition-colors" to="/resources">Resources</Link>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-surface-container-highest overflow-hidden ghost-border">
                        <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb9w2fmMUl8sZk9ug6d_2mV6Pl1FbVTGGgMoD8Pu9JPC4qwkP7b1cyJLBp2AZnNI7uJxzleumMPyNoFA2pBKw8PmI3w0DlvpEXeu67V_Mb93B_EjIOFMAe2DRzRpE4GTnvaeOwKLVY-uXjkIH70EuZfrbpeWWHnX49neD3dJk0PcvEqH9q0GXHbVhDghozMit2mNppLr-TPpFtidYqlfhb9l9W-St8XFoVsH_-0KEAQI5CjTe2Xan63DfsaOCLX_5X4M0ab6qpcGo7"/>
                    </div>
                </div>
            </nav>

            <div className="flex flex-1 overflow-hidden relative">
                {/* SideNavBar */}
                <aside className="bg-[#1b1b20] font-['Inter'] text-sm w-64 border-r-[0.5px] border-white/5 mx-0 flex flex-col pt-8 hidden md:flex shrink-0">
                    <div className="px-6 pb-6">
                        <Link to="/" className="w-full bg-gradient-to-r from-primary-container to-primary text-on-primary py-2 px-4 rounded-lg font-medium tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            New Project
                        </Link>
                    </div>
                    <nav className="flex-1 flex flex-col gap-1 px-3">
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 transition-all">
                            <span className="material-symbols-outlined">dashboard</span>Dashboard
                        </Link>
                        <Link to="/history" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 transition-all">
                            <span className="material-symbols-outlined">history</span>History
                        </Link>
                        <Link to="/analytics" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 transition-all">
                            <span className="material-symbols-outlined">insights</span>Analytics
                        </Link>
                        <Link to="/features-roadmap" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#94949e] opacity-70 hover:bg-white/5 transition-all">
                            <span className="material-symbols-outlined">architecture</span>Architecture
                        </Link>
                        <Link to="/ai-assistant" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-primary bg-primary-container/10 hover:bg-white/5 transition-all">
                            <span className="material-symbols-outlined">psychiatry</span>AI Assistant
                        </Link>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col p-6 lg:p-8 relative">
                    {!activeBlueprint ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="bg-surface-container-low rounded-xl p-10 text-center border border-dashed border-outline-variant/30 max-w-md">
                                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">psychiatry</span>
                                <h3 className="text-lg font-headline font-medium text-on-surface mb-2">No Active Blueprint</h3>
                                <p className="text-sm text-on-surface-variant mb-6">Select a blueprint from the dashboard to chat with the AI Co-Founder about it.</p>
                                <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary rounded-lg font-medium text-sm hover:opacity-90">
                                    Generate Blueprint
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full max-w-4xl mx-auto flex flex-col h-full bg-surface-container rounded-2xl ghost-border overflow-hidden">
                            {/* Chat Header */}
                            <div className="px-6 py-4 border-b border-white/5 bg-surface-container-high/50 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-tertiary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-on-primary text-xl">temp_preferences_custom</span>
                                </div>
                                <div>
                                    <h2 className="font-headline font-medium text-on-surface">AI Co-Founder</h2>
                                    <p className="text-xs text-on-surface-variant">Context: {(activeBlueprint.original_idea || activeBlueprint.data?.prd?.productName || 'Current Project').substring(0, 40)}...</p>
                                </div>
                            </div>
                            
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${msg.role === 'user' ? 'bg-surface-container-highest' : 'bg-primary/20 text-primary'}`}>
                                            <span className="material-symbols-outlined text-sm">{msg.role === 'user' ? 'person' : 'smart_toy'}</span>
                                        </div>
                                        <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-surface-container-highest text-on-surface rounded-tr-sm' : 'bg-primary-container/10 text-on-surface border border-primary/10 rounded-tl-sm'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex shrink-0 items-center justify-center">
                                            <span className="material-symbols-outlined text-sm">smart_toy</span>
                                        </div>
                                        <div className="bg-primary-container/10 border border-primary/10 rounded-2xl rounded-tl-sm p-4 w-24 flex items-center justify-center gap-1">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100"></div>
                                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200"></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 bg-surface-container-high/50 border-t border-white/5">
                                <div className="flex items-center gap-2 bg-surface-container-lowest rounded-xl p-2 focus-within:ring-1 focus-within:ring-primary/50 transition-shadow">
                                    <input 
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Ask about architectural decisions, roadmap planning, or code generation..."
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-on-surface placeholder:text-on-surface-variant/50 px-4"
                                    />
                                    <button 
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">send</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AiAssistant;

