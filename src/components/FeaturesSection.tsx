import React from 'react';
import { Button } from '@/components/ui/button';
import { BrainCircuit, BarChartBig, Map, FileSearch, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import featureQuiz from '@/assets/feature-ai-quiz.jpg';
import featurePerformance from '@/assets/feature-performance.jpg';
import featureRoadmap from '@/assets/feature-roadmap.jpg';
import featureNotes from '@/assets/feature-notes.jpg';
import featureTutor from '@/assets/feature-tutor.jpg';

const features = [
  {
    icon: BrainCircuit,
    title: 'Smart Quiz Engine',
    description: 'AI-powered quizzes that adapt to your learning level and style.',
    subdescription: 'Generate personalized practice tests from any topic, textbook, or syllabus. Our AI adjusts difficulty in real-time based on your performance.',
    image: featureQuiz,
    link: '/features/ai-quiz'
  },
  {
    icon: BarChartBig,
    title: 'Performance Insights',
    description: 'Deep analytics that reveal your true potential.',
    subdescription: 'Track your progress across subjects with detailed metrics, identify weak areas, and get AI-driven recommendations to improve faster.',
    image: featurePerformance,
    link: '/features/performance-analysis'
  },
  {
    icon: Map,
    title: 'Learning Roadmap',
    description: 'Your personalized path to mastery.',
    subdescription: 'AI creates a dynamic study plan that evolves with you. Get structured content, milestone tracking, and adaptive learning paths tailored to your goals.',
    image: featureRoadmap,
    link: '/features/personalized-roadmap'
  },
  {
    icon: FileSearch,
    title: 'Note Analyzer',
    description: 'Transform notes into actionable knowledge.',
    subdescription: 'Upload your handwritten or digital notes and let AI extract key concepts, create summaries, and generate flashcards automatically.',
    image: featureNotes,
    link: '/features/ai-note-taker'
  },
  {
    icon: MessageCircle,
    title: 'AI Tutor Assistant',
    description: '24/7 expert guidance for any doubt.',
    subdescription: 'Get instant explanations for complex topics, step-by-step problem solving, and personalized mentoring whenever you need it.',
    image: featureTutor,
    link: '/features/ai-tutor'
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4">
            Powerful Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our AI-powered tools work together to create the most effective learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.link} 
              className="group block"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-full hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  
                  <p className="text-gray-300 font-medium mb-2">{feature.description}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{feature.subdescription}</p>
                  
                  <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;