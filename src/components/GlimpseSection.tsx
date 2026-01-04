import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, BrainCircuit, BarChart3, BookOpen, Trophy, MessageSquare, FileText, Target, Gift } from 'lucide-react';
const GlimpseSection = () => {
  const features = [{
    icon: BrainCircuit,
    title: "AI Quiz Forge",
    description: "Forget random practice. Generate unlimited, laser-focused quizzes built exactly for your syllabus, your level, your brain. 🚀 Each question is designed to stretch your thinking and close knowledge gaps.",
    link: "/features/ai-quiz"
  }, {
    icon: BarChart3,
    title: "Performance X-Ray",
    description: "Go beyond \"right or wrong.\" Blaize scans how you think, where you hesitate, your weak zones, and your learning speed — then shows you a crystal-clear path forward.",
    link: "/features/performance-analysis"
  }, {
    icon: Target,
    title: "Adaptive Learning Engine",
    description: "Every attempt reshapes your journey. Blaize auto-adjusts difficulty, topics, and question types to always keep you in the \"Rank 1 Growth Zone.\"",
    link: "/features/ai-quiz"
  }, {
    icon: BookOpen,
    title: "Personalized Roadmap",
    description: "No generic schedules. Blaize crafts a daily-to-rank-1 map built only for you — powered by your progress, not a coaching calendar.",
    link: "/features/personalized-roadmap"
  }, {
    icon: FileText,
    title: "AI Notes Manager",
    description: "Turn chaos into clarity. Blaize organizes your notes, auto-summarizes key concepts, and links them across subjects to help you revise 10x faster.",
    link: "/features/ai-note-taker"
  }, {
    icon: MessageSquare,
    title: "AI TutorBot",
    description: "Your private teacher — 24/7. Ask anything. Get instant, step-by-step explanations like a human mentor who never sleeps.",
    link: "/features/ai-tutor"
  }, {
    icon: Trophy,
    title: "Gamified Success System",
    description: "Points. Badges. Contests. Every milestone pushes you higher while making prep addictive, competitive, and fun.",
    link: "/features/gamified-success"
  }, {
    icon: Gift,
    title: "🌍 Community & Challenges",
    description: "Join AI-powered contests, rank globally against other students, and see where you stand in the future of education.",
    link: "/features/community-challenges"
  }];
  return <section className="py-20 bg-gradient-to-br from-slate-900 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6 md:text-4xl">
            A Complete AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-300">Learning Ecosystem</span>
          </h2>
              <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed text-lg text-center">Blaize isn't just a tool. It's the end of old education. Built to make every student unstoppable.
Every feature is engineered with AI to destroy the old, one-size-fits-all education system and give you the edge to reach Rank #1.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
          const Icon = feature.icon;
          return <div key={index} className="bg-white/5 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/10 transition-all group rounded-2xl">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{feature.description}</p>
                <a href={feature.link}>
                  <Button size="sm" variant="outline" className="w-full border-blue-400/30 text-blue-300 hover:bg-blue-600/20 text-xs">
                    Explore Feature
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </a>
              </div>;
        })}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-slate-600/20 backdrop-blur-sm p-8 border border-white/10 max-w-3xl mx-auto rounded-2xl px-0 py-[20px] my-0">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <h3 className="font-bold text-white mb-4 text-2xl">Ready to Transform Your Learning Experience?</h3>
            <p className="mb-6 text-base text-center font-normal text-gray-400">Join the movement of students breaking free from outdated learning. Be among the first to experience BLaiZE University — the world’s first AI-powered path to Rank 1 success. Secure your spot on the waitlist today!”</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://preview--blaze-ai-landing-page-01.lovable.app/#waitlist">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white font-semibold px-8 py-3 text-base">
                  Join Waitlist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="https://preview--blaze-ai-landing-page-01.lovable.app/#quiz-generator">
                <Button size="lg" variant="outline" className="border-2 border-blue-400 text-blue-300 hover:bg-blue-600/20 font-semibold px-8 py-3">
                  Try AI Quiz Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default GlimpseSection;