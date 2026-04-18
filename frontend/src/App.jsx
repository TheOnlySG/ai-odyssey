import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Analytics from './pages/Analytics';
import InteractiveAnalytics from './pages/InteractiveAnalytics';
import AnimatedAnalytics1 from './pages/AnimatedAnalytics1';
import AnimatedAnalytics2 from './pages/AnimatedAnalytics2';
import AiAssistant from './pages/AiAssistant';
import FeaturesRoadmap from './pages/FeaturesRoadmap';

const DevMenu = () => {
  const location = useLocation();
  if (location.pathname === '/') return null; // hide on landing if desired, or keep it. Let's keep it everywhere for testing
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 p-4 bg-surface-container-high rounded-xl border border-outline-variant/30 shadow-2xl backdrop-blur-md max-w-xs text-sm">
      <h3 className="font-mono text-primary text-xs uppercase tracking-widest border-b border-outline-variant/30 pb-2 mb-2">Dev Menu Navigation</h3>
      <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors">/landing</Link>
      <Link to="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors">/dashboard</Link>
      <Link to="/history" className="text-on-surface-variant hover:text-primary transition-colors">/history</Link>
      <Link to="/analytics" className="text-on-surface-variant hover:text-primary transition-colors">/analytics</Link>
      <Link to="/interactive-analytics" className="text-on-surface-variant hover:text-primary transition-colors">/interactive-analytics</Link>
      <Link to="/animated-analytics-1" className="text-on-surface-variant hover:text-primary transition-colors">/animated-analytics-1</Link>
      <Link to="/animated-analytics-2" className="text-on-surface-variant hover:text-primary transition-colors">/animated-analytics-2</Link>
      <Link to="/ai-assistant" className="text-on-surface-variant hover:text-primary transition-colors">/ai-assistant</Link>
      <Link to="/features-roadmap" className="text-on-surface-variant hover:text-primary transition-colors">/features-roadmap</Link>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/interactive-analytics" element={<InteractiveAnalytics />} />
        <Route path="/animated-analytics-1" element={<AnimatedAnalytics1 />} />
        <Route path="/animated-analytics-2" element={<AnimatedAnalytics2 />} />
        <Route path="/ai-assistant" element={<AiAssistant />} />
        <Route path="/features-roadmap" element={<FeaturesRoadmap />} />
      </Routes>
      <DevMenu />
    </Router>
  );
}

export default App;
