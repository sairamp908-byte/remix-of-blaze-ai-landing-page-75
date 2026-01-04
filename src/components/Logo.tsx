
import React from 'react';
import { Brain } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-slate-500 rounded-2xl opacity-20 blur-sm"></div>
      </div>
      <div className="flex flex-col">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-white">
          BL<span className="text-blue-400">ai</span>ZE
        </h1>
        <span className="text-xs text-blue-300 font-medium tracking-wide">THE AI UNIVERSITY</span>
      </div>
    </div>
  );
};

export default Logo;
