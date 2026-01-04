
import FeaturePageLayout from "./FeaturePageLayout";
import { Bot } from "lucide-react";

const AiTutorPage = () => {
  return (
    <FeaturePageLayout
      title="AI Tutor Bot"
      description="Your personal 24/7 AI Tutor. Ask anything, anytime, and get instant, step-by-step guidance to master any subject."
      icon={<Bot className="w-16 h-16" />}
    >
      <div className="p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">AI Tutor Bot is Coming Soon!</h2>
        <p className="text-muted-foreground">
          We are working hard to bring you an interactive AI tutor that can help you with your studies. 
          Stay tuned for updates!
        </p>
      </div>
    </FeaturePageLayout>
  );
};

export default AiTutorPage;
