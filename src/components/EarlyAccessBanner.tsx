import React from 'react';
const EarlyAccessBanner = () => {
  return <div className="bg-gradient-to-r from-blue-600 via-slate-500 to-gray-600 text-white text-center text-sm font-medium sticky top-0 z-50 h-11 flex items-center justify-center animate-gradient-pan" style={{
    backgroundSize: '200% 200%'
  }}>
      <div className="container mx-auto">
        <a href="#waitlist" className="inline-flex items-center justify-center group">
          <span className="hidden sm:inline-block mr-2">🔥 EARLY ACCESS: 2 months FREE for first 1000 early members. Spots filling soon...Hurry Up!</span>
          <span className="sm:hidden">🔥 EARLY ACCESS: 10,000+ students joined!</span>
          <span className="underline group-hover:no-underline ml-2 text-sm font-bold">Claim Your Early Access →</span>
        </a>
      </div>
    </div>;
};
export default EarlyAccessBanner;