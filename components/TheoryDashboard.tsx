
import React from 'react';
import { Branch } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  fieldA: Math.sin(i * 0.5) + Math.random() * 0.2,
  fieldB: Math.cos(i * 0.5) + Math.random() * 0.2,
  fieldC: -(Math.sin(i * 0.5) + Math.cos(i * 0.5)) + Math.random() * 0.1,
}));

export const TheoryDashboard: React.FC<{ branch: Branch }> = ({ branch }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="glass rounded-xl p-6 border-blue-500/30">
        <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Field Symmetry</h3>
        <div className="text-3xl font-bold mono">A+B+C ≈ 0</div>
        <p className="text-xs text-gray-400 mt-2">Vacuum equilibrium state maintained at 99.98% accuracy.</p>
      </div>

      <div className="glass rounded-xl p-6 border-purple-500/30">
        <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-2">Network Tension</h3>
        <div className="text-3xl font-bold mono">κ = 1.024</div>
        <p className="text-xs text-gray-400 mt-2">Elastic stiffness in localized region (relative to vacuum).</p>
      </div>

      <div className="glass rounded-xl p-6 border-pink-500/30">
        <h3 className="text-sm font-semibold text-pink-400 uppercase tracking-wider mb-2">Propagation Branch</h3>
        <div className="text-3xl font-bold mono text-white">{branch}</div>
        <p className="text-xs text-gray-400 mt-2">Current framework: {branch === Branch.RQNTC ? 'Einsteinian limit' : 'Variable c dynamics'}.</p>
      </div>

      <div className="md:col-span-3 glass rounded-xl p-6 h-64">
        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Field Oscillations (A, B, C Interaction)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" />
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="fieldA" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
            <Area type="monotone" dataKey="fieldB" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} />
            <Area type="monotone" dataKey="fieldC" stroke="#ec4899" fill="#ec4899" fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
