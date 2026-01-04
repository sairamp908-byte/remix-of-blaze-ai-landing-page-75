import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, CheckCircle } from 'lucide-react';
const waitlistFormSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  phone: z.string().optional(),
  targetExam: z.string().min(1, {
    message: 'Please select your target exam.'
  })
});

const examOptions = [
  'EAMCET', 'EAPCET', 'KCET', 'MH CET', 'JEE Mains', 'JEE Advanced', 
  'NEET', 'UPSC', 'CAT', 'SAT', 'GRE', 'IELTS', 'TOEFL', 'GMAT'
];
type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;
const WaitlistForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      targetExam: ''
    }
  });
  const onSubmit = (data: WaitlistFormValues) => {
    console.log('Waitlist form submitted:', data);
    setIsSubmitted(true);
  };
  return <section id="waitlist" className="container mx-auto py-16 sm:py-24">
      <div className="bg-slate-900/50 border border-purple-500/20 rounded-3xl p-8 lg:p-12 shadow-2xl backdrop-blur-sm">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {isSubmitted ? <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left h-full">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto lg:mx-0 mb-4" />
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                  Thank You!
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We will contact you in 24 hours with your customized product.
                </p>
              </div> : <>
                <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Claim Your Academic Advantage — Before Anyone Else
                </div>
                <h2 className="font-heading text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                  Don't just dream of Rank 1. <span className="text-primary">Seize it.</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground mb-6">
                  Join the Founders' Circle of early BLaiZE members — where achievers, dreamers, and toppers of tomorrow get their unfair advantage.
                </p>
                
                <div className="text-left space-y-3 mb-6">
                  <p className="text-sm text-muted-foreground mb-4">As an early access member, you'll unlock:</p>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-start gap-2">
                      <span className="text-primary">✨</span>
                      <span><span className="text-primary font-semibold">Free 2-month Premium Subscription</span> (AI-powered learning at zero cost) for first 1000</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-primary">✨</span>
                      <span><span className="text-primary font-semibold">Exclusive Founders' Circle Access</span> — direct interaction with the creators of BLaiZE University</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-primary">✨</span>
                      <span><span className="text-primary font-semibold">Priority Entry to Beta Features</span> before the public launch</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-primary">✨</span>
                      <span><span className="text-primary font-semibold">Special Recognition</span> as a BLaiZE Founding Member</span>
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Be among the first 1000 students to join, and shape the future of AI-powered education with us.
                  </p>
                </div>
                <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                    📋 Join the Founders' Circle
                  </h3>
                  <p className="text-center text-sm text-muted-foreground mb-6">
                    👉 Get early access + free 6 months premium
                  </p>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField 
                        control={form.control} 
                        name="fullName" 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-300">Full Name ✨</FormLabel>
                            <FormControl>
                              <Input 
                                type="text" 
                                placeholder="Enter your full name" 
                                {...field} 
                                className="h-12 text-base bg-slate-800 border-slate-700 focus:ring-purple-500" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      
                      <FormField 
                        control={form.control} 
                        name="email" 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-300">Email Address 📧</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Enter your email address" 
                                {...field} 
                                className="h-12 text-base bg-slate-800 border-slate-700 focus:ring-purple-500" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      
                      <FormField 
                        control={form.control} 
                        name="phone" 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-300">Phone Number (optional) 📱</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="Enter your phone number" 
                                {...field} 
                                className="h-12 text-base bg-slate-800 border-slate-700 focus:ring-purple-500" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      
                      <FormField 
                        control={form.control} 
                        name="targetExam" 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-300">Target Exam 🎯</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 text-base bg-slate-800 border-slate-700 focus:ring-purple-500">
                                  <SelectValue placeholder="Select your target exam" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-slate-800 border-slate-700">
                                {examOptions.map((exam) => (
                                  <SelectItem key={exam} value={exam} className="text-gray-200 hover:bg-slate-700">
                                    {exam}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} 
                      />
                      
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold mt-6"
                      >
                        Start Your Rank #1 Journey
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </Form>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>🚀 Launching Soon! Only the Bold Will Rise.</p>
                </div>
              </>}
          </div>
          
          <div className="flex items-center justify-center">
            <img src="/lovable-uploads/e73aeb1c-3026-4f6f-8bad-9ef5ed9f6bfa.png" alt="BLaiZE University - Students climbing golden steps to Rank 1, surrounded by AI and academic achievement symbols" className="rounded-2xl shadow-2xl w-full max-w-md mx-auto transition-transform duration-300 hover:scale-105" />
          </div>
        </div>
      </div>
    </section>;
};
export default WaitlistForm;