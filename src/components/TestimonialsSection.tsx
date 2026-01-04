import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Autoplay from "embla-carousel-autoplay";
const testimonials = [{
  quote: "Blaize isn't just another prep app. It feels like having my own AI mentor who knows exactly where I'm weak and fixes it immediately. For the first time, I believe I can aim for Rank 1.",
  name: "Ananya",
  role: "JEE Aspirant, Class 12",
  gradient: "from-purple-900/50 to-blue-900/50"
}, {
  quote: "I've tried coaching, tuitions, test series — nothing was this precise. Blaize shows me my mistakes, gives me a roadmap, and adapts daily. It feels like it was built just for me.",
  name: "Rahul",
  role: "NEET Aspirant, Class 11",
  gradient: "from-green-900/50 to-cyan-900/50"
}, {
  quote: "What shocked me is how Blaize personalizes everything. I'm not lost in a syllabus anymore — the AI tells me exactly what to study, when, and how. Traditional education feels primitive after this.",
  name: "Meera",
  role: "GRE Aspirant, Graduate Student",
  gradient: "from-pink-900/50 to-purple-900/50"
}, {
  quote: "Blaize's vision blew my mind — it's not just about exams, it's about changing the entire education system. Imagine if every student could study like this — there would be no toppers, only equals.",
  name: "Arjun",
  role: "EAMCET Aspirant",
  gradient: "from-orange-900/50 to-red-900/50"
}];
const TestimonialCard = ({
  quote,
  name,
  role,
  gradient
}: {
  quote: string;
  name: string;
  role: string;
  gradient: string;
}) => <Card className={cn("bg-gradient-to-br border-purple-500/20 text-center h-full flex flex-col justify-center mx-auto max-w-2xl", gradient)}>
        <CardContent className="p-8 md:p-10">
            <p className="text-lg md:text-xl italic mb-6 text-gray-300">"{quote}"</p>
            <div className="flex flex-col items-center justify-center">
                <div>
                    <div className="font-bold text-lg text-white">{name}</div>
                    <div className="text-muted-foreground">{role}</div>
                    <div className="flex text-yellow-400 mt-1 justify-center">
                        {'★'.repeat(5)}
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>;
const TestimonialsSection = () => {
  return <section className="py-16 sm:py-24 bg-background text-foreground">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Early Users Testimonials</h2>
                    
                </div>

                <Carousel plugins={[Autoplay({
        delay: 4000,
        stopOnInteraction: true
      })]} opts={{
        align: "start",
        loop: true
      }} className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => <CarouselItem key={index} className="p-2">
                                <TestimonialCard {...testimonial} />
                            </CarouselItem>)}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </div>
        </section>;
};
export default TestimonialsSection;