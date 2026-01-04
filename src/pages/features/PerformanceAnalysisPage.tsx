
import React, { useState } from 'react';
import FeaturePageLayout from './FeaturePageLayout';
import { PieChart, Maximize, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PerformanceAnalysisPage = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  const content = (
    <div className="p-8 bg-card rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Performance Analysis is Coming Soon!</h2>
      <p className="text-muted-foreground">
        We are working hard to bring you this feature.
        Stay tuned for updates!
      </p>
    </div>
  );

  if (isMaximized) {
    return (
      <div className="fixed inset-0 bg-gray-950 z-50 overflow-y-auto">
        <div className="container mx-auto py-8 h-full">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMaximized(false)} 
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
            <span className="sr-only">Close</span>
          </Button>
          <div className="h-full flex flex-col">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <PieChart className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Performance analysis and mentorship</h1>
              <p className="text-xl text-muted-foreground">
                Get visual insights into your progress with detailed statistics, weekly reports, and weak area identification.
              </p>
            </div>
            <div className="flex-grow flex items-center justify-center">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsMaximized(true)} 
        className="absolute top-4 right-4 z-10 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200"
      >
        <Maximize className="w-5 h-5" />
        <span className="sr-only">Maximize</span>
      </Button>
      <FeaturePageLayout 
        title="Performance analysis and mentorship"
        description="Get visual insights into your progress with detailed statistics, weekly reports, and weak area identification."
        icon={<PieChart className="w-16 h-16" />}
      >
        {content}
      </FeaturePageLayout>
    </div>
  );
};

export default PerformanceAnalysisPage;
