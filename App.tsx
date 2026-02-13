
import React from 'react';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="antialiased text-slate-50 selection:bg-blue-500/30">
      <Dashboard />
      
      {/* Absolute Overlays / Hud Elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-transparent to-emerald-600 opacity-30 pointer-events-none" />
      <div className="fixed bottom-4 right-6 pointer-events-none">
        <div className="text-[10px] text-gray-700 font-mono tracking-tighter text-right">
          LATENCY: 12MS | DROPPED_FRAMES: 0 | CLUSTER_ID: FRX-909<br/>
          CONFIDENTIAL_RESEARCH_ENVIRONMENT
        </div>
      </div>
    </div>
  );
};

export default App;
