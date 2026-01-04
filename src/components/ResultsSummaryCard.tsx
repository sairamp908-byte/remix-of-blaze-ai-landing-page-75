
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TrendingUp, TrendingDown, BookOpen, Award, CheckCircle, Maximize } from 'lucide-react';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ResponseTimeChart } from "./ResponseTimeChart";
import { useQuery } from "@tanstack/react-query";
import { fetchResponseTimes, fetchTimeInvestment, fetchTopicMastery } from "@/hooks/usePerformanceData";
import { Skeleton } from "./ui/skeleton";
import ViralScorecard from "./ViralScorecard";

interface Question {
    topic: string;
    correct: number;
}

interface ResultsSummaryCardProps {
    score: number;
    numQuestions: string;
    timeTaken: number;
    userAnswers: (number | null)[];
    questions: Question[];
    isPreview?: boolean;
    onMaximize?: () => void;
}

const SummaryItem = ({ title, value, subValue, icon: Icon, valueClass = "text-3xl" } : {title: string, value: string, subValue: string, icon: React.ElementType, valueClass?: string}) => (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/80 h-full">
        <div className="flex items-center text-sm text-gray-400 font-semibold mb-2">
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            {title}
        </div>
        <p className={`${valueClass} font-bold text-white`}>{value}</p>
        {subValue && <p className="text-sm text-gray-400 mt-1">{subValue}</p>}
    </div>
);

const ResultsSummaryCard = ({ score, numQuestions, timeTaken, userAnswers, questions, isPreview, onMaximize }: ResultsSummaryCardProps) => {
    const { data: responseTimeData, isLoading: isLoadingResponseTimes } = useQuery({
        queryKey: ['responseTimes'],
        queryFn: fetchResponseTimes,
        enabled: !isPreview,
    });

    const { data: timeInvestmentData, isLoading: isLoadingTimeInvestment } = useQuery({
        queryKey: ['timeInvestment'],
        queryFn: fetchTimeInvestment,
        enabled: !isPreview,
    });

    const { data: topicMasteryData, isLoading: isLoadingTopicMastery } = useQuery({
        queryKey: ['topicMastery'],
        queryFn: fetchTopicMastery,
        enabled: !isPreview,
    });

    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    const percentage = (score / parseInt(numQuestions)) * 100;

    const { strengths, improvements } = React.useMemo(() => {
        if (topicMasteryData) {
            return {
                strengths: topicMasteryData.strengths,
                improvements: topicMasteryData.improvements,
            }
        }
        
        const performanceByTopic = questions.reduce((acc, question, index) => {
            const topic = question.topic;
            if (!acc[topic]) {
                acc[topic] = { correct: 0, total: 0 };
            }
            acc[topic].total++;
            if (userAnswers[index] === question.correct) {
                acc[topic].correct++;
            }
            return acc;
        }, {} as Record<string, { correct: number, total: number }>);

        const allTopicsPerformance = Object.entries(performanceByTopic)
            .map(([topic, data]) => ({
                topic,
                performance: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
            }))
            .sort((a, b) => b.performance - a.performance);

        return {
            strengths: allTopicsPerformance.filter(p => p.performance >= 70),
            improvements: allTopicsPerformance.filter(p => p.performance < 70).sort((a,b) => a.performance - b.performance)
        }
    }, [topicMasteryData, questions, userAnswers]);

    const { strongAreas, weakAreas } = React.useMemo(() => {
        const strong = strengths.map(s => s.topic);
        const weak = improvements.map(i => i.topic);
        return { strongAreas: strong, weakAreas: weak };
    }, [strengths, improvements]);

    const getPerformanceMessage = () => {
        if (percentage >= 80) return {
            title: "Excellent Performance!",
            message: "You have a strong grasp of the material. Keep up the great work and continue to challenge yourself with advanced topics.",
            icon: Award,
            color: "text-green-400",
            bg: "bg-green-900/30",
            border: "border-green-500/30"
        };
        if (percentage >= 50) return {
            title: "Good Job!",
            message: "You have a solid foundation. Focus on your weaker areas to turn them into strengths.",
            icon: TrendingUp,
            color: "text-blue-400",
            bg: "bg-blue-900/30",
            border: "border-blue-500/30"
        };
        return {
            title: "Area for Improvement",
            message: "This is a great starting point. Use the roadmap to focus on the key areas for improvement and try again.",
            icon: TrendingDown,
            color: "text-red-400",
            bg: "bg-red-900/30",
            border: "border-red-500/30"
        };
    };
    const performanceFeedback = getPerformanceMessage();
    const PerformanceIcon = performanceFeedback.icon;

    const numQuestionsInt = parseInt(numQuestions);
    const wrongAnswers = numQuestionsInt - score;
    const avgTimePerQuestion = timeTaken > 0 && numQuestionsInt > 0 ? timeTaken / numQuestionsInt : 0;
    const avgMinutes = Math.floor(avgTimePerQuestion / 60);
    const avgSeconds = Math.round(avgTimePerQuestion % 60);

    return (
        <Card className="h-full bg-background/50 border-purple-500/10 flex flex-col">
            <CardHeader>
                 <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Performance Summary</CardTitle>
                        <CardDescription>Your quiz results at a glance.</CardDescription>
                        {isPreview && <p className="text-xs text-muted-foreground mt-1">Click to view detailed analysis</p>}
                    </div>
                    {isPreview && onMaximize && (
                        <Button variant="ghost" size="icon" onClick={onMaximize} className="-mt-2 -mr-2">
                            <Maximize className="w-5 h-5" />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6 flex-grow">
                 {isPreview ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Overall Score</p>
                                <p className="text-5xl font-bold text-white mt-1">{score}<span className="text-3xl text-gray-400">/{numQuestions}</span> ({percentage.toFixed(0)}%)</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold flex items-center"><Clock className="mr-2 w-4 h-4" />Time Taken</p>
                                <p className="text-3xl font-mono font-bold text-white mt-1">
                                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {strongAreas.length > 0 && (
                                <div className="p-3 rounded-lg bg-green-900/30 border border-green-500/30">
                                    <div className="flex items-center">
                                        <TrendingUp className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                        <p className="font-semibold text-green-400 text-sm">Strong Areas</p>
                                    </div>
                                </div>
                            )}
                            {weakAreas.length > 0 && (
                                 <div className="p-3 rounded-lg bg-yellow-900/30 border border-yellow-500/30">
                                    <div className="flex items-center">
                                        <BookOpen className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                                        <p className="font-semibold text-yellow-400 text-sm">Topics to Learn</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                 ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                             <SummaryItem title="Score" value={`${percentage.toFixed(0)}%`} subValue="Top 22% of all users" icon={Award} />
                             <SummaryItem title="Time Spent" value={`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`} subValue={`Avg. per question: ${avgMinutes}m ${avgSeconds}s`} icon={Clock} valueClass="text-2xl md:text-3xl" />
                             <SummaryItem title="Questions" value={`${score} / ${wrongAnswers}`} subValue={`Correct / Wrong`} icon={BookOpen} />
                             <SummaryItem title="Completed" value={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} subValue={new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} icon={CheckCircle} valueClass="text-2xl" />
                        </div>
                        <div className={`p-4 rounded-lg flex items-start ${performanceFeedback.bg} ${performanceFeedback.border}`}>
                            <PerformanceIcon className={`w-10 h-10 ${performanceFeedback.color} mr-4 flex-shrink-0`} />
                            <div>
                                <h3 className={`text-lg font-bold ${performanceFeedback.color}`}>{performanceFeedback.title}</h3>
                                <p className="text-gray-300 text-sm mt-1">{performanceFeedback.message}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Performance Analysis</h3>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <ResponseTimeChart data={responseTimeData || []} isLoading={isLoadingResponseTimes} />
                                <div className="space-y-6">
                                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/80">
                                        <h4 className="font-semibold text-gray-200 mb-3">Topic Mastery Breakdown</h4>
                                        {isLoadingTopicMastery ? (
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-3/4" />
                                                <Skeleton className="h-4 w-1/2" />
                                                <Skeleton className="h-4 w-3/4" />
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                                <div>
                                                    <div className="flex items-center mb-2">
                                                        <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                                                        <p className="font-semibold text-green-400">Strengths</p>
                                                    </div>
                                                    <div className="space-y-1 text-sm">
                                                        {strengths.length > 0 ? strengths.map(s => (
                                                            <div key={s.topic} className="flex justify-between items-center">
                                                                <span className="text-gray-300 truncate pr-2">{s.topic}</span>
                                                                <span className="font-medium text-green-400">{s.performance}%</span>
                                                            </div>
                                                        )) : <p className="text-gray-400 text-xs">No strong areas identified.</p>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center mb-2">
                                                        <TrendingDown className="w-5 h-5 text-yellow-400 mr-2" />
                                                        <p className="font-semibold text-yellow-400">Improvement Areas</p>
                                                    </div>
                                                    <div className="space-y-1 text-sm">
                                                        {improvements.length > 0 ? improvements.map(i => (
                                                            <div key={i.topic} className="flex justify-between items-center">
                                                                <span className="text-gray-300 truncate pr-2">{i.topic}</span>
                                                                <span className="font-medium text-yellow-400">{i.performance}%</span>
                                                            </div>
                                                        )) : <p className="text-gray-400 text-xs">No improvement areas identified.</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/80">
                                        <div className="flex items-center mb-3">
                                            <Clock className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                                            <p className="font-semibold text-blue-400">Time Investment</p>
                                        </div>
                                        {isLoadingTimeInvestment ? (
                                            <div className="space-y-2 text-sm">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-full" />
                                            </div>
                                        ) : (
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Total Time</span>
                                                    <span className="text-white font-mono">{timeInvestmentData?.totalTime}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Avg. Session</span>
                                                    <span className="text-white font-mono">{timeInvestmentData?.avgSession}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Sessions</span>
                                                    <span className="text-white font-mono">{timeInvestmentData?.sessions}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Viral Scorecard Section */}
                        <div className="mt-6">
                            <ViralScorecard
                                userName="Student"
                                score={score}
                                totalQuestions={parseInt(numQuestions)}
                                mockRank={Math.floor(Math.random() * 1000) + 1}
                                strengths={strengths.map(s => s.topic)}
                                timeTaken={timeTaken}
                            />
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ResultsSummaryCard;
