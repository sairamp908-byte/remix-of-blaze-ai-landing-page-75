
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, XCircle, Maximize, HelpCircle, User, ListChecks, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

interface Question {
    question: string;
    answers: string[];
    correct: number;
    explanation: string;
    answerExplanations?: string[];
}

interface QuestionReviewCardProps {
    questions: Question[];
    userAnswers: (number | null)[];
    isPreview?: boolean;
    onMaximize?: () => void;
    isExpandedForPdf?: boolean;
}

const QuestionReviewCard = ({ questions, userAnswers, isPreview, onMaximize, isExpandedForPdf }: QuestionReviewCardProps) => {
    const correctAnswers = userAnswers.reduce((acc, answer, index) => {
        if (answer !== null && questions[index] && answer === questions[index].correct) {
            return acc + 1;
        }
        return acc;
    }, 0);
    const totalQuestions = questions.length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const allItemValues = questions.map((_, index) => `item-${index}`);

    const accordionProps = isExpandedForPdf
        ? {
            type: "multiple" as const,
            defaultValue: allItemValues,
          }
        : {
            type: "single" as const,
            collapsible: true,
          };

    return (
        <Card className="h-full bg-background/50 border-purple-500/10 flex flex-col">
            <CardHeader>
                 <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Question Review</CardTitle>
                        <CardDescription>Detailed breakdown of each question.</CardDescription>
                        {isPreview && <p className="text-xs text-muted-foreground mt-1">Click to view detailed review</p>}
                    </div>
                    {isPreview && onMaximize && (
                        <Button variant="ghost" size="icon" onClick={onMaximize} className="-mt-2 -mr-2">
                            <Maximize className="w-5 h-5" />
                        </Button>
                    )}
                </div>
            </CardHeader>
            {isPreview ? (
                <CardContent className="flex-grow flex flex-col justify-center items-start p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                        <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                        <div>
                            <p className="text-2xl font-bold text-white">{correctAnswers}</p>
                            <p className="text-sm text-gray-400">Correct Answers</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                        <div>
                            <p className="text-2xl font-bold text-white">{incorrectAnswers}</p>
                            <p className="text-sm text-gray-400">Incorrect / Unanswered</p>
                        </div>
                    </div>
                </CardContent>
            ) : (
                <CardContent className="flex-grow">
                    <Accordion {...accordionProps} className="w-full">
                        {questions.map((q, index) => {
                            const userAnswer = userAnswers[index];
                            const isCorrect = userAnswer === q.correct;
                            return (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>
                                        <div className="flex items-center text-left w-full">
                                            {isCorrect ? <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />}
                                            <span className="flex-grow font-semibold">Question {index + 1}</span>
                                            <span className="text-sm text-gray-400 ml-2 font-normal hidden md:block truncate max-w-xs">{q.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4 pt-4 border-l-2 border-purple-500/30 pl-6 ml-2">
                                        <p className="flex items-start font-semibold text-gray-200"><HelpCircle className="w-5 h-5 mr-3 mt-1 text-blue-400 flex-shrink-0" />{q.question}</p>
                                        
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-gray-400 text-sm flex items-center"><User className="w-4 h-4 mr-2" />Your Answer:</h4>
                                            <div className={`flex items-start p-3 rounded-md text-white ${isCorrect ? 'bg-green-900/50 border border-green-500/30' : 'bg-red-900/50 border border-red-500/30'}`}>
                                                {isCorrect ? <CheckCircle className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-0.5" />}
                                                <span>{userAnswer !== null ? q.answers[userAnswer] : 'Not Answered'}</span>
                                            </div>
                                        </div>

                                        {!isCorrect && userAnswer !== null && (
                                            <div className="space-y-2">
                                                <h4 className="font-bold text-gray-400 text-sm flex items-center"><ListChecks className="w-4 h-4 mr-2 text-green-400" />Correct Answer:</h4>
                                                <div className="flex items-start p-3 rounded-md text-white bg-green-900/50 border border-green-500/30">
                                                    <CheckCircle className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-0.5" />
                                                    <p>{q.answers[q.correct]}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <h4 className="font-bold text-gray-400 text-sm flex items-center"><BookOpen className="w-4 h-4 mr-2" />Explanation:</h4>
                                            <div className="p-3 rounded-md bg-slate-800/50 border-gray-700/50">
                                                <p className="text-sm text-gray-300">{q.explanation}</p>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </CardContent>
            )}
        </Card>
    );
};

export default QuestionReviewCard;
