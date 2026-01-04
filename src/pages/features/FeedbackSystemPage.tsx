import React from 'react';
import FeaturePageLayout from './FeaturePageLayout';
import { MessageSquarePlus, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeedbackSystemPage = () => {
  const feedbackFeatures = [
    {
      icon: CheckCircle,
      title: "Instant Answer Validation",
      description: "Get immediate feedback on whether your answer is correct or incorrect with clear visual indicators."
    },
    {
      icon: Lightbulb,
      title: "Detailed Explanations",
      description: "Understand the 'why' behind every answer with comprehensive explanations that break down complex concepts."
    },
    {
      icon: XCircle,
      title: "Common Mistake Analysis",
      description: "Learn from errors with insights into why incorrect answers are wrong and how to avoid similar mistakes."
    }
  ];

  return (
    <FeaturePageLayout
      title="AI Feedback System"
      description="Get intelligent, personalized feedback that goes beyond right or wrong. Our AI analyzes your responses to provide detailed explanations, identify knowledge gaps, and guide you toward mastery."
      icon={<MessageSquarePlus className="w-16 h-16" />}
    >
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {feedbackFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="bg-white/5 border-white/10">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-cyan-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Smart Question Analysis</h3>
            <p className="text-gray-300 mb-4">
              Our AI doesn't just tell you if you're right or wrong. It analyzes your thought process, identifies conceptual gaps, and provides targeted explanations to strengthen your understanding.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Personalized Learning Paths</h3>
            <p className="text-gray-300 mb-4">
              Based on your feedback patterns, our system creates customized learning recommendations and suggests additional practice areas to maximize your study efficiency.
            </p>
          </CardContent>
        </Card>
      </div>
    </FeaturePageLayout>
  );
};

export default FeedbackSystemPage;