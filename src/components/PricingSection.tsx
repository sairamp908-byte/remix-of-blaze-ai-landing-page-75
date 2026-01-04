import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
const PricingTier = ({
  title,
  price,
  description,
  features,
  popular,
  ctaText,
  ctaAction
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  ctaText: string;
  ctaAction: () => void;
}) => <Card className={cn("flex flex-col h-full bg-white/5 backdrop-blur-sm border-white/10", popular ? "border-blue-500 border-2 shadow-blue-500/20 shadow-lg ring-2 ring-blue-500" : "border-gray-700")}>
    <CardHeader className="relative pb-4">
      {popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          ✨ Most Popular
        </div>}
      <CardTitle className="text-2xl text-white">{title}</CardTitle>
      <div className="text-4xl font-bold pt-2 text-white">{price}</div>
      <CardDescription className="pt-1 text-gray-400">{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col pt-4">
      <ul className="space-y-2 mb-6 flex-grow">
        {features.map((feature, index) => <li key={index} className="flex items-center">
            <Check className="h-5 w-5 text-blue-400 mr-2 shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </li>)}
      </ul>
      <Button onClick={ctaAction} className={cn("w-full mt-auto", popular ? "bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white" : "bg-gray-700 hover:bg-gray-600 text-white")}>
        {ctaText}
      </Button>
    </CardContent>
  </Card>;
const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const tiers = {
    monthly: [{
      title: 'Basic',
      price: 'Free',
      description: 'Perfect for exploring and occasional learning sessions.',
      features: ['5 AI-powered quizzes / month', '25 AI tutor questions / month', 'Basic notes with summaries', 'Standard quiz templates', '3-day history'],
      popular: false,
      ctaText: 'Get Started'
    }, {
      title: 'Premium',
      price: '$12/mo',
      description: 'Ideal for students and regular learners.',
      features: ['Unlimited AI quizzes', 'Unlimited AI tutor questions', 'Advanced notes with insights', 'Custom quiz templates', 'Priority support', 'Performance analytics', 'Unlimited history'],
      popular: true,
      ctaText: 'Get Premium'
    }, {
      title: 'Enterprise',
      price: '$29/mo',
      description: 'For educational institutions and organizations.',
      features: ['Everything in Premium', 'Team management', 'Custom branding', 'API access', 'Dedicated support', 'Advanced analytics', 'SSO integration'],
      popular: false,
      ctaText: 'Contact Sales'
    }],
    annual: [{
      title: 'Basic',
      price: 'Free',
      description: 'Perfect for exploring and occasional learning sessions.',
      features: ['5 AI-powered quizzes / month', '25 AI tutor questions / month', 'Basic notes with summaries', 'Standard quiz templates', '3-day history'],
      popular: false,
      ctaText: 'Get Started'
    }, {
      title: 'Premium',
      price: '$8/mo',
      description: 'Billed annually.',
      features: ['Unlimited AI quizzes', 'Unlimited AI tutor questions', 'Advanced notes with insights', 'Custom quiz templates', 'Priority support', 'Performance analytics', 'Unlimited history'],
      popular: true,
      ctaText: 'Get Premium'
    }, {
      title: 'Enterprise',
      price: '$24/mo',
      description: 'Billed annually.',
      features: ['Everything in Premium', 'Team management', 'Custom branding', 'API access', 'Dedicated support', 'Advanced analytics', 'SSO integration'],
      popular: false,
      ctaText: 'Contact Sales'
    }]
  };
  const handleCtaClick = () => {
    document.getElementById('waitlist')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Start your AI-powered learning journey today
          </p>
          <div className="flex justify-center items-center space-x-4 mb-8">
            <span className={cn("text-sm", billingCycle === 'monthly' ? 'text-white' : 'text-gray-400')}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className={cn("inline-block h-4 w-4 transform rounded-full bg-white transition-transform", billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1')} />
            </button>
            <span className={cn("text-sm", billingCycle === 'annual' ? 'text-white' : 'text-gray-400')}>Annual</span>
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Save 33%</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers[billingCycle].map((tier, index) => (
            <PricingTier
              key={index}
              title={tier.title}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              popular={tier.popular}
              ctaText={tier.ctaText}
              ctaAction={handleCtaClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default PricingSection;