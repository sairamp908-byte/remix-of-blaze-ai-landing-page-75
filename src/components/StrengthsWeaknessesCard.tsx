import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Maximize } from 'lucide-react';
import { MockQuestion } from '@/types/quiz';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface StrengthsWeaknessesCardProps {
    questions: MockQuestion[];
    userAnswers: (number | null)[];
    isPreview?: boolean;
    onMaximize?: () => void;
    isExpandedForPdf?: boolean;
}

const StrengthsWeaknessesCard: React.FC<StrengthsWeaknessesCardProps> = ({ questions, userAnswers, isPreview, onMaximize, isExpandedForPdf }) => {
    const topicPerformance = React.useMemo(() => {
        const performance: Record<string, { correct: number; total: number }> = {};

        questions.forEach((q, index) => {
            if (!performance[q.topic]) {
                performance[q.topic] = { correct: 0, total: 0 };
            }
            performance[q.topic].total++;
            if (userAnswers[index] === q.correct) {
                performance[q.topic].correct++;
            }
        });

        return Object.entries(performance).map(([topic, data]) => ({
            topic,
            ...data,
            percentage: data.total > 0 ? (data.correct / data.total) * 100 : 0,
        }));
    }, [questions, userAnswers]);

    const strengths = topicPerformance.filter(t => t.percentage >= 70).sort((a, b) => b.percentage - a.percentage);
    const weaknesses = topicPerformance.filter(t => t.percentage < 70).sort((a, b) => a.percentage - b.percentage);

    const chartConfig = {
        strength: { label: "Strength", color: "hsl(142.1 76.2% 41.2%)" },
        weakness: { label: "Weakness", color: "hsl(0 84.2% 60.2%)" },
    } satisfies ChartConfig;

    const TopicList = ({ topics, type }: { topics: typeof strengths, type: 'strength' | 'weakness' }) => (
        <div className="space-y-3">
            {topics.length > 0 ? topics.map(s => (
                <div key={s.topic}>
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-gray-300 font-medium">{s.topic}</p>
                        <p className={`text-sm font-mono ${type === 'strength' ? 'text-green-400' : 'text-red-400'}`}>{s.percentage.toFixed(0)}%</p>
                    </div>
                    <Progress value={s.percentage} className={`h-2 [&>div]:${type === 'strength' ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
            )) : (
                <p className="text-gray-400 text-sm italic">{type === 'strength' ? 'No strong topics identified yet. Keep practicing!' : 'Great job! No specific weaknesses found.'}</p>
            )}
        </div>
    );

    return (
        <Card className={`bg-slate-900/50 border-purple-500/20 shadow-lg flex flex-col ${isPreview ? 'h-full' : ''} ${isExpandedForPdf ? 'border-none shadow-none' : ''}`}>
            <CardHeader>
                 <div className="flex justify-between items-start">
                     <div>
                         <CardTitle className="text-xl font-bold text-gray-200">Strengths & Weaknesses</CardTitle>
                         {(isPreview || isExpandedForPdf) && <CardDescription>A breakdown of your performance by topic.</CardDescription>}
                         {isPreview && <p className="text-xs text-muted-foreground mt-1">Click to view detailed breakdown</p>}
                     </div>
                      {isPreview && onMaximize && (
                         <Button variant="ghost" size="icon" onClick={onMaximize} className="-mt-2 -mr-2 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200">
                             <Maximize className="w-5 h-5" />
                         </Button>
                     )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6 flex-grow">
                <div>
                    <h3 className="text-lg font-semibold text-green-400 flex items-center mb-3">
                        <TrendingUp className="mr-2" /> Strengths
                    </h3>
                    <TopicList topics={strengths} type="strength" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-red-400 flex items-center mb-3">
                        <TrendingDown className="mr-2" /> Areas for Improvement
                    </h3>
                    <TopicList topics={weaknesses} type="weakness" />
                </div>
            </CardContent>
             {(!isPreview && !isExpandedForPdf && topicPerformance.length > 0) && (
                <CardContent>
                    <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">Topic Performance Overview</h3>
                    <div className="h-[250px]">
                        <ChartContainer config={chartConfig} className="w-full h-full">
                            <BarChart accessibilityLayer data={topicPerformance} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid vertical={false} stroke="hsl(var(--border)/0.5)" />
                                <XAxis
                                    dataKey="topic"
                                    tickLine={false}
                                    axisLine={false}
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    interval={0}
                                />
                                <YAxis
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <ChartTooltip
                                    cursor={{ fill: "hsl(var(--primary)/0.1)" }}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                                    {topicPerformance.map((entry) => (
                                        <Cell
                                            key={`cell-${entry.topic}`}
                                            fill={entry.percentage >= 70 ? 'var(--color-strength)' : 'var(--color-weakness)'}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            )}
             {isPreview && !isExpandedForPdf && (
                <CardFooter className="mt-auto border-t border-purple-500/10 pt-4">
                    <Button variant="ghost" className="w-full text-purple-300 hover:bg-purple-500/10 hover:text-purple-200" onClick={onMaximize}>
                        <Maximize className="mr-2" /> View Detailed Analysis
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default StrengthsWeaknessesCard;
