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
    </Router>
  );
}

export default App;
