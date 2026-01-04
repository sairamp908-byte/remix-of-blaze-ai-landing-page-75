import React from 'react';
import FeaturePageLayout from './FeaturePageLayout';
import { Trophy, Award, Target, Star, Medal, Crown } from 'lucide-react';

const GamifiedSuccessPage = () => {
  return (
    <FeaturePageLayout
      title="Gamified Success System"
      description="Turn your learning journey into an exciting quest. Earn points, unlock achievements, and compete with peers while mastering your subjects."
      icon={<Trophy className="w-16 h-16" />}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-card p-6 rounded-xl border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Achievement Badges</h3>
          <p className="text-muted-foreground">
            Unlock exclusive badges for completing quizzes, maintaining streaks, and reaching milestones. Show off your accomplishments!
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
          <p className="text-muted-foreground">
            Visual progress bars and statistics show your learning journey. Track your improvements across all subjects and topics.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Point System</h3>
          <p className="text-muted-foreground">
            Earn points for every quiz completed, correct answer, and learning goal achieved. Build up your score and climb the ranks!
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Medal className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Daily Challenges</h3>
          <p className="text-muted-foreground">
            Take on daily and weekly challenges designed to push your limits and keep you engaged with fresh, exciting content.
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Leaderboards</h3>
          <p className="text-muted-foreground">
            Compete with peers on subject-specific leaderboards. See where you rank and get motivated to reach the top!
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Milestone Rewards</h3>
          <p className="text-muted-foreground">
            Unlock special rewards and premium features as you hit major learning milestones. Your dedication gets rewarded!
          </p>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl text-center">
        <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Make Learning Addictive</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our gamification system transforms the mundane task of studying into an exciting adventure. 
          Every question answered, every concept mastered, and every goal achieved brings you closer to academic excellence.
        </p>
      </div>
    </FeaturePageLayout>
  );
};

export default GamifiedSuccessPage;