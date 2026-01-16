
import React, { useState } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { TheoryMessage } from '../types';

export const PaperWorkspace: React.FC = () => {
  const [content, setContent] = useState<string>(`# The R-QNT Theory: Formal Postulates\n\n## 1. The A-B-C Field Network\nSpacetime is not a void but a dynamic, elastic network...`);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatHistory, setChatHistory] = useState<TheoryMessage[]>([]);
  const [prompt, setPrompt] = useState("");

  const handleDeepAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const response = await getGeminiResponse([
        { role: 'user', content: `Analyze this paper section for mathematical consistency: ${content}` }
      ], true);
      
      setChatHistory(prev => [...prev, 
        { role: 'user', content: 'Analyze paper consistency.' },
        { role: 'assistant', content: response.text }
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
      {/* Editor Section */}
      <div className="flex-1 glass rounded-2xl flex flex-col p-6 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-scroll text-blue-400"></i>
            Manuscript Workspace
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handleDeepAnalysis}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20"
            >
              {isAnalyzing ? (
                <i className="fa-solid fa-circle-notch animate-spin"></i>
              ) : (
                <i className="fa-solid fa-microchip"></i>
              )}
              {isAnalyzing ? 'Thinking...' : 'AI Analysis (Pro)'}
            </button>
          </div>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 bg-black/30 border border-white/5 rounded-xl p-4 text-sm mono focus:outline-none focus:border-blue-500/50 resize-none leading-relaxed text-gray-300"
        />
      </div>

      {/* AI Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        <div className="flex-1 glass rounded-2xl p-4 overflow-y-auto max-h-[500px] flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Theory Researcher</h3>
          </div>
          
          {chatHistory.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-xs italic">
              Ready to discuss knot topology or torsion dynamics.
            </div>
          ) : (
            chatHistory.map((msg, i) => (
              <div key={i} className={`p-3 rounded-lg text-xs ${msg.role === 'assistant' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-100' : 'bg-white/5 border border-white/10'}`}>
                <div className="font-bold mb-1 uppercase text-[10px] opacity-50">{msg.role}</div>
                {msg.content}
              </div>
            ))
          )}
        </div>

        <div className="glass rounded-xl p-2 flex gap-2">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask about Borromean knots..."
            className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleDeepAnalysis()}
          />
          <button 
            onClick={handleDeepAnalysis}
            className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
          >
            <i className="fa-solid fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
