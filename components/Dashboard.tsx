
import React, { useState, useEffect, useCallback } from 'react';
import { GraphViz } from './GraphViz';
import { MetricsPanel } from './MetricsPanel';
import { analysisService } from '../services/geminiService';
import { GraphData, Node, Link, AnalysisResult } from '../types';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<GraphData>({ nodes: [], links: [] });
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [narrative, setNarrative] = useState<string>("Initializing analysis sequence...");
  const [isSimulating, setIsSimulating] = useState(true);

  // Fractal growth simulation
  const generateFractalStep = useCallback((prev: GraphData): GraphData => {
    const newNodes = [...prev.nodes];
    const newLinks = [...prev.links];

    // Select a random hub node to "spawn" from
    if (newNodes.length < 150) {
      const parentIdx = Math.floor(Math.random() * newNodes.length);
      const parent = newNodes[parentIdx];
      const newNodeId = `node-${newNodes.length}`;
      
      newNodes.push({
        id: newNodeId,
        label: `Probe_${newNodes.length}`,
        val: 4 + Math.random() * 8,
        group: parent.group,
        color: Math.random() > 0.8 ? '#f59e0b' : '#3b82f6'
      });

      newLinks.push({
        source: parent.id,
        target: newNodeId,
        value: 1 + Math.random() * 2
      });

      // Occasional cross-linking for network complexity
      if (Math.random() > 0.7) {
        const targetIdx = Math.floor(Math.random() * newNodes.length);
        if (targetIdx !== parentIdx) {
          newLinks.push({
            source: newNodeId,
            target: newNodes[targetIdx].id,
            value: 1
          });
        }
      }
    }

    return { nodes: newNodes, links: newLinks };
  }, []);

  useEffect(() => {
    // Initial Seed
    const seedNodes: Node[] = Array.from({ length: 5 }, (_, i) => ({
      id: `node-${i}`,
      label: `Seed_${i}`,
      val: 12,
      group: i,
      color: '#3b82f6'
    }));
    setData({ nodes: seedNodes, links: [] });
  }, []);

  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      interval = setInterval(() => {
        setData(prev => generateFractalStep(prev));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, generateFractalStep]);

  useEffect(() => {
    const computeMetrics = async () => {
      const dimension = 1.8 + Math.random() * 0.4; // Simulating box-counting output
      const entropy = 2.5 + Math.random() * 1.2;
      
      const newResult: AnalysisResult = {
        timestamp: Date.now(),
        fractalDimension: dimension,
        entropy: entropy,
        activeNodes: data.nodes.length,
        narrativeSummary: ""
      };

      setHistory(prev => [...prev.slice(-20), newResult]);

      // Every 10th step, ask AI to synthesize narrative
      if (data.nodes.length % 10 === 0 && data.nodes.length > 0) {
        const summary = await analysisService.synthesizeNarrative({
          nodes: data.nodes.length,
          links: data.links.length,
          dimension,
          entropy
        });
        setNarrative(summary);
      }
    };

    computeMetrics();
  }, [data.nodes.length, data.links.length]);

  return (
    <div className="flex h-screen bg-[#050505] text-white p-6 gap-6">
      {/* Left Column: Metrics & Controls */}
      <div className="w-1/3 flex flex-col gap-6 h-full overflow-hidden">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            FRACTAL_TREND_ANALYZER <span className="text-gray-600 font-mono text-xs font-normal">v4.0-STABLE</span>
          </h1>
          <p className="text-xs text-gray-500 font-mono">NONLINEAR DYNAMICAL FIELD MAPPING</p>
        </div>

        <MetricsPanel history={history} />

        <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg flex flex-col gap-3">
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Experiment Control</div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsSimulating(!isSimulating)}
              className={`flex-1 py-2 rounded text-xs font-mono transition-colors ${isSimulating ? 'bg-red-900/40 text-red-400 border border-red-800' : 'bg-blue-900/40 text-blue-400 border border-blue-800'}`}
            >
              {isSimulating ? '[ HALT_SIMULATION ]' : '[ RESUME_SEQUENCE ]'}
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-800 text-xs font-mono rounded border border-gray-700 hover:bg-gray-700"
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Visualization & AI Insights */}
      <div className="flex-1 flex flex-col gap-6 h-full overflow-hidden">
        <div className="flex-1 min-h-0">
          <GraphViz data={data} />
        </div>

        <div className="h-1/3 p-5 bg-gray-900 border border-gray-800 rounded-lg flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" /></svg>
              Emergent Narrative Synthesis (AI Core)
            </div>
            <div className="text-[8px] px-1.5 py-0.5 rounded bg-blue-900/50 text-blue-300 font-mono uppercase">Gemini-3.0-Flash</div>
          </div>
          <div className="flex-1 overflow-y-auto text-sm leading-relaxed text-gray-300 font-light italic">
            "{narrative}"
          </div>
          <div className="flex gap-4 mt-auto">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-[10px] text-gray-500 uppercase font-mono">Stream: Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span className="text-[10px] text-gray-500 uppercase font-mono">GPU: Under Load</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
