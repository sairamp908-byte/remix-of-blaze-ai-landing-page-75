import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { BrainCircuit, BookOpen, CheckCircle, XCircle, Clock, Lock, ArrowRight, RotateCw, Download, ArrowLeft, Lightbulb, Trophy, Medal, Rocket, Maximize, X, VolumeX, Volume2, RotateCcw } from 'lucide-react';
import { playTextAsSpeech } from '@/utils/aiSound';
import ResultsSummaryCard from './ResultsSummaryCard';
import QuestionReviewCard from './QuestionReviewCard';
import StudyRoadmapCard from './StudyRoadmapCard';
import StrengthsWeaknessesCard from './StrengthsWeaknessesCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { listTopics, listExamsForTopic, listSubtopicsForTopic, getQuestionsForFreeTrial, submitQuiz } from '@/services/quizApi';
import { ApiQuestion, MockQuestion } from '@/types/quiz';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
type QuizQuestion = MockQuestion & {
  hints?: string[];
};

// This adapter function converts the API question format to the format expected by the UI components.
const adaptApiQuestionToMockFormat = (apiQuestion: ApiQuestion): QuizQuestion => {
  const correctIndex = apiQuestion.options.indexOf(apiQuestion.correct_answer);
  return {
    id: apiQuestion.id,
    question: apiQuestion.question_text,
    answers: apiQuestion.options,
    correct: correctIndex,
    topic: apiQuestion.topic || 'General',
    explanation: apiQuestion.explanation || 'No explanation provided.',
    hints: [apiQuestion.explanation?.split('.')[0] || "No hint available.", "Review the question carefully.", `Consider all options before making a choice.`],
    answerExplanations: apiQuestion.options.map(opt => {
      if (opt === apiQuestion.correct_answer) {
        return `Correct. ${apiQuestion.explanation || ''}`;
      }
      return `Incorrect. The correct answer is ${apiQuestion.correct_answer}.`;
    })
  };
};

// --- Placeholder Sound Files ---
// You'll need to upload these sound files to your public/sounds directory.
const startSound = '/sounds/start.mp3';
const nextQuestionSound = '/sounds/next.mp3';
const submitSound = '/sounds/submit.mp3';
const winSound = '/sounds/win.mp3';
const loseSound = '/sounds/lose.mp3';
const selectSound = '/sounds/select.mp3';

// Updated exam structure
const COUNTRIES = [{
  code: 'IN',
  name: 'India'
}, {
  code: 'US',
  name: 'USA'
}, {
  code: 'GB',
  name: 'UK'
}, {
  code: 'CA',
  name: 'Canada'
}, {
  code: 'AU',
  name: 'Australia'
}, {
  code: 'WW',
  name: 'World Wide Common'
}];
const EXAMS_BY_COUNTRY: Record<string, {
  category: string;
  exams: string[];
}[]> = {
  IN: [{
    category: 'UG',
    exams: ['EAMCET MPC', 'EAMCET BPC', 'EAPCET MPC', 'EAPCET BPC', 'KCET PCM', 'KCET PCB', 'MH CET PCB', 'MHCET PCM', 'JEE Mains', 'JEE Advanced', 'NEET UG']
  }, {
    category: 'GOVT',
    exams: ['UPSC']
  }, {
    category: 'PG',
    exams: ['CAT']
  }],
  US: [{
    category: 'UG',
    exams: ['SAT']
  }, {
    category: 'PG',
    exams: ['GRE', 'IELTS', 'TOEFL', 'GMAT']
  }],
  GB: [{
    category: 'PG',
    exams: ['IELTS', 'TOEFL', 'GRE', 'GMAT']
  }],
  CA: [{
    category: 'UG',
    exams: ['SAT']
  }, {
    category: 'PG',
    exams: ['IELTS', 'TOEFL', 'GRE', 'GMAT']
  }],
  AU: [{
    category: 'UG',
    exams: ['SAT']
  }, {
    category: 'PG',
    exams: ['IELTS', 'GRE', 'GMAT']
  }],
  WW: [{
    category: 'UG',
    exams: ['SAT']
  }, {
    category: 'PG',
    exams: ['IELTS', 'GRE', 'GMAT', 'TOEFL']
  }]
};
const SUBJECTS_BY_EXAM: Record<string, string[]> = {
  'JEE Mains': ['Physics', 'Chemistry', 'Mathematics'],
  'JEE Advanced': ['Physics', 'Chemistry', 'Mathematics'],
  'NEET UG': ['Physics', 'Chemistry', 'Biology'],
  'EAMCET MPC': ['Physics', 'Chemistry', 'Mathematics'],
  'EAMCET BPC': ['Physics', 'Chemistry', 'Biology'],
  'EAPCET MPC': ['Physics', 'Chemistry', 'Mathematics'],
  'EAPCET BPC': ['Physics', 'Chemistry', 'Biology'],
  'KCET PCM': ['Physics', 'Chemistry', 'Mathematics'],
  'KCET PCB': ['Physics', 'Chemistry', 'Biology'],
  'MH CET PCB': ['Physics', 'Chemistry', 'Biology'],
  'MHCET PCM': ['Physics', 'Chemistry', 'Mathematics'],
  'SAT': ['Mathematics', 'Reading', 'Writing'],
  'GRE': ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing'],
  'IELTS': ['Listening', 'Reading', 'Writing', 'Speaking'],
  'TOEFL': ['Reading', 'Listening', 'Speaking', 'Writing'],
  'GMAT': ['Quantitative', 'Verbal', 'Integrated Reasoning', 'Analytical Writing'],
  'CAT': ['Quantitative Ability', 'Verbal Ability', 'Data Interpretation'],
  'UPSC': ['General Studies', 'History', 'Geography', 'Polity', 'Economics', 'Science & Technology']
};
const TOPICS_BY_SUBJECT: Record<string, string[]> = {
  'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics'],
  'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
  'Mathematics': ['Algebra', 'Calculus', 'Geometry', 'Trigonometry', 'Statistics'],
  'Biology': ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Human Physiology'],
  'Reading': ['Reading Comprehension', 'Vocabulary', 'Critical Analysis'],
  'Writing': ['Essay Writing', 'Grammar', 'Sentence Structure'],
  'Verbal Reasoning': ['Text Completion', 'Sentence Equivalence', 'Reading Comprehension'],
  'Quantitative Reasoning': ['Arithmetic', 'Algebra', 'Geometry', 'Data Analysis'],
  'Analytical Writing': ['Issue Task', 'Argument Task'],
  'Listening': ['Academic Listening', 'General Listening'],
  'Speaking': ['Pronunciation', 'Fluency', 'Vocabulary'],
  'Quantitative Ability': ['Number Systems', 'Algebra', 'Geometry', 'Arithmetic'],
  'Verbal Ability': ['Reading Comprehension', 'Para Jumbles', 'Verbal Logic'],
  'Data Interpretation': ['Tables', 'Graphs', 'Charts'],
  'Integrated Reasoning': ['Graphics Interpretation', 'Two-Part Analysis'],
  'General Studies': ['Current Affairs', 'Indian Constitution', 'Indian History'],
  'History': ['Ancient India', 'Medieval India', 'Modern India', 'World History'],
  'Geography': ['Physical Geography', 'Human Geography', 'Indian Geography'],
  'Polity': ['Constitution', 'Governance', 'Public Policy'],
  'Economics': ['Microeconomics', 'Macroeconomics', 'Indian Economy'],
  'Science & Technology': ['Science Basics', 'Technology Trends', 'Space Technology']
};

// --- Dummy Data for Offline Mode ---
const DUMMY_QUESTIONS: QuizQuestion[] = [{
  id: 'dummy-1',
  question: 'In "The Great Gatsby", what does the green light at the end of Daisy\'s dock symbolize?',
  answers: ['Wealth and prosperity', 'Gatsby\'s hopes and dreams for the future', 'Nature and the environment', 'The American Dream'],
  correct: 1,
  topic: 'Literature',
  explanation: 'The green light represents Gatsby\'s deep-seated longing for Daisy and his idealized vision of their future together. It is a symbol of his unattainable dream.',
  hints: ["The light is across the bay from Gatsby's mansion.", "Gatsby often reaches out towards it at night.", "It's connected to a person Gatsby wants to be with."],
  answerExplanations: []
}, {
  id: 'dummy-2',
  question: 'Which planet is known as the Red Planet?',
  answers: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
  correct: 0,
  topic: 'Astronomy',
  explanation: 'Mars is called the Red Planet because of its reddish appearance, which is due to iron oxide (rust) on its surface.',
  hints: ["This planet is the fourth from the Sun.", "It is named after the Roman god of war.", "Its surface is dusty and rocky."],
  answerExplanations: []
}, {
  id: 'dummy-3',
  question: 'What is the capital of Japan?',
  answers: ['Kyoto', 'Osaka', 'Tokyo', 'Hiroshima'],
  correct: 2,
  topic: 'Geography',
  explanation: 'Tokyo is the capital and largest city of Japan. It has been the capital since 1868.',
  hints: ["It was formerly known as Edo.", "It's a major global financial center.", "This city hosted the 2020 Summer Olympics (held in 2021)."],
  answerExplanations: []
}, {
  id: 'dummy-4',
  question: 'Who painted the Mona Lisa?',
  answers: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
  correct: 2,
  topic: 'Art History',
  explanation: 'The Mona Lisa is a world-famous portrait painted by the Italian artist Leonardo da Vinci during the Renaissance.',
  hints: ["He was an Italian polymath of the High Renaissance.", "He also painted 'The Last Supper'.", "His name is associated with inventions and anatomy sketches."],
  answerExplanations: []
}, {
  id: 'dummy-5',
  question: 'What is the primary function of a CPU in a computer?',
  answers: ['Store data long-term', 'Display images on the screen', 'Execute instructions and perform calculations', 'Connect to the internet'],
  correct: 2,
  topic: 'Computer Science',
  explanation: 'The Central Processing Unit (CPU) is the brain of the computer, responsible for processing instructions from software and hardware.',
  hints: ["It is often called the 'brain' of the computer.", "Its speed is measured in gigahertz (GHz).", "Major manufacturers include Intel and AMD."],
  answerExplanations: []
}];
type QuizView = 'scanner' | 'quiz' | 'results';
const QuizGenerator = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [view, setView] = useState<QuizView>('scanner');
  const [isLoading, setIsLoading] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState('analyzing');
  const [country, setCountry] = useState('');
  const [exam, setExam] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [numQuestions, setNumQuestions] = useState('5');
  const [quizId, setQuizId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(120); // Default to 2 mins, will be updated on start
  const [totalTime, setTotalTime] = useState(120);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<any>(null);
  const [selectionMade, setSelectionMade] = useState(false);
  const [dialogData, setDialogData] = useState<{
    title: string;
    content: React.ReactNode;
  } | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [visibleHints, setVisibleHints] = useState<number>(0);
  const [hintsExpanded, setHintsExpanded] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState<Set<number>>(new Set());
  const {
    data: topics,
    isLoading: isLoadingTopics
  } = useQuery({
    queryKey: ['topics'],
    queryFn: listTopics,
    enabled: isConnected
  });
  const {
    data: exams,
    isLoading: isLoadingExams
  } = useQuery({
    queryKey: ['exams', topic],
    queryFn: () => listExamsForTopic(topic),
    enabled: !!topic && isConnected
  });
  const {
    data: subtopics,
    isLoading: isLoadingSubtopics
  } = useQuery({
    queryKey: ['subtopics', topic],
    queryFn: () => listSubtopicsForTopic(topic),
    enabled: !!topic && isConnected
  });
  const score = React.useMemo(() => {
    return userAnswers.reduce((acc, answer, index) => {
      if (questions.length > 0 && answer !== null && questions[index].correct === answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [userAnswers, questions]);
  const percentage = React.useMemo(() => {
    const totalQuestions = parseInt(numQuestions);
    if (totalQuestions === 0) return 0;
    return score / totalQuestions * 100;
  }, [score, numQuestions]);
  const submitQuizMutation = useMutation({
    mutationFn: submitQuiz,
    onSuccess: data => {
      console.log("Quiz submitted successfully", data);
      toast.success("Quiz submitted successfully!");
    },
    onError: (error: Error) => {
      toast.error("Failed to submit quiz", {
        description: error.message
      });
    }
  });
  const handleSubmitQuiz = useCallback(() => {
    if (!quizId) {
      // For free trials, there is no quiz ID, so we skip submission and just show results.
      console.info("Skipping quiz submission as no quiz ID is available (expected for free trial).");
      toast.info("Displaying your results.");
    } else {
      const answersPayload: Record<string, string> = {};
      userAnswers.forEach((answerIndex, questionIndex) => {
        if (answerIndex !== null) {
          const question = questions[questionIndex];
          const answerText = question.answers[answerIndex];
          answersPayload[question.id] = answerText;
        }
      });
      submitQuizMutation.mutate({
        quizId,
        answers: answersPayload,
        feedback: "Great quiz!" // Placeholder feedback
      });
    }
    setView('results');
    playSound(submitSound);
  }, [quizId, userAnswers, questions, submitQuizMutation]);
  const handleSkipQuestion = useCallback(() => {
    // Stop current audio when skipping
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsSpeaking(false);
    }
    
    setSkippedQuestions(prev => new Set(prev).add(currentQuestionIndex));
    setVisibleHints(0);
    setHintsExpanded(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      playSound(nextQuestionSound);
    } else {
      handleSubmitQuiz();
    }
  }, [currentQuestionIndex, questions, handleSubmitQuiz, currentAudio]);

  const handlePreviousQuestion = useCallback(() => {
    // Stop current audio when navigating
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsSpeaking(false);
    }
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setVisibleHints(0);
      setHintsExpanded(false);
      setSelectionMade(userAnswers[currentQuestionIndex - 1] !== null);
    }
  }, [currentQuestionIndex, userAnswers, currentAudio]);

  const handleToggleHints = useCallback(() => {
    const question = questions[currentQuestionIndex];
    if (!question?.hints || question.hints.length === 0) return;
    
    if (!hintsExpanded) {
      // Show hints starting from 1/3
      setHintsExpanded(true);
      setVisibleHints(1);
    } else {
      // Cycle through all available hints, then hide
      if (visibleHints < question.hints.length) {
        setVisibleHints(prev => prev + 1);
      } else {
        // Hide hints
        setHintsExpanded(false);
        setVisibleHints(0);
      }
    }
  }, [questions, currentQuestionIndex, visibleHints, hintsExpanded]);

  const navigateToQuestion = useCallback((questionIndex: number) => {
    // Stop current audio when navigating
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsSpeaking(false);
    }
    
    setCurrentQuestionIndex(questionIndex);
    setVisibleHints(0);
    setHintsExpanded(false);
    setSelectionMade(userAnswers[questionIndex] !== null);
  }, [userAnswers, currentAudio]);
  useEffect(() => {
    if (view === 'quiz' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && view === 'quiz') {
      handleSubmitQuiz();
    }
  }, [view, timeLeft, handleSubmitQuiz]);
  const handleUndoAnswer = useCallback(() => {
    setUserAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = null;
      return newAnswers;
    });
    setSelectionMade(false);
  }, [currentQuestionIndex]);

  const toggleVoice = useCallback(() => {
    if (isVoiceEnabled && currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsSpeaking(false);
    }
    setIsVoiceEnabled(!isVoiceEnabled);
  }, [isVoiceEnabled, currentAudio]);

  const playQuestionAudio = useCallback(async () => {
    if (!isVoiceEnabled || !questions[currentQuestionIndex]) return;
    
    // Stop any existing audio
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    
    const question = questions[currentQuestionIndex];
    const questionText = question.question + " Options: " + question.answers.join(", ");
    
    setIsSpeaking(true);
    
    try {
      // Create audio element for better control
      const audioPromise = playTextAsSpeech(questionText);
      setCurrentAudio({ pause: () => {}, promise: audioPromise });
      
      await audioPromise;
      setIsSpeaking(false);
      setCurrentAudio(null);
    } catch (err) {
      console.error("Error reading question:", err);
      setIsSpeaking(false);
      setCurrentAudio(null);
    }
  }, [isVoiceEnabled, questions, currentQuestionIndex, currentAudio]);

  useEffect(() => {
    if (view === 'quiz' && questions[currentQuestionIndex]) {
      const wasAnswered = userAnswers[currentQuestionIndex] !== null;
      setSelectionMade(wasAnswered);
      
      if (isVoiceEnabled) {
        playQuestionAudio();
      }
    }
  }, [view, currentQuestionIndex, questions, userAnswers, playQuestionAudio]);
  // Remove automatic hint showing - hints will be shown on demand
  useEffect(() => {
    if (isLoading) {
      playTextAsSpeech("Generating your quiz. Please wait a moment.").catch(err => {
        console.error("Error reading loading message:", err);
        toast.error("Could not play loading audio.");
      });
    }
  }, [isLoading]);
  const playSound = (soundSrc: string) => {
    const audio = new Audio(soundSrc);
    audio.play().catch(e => console.error("Error playing sound:", e));
  };
  const startQuizMutation = useMutation({
    mutationFn: getQuestionsForFreeTrial,
    onSuccess: (data: ApiQuestion[]) => {
      if (data.length === 0) {
        toast.error("No questions found for your selection.", {
          description: "Please try different options."
        });
        setIsLoading(false);
        return;
      }
      // The free trial API doesn't provide a quizId, so we set it to null.
      // Quiz submission will be skipped.
      setQuizId(null);
      const adaptedQuestions = data.map(adaptApiQuestionToMockFormat);
      setQuestions(adaptedQuestions);
      setNumQuestions(String(adaptedQuestions.length));
      setCurrentQuestionIndex(0);
      setUserAnswers(new Array(adaptedQuestions.length).fill(null));
      setSkippedQuestions(new Set());
      setVisibleHints(0);
      // Setting duration to 1 minute per question as an example
      const quizDuration = adaptedQuestions.length * 60;
      setTotalTime(quizDuration);
      setTimeLeft(quizDuration);
      setView('quiz');
      setIsLoading(false);
    },
    onError: (error: Error) => {
      toast.error("Failed to generate quiz", {
        description: error.message
      });
      setIsLoading(false);
    }
  });
  const generatePhysicsQuiz = () => {
    // Auto-generate 3 easy, 2 medium, 2 hard physics questions
    const physicsQuestions: QuizQuestion[] = [
    // 3 Easy Questions
    {
      id: 'physics-easy-1',
      question: 'What is the SI unit of force?',
      answers: ['Newton', 'Joule', 'Watt', 'Pascal'],
      correct: 0,
      topic: 'Mechanics',
      explanation: 'The Newton (N) is the SI unit of force, named after Sir Isaac Newton.',
      hints: ["Named after a famous physicist", "It's a fundamental unit in mechanics"],
      answerExplanations: []
    }, {
      id: 'physics-easy-2',
      question: 'What happens to the frequency of a wave when its wavelength increases while the speed remains constant?',
      answers: ['Increases', 'Decreases', 'Remains the same', 'Becomes zero'],
      correct: 1,
      topic: 'Waves',
      explanation: 'When wavelength increases and speed is constant, frequency decreases as v = fλ.',
      hints: ["Think about the wave equation v = fλ", "Speed is constant in this scenario"],
      answerExplanations: []
    }, {
      id: 'physics-easy-3',
      question: 'Which of the following is a vector quantity?',
      answers: ['Speed', 'Distance', 'Velocity', 'Temperature'],
      correct: 2,
      topic: 'Mechanics',
      explanation: 'Velocity is a vector quantity as it has both magnitude and direction.',
      hints: ["Consider which quantities have direction", "Vectors have both magnitude and direction"],
      answerExplanations: []
    },
    // 2 Medium Questions
    {
      id: 'physics-medium-1',
      question: 'A ball is thrown vertically upward with an initial velocity of 20 m/s. What is the maximum height reached? (g = 10 m/s²)',
      answers: ['10 m', '20 m', '30 m', '40 m'],
      correct: 1,
      topic: 'Kinematics',
      explanation: 'Using v² = u² + 2as, at maximum height v = 0, so h = u²/2g = 400/20 = 20 m.',
      hints: ["At maximum height, final velocity is zero", "Use kinematic equation v² = u² + 2as"],
      answerExplanations: []
    }, {
      id: 'physics-medium-2',
      question: 'Two resistors of 4Ω and 6Ω are connected in parallel. What is their equivalent resistance?',
      answers: ['2.4Ω', '10Ω', '5Ω', '1.2Ω'],
      correct: 0,
      topic: 'Electricity',
      explanation: 'For parallel resistors: 1/R = 1/4 + 1/6 = 5/12, so R = 12/5 = 2.4Ω.',
      hints: ["In parallel, reciprocals add", "1/R = 1/R₁ + 1/R₂"],
      answerExplanations: []
    },
    // 2 Hard Questions
    {
      id: 'physics-hard-1',
      question: 'A photon with energy 4.5 eV strikes a metal surface with work function 2.3 eV. What is the maximum kinetic energy of the emitted photoelectron?',
      answers: ['2.2 eV', '4.5 eV', '6.8 eV', '2.3 eV'],
      correct: 0,
      topic: 'Modern Physics',
      explanation: 'By photoelectric equation: KE_max = hf - φ = 4.5 - 2.3 = 2.2 eV.',
      hints: ["Use Einstein's photoelectric equation", "KE_max = photon energy - work function"],
      answerExplanations: []
    }, {
      id: 'physics-hard-2',
      question: 'A satellite orbits Earth at a height where the gravitational field strength is 4 m/s². If Earth\'s radius is R, what is the orbital height in terms of R?',
      answers: ['R/2', 'R', '2R', 'R/4'],
      correct: 1,
      topic: 'Gravitation',
      explanation: 'g = GM/r². At surface g₀ = 10 m/s². So 4 = 10(R/(R+h))². Solving gives h = R.',
      hints: ["Use the relationship g ∝ 1/r²", "Compare with surface gravity"],
      answerExplanations: []
    }];
    return physicsQuestions;
  };
  const startAiScan = () => {
    setView('scanner');
    setScanProgress(0);
    setScanStage('analyzing');

    // Scanning animation sequence
    const scanSequence = [{
      stage: 'analyzing',
      duration: 1500,
      progress: 30
    }, {
      stage: 'processing',
      duration: 1000,
      progress: 60
    }, {
      stage: 'generating',
      duration: 1000,
      progress: 90
    }, {
      stage: 'ready',
      duration: 500,
      progress: 100
    }];
    let currentIndex = 0;
    const runScanStep = () => {
      if (currentIndex < scanSequence.length) {
        const step = scanSequence[currentIndex];
        setScanStage(step.stage);
        setTimeout(() => {
          setScanProgress(step.progress);
          currentIndex++;
          if (currentIndex < scanSequence.length) {
            setTimeout(runScanStep, 200);
          } else {
            // Start the quiz
              setTimeout(() => {
                const questions = generatePhysicsQuiz();
                setQuestions(questions);
                setNumQuestions(String(questions.length));
                setCurrentQuestionIndex(0);
                setUserAnswers(new Array(questions.length).fill(null));
                setSkippedQuestions(new Set());
                setVisibleHints(0);
                const quizDuration = questions.length * 90; // 90 seconds per question
                setTotalTime(quizDuration);
                setTimeLeft(quizDuration);
                setView('quiz');
                playSound(startSound);
            }, 1000);
          }
        }, step.duration);
      }
    };
    runScanStep();
  };
  const handleStartQuiz = () => {
    startAiScan();
  };
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
    setSelectionMade(true);
    playSound(selectSound);
  };
  const handleNextQuestion = () => {
    // Stop current audio when navigating
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsSpeaking(false);
    }
    
    // If no answer is selected, mark as skipped
    if (userAnswers[currentQuestionIndex] === null) {
      setSkippedQuestions(prev => new Set(prev).add(currentQuestionIndex));
    }
    
    setVisibleHints(0);
    setHintsExpanded(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      playSound(nextQuestionSound);
    } else {
      handleSubmitQuiz();
    }
  };
  
  const handleSelectionSpeech = (textToSpeak: string) => {
    setIsSpeaking(true);
    playTextAsSpeech(textToSpeak).catch(err => {
      console.error("Error playing selection audio:", err);
    }).finally(() => {
      setIsSpeaking(false);
    });
  };
  const handleLockedFeature = (feature: string) => {
    playSound(selectSound);
    toast.info(`The "${feature}" feature is coming soon!`, {
      description: "Join our waitlist to get some exciting experiences!",
      duration: 5000,
      action: {
        label: "Join Waitlist",
        onClick: () => {
          const waitlistElement = document.getElementById('waitlist');
          waitlistElement?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  };
  const resetQuiz = () => {
    setView('scanner');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTimeLeft(120);
    setTotalTime(120);
    setCountry('');
    setExam('');
    setSubject('');
    setTopic('');
    setDifficulty('easy');
    setNumQuestions('5');
    setQuestions([]);
    setQuizId(null);
    setScanProgress(0);
    setScanStage('analyzing');
    setIsLoading(false);
    setSelectionMade(false);
    setDialogData(null);
    setVisibleHints(0);
    setSkippedQuestions(new Set());
  };
  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    toast.info("Generating your report PDF...", {
      description: "This might take a few moments."
    });
    const reportElement = document.getElementById('pdf-report-content');
    if (reportElement) {
      try {
        const canvas = await html2canvas(reportElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#030712' // Tailwind's gray-950
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = imgProps.height * pdfWidth / imgProps.width;
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
        while (heightLeft > 0) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
        pdf.save(`Blaize_Quiz_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
        toast.success("Report downloaded successfully!");
      } catch (error) {
        console.error("Error generating PDF:", error);
        toast.error("Failed to generate PDF. Please try again.");
      }
    } else {
      toast.error("Could not find report content to generate PDF.");
    }
    setIsGeneratingPdf(false);
  };

  // Get available exams for selected country
  const getAvailableExams = () => {
    if (!country || !EXAMS_BY_COUNTRY[country]) return [];
    return EXAMS_BY_COUNTRY[country].flatMap(category => category.exams);
  };

  // Get available subjects for selected exam
  const getAvailableSubjects = () => {
    if (!exam || !SUBJECTS_BY_EXAM[exam]) return [];
    return SUBJECTS_BY_EXAM[exam];
  };

  // Get available topics for selected subject
  const getAvailableTopics = () => {
    if (!subject || !TOPICS_BY_SUBJECT[subject]) return [];
    return TOPICS_BY_SUBJECT[subject];
  };
  const renderScannerView = () => {
    // Show welcome screen when not scanning
    if (scanProgress === 0 && scanStage === 'analyzing') {
      return <div className="max-w-4xl mx-auto p-6 min-h-[70vh] flex items-center justify-center">
          <Card className="w-full max-w-2xl p-12 text-center bg-gradient-to-br from-background via-primary/5 to-background border-primary/20 shadow-2xl">
            <div className="space-y-8">
              {/* Static AI Icon */}
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 rounded-full border-4 border-primary/30">
                  <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="absolute inset-4 rounded-full border-2 border-purple-500/50" />
                <div className="absolute inset-8 flex items-center justify-center">
                  <BrainCircuit className="w-12 h-12 text-primary" />
                </div>
              </div>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  🎯 Take today's Physics Challenge
                </h1>
                <p className="text-lg text-muted-foreground">
                  AI-powered quiz that adapts to your brain. No setup required!
                </p>
              </div>

              {/* Quiz Preview Info */}
              

              {/* Start Button */}
              <Button onClick={handleStartQuiz} className="px-12 py-4 text-xl font-bold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-2xl transition-all duration-300 transform hover:scale-105">
                <BrainCircuit className="w-6 h-6 mr-3" />
                Start AI Brain Scan
              </Button>

              {/* Motivational Text */}
              <p className="text-primary font-medium">
                Every question takes you closer to Rank 1! 🚀
              </p>
            </div>
          </Card>
        </div>;
    }

    // Show scanning animation when in progress
    const getScanMessage = () => {
      switch (scanStage) {
        case 'analyzing':
          return 'Analyzing your brain patterns...';
        case 'processing':
          return 'Processing cognitive abilities...';
        case 'generating':
          return 'Generating your personalized quiz...';
        case 'ready':
          return 'Your Rank-1 Quiz is Ready!';
        default:
          return 'Initializing AI scanner...';
      }
    };
    return <div className="max-w-4xl mx-auto p-6 min-h-[70vh] flex items-center justify-center">
        <Card className="w-full max-w-2xl p-12 text-center bg-gradient-to-br from-background via-primary/5 to-background border-primary/20 shadow-2xl">
          <div className="space-y-8">
            {/* AI Scanner Icon with Animation */}
            <div className="relative mx-auto w-32 h-32">
              <div className={cn("absolute inset-0 rounded-full border-4 border-primary/30", scanProgress > 0 && "animate-spin")}>
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className={cn("absolute inset-4 rounded-full border-2 border-purple-500/50", scanProgress > 30 && "animate-pulse")} />
              <div className="absolute inset-8 flex items-center justify-center">
                <BrainCircuit className={cn("w-12 h-12 text-primary transition-all duration-1000", scanProgress > 60 && "text-purple-500 scale-110")} />
              </div>
              {/* Scanning rays */}
              {scanProgress > 0 && <>
                  <div className="absolute top-1/2 left-1/2 w-40 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-45 animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 w-40 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform -translate-x-1/2 -translate-y-1/2 -rotate-45 animate-pulse" />
                </>}
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                🎯 Take today's Physics Challenge
              </h1>
              
              {scanStage === 'ready' && <div className="text-2xl font-bold text-primary animate-pulse">
                  Your Rank-1 Quiz is Ready! 🏆
                </div>}
            </div>

            {/* Scanning Progress */}
            <div className="space-y-4">
              <div className="text-lg font-medium text-foreground">
                {getScanMessage()}
              </div>
              
              <div className="relative">
                <Progress value={scanProgress} className="h-3 bg-muted" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-full animate-pulse" />
              </div>
              
              <div className="text-sm text-muted-foreground">
                {scanProgress}% Complete
              </div>
            </div>

            {/* Quiz Preview Info */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-primary/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">3</div>
                <div className="text-sm text-muted-foreground">Easy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">2</div>
                <div className="text-sm text-muted-foreground">Medium</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">2</div>
                <div className="text-sm text-muted-foreground">Hard</div>
              </div>
            </div>

            {/* Motivational Messages */}
            <div className="space-y-2 text-sm text-muted-foreground">
              {scanStage === 'analyzing' && <p className="animate-fade-in">🧠 Calibrating difficulty to your cognitive level...</p>}
              {scanStage === 'processing' && <p className="animate-fade-in">⚡ Optimizing questions for maximum learning...</p>}
              {scanStage === 'generating' && <p className="animate-fade-in">🎯 Crafting your path to Rank-1...</p>}
              {scanStage === 'ready' && <p className="text-primary font-medium animate-pulse">
                  Every question takes you closer to Rank 1! 🚀
                </p>}
            </div>
          </div>
        </Card>
      </div>;
  };
  const renderConfigView = () => {
    const isPremiumSelected = difficulty === 'final' || numQuestions === '25';
    return <Card className="w-full max-w-4xl mx-auto bg-slate-900/50 border-2 border-purple-500/30 shadow-2xl shadow-[0_0_30px_-10px_theme(colors.purple.500/50)] backdrop-blur-sm">
                <CardHeader className="text-center p-8">
                    <CardTitle className="font-heading text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-blue-400 sm:text-4xl py-0">
                        Your Personalized AI Quiz Experience
                    </CardTitle>
                    <CardDescription className="text-muted-foreground pt-2 max-w-2xl mx-auto text-base">
                        Leverage our advanced AI to generate quizzes tailored to your study needs. Select your country, exam, subject, and topic to get started.
                    </CardDescription>
                    <div className="flex items-center justify-center space-x-3 pt-4">
                        <Label htmlFor="connect-platform" className="text-gray-300 font-medium">
                            {isConnected ? "Live Mode" : "Offline Mode"}
                        </Label>
                        <Switch id="connect-platform" checked={isConnected} onCheckedChange={setIsConnected} />
                        {isConnected && <Badge variant="outline" className="border-green-500 text-green-500 animate-pulse">Connected</Badge>}
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 pt-0">
                    <div className="space-y-2 bg-slate-800/50 p-4 border border-slate-700 rounded-2xl px-[15px]">
                        <label className="text-sm font-medium text-gray-300 flex items-center"><BrainCircuit className="mr-2" /> Country</label>
                        <Select value={country} onValueChange={c => {
            setCountry(c);
            setExam('');
            setSubject('');
            setTopic('');
            handleSelectionSpeech(`Country: ${COUNTRIES.find(co => co.code === c)?.name}`);
          }}>
                            <SelectTrigger><SelectValue placeholder="Select Country" /></SelectTrigger>
                            <SelectContent>
                                {COUNTRIES.map(c => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 bg-slate-800/50 p-4 border border-slate-700 rounded-2xl">
                        <label className="text-sm font-medium text-gray-300 flex items-center"><BookOpen className="mr-2" /> Exam</label>
                        <Select value={exam} onValueChange={e => {
            setExam(e);
            setSubject('');
            setTopic('');
            handleSelectionSpeech(`Exam: ${e}`);
          }} disabled={!country}>
                            <SelectTrigger><SelectValue placeholder="Select Exam" /></SelectTrigger>
                            <SelectContent>
                                {getAvailableExams().map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 bg-slate-800/50 p-4 border border-slate-700 rounded-2xl">
                        <label className="text-sm font-medium text-gray-300">Subject</label>
                        <Select value={subject} onValueChange={s => {
            setSubject(s);
            setTopic('');
            handleSelectionSpeech(`Subject: ${s}`);
          }} disabled={!exam}>
                            <SelectTrigger><SelectValue placeholder="Select Subject" /></SelectTrigger>
                            <SelectContent>
                                {getAvailableSubjects().map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 bg-slate-800/50 p-4 border border-slate-700 rounded-2xl">
                        <label className="text-sm font-medium text-gray-300">Topic</label>
                        <Select value={topic} onValueChange={t => {
            setTopic(t);
            handleSelectionSpeech(`Topic: ${t}`);
          }} disabled={!subject}>
                            <SelectTrigger><SelectValue placeholder="Select Topic" /></SelectTrigger>
                            <SelectContent>
                                {getAvailableTopics().map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 bg-slate-800/50 p-4 border border-slate-700 rounded-2xl">
                        <label className="text-sm font-medium text-gray-300">Difficulty</label>
                         <Select value={difficulty} onValueChange={d => {
            setDifficulty(d);
            if (d !== 'final') {
              handleSelectionSpeech(`Difficulty set to ${d}`);
            }
          }}>
                            <SelectTrigger><SelectValue placeholder="Select Difficulty" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="final" onSelect={() => {
                handleLockedFeature('Final Exam Simulation');
              }} className="text-muted-foreground/80">
                                    <div className="flex items-center justify-between w-full">Final Exam Simulation <Lock className="w-3.5 h-3.5" /></div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 bg-slate-800/50 p-4 border border-slate-700 rounded-2xl">
                        <label className="text-sm font-medium text-gray-300">Questions</label>
                         <Select value={numQuestions} onValueChange={n => {
            setNumQuestions(n);
            if (n !== '25') {
              handleSelectionSpeech(`${n} Questions`);
            }
          }}>
                            <SelectTrigger><SelectValue placeholder="No. of Questions" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5 Questions</SelectItem>
                                <SelectItem value="10">10 Questions</SelectItem>
                                 <SelectItem value="25" onSelect={() => {
                handleLockedFeature('25 Questions');
              }} className="text-muted-foreground/80">
                                    <div className="flex items-center justify-between w-full">25 Questions <Lock className="w-3.5 h-3.5" /></div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="p-6">
                    <Button onClick={isPremiumSelected ? () => handleLockedFeature('Starting a quiz with premium options') : handleStartQuiz} disabled={startQuizMutation.isPending} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 py-0 text-xl font-bold rounded-xl">
                        {startQuizMutation.isPending ? <>
                                <RotateCw className="mr-2 animate-spin" /> Forging Quiz...
                            </> : isPremiumSelected ? <>
                                Unlock with Premium <Lock className="ml-2" />
                            </> : <>
                                Start Quiz <ArrowRight className="ml-2" />
                            </>}
                    </Button>
                </CardFooter>
            </Card>;
  };
  const renderQuizView = () => {
    if (questions.length === 0) {
      return <Card className="w-full max-w-2xl mx-auto bg-background/50 border-purple-500/20 shadow-2xl flex flex-col items-center justify-center p-12 text-center">
                    <CardTitle className="font-heading text-2xl sm:text-3xl font-bold text-gray-200">Loading Question...</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground mt-2">Please wait a moment.</CardDescription>
                </Card>;
    }
    const question = questions[currentQuestionIndex];
    const progress = (currentQuestionIndex + 1) / questions.length * 100;
    return <div className="w-full max-w-6xl mx-auto animate-fade-in">
                <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                    <p className="font-medium text-gray-300 capitalize hidden sm:block">{exam} Quiz &gt; {subject} &gt; {topic}</p>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                        <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
                        <div className="flex items-center gap-2 font-mono text-base sm:text-lg rounded-md px-3 py-1 bg-blue-900/30 text-blue-300">
                            <Clock className="w-5 h-5" /> {Math.floor(timeLeft / 60)}:{('0' + timeLeft % 60).slice(-2)}
                        </div>
                    </div>
                </div>

                <Progress value={progress} className="h-2.5 mb-6" />

                <div className="flex gap-6">
                    {/* Main Question Card */}
                    <div className="flex-1">

                <Card className="w-full bg-slate-900/80 border-blue-500/10 shadow-2xl">
                     <CardHeader className="p-4 md:p-6">
                         <div className="flex flex-wrap gap-2 mb-4 justify-between items-start">
                             <div className="flex gap-2">
                                 <span className="inline-block bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full capitalize">{difficulty}</span>
                                 <span className="inline-block bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full capitalize">{question.topic}</span>
                             </div>
                             <Button
                                 variant="ghost"
                                 size="sm"
                                 onClick={toggleVoice}
                                 className="text-gray-400 hover:text-white"
                             >
                                 {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                             </Button>
                         </div>
                         <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-100 leading-tight">{question.question}</CardTitle>
                     </CardHeader>

                    <CardContent className="p-4 md:p-6 pt-0">
                        <div className="flex flex-col space-y-3">
                            {question.answers.map((answer, index) => {
              const isSelected = userAnswers[currentQuestionIndex] === index;
              let buttonClass = 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 hover:border-blue-500';
              if (isSelected) {
                buttonClass = 'bg-blue-500/20 border-blue-500 text-white ring-2 ring-blue-500/50';
              }
                      return <Button key={index} variant="outline" className={`justify-between items-center text-left h-auto py-4 px-5 text-base sm:text-lg rounded-lg transition-all duration-300 transform-gpu ${buttonClass}`} onClick={() => handleAnswerSelect(index)}>
                                         <span className="flex-grow pr-4">{answer}</span>
                                     </Button>;
            })}
                        </div>
                    </CardContent>
                    
                     {question.hints && question.hints.length > 0 && (
                         <div className="px-4 md:px-6 pb-4 md:pb-6 space-y-3">
                             <Button 
                                 variant="outline" 
                                 onClick={handleToggleHints}
                                 className="border-orange-400/30 text-orange-300 hover:bg-orange-400/10"
                             >
                                 <Lightbulb className="w-4 h-4 mr-2" />
                                  {!hintsExpanded ? `Show Hints 1/${question.hints.length}` : 
                                   visibleHints < question.hints.length ? `Show Hints ${visibleHints + 1}/${question.hints.length}` : 'Hide Hints'}
                             </Button>
                             {hintsExpanded && visibleHints > 0 && (
                                 <div className="p-4 rounded-lg bg-orange-400/10 border border-orange-400/30 space-y-2 animate-fade-in">
                                     <h4 className="font-bold text-orange-300 flex items-center">
                                         <Lightbulb className="w-4 h-4 mr-2" />Hints ({visibleHints}/{question.hints.length})
                                     </h4>
                                     {question.hints.slice(0, visibleHints).map((hint, i) => (
                                         <p key={i} className="text-gray-300 animate-fade-in pl-6">{i + 1}. {hint}</p>
                                     ))}
                                 </div>
                             )}
                         </div>
                     )}
                    
                    <CardFooter className="bg-slate-900/50 p-4 flex justify-between items-center border-t border-blue-500/10">
                        <Button 
                            variant="ghost" 
                            className="text-gray-400 hover:text-white hidden md:flex" 
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                         <div className="flex gap-2 sm:gap-4 w-full md:w-auto">
                             {userAnswers[currentQuestionIndex] !== null && (
                                 <Button 
                                     variant="outline" 
                                     className="border-yellow-600 text-yellow-300 hover:bg-yellow-700 hover:text-white flex-1 md:flex-none" 
                                     onClick={handleUndoAnswer}
                                 >
                                     <RotateCcw className="w-4 h-4 mr-2" />
                                     Undo
                                 </Button>
                             )}
                             <Button onClick={handleNextQuestion} className="bg-blue-600 hover:bg-blue-700 text-white flex-1 md:flex-none">
                                 {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next Question'} <ArrowRight className="ml-2" />
                             </Button>
                         </div>
                    </CardFooter>
                     </Card>
                     </div>
                     
                     {/* Question Navigation Panel - Right Side */}
                     <div className="hidden lg:block w-20 flex-shrink-0">
                         <div className="sticky top-4">
                             <div className="text-center mb-4">
                                 <h3 className="text-sm font-bold text-gray-300 mb-2">Questions</h3>
                             </div>
                             <div className="grid grid-cols-1 gap-2">
                                 {questions.map((_, index) => {
                                     const isAnswered = userAnswers[index] !== null;
                                     const isSkipped = skippedQuestions.has(index);
                                     const isCurrent = index === currentQuestionIndex;
                                     
                                     let buttonClass = 'w-10 h-10 text-xs font-bold transition-all duration-200 rounded-lg border-2';
                                     
                                     if (isAnswered) {
                                         buttonClass += ' bg-green-500 border-green-400 text-white hover:bg-green-600';
                                     } else if (isSkipped) {
                                         buttonClass += ' bg-blue-500 border-blue-400 text-white hover:bg-blue-600';
                                     } else {
                                         buttonClass += ' bg-red-500 border-red-400 text-white hover:bg-red-600';
                                     }
                                     
                                     if (isCurrent) {
                                         buttonClass += ' ring-2 ring-white/50 scale-110';
                                     }
                                     
                                     return (
                                         <button
                                             key={index}
                                             className={buttonClass}
                                             onClick={() => navigateToQuestion(index)}
                                         >
                                             {index + 1}
                                         </button>
                                     );
                                 })}
                             </div>
                         </div>
                     </div>
                 </div>
            </div>;
  };
  const renderResultsView = ({
    isMaximized = false
  }: {
    isMaximized?: boolean;
  }) => {
    const timeTaken = totalTime - timeLeft;
    const questionsForReview = questions;
    const pdfReportId = "pdf-report-content";
    const getResultIcon = () => {
      if (percentage >= 80) return <Trophy className="w-12 h-12 text-yellow-400 drop-shadow-[0_2px_4px_rgba(250,204,21,0.5)]" />;
      if (percentage >= 50) return <Medal className="w-12 h-12 text-slate-300 drop-shadow-[0_2px_4px_rgba(203,213,225,0.5)]" />;
      return <Rocket className="w-12 h-12 text-blue-400 drop-shadow-[0_2px_4px_rgba(96,165,250,0.5)]" />;
    };
    return <div className="space-y-8 animate-fade-in container mx-auto py-8">
                <div className="text-center space-y-3">
                    {getResultIcon()}
                    <h1 className="font-heading text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Your Battle Report</h1>
                    <p className="text-lg text-muted-foreground pt-2 max-w-2xl mx-auto">An analysis of your performance. Use these insights to conquer your next challenge.</p>
                </div>
                
                {isMaximized ? <div className="space-y-8">
                        <ResultsSummaryCard score={score} numQuestions={numQuestions} timeTaken={timeTaken} userAnswers={userAnswers} questions={questionsForReview} />
                        <StrengthsWeaknessesCard questions={questionsForReview} userAnswers={userAnswers} />
                        <QuestionReviewCard questions={questionsForReview} userAnswers={userAnswers} />
                        <StudyRoadmapCard />
                    </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                        <ResultsSummaryCard isPreview onMaximize={() => setDialogData({
          title: "Performance Summary",
          content: <ResultsSummaryCard score={score} numQuestions={numQuestions} timeTaken={timeTaken} userAnswers={userAnswers} questions={questionsForReview} />
        })} score={score} numQuestions={numQuestions} timeTaken={timeTaken} userAnswers={userAnswers} questions={questionsForReview} />
                        <StrengthsWeaknessesCard isPreview onMaximize={() => setDialogData({
          title: "Strengths & Weaknesses",
          content: <StrengthsWeaknessesCard questions={questionsForReview} userAnswers={userAnswers} />
        })} questions={questionsForReview} userAnswers={userAnswers} />
                        <QuestionReviewCard isPreview onMaximize={() => setDialogData({
          title: "Question Review",
          content: <QuestionReviewCard questions={questionsForReview} userAnswers={userAnswers} />
        })} questions={questionsForReview} userAnswers={userAnswers} />
                        <StudyRoadmapCard isPreview onMaximize={() => setDialogData({
          title: "Personalized 5-Week Roadmap",
          content: <StudyRoadmapCard />
        })} />
                    </div>}


                <div className="text-center pt-4 flex justify-center items-center gap-4">
                     <Button onClick={resetQuiz} variant="outline" className="bg-transparent hover:bg-white/10 text-gray-300 hover:text-white">
                        <RotateCw className="mr-2 w-4 h-4" /> Try Another Quiz
                    </Button>
                    <Button onClick={handleDownloadPdf} variant="default" className="bg-green-600 hover:bg-green-700 text-white" disabled={isGeneratingPdf}>
                        {isGeneratingPdf ? <RotateCw className="mr-2 w-4 h-4 animate-spin" /> : <Download className="mr-2 w-4 h-4" />}
                        {isGeneratingPdf ? 'Generating...' : 'Download Report'}
                    </Button>
                </div>

                {/* Hidden content for PDF generation */}
                <div className="absolute -left-[9999px] top-0 w-[1024px] p-8 bg-gray-950 text-white" aria-hidden="true">
                    <div id={pdfReportId} className="space-y-8">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-white">Quiz Performance Report</h1>
                            <p className="text-lg text-gray-300">Generated by Blaize AI on {new Date().toLocaleDateString()}</p>
                        </div>
                        <ResultsSummaryCard score={score} numQuestions={numQuestions} timeTaken={timeTaken} userAnswers={userAnswers} questions={questionsForReview} />
                        <StrengthsWeaknessesCard questions={questionsForReview} userAnswers={userAnswers} isExpandedForPdf />
                        <QuestionReviewCard questions={questionsForReview} userAnswers={userAnswers} isExpandedForPdf />
                        <StudyRoadmapCard isExpandedForPdf />
                    </div>
                </div>
            </div>;
  };
  const renderLoadingView = () => <Card className="w-full max-w-2xl mx-auto bg-background/50 border-purple-500/20 shadow-2xl flex flex-col items-center justify-center p-12 text-center animate-fade-in">
            <RotateCw className="w-16 h-16 text-purple-400 animate-spin mb-6" />
            <CardTitle className="font-heading text-2xl sm:text-3xl font-bold text-gray-200">Generating Your Quiz...</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
                Our AI is working on a personalized quiz just for you. Please wait a moment.
            </CardDescription>
        </Card>;
  return <section id="quiz-generator" className={cn("scroll-mt-28", isMaximized ? "fixed inset-0 bg-gray-950 z-50 overflow-y-auto" : "relative container mx-auto py-12 sm:py-16")}>
             <div className={cn("h-full", isMaximized && "container mx-auto py-8")}>
                {!isMaximized && <Button variant="ghost" size="icon" onClick={() => setIsMaximized(true)} className="absolute top-4 right-4 z-10 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200">
                        <Maximize className="w-5 h-5" />
                        <span className="sr-only">Maximize</span>
                    </Button>}
                {isMaximized && <Button variant="ghost" size="icon" onClick={() => setIsMaximized(false)} className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                        <span className="sr-only">Close</span>
                    </Button>}
                
                <div className={cn(isMaximized && "h-full")}>
                    {isLoading ? renderLoadingView() : <>
                            {view === 'scanner' && renderScannerView()}
                            {view === 'quiz' && renderQuizView()}
                            {view === 'results' && renderResultsView({
            isMaximized
          })}
                        </>}
                </div>
            </div>

            <Dialog open={!!dialogData} onOpenChange={isOpen => {
      if (!isOpen) setDialogData(null);
    }}>
                <DialogContent className="max-w-4xl w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl h-[90vh] flex flex-col bg-background/90 backdrop-blur-sm border-purple-500/20">
                    <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <DialogTitle className="text-2xl">{dialogData?.title}</DialogTitle>
                        <Button variant="ghost" size="icon" onClick={() => setDialogData(null)} className="text-gray-400 hover:text-white">
                            <X className="w-5 h-5" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </DialogHeader>
                    <div className="flex-grow overflow-y-auto -mr-6 pr-6 py-4">
                        {dialogData?.content}
                    </div>
                </DialogContent>
            </Dialog>
        </section>;
};
export default QuizGenerator;