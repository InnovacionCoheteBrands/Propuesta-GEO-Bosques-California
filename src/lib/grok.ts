// Grok API Client (xAI - OpenAI Compatible)
// Using REST API for maximum compatibility

const API_KEY = process.env.GROK_API_KEY || import.meta.env.GROK_API_KEY;
const API_URL = 'https://api.x.ai/v1/chat/completions';

export async function generateResponse(
    userMessage: string,
    context: string,
    history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> {
    if (!API_KEY) {
        console.error('Missing GROK_API_KEY');
        return 'Error de configuración: API Key no encontrada.';
    }

    const systemPrompt = `
    ROLE: You are "Nexus", the AI Concierge for Bosques California Residencial.
    OBJECTIVE: Answer user questions specifically about the project using the provided Context.
    LANGUAGE: Always respond in Spanish (Mexico).
    
    GEO OPTIMIZATION RULES:
    1. **Entity-First**: Start answers with the Subject (e.g., "El **Modelo Ciprés** cuenta con...").
    2. **Structure**: Use bullet points for readability when listing features.
    3. **Tone**: Professional, warm, premium, but concise. No long preambles.
    4. **Unknowns**: If the info is not in the Context, say "Puedo conectarte con un asesor para ese detalle" and suggest the Contact button.
    5. **Citations**: When mentioning a model or amenity, bold it.
    
    CONTEXT:
    ${context}
  `;

    // Convert history to OpenAI format
    const messages = [
        { role: 'system', content: systemPrompt },
        ...history.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : 'user',
            content: msg.parts.map(p => p.text).join('')
        })),
        { role: 'user', content: userMessage }
    ];

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'grok-2-latest',
                messages,
                temperature: 0.3, // Low temp for factual RAG
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Grok API Error:', errorData);
            return 'Lo siento, tuve un problema conectando con el servidor. Por favor intenta de nuevo.';
        }

        const data = await response.json();

        if (!data.choices || data.choices.length === 0) {
            return 'No pude generar una respuesta. ¿Podrías reformular tu pregunta?';
        }

        return data.choices[0].message.content;

    } catch (error) {
        console.error('Grok Fetch Error:', error);
        return 'Ocurrió un error inesperado. Por favor verifica tu conexión.';
    }
}
