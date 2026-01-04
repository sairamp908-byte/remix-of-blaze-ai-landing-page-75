import React from 'react';
import { Button } from '@/components/ui/button';
import { BrainCircuit, BarChartBig, GitFork, Bot, FileText, MessageSquarePlus } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
const features = [{
  icon: BrainCircuit,
  title: 'Quiz Generator',
  description: 'Forge your path to mastery with hyper-realistic quizzes tailored to your exact needs and curriculum.',
  link: '/features/ai-quiz'
}, {
  icon: MessageSquarePlus,
  title: 'Feedback System',
  description: 'Get instant, intelligent feedback on every answer with detailed explanations and personalized insights to accelerate your learning.',
  link: '/features/feedback-system'
}, {
  icon: BarChartBig,
  title: 'Performance Analytics',
  description: 'Go beyond grades. Our AI analyzes every answer to reveal your true potential and guide your growth.',
  link: '/features/performance-analysis'
}, {
  icon: GitFork,
  title: 'AI Study Roadmap',
  description: "Your personalized AI strategist. Get an intelligent, adaptive study plan that evolves with you, ensuring you're always on the optimal path.",
  link: '/features/personalized-roadmap'
}, {
  icon: Bot,
  title: 'AI Tutor Bot',
  description: 'Never study alone. Your AI Tutor is available 24/7 to demystify complex topics and provide expert guidance.',
  link: '/features/ai-tutor'
}, {
  icon: FileText,
  title: 'AI Note Taker',
  description: 'Transform cluttered notes into structured knowledge. Our AI Note Taker distills key insights so you can focus on what truly matters.',
  link: '/features/ai-note-taker'
}];
const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">AI-Powered Features</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Experience the future of learning with our advanced AI tools
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link} className="group">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 h-full hover:bg-white/10 transition-all duration-300">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;