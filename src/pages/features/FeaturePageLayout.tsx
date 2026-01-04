
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WaitlistForm from '@/components/WaitlistForm';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import EarlyAccessBanner from '@/components/EarlyAccessBanner';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturePageLayoutProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const FeaturePageLayout: React.FC<FeaturePageLayoutProps> = ({ title, description, icon, children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <EarlyAccessBanner />
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto py-16 sm:py-24">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
              {icon && <div className="bg-primary/10 p-4 rounded-full">{icon}</div>}
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {title}
              </h1>
              {description && 
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  {description}
                </p>
              }
            </div>
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
            <div className="mt-16 text-center">
              <a href="https://preview--blaze-ai-landing-page-01.lovable.app/#waitlist">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold group">
                  Join waitlist
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
        </section>
        <div className="container mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-16"></div>
        </div>
        <WaitlistForm />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default FeaturePageLayout;
