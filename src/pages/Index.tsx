
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import VideoSection from '@/components/VideoSection';
import WaitlistForm from '@/components/WaitlistForm';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import Footer from '@/components/Footer';
import EarlyAccessBanner from '@/components/EarlyAccessBanner';

import SupportedExams from '@/components/SupportedExams';
import QuizGenerator from '@/components/QuizGenerator';
import GlimpseSection from '@/components/GlimpseSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutSection from '@/components/AboutSection';

const SectionDivider = () => <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>;

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <EarlyAccessBanner />
      <Header />
      <main className="flex-grow">
        <section id="hero">
          <Hero />
        </section>
        <VideoSection />
        <section id="features">
          <GlimpseSection />
        </section>
        <section id="quiz-generator">
          <QuizGenerator />
        </section>
        <SectionDivider />
        <section id="about">
          <AboutSection />
        </section>
        <SectionDivider />
        <section id="exams">
          <SupportedExams />
        </section>
        <SectionDivider />
        <PricingSection />
        <SectionDivider />
        <TestimonialsSection />
        <SectionDivider />
        <section id="waitlist">
          <WaitlistForm />
        </section>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
