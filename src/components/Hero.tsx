import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay";
const Hero = () => {
  const quotesWithImages = [{
    text: "Toppers Aren't Born. They're Trained. Now by AI.",
    gradient: "from-primary to-cyan-400",
    image: "/lovable-uploads/7c7c133e-f47c-4299-ad86-8d0e404860db.png"
  }, {
    text: "Your College Prepares You for Exams. We Prepare You to Win Them.",
    gradient: "from-blue-400 to-cyan-400",
    image: "/lovable-uploads/5d825dce-4966-4d58-9cea-c92e0a9f5d41.png"
  }, {
    text: "We Don't Need More Coaching Factories. We Need AI That Thinks Like a Topper's Brain.",
    gradient: "from-primary to-blue-400",
    image: "/lovable-uploads/cb05a202-c436-4d73-8c6d-a8b9c0035c55.png"
  }, {
    text: "Degrees Don't Make Toppers. AI Does.",
    gradient: "from-cyan-400 to-primary",
    image: "/lovable-uploads/6edd0040-86fd-4582-8e0a-69bc3610aa88.png"
  }, {
    text: "The End of College Learning. The Rise of AI Toppers.",
    gradient: "from-blue-400 to-cyan-400",
    image: "/lovable-uploads/31b29868-b4aa-4c30-9904-9d3fd7ce7870.png"
  }, {
    text: "Forget Colleges. Forget Coaching. AI is the New Classroom of Toppers.",
    gradient: "from-primary to-cyan-400",
    image: "/lovable-uploads/9d0c254a-bd8d-4f3c-8fb7-9235ac066025.png"
  }, {
    text: "Classrooms teach the crowd. Blaize teaches the individual.",
    gradient: "from-cyan-400 to-blue-400",
    image: "/lovable-uploads/a99a8f36-04f5-4934-b619-236fe6c394af.png"
  }, {
    text: "Education for all is outdated. The future is education for each.",
    gradient: "from-primary to-cyan-400",
    image: "/lovable-uploads/636f3999-faeb-4261-ae6a-aaf68bc3d062.png"
  }, {
    text: "Why should only 1% reach the top? Blaize makes every student unstoppable.",
    gradient: "from-blue-400 to-primary",
    image: "/lovable-uploads/75709403-7570-40be-966e-71be3160b870.png"
  }, {
    text: "We don't train you to pass. We train you to dominate.",
    gradient: "from-cyan-400 to-primary",
    image: "/lovable-uploads/01348938-f58a-4a5a-8e69-a02b9e6fed43.png"
  }, {
    text: "Colleges prepare you for the system. Blaize prepares you to break it.",
    gradient: "from-primary to-blue-400",
    image: "/lovable-uploads/40b04925-ae76-4905-9192-45b24935d398.png"
  }, {
    text: "The world doesn't need another coaching institute. It needs Blaize.",
    gradient: "from-blue-400 to-cyan-400",
    image: "/lovable-uploads/ce3f7a31-7611-4953-a6af-4c357b3f23a4.png"
  }, {
    text: "From any level → to Rank 1. That's the Blaize Promise.",
    gradient: "from-primary to-cyan-400",
    image: "/lovable-uploads/d00f380c-f525-4a39-bf4f-29a183ffb1bd.png"
  }];
  return <section className="relative md:min-h-[calc(100vh-88px)] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-16 sm:py-20">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-blob-spin" style={{
      animationDuration: '25s'
    }}></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-slate-500/10 rounded-full blur-xl animate-blob-spin" style={{
      animationDuration: '30s',
      animationDelay: '5s'
    }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gray-500/10 rounded-full blur-xl animate-blob-spin" style={{
      animationDuration: '35s'
    }}></div>

      <div className="container mx-auto relative z-10">
        <div className="flex justify-center">
            <div className="text-center space-y-8 max-w-5xl mx-auto">
              <div className="flex justify-center">
                <div className="inline-block bg-gradient-to-r from-primary/20 via-blue-500/20 to-cyan-500/20 border border-primary/30 rounded-full px-3 py-1.5 mb-4 shadow-lg backdrop-blur-sm">
                  <p className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                    🏆 Education 2.0 — AI Doesn't Teach. It Transforms.
                  </p>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-8">
                {/* Quotes Carousel - Left Side (Takes more space) */}
                <div className="w-full lg:w-4/5 max-w-6xl">
                  <Carousel plugins={[Autoplay({
                delay: 3000,
                stopOnInteraction: true
              })]} opts={{
                align: "center",
                loop: true
              }} className="w-full">
                    <CarouselContent>
                      {quotesWithImages.map((item, index) => <CarouselItem key={index}>
                          <Card className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm shadow-2xl overflow-hidden border-0">
                            {/* Gradient Border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-cyan-500 p-[2px] rounded-xl">
                              <div className="h-full w-full bg-gradient-to-br from-slate-800/90 to-slate-900/95 rounded-xl"></div>
                            </div>
                            
                            {/* Glow Effects */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-cyan-500/10 animate-pulse rounded-xl"></div>
                            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(59,130,246,0.15)] rounded-xl"></div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-cyan-500/20 blur-sm rounded-xl"></div>
                            
                            <CardContent className="relative p-8 sm:p-10 lg:p-12 xl:p-16 rounded-lg">
                              <div className="text-center">
                                <h1 className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} leading-relaxed drop-shadow-lg tracking-wide`}>
                                  ⚡ "{item.text}"
                                </h1>
                              </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>)}
                    </CarouselContent>
                  </Carousel>
                </div>

                {/* Hero Image - Right Side (Smaller) */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex-shrink-0 overflow-hidden rounded-xl shadow-2xl">
                  <img src="/lovable-uploads/d00f380c-f525-4a39-bf4f-29a183ffb1bd.png" alt="AI-powered learning transformation" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
                </div>
              </div>

              {/* Description */}
              <div className="text-gray-300 max-w-5xl mx-auto leading-relaxed font-medium text-base sm:text-lg lg:text-xl mb-12 px-4">
              <h2 className="mb-8 text-center text-xl lg:text-3xl font-bold text-[#ff5f5f] sm:text-xl">
                🌍 "One Education For All is Dead. Blaize Creates Education For Each."
              </h2>
              
              <p className="leading-loose text-neutral-100 text-justify text-lg">Only 1% reach the top today — because the system is broken. Students spend lakhs of rupees and countless hours on outdated learning methods, yet remain stuck. BLaiZE University is the world's first AI University built by engineers from top product companies, to transform every student into a Rank 1 achiever with personalized, adaptive learning.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <a href="#quiz-generator">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-semibold px-8 py-4 shadow-2xl text-xl">
                  🚀 Take the AI Challenge
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </a>
              <a href="#waitlist">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/20 font-semibold px-8 py-4 text-xl gap-2">
                  <GraduationCap className="h-6 w-6" />
                  Join Classroom
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;