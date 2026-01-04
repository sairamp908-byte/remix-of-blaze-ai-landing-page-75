import React, { useRef, useCallback, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Download, Instagram, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

interface ViralScorecardProps {
  userName?: string;
  score: number;
  totalQuestions: number;
  mockRank: number;
  strengths: string[];
  timeTaken: number;
}

const ViralScorecard: React.FC<ViralScorecardProps> = ({
  userName = "Student",
  score,
  totalQuestions,
  mockRank,
  strengths,
  timeTaken
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateScorecardImage = useCallback(async (): Promise<Blob> => {
    const canvas = canvasRef.current;
    if (!canvas) throw new Error('Canvas not found');

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not found');

    // Set canvas size for social media optimal dimensions
    canvas.width = 1080;
    canvas.height = 1080;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1e40af'); // Blue-700
    gradient.addColorStop(1, '#0f172a'); // Slate-900
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text styles
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';

    // Title
    ctx.font = 'bold 48px Inter, sans-serif';
    ctx.fillText('🎯 BLAIZE UNIVERSITY', canvas.width / 2, 120);

    // Rank badge
    const rankBadgeX = canvas.width / 2;
    const rankBadgeY = 220;
    ctx.fillStyle = '#fbbf24'; // Amber-400
    ctx.beginPath();
    ctx.roundRect(rankBadgeX - 150, rankBadgeY - 40, 300, 80, 20);
    ctx.fill();
    
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 36px Inter, sans-serif';
    ctx.fillText(`Mock Rank: ${mockRank}`, rankBadgeX, rankBadgeY + 10);

    // Student name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px Inter, sans-serif';
    ctx.fillText(userName, canvas.width / 2, 350);

    // Score
    const percentage = Math.round((score / totalQuestions) * 100);
    ctx.font = 'bold 72px Inter, sans-serif';
    ctx.fillText(`${percentage}%`, canvas.width / 2, 480);
    
    ctx.font = '28px Inter, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`${score}/${totalQuestions} Correct`, canvas.width / 2, 520);

    // Time taken
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    ctx.fillText(`Time: ${minutes}m ${seconds}s`, canvas.width / 2, 570);

    // Strengths section
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.fillText('💪 Strengths', canvas.width / 2, 670);

    ctx.font = '24px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    const topStrengths = strengths.slice(0, 3);
    topStrengths.forEach((strength, index) => {
      ctx.fillText(`✓ ${strength}`, canvas.width / 2, 720 + (index * 40));
    });

    // Call to action
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillText('Every question takes you closer to Rank 1!', canvas.width / 2, 900);

    ctx.font = '24px Inter, sans-serif';
    ctx.fillStyle = '#60a5fa';
    ctx.fillText('Join Blaize University Today!', canvas.width / 2, 950);

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/png', 1.0);
    });
  }, [userName, score, totalQuestions, mockRank, strengths, timeTaken]);

  const shareToInstagram = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateScorecardImage();
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link to download the image
      const link = document.createElement('a');
      link.href = url;
      link.download = `blaize-scorecard-${userName}.png`;
      link.click();
      
      toast.success('Image downloaded! Upload to your Instagram story.');
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Failed to generate scorecard');
    }
    setIsGenerating(false);
  };

  const shareToWhatsApp = async () => {
    const text = `🎯 Just scored ${Math.round((score / totalQuestions) * 100)}% on Blaize University! Mock Rank: ${mockRank} 💪\n\nMy strengths: ${strengths.slice(0, 2).join(', ')}\n\nJoin me in preparing for Rank 1! 🚀`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToTelegram = async () => {
    const text = `🎯 Just scored ${Math.round((score / totalQuestions) * 100)}% on Blaize University! Mock Rank: ${mockRank} 💪

My strengths: ${strengths.slice(0, 2).join(', ')}

Join me in preparing for Rank 1! 🚀`;
    const telegramUrl = `https://t.me/share/url?text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Share2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Share Your Achievement!</h3>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Celebrate your progress and inspire others to join the journey to Rank 1!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <Button
              onClick={shareToInstagram}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Instagram className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Instagram Story'}
            </Button>

            <Button
              onClick={shareToWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>

            <Button
              onClick={shareToTelegram}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Telegram
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            💡 Sharing your progress helps friends discover Blaize University too!
          </p>
        </div>

        {/* Hidden canvas for image generation */}
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
          width={1080}
          height={1080}
        />
      </CardContent>
    </Card>
  );
};

export default ViralScorecard;