import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Menu, X } from 'lucide-react';
const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(error => console.error("Video autoplay failed:", error));
      } else {
        video.pause();
      }
    }, {
      threshold: 0.5
    } // Play when 50% of the video is visible
    );
    observer.observe(video);
    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, []);
  return (
    <section className="relative py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See Blaize AI in Action
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Watch how our AI transforms learning and helps students achieve top ranks
          </p>
        </div>
      </div>
    </section>
  );
};
export default VideoSection;