const GROK_API_URL = "https://api.x.ai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_GROK_API_KEY;

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const sendMessageToGrok = async (messages: ChatMessage[]) => {
    try {
        const response = await fetch(GROK_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                messages,
                model: "grok-4-1-fast-non-reasoning",
                stream: false,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "Error contacting Grok API");
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Grok Service Error:", error);
        throw error;
    }
};
