
import React from 'react';
import FeaturePageLayout from './FeaturePageLayout';
import { FileText } from 'lucide-react';

const AiNoteTakerPage = () => {
  return (
    <FeaturePageLayout
      title="AI Note Taker"
      description="Automatically summarize and organize your study notes from lectures or textbooks. Never miss a key concept again."
      icon={<FileText />}
    >
      <div className="text-center p-8 bg-slate-800/50 rounded-lg border border-slate-700/80">
        <h2 className="text-2xl font-bold text-white mb-4">Coming Soon!</h2>
        <p className="text-gray-400">
          Our AI Note Taker feature is currently under development. Stay tuned for a smarter way to manage your study materials.
        </p>
      </div>
    </FeaturePageLayout>
  );
};

export default AiNoteTakerPage;
