import React from 'react';

const EarlyAccessBanner = () => {
  return (
    <div 
      className="text-white text-center text-sm font-medium sticky top-0 z-50 h-11 flex items-center justify-center animate-gradient-pan"
      style={{
        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef, #f43f5e, #f97316, #eab308, #22c55e, #14b8a6, #3b82f6, #6366f1)',
        backgroundSize: '300% 100%'
      }}
    >
      <div className="container mx-auto">
        <a href="#waitlist" className="inline-flex items-center justify-center group">
          <span className="hidden sm:inline-block mr-2">🔥 EARLY ACCESS: 2 months FREE for first 1000 early members. Spots filling soon...Hurry Up!</span>
          <span className="sm:hidden">🔥 EARLY ACCESS: 10,000+ students joined!</span>
          <span className="underline group-hover:no-underline ml-2 text-sm font-bold">Claim Your Early Access →</span>
        </a>
      </div>
    </div>
  );
};

export default EarlyAccessBanner;