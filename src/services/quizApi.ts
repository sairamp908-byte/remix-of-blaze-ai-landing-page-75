import { z } from 'zod';
import { toast } from "sonner";
import { ApiQuestion, ApiQuestionSchema } from '@/types/quiz';

const API_BASE_URL = "http://localhost:8000/quiz";

// The free trial API returns an array of questions directly.
const FreeTrialQuestionsResponseSchema = z.array(ApiQuestionSchema);

const fetchApi = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown API error occurred' }));
        throw new Error(errorData.detail || errorData.message || `Request failed with status ${response.status}`);
    }
    // For POST requests that might not have a body, we can return a success indicator
    if (response.status === 200 && options?.method === 'POST') {
        try {
            return await response.json();
        } catch (e) {
            return { success: true };
        }
    }
    return response.json();
};

export const listTopics = async (): Promise<string[]> => {
    try {
        const data = await fetchApi(`${API_BASE_URL}/topics/`);
        return z.object({ topics: z.array(z.string()) }).parse(data).topics;
    } catch (error) {
        console.error(`Failed to fetch topics:`, error);
        toast.error(`Could not load topics.`);
        return [];
    }
};

export const listExamsForTopic = async (topic: string): Promise<string[]> => {
    if (!topic) return [];
    try {
        const data = await fetchApi(`${API_BASE_URL}/exams-for-topic/?topic=${encodeURIComponent(topic)}`);
        return z.object({ exams: z.array(z.string()) }).parse(data).exams;
    } catch (error) {
        console.error(`Failed to fetch exams for topic ${topic}:`, error);
        toast.error(`Could not load exams for ${topic}.`);
        return [];
    }
};

export const listSubtopicsForTopic = async (topic: string): Promise<string[]> => {
    if (!topic) return [];
    try {
        const data = await fetchApi(`${API_BASE_URL}/subtopics/?topic=${encodeURIComponent(topic)}`);
        return z.object({ subtopics: z.array(z.string()) }).parse(data).subtopics;
    } catch (error) {
        console.error(`Failed to fetch subtopics for topic ${topic}:`, error);
        toast.error(`Could not load subtopics for ${topic}.`);
        return [];
    }
};

export const getQuestionsForFreeTrial = async (params: { topic: string; difficulty: string; exam: string; }): Promise<ApiQuestion[]> => {
    const { topic, difficulty, exam } = params;
    const url = new URL(`${API_BASE_URL}/questions/free-trial/`);
    url.searchParams.append('topic', topic);
    url.searchParams.append('difficulty', difficulty);
    url.searchParams.append('exam', exam);
    
    const data = await fetchApi(url.toString());
    const parsedData = FreeTrialQuestionsResponseSchema.parse(data);

    return parsedData;
};

export const submitQuiz = async (params: { quizId: string; answers: Record<string, string>; feedback: string; }) => {
    const { quizId, answers, feedback } = params;
    const url = `${API_BASE_URL}/quizzes/${quizId}/submit/`;
    const body = JSON.stringify({ answers, feedback });

    // Note: Authorization header is omitted as user auth is not yet implemented.
    const data = await fetchApi(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });
    return data;
};
