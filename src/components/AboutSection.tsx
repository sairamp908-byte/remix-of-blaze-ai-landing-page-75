import React from 'react';
import { Sparkles, Cloud } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-slate-900 via-purple-950/50 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6">
            <span className="text-white font-semibold text-lg">Our Story</span>
          </div>
          
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-400/20 rounded-full px-5 py-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 font-medium text-sm">AI</span>
            <span className="text-gray-500">+</span>
            <Cloud className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 font-medium text-sm">Education</span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-white/10 shadow-2xl">
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white font-medium">
              BLaiZE University represents a paradigm shift in education. We've created an AI-powered ecosystem that understands, adapts, and evolves with each student's unique learning journey. Unlike traditional educational institutions that follow a one-size-fits-all approach, BLaiZE creates a completely personalized academic environment where every quiz, lesson, and study session is intelligently crafted to maximize your potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;