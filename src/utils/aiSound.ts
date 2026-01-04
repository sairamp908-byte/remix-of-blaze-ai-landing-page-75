
// WARNING: Storing API keys directly in the frontend code is a major security risk.
// This key will be visible to anyone who inspects the website's code.
// It is highly recommended to use environment variables and a backend proxy,
// or use a service like Supabase Secrets to protect your API keys.
// This key has been hardcoded here as per your direct request.
const ELEVENLABS_API_KEY = "sk_2235159c3407188e11b1336dd1aaffdab80423228f1db11d";
// User requested a male voice. Using 'Chris' as a clear male voice.
const VOICE_ID = "iP95p4xoKVk53GoZ742B"; // Chris

export const playTextAsSpeech = (text: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        if (!ELEVENLABS_API_KEY) {
            console.warn("ElevenLabs API key is not set. AI sounds are disabled. Please add your API key to src/utils/aiSound.ts.");
            return resolve();
        }

        const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
        const headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": ELEVENLABS_API_KEY,
        };
        const body = JSON.stringify({
            text,
            model_id: "eleven_turbo_v2",
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
            },
        });

        try {
            const response = await fetch(url, { method: "POST", headers, body });
            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                let errorData;
                if (contentType && contentType.includes("application/json")) {
                    errorData = await response.json();
                } else {
                    errorData = await response.text();
                }
                console.error("ElevenLabs API error:", errorData);
                if (typeof errorData === 'object' && errorData.detail?.status === 'invalid_api_key') {
                  console.error("The provided ElevenLabs API key is invalid.");
                }
                return reject(new Error(JSON.stringify(errorData)));
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);

            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
                resolve();
            };

            audio.onerror = (e) => {
                URL.revokeObjectURL(audioUrl);
                console.error("Error playing AI sound:", e);
                reject(e);
            };

            audio.play().catch(e => {
                URL.revokeObjectURL(audioUrl);
                console.error("Error starting AI sound playback:", e);
                reject(e);
            });
        } catch (error) {
            console.error("Error with ElevenLabs request:", error);
            reject(error);
        }
    });
};
