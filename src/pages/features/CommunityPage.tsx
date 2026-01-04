import React from 'react';
import FeaturePageLayout from './FeaturePageLayout';
import { Users, Globe, MessageCircle, Zap, Calendar, Trophy } from 'lucide-react';

const CommunityPage = () => {
  return (
    <FeaturePageLayout
      title="Community & Challenges"
      description="Join a global network of ambitious students. Participate in AI-powered contests, share knowledge, and compete to reach Rank #1 together."
      icon={<Globe className="w-16 h-16" />}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-card p-6 rounded-xl border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Global Study Groups</h3>
          <p className="text-muted-foreground">
            Connect with students preparing for the same exams. Share strategies, solve problems together, and learn from each other's experiences.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">AI-Powered Contests</h3>
          <p className="text-muted-foreground">
            Participate in intelligently designed competitions that adapt to your level. Challenge yourself and others in fair, skill-based contests.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Discussion Forums</h3>
          <p className="text-muted-foreground">
            Ask questions, share insights, and get help from peers and experts. Build your knowledge through collaborative learning.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Global Rankings</h3>
          <p className="text-muted-foreground">
            See where you stand globally among students preparing for your target exam. Track your progress against peers worldwide.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Study Events</h3>
          <p className="text-muted-foreground">
            Join scheduled study sessions, workshops, and expert talks. Learn from successful candidates and industry professionals.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Peer Collaboration</h3>
          <p className="text-muted-foreground">
            Form study partnerships, share resources, and motivate each other. Success is better when achieved together.
          </p>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl text-center">
        <Users className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Learn Together, Succeed Together</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Education is more powerful when it's collaborative. Join thousands of ambitious students who are transforming 
          their learning journey through community support, healthy competition, and shared knowledge.
        </p>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-xl border text-center">
          <h4 className="text-lg font-semibold mb-2">Weekly Challenges</h4>
          <p className="text-muted-foreground text-sm">
            Participate in themed challenges every week. From speed quizzes to concept mastery contests.
          </p>
        </div>
        <div className="bg-card p-6 rounded-xl border text-center">
          <h4 className="text-lg font-semibold mb-2">Expert Sessions</h4>
          <p className="text-muted-foreground text-sm">
            Join live sessions with exam toppers and subject experts sharing their winning strategies.
          </p>
        </div>
      </div>
    </FeaturePageLayout>
  );
};

export default CommunityPage;