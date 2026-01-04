import { z } from 'zod';

export const ApiQuestionSchema = z.object({
    id: z.string(),
    question_type: z.string().optional(),
    question_text: z.string(),
    options: z.array(z.string()),
    subject: z.string().optional(),
    topic: z.string().optional(),
    sub_topic: z.string().optional(),
    difficulty_label: z.string().optional(),
    explanation: z.string().optional(),
    correct_answer: z.string(),
    final_answer_in_explanation: z.string().optional(),
    discard: z.boolean().optional(),
    hints: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    average_time_to_solve: z.number().optional(),
    estimated_correct_percentage: z.number().optional(),
    estimated_difficulty_percentage: z.number().optional(),
    previous_year_reference: z.string().optional(),
    conceptual_analytics: z.object({
        concepts: z.array(z.string()),
        difficulty_factors: z.array(z.string()),
    }).optional(),
    generator: z.string().optional(),
    exam: z.string().optional(),
});

export type ApiQuestion = z.infer<typeof ApiQuestionSchema>;

// This interface matches the structure of the old mock questions.
// We'll adapt API responses to this format for compatibility with existing components.
export interface MockQuestion {
    id: string;
    question: string;
    answers: string[];
    correct: number;
    topic: string;
    explanation: string;
    answerExplanations: string[];
}
