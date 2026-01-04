
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AiQuizPage from "./pages/features/AiQuizPage";
import PerformanceAnalysisPage from "./pages/features/PerformanceAnalysisPage";
import PersonalizedRoadmapPage from "./pages/features/PersonalizedRoadmapPage";
import AiTutorPage from "./pages/features/AiTutorPage";
import AiNoteTakerPage from "./pages/features/AiNoteTakerPage";
import FeedbackSystemPage from "./pages/features/FeedbackSystemPage";
import GamifiedSuccessPage from "./pages/features/GamifiedSuccessPage";
import CommunityPage from "./pages/features/CommunityPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const HashScrollHandler = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.substring(1));
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };
      if (!tryScroll()) {
        setTimeout(tryScroll, 50);
        setTimeout(tryScroll, 200);
      }
    }
  }, [location]);
  return null;
};
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <HashScrollHandler />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features/ai-quiz" element={<AiQuizPage />} />
          <Route path="/features/feedback-system" element={<FeedbackSystemPage />} />
          <Route path="/features/performance-analysis" element={<PerformanceAnalysisPage />} />
          <Route path="/features/personalized-roadmap" element={<PersonalizedRoadmapPage />} />
          <Route path="/features/ai-tutor" element={<AiTutorPage />} />
          <Route path="/features/ai-note-taker" element={<AiNoteTakerPage />} />
          <Route path="/features/gamified-success" element={<GamifiedSuccessPage />} />
          <Route path="/features/community-challenges" element={<CommunityPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
