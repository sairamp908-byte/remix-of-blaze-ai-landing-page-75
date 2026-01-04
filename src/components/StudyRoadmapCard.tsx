import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link, Maximize, BookOpen, Target, Repeat, TrendingUp, Award } from 'lucide-react';
import { Button } from "./ui/button";

const roadmapData = [
    {
        week: 1,
        title: "Foundation & Core Concepts",
        details: "Focus on understanding the fundamental principles of the identified weak areas. Solidify your base knowledge.",
        icon: BookOpen,
        color: "text-sky-400",
        borderColor: "border-sky-500/30",
        bgColor: "bg-sky-900/20",
        resources: [
            { name: "Khan Academy", link: "https://www.khanacademy.org/" },
            { name: "Coursera Foundational Courses", link: "https://www.coursera.org/" },
        ]
    },
    {
        week: 2,
        title: "Deep Dive & Application",
        details: "Move from theory to practice. Work through examples and case studies related to your weak topics.",
        icon: Target,
        color: "text-teal-400",
        borderColor: "border-teal-500/30",
        bgColor: "bg-teal-900/20",
        resources: [
            { name: "Quizlet Flashcards", link: "https://quizlet.com/" },
            { name: "YouTube Tutorials (e.g., CrashCourse)", link: "https://www.youtube.com/user/crashcourse" },
        ]
    },
    {
        week: 3,
        title: "Practice & Reinforcement",
        details: "Take practice quizzes and tests focusing specifically on your areas for improvement. Repetition is key.",
        icon: Repeat,
        color: "text-amber-400",
        borderColor: "border-amber-500/30",
        bgColor: "bg-amber-900/20",
        resources: [
            { name: "Practice Problems on LeetCode (for tech)", link: "https://leetcode.com/" },
            { name: "Subject-specific forums (e.g., Stack Exchange)", link: "https://stackexchange.com/" },
        ]
    },
    {
        week: 4,
        title: "Advanced Topics & Integration",
        details: "Begin to connect concepts from your strong and weak areas. Understand how they integrate in complex scenarios.",
        icon: TrendingUp,
        color: "text-rose-400",
        borderColor: "border-rose-500/30",
        bgColor: "bg-rose-900/20",
        resources: [
            { name: "Read research papers on ArXiv", link: "https://arxiv.org/" },
            { name: "Follow industry experts on LinkedIn/Twitter", link: "#" },
        ]
    },
    {
        week: 5,
        title: "Final Review & Exam Simulation",
        details: "Simulate exam conditions. Take full-length practice exams and review your performance to build confidence.",
        icon: Award,
        color: "text-indigo-400",
        borderColor: "border-indigo-500/30",
        bgColor: "bg-indigo-900/20",
        resources: [
            { name: "Generate more quizzes with our tool!", link: "#" },
            { name: "Form a study group for peer review", link: "#" },
        ]
    }
];


interface StudyRoadmapCardProps {
    isPreview?: boolean;
    onMaximize?: () => void;
    isExpandedForPdf?: boolean;
}

const StudyRoadmapCard = ({ isPreview, onMaximize, isExpandedForPdf }: StudyRoadmapCardProps) => {
    const allItemValues = roadmapData.map((_, index) => `item-${index}`);
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
        <Card className={`bg-background/50 border-purple-500/10 flex flex-col ${isExpandedForPdf ? 'border-none shadow-none' : 'h-full'}`}>
            <CardHeader>
                 <div className="flex justify-between items-start">
                     <div>
                         <CardTitle>Personalized 5-Week Roadmap</CardTitle>
                         <CardDescription>A suggested plan to master the material.</CardDescription>
                         {isPreview && <p className="text-xs text-muted-foreground mt-1">Click to view detailed roadmap</p>}
                     </div>
                     {isPreview && onMaximize && (
                         <Button variant="ghost" size="icon" onClick={onMaximize} className="-mt-2 -mr-2">
                             <Maximize className="w-5 h-5" />
                         </Button>
                     )}
                 </div>
            </CardHeader>
            {isPreview ? (
                <CardContent className="flex-grow flex flex-col justify-center p-6 space-y-3">
                    <p className="text-gray-400 text-sm font-semibold">Your 5-week plan includes:</p>
                    <ul className="space-y-2">
                        {roadmapData.slice(0, 3).map(item => {
                            const Icon = item.icon;
                            return (
                                <li key={item.week} className="flex items-center text-gray-300">
                                    <Icon className={`w-4 h-4 mr-3 ${item.color} flex-shrink-0`} />
                                    <span>
                                        <span className="font-semibold text-gray-200">Week {item.week}:</span> {item.title}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="text-gray-400 text-sm pt-2">...and more to guide your study.</p>
                </CardContent>
            ) : (
                <CardContent className="flex-grow p-6">
                    <div className="relative">
                        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-700/50 rounded" aria-hidden="true" />
                         <Accordion {...accordionProps} className="w-full">
                            {roadmapData.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <AccordionItem value={`item-${index}`} key={index} className="border-none not-last:mb-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="relative z-10 flex-shrink-0">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.bgColor} border-2 ${item.borderColor}`}>
                                                    <Icon className={`w-5 h-5 ${item.color}`} />
                                                </div>
                                            </div>
                                            <div className="flex-1 -mt-1.5 w-0">
                                                <AccordionTrigger className="hover:bg-transparent p-0 hover:no-underline justify-start group">
                                                    <div className="text-left">
                                                        <span className="font-semibold text-gray-200 group-hover:text-white transition-colors">Week {item.week}:</span>
                                                        <span className="text-gray-300 ml-2 group-hover:text-gray-200 transition-colors">{item.title}</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                                    <div className="pt-4">
                                                        <div className={`p-4 rounded-lg ${item.bgColor} border ${item.borderColor}`}>
                                                            <p className="text-sm text-gray-300">{item.details}</p>
                                                            <div className="mt-4">
                                                                <h4 className="font-bold text-gray-400 text-sm mb-2">Suggested Resources:</h4>
                                                                <ul className="space-y-2">
                                                                    {item.resources.map(res => (
                                                                        <li key={res.name}>
                                                                            <a href={res.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-400 hover:text-blue-300 hover:underline">
                                                                                <Link className="w-3.5 h-3.5 mr-2" />
                                                                                {res.name}
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </div>
                                        </div>
                                    </AccordionItem>
                                );
                            })}
                         </Accordion>
                     </div>
                </CardContent>
            )}
        </Card>
    );
};

export default StudyRoadmapCard;
