
import React, { useRef, useEffect, useState } from 'react';
import { SimulationState, Branch } from '../types';

export const NetworkSimulator: React.FC<{ state: SimulationState }> = ({ state }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { width, height } = canvas;
      const spacing = 30;
      const rows = Math.floor(height / spacing) + 2;
      const cols = Math.floor(width / spacing) + 2;

      ctx.strokeStyle = 'rgba(100, 150, 255, 0.15)';
      ctx.lineWidth = 1;

      // Draw Grid with "Curvature" logic
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          let x = c * spacing;
          let y = r * spacing;

          // Apply displacement from particles (knots)
          state.particles.forEach(p => {
            const dx = x - (p.position.x * width);
            const dy = y - (p.position.y * height);
            const dist = Math.sqrt(dx * dx + dy * dy);
            const strength = (p.mass * 500) / (dist + 50);
            
            x -= (dx / dist) * strength;
            y -= (dy / dist) * strength;
          });

          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          let x = c * spacing;
          let y = r * spacing;

          state.particles.forEach(p => {
            const dx = x - (p.position.x * width);
            const dy = y - (p.position.y * height);
            const dist = Math.sqrt(dx * dx + dy * dy);
            const strength = (p.mass * 500) / (dist + 50);
            
            x -= (dx / dist) * strength;
            y -= (dy / dist) * strength;
          });

          if (r === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw Particles (Knots)
      state.particles.forEach(p => {
        const px = p.position.x * width;
        const py = p.position.y * height;

        // Torsion wave effect
        const pulse = Math.sin(Date.now() / 200) * 2;
        ctx.beginPath();
        ctx.arc(px, py, 5 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'Proton' ? '#ef4444' : p.type === 'Electron' ? '#3b82f6' : '#9ca3af';
        ctx.fill();
        
        // Torsion glow
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 20);
        gradient.addColorStop(0, p.type === 'Proton' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.4)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, 25, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '10px JetBrains Mono';
        ctx.fillStyle = '#fff';
        ctx.fillText(p.type, px + 10, py - 10);
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [state]);

  return (
    <div className="relative w-full h-[500px] glass rounded-2xl overflow-hidden border border-white/5 bg-[#080808]">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={500} 
        className="w-full h-full cursor-crosshair"
      />
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] mono text-blue-400 border border-blue-500/30">
          SIMULATION ACTIVE: {state.branch}
        </div>
      </div>
    </div>
  );
};
