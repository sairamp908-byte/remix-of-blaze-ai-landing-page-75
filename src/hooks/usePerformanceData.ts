
// Dummy API functions
const dummyResponseTimeData = [
    { question: 'Q1', time: 110, status: 'correct' },
    { question: 'Q2', time: 45, status: 'correct' },
    { question: 'Q3', time: 180, status: 'incorrect' },
    { question: 'Q4', time: 75, status: 'correct' },
    { question: 'Q5', time: 205, status: 'incorrect' },
    { question: 'Q6', time: 150, status: 'warning' },
    { question: 'Q7', time: 90, status: 'correct' },
    { question: 'Q8', time: 160, status: 'warning' },
    { question: 'Q9', time: 30, status: 'correct' },
    { question: 'Q10', time: 190, status: 'incorrect' },
];

const dummyTimeInvestmentData = {
    totalTime: "24h 30m",
    avgSession: "45m",
    sessions: 32,
};

const dummyTopicMasteryData = {
    strengths: [
        { topic: 'Quantum Physics', performance: 95 },
        { topic: 'Thermodynamics', performance: 88 },
        { topic: 'Classical Mechanics', performance: 82 },
    ],
    improvements: [
        { topic: 'Electromagnetism', performance: 55 },
        { topic: 'Optics', performance: 45 },
    ],
};

// Simulate API call
const fetchWithDelay = (data: any) => new Promise(resolve => setTimeout(() => resolve(data), 500));

export const fetchResponseTimes = async () => {
    console.log("Fetching response times...");
    const response = await fetchWithDelay(dummyResponseTimeData);
    console.log("Response times fetched:", response);
    return response as typeof dummyResponseTimeData;
};

export const fetchTimeInvestment = async () => {
    console.log("Fetching time investment...");
    const response = await fetchWithDelay(dummyTimeInvestmentData);
    console.log("Time investment fetched:", response);
    return response as typeof dummyTimeInvestmentData;
};

export const fetchTopicMastery = async () => {
    console.log("Fetching topic mastery...");
    const response = await fetchWithDelay(dummyTopicMasteryData);
    console.log("Topic mastery fetched:", response);
    return response as typeof dummyTopicMasteryData;
};
