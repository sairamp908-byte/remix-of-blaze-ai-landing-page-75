
import React from 'react';
import FeaturePageLayout from './FeaturePageLayout';
import { Brain } from 'lucide-react';
import QuizGenerator from '@/components/QuizGenerator';

const AiQuizPage = () => {
  return (
    <FeaturePageLayout
      title="Try our AI Quiz Experience"
      description="Create custom quizzes based on subject, topic, and difficulty level to target your specific areas of study."
      icon={<Brain className="w-16 h-16" />}
    >
      <QuizGenerator />
    </FeaturePageLayout>
  );
};

export default AiQuizPage;
