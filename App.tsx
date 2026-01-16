
import React, { useState } from 'react';
import { TheoryDashboard } from './components/TheoryDashboard';
import { NetworkSimulator } from './components/NetworkSimulator';
import { PaperWorkspace } from './components/PaperWorkspace';
import { SimulationState, Branch, Chirality } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'simulation' | 'paper'>('dashboard');
  const [simState, setSimState] = useState<SimulationState>({
    size: 50,
    k_vacuum: 1.0,
    branch: Branch.RQNTC,
    isSimulating: false,
    particles: [
      { id: 'p1', type: 'Proton', position: { x: 0.3, y: 0.4, z: 0 }, chirality: Chirality.Dextro, mass: 1.0, torsion: 1.0 },
      { id: 'p2', type: 'Electron', position: { x: 0.7, y: 0.6, z: 0 }, chirality: Chirality.Levo, mass: 0.0005, torsion: -1.0 },
    ]
  });

  const toggleBranch = () => {
    setSimState(prev => ({
      ...prev,
      branch: prev.branch === Branch.RQNTC ? Branch.RQNTV : Branch.RQNTC
    }));
  };

  const addParticle = (type: 'Proton' | 'Electron' | 'Neutron') => {
    const newP = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      position: { x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.8 + 0.1, z: 0 },
      chirality: type === 'Proton' ? Chirality.Dextro : Chirality.Levo,
      mass: type === 'Proton' ? 1.0 : type === 'Neutron' ? 1.001 : 0.0005,
      torsion: type === 'Proton' ? 1.0 : type === 'Neutron' ? 0 : -1.0
    };
    setSimState(prev => ({ ...prev, particles: [...prev.particles, newP as any] }));
  };

  return (
    <div className="min-h-screen flex flex-col network-grid">
      {/* Header */}
      <header className="h-16 glass sticky top-0 z-50 px-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <i className="fa-solid fa-atom text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">R-QNT <span className="text-blue-400">EXPLORER</span></h1>
            <p className="text-[10px] text-gray-500 mono uppercase tracking-widest">Rama Quantum Network Torsion v3.2</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('simulation')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'simulation' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            Simulation
          </button>
          <button 
            onClick={() => setActiveTab('paper')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'paper' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            Paper Workspace
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] mono text-gray-500 uppercase">Branch:</span>
            <button 
              onClick={toggleBranch}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold hover:bg-white/10 transition-colors"
            >
              {simState.branch}
            </button>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center cursor-pointer hover:border-blue-500/50 transition-all">
            <i className="fa-solid fa-user-gear text-xs text-gray-400"></i>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8">
        {activeTab === 'dashboard' && <TheoryDashboard branch={simState.branch} />}
        
        {activeTab === 'simulation' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <NetworkSimulator state={simState} />
              </div>
              <div className="w-full md:w-72 flex flex-col gap-4">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-flask"></i> Laboratory Controls
                  </h3>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => addParticle('Proton')}
                      className="w-full py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      Inject Proton Knot
                    </button>
                    <button 
                      onClick={() => addParticle('Electron')}
                      className="w-full py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-xs font-bold text-blue-400 hover:bg-blue-500/20 transition-all"
                    >
                      Inject Electron Knot
                    </button>
                    <button 
                      onClick={() => addParticle('Neutron')}
                      className="w-full py-2 bg-gray-500/10 border border-gray-500/30 rounded-lg text-xs font-bold text-gray-400 hover:bg-gray-500/20 transition-all"
                    >
                      Inject Neutron state
                    </button>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="flex justify-between text-[10px] mono text-gray-500 mb-2">
                        <span>Lattice Density</span>
                        <span>{simState.size}x{simState.size}</span>
                      </div>
                      <input 
                        type="range" 
                        min="20" 
                        max="100" 
                        value={simState.size}
                        onChange={(e) => setSimState(s => ({ ...s, size: parseInt(e.target.value) }))}
                        className="w-full accent-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-sm font-bold uppercase text-gray-400 mb-2">Active Entities</h3>
                  <div className="max-h-48 overflow-y-auto flex flex-col gap-2 pr-2">
                    {simState.particles.map(p => (
                      <div key={p.id} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                        <span className="text-[10px] font-bold">{p.type}</span>
                        <span className="text-[10px] mono text-gray-500">{(p.mass).toFixed(4)} eV</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-2xl p-8 border-l-4 border-l-blue-500">
              <h2 className="text-2xl font-bold mb-4">Physics Brief: The Network Lattice</h2>
              <p className="text-gray-400 leading-relaxed max-w-4xl">
                The visualizer above represents the R-QNT spacetime manifold. Unlike General Relativity, which treats spacetime as a smooth geometric fabric, R-QNT models it as a high-density elastic network of A, B, and C fields. Matter "knots" consume localized string tension, creating restorative force gradients that we perceive as Gravity.
              </p>
              <div className="mt-6 flex gap-4">
                <div className="px-4 py-2 bg-blue-500/10 rounded-lg text-xs text-blue-400 mono">F_grav ∝ ∇(Consumed_String_Density)</div>
                <div className="px-4 py-2 bg-purple-500/10 rounded-lg text-xs text-purple-400 mono">E_knot = η * T_P * ℓ_P</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'paper' && <PaperWorkspace />}
      </main>

      {/* Footer Status Bar */}
      <footer className="h-8 glass px-4 flex items-center justify-between border-t border-white/5 text-[9px] uppercase tracking-widest text-gray-500 mono">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><i className="fa-solid fa-circle text-green-500 text-[6px]"></i> Engine: Stable</span>
          <span className="flex items-center gap-1"><i className="fa-solid fa-wifi text-blue-500 text-[6px]"></i> Gemini Pro Thinking: Online</span>
        </div>
        <div>
          Current Epoch: 1.00000000s | Lattice Nodes: {simState.size ** 2}
        </div>
      </footer>
    </div>
  );
};

export default App;
