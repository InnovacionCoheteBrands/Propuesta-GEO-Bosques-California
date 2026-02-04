// Astro API endpoint for Grok Chat (server-side for security)
const API_ENDPOINT = "/api/chat";

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const sendMessageToGrok = async (messages: ChatMessage[]): Promise<string> => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages })
        });

        if (!response.ok) {
            const errorData = await response.json();

            // Handle rate limiting gracefully
            if (response.status === 429) {
                throw new Error("El sistema está experimentando alta demanda. Por favor, intente nuevamente en un momento.");
            }

            throw new Error(errorData.error || "Error al contactar el servicio de IA");
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Chat Service Error:", error);
        throw error;
    }
};
