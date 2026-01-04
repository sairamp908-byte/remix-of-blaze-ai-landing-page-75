
import React from 'react';
import FeaturePageLayout from './FeaturePageLayout';
import { Award } from 'lucide-react';
import StudyRoadmapCard from '@/components/StudyRoadmapCard';

const PersonalizedRoadmapPage = () => {
  return (
    <FeaturePageLayout 
      title="Personalized Roadmap for your success path"
      description="Smart daily plans customized for your target exam with scheduled focus sessions and calendar notifications."
      icon={<Award className="w-16 h-16" />}
    >
      <div className="max-w-4xl mx-auto py-8">
        <StudyRoadmapCard />
      </div>
    </FeaturePageLayout>
  );
};

export default PersonalizedRoadmapPage;
