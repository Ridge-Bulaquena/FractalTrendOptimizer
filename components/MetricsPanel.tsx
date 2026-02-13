
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AnalysisResult } from '../types';

interface MetricsPanelProps {
  history: AnalysisResult[];
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ history }) => {
  const latest = history[history.length - 1] || { fractalDimension: 0, entropy: 0, activeNodes: 0 };

  return (
    <div className="flex flex-col h-full gap-4 overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
          <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">Fractal Dimension (D)</div>
          <div className="text-2xl font-mono font-bold">{latest.fractalDimension.toFixed(4)}</div>
          <div className="text-[10px] text-gray-500 mt-2">Scale-invariant topology stability</div>
        </div>
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
          <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1">Entropy Gradient</div>
          <div className="text-2xl font-mono font-bold">{latest.entropy.toFixed(4)}</div>
          <div className="text-[10px] text-gray-500 mt-2">Information field complexity</div>
        </div>
      </div>

      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col">
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-4">Temporal Diffusion Cascade</div>
        <div className="flex-1 min-h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="timestamp" hide />
              <YAxis stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f0f0f', border: '1px solid #1f2937' }}
                itemStyle={{ color: '#3b82f6', fontSize: '12px' }}
                labelStyle={{ display: 'none' }}
              />
              <Area type="monotone" dataKey="activeNodes" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActive)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
        <div className="text-[10px] text-orange-400 font-bold uppercase tracking-wider mb-2">Pre-Viral Signal Detection</div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">Confidence Level</span>
          <span className="text-xs text-emerald-400 font-mono font-bold">94.2%</span>
        </div>
        <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="bg-emerald-500 h-full w-[94.2%]" />
        </div>
      </div>
    </div>
  );
};
