// Supabase Edge Function URL - Replace with your actual Supabase project URL
const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || "https://YOUR_PROJECT.supabase.co/functions/v1/chat";

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const sendMessageToGrok = async (messages: ChatMessage[]): Promise<string> => {
    try {
        const response = await fetch(EDGE_FUNCTION_URL, {
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
