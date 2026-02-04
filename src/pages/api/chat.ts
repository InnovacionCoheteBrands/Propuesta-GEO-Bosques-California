// API endpoint for Grok AI Chat
// This runs server-side to keep the API key secure

import type { APIRoute } from 'astro';

const GROK_API_URL = "https://api.x.ai/v1/chat/completions";
// Use process.env for server-side env vars in Astro
const GROK_API_KEY = process.env.GROK_API_KEY;

interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const prerender = false; // This endpoint needs SSR

export const POST: APIRoute = async ({ request }) => {
    // CORS headers
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    try {
        if (!GROK_API_KEY) {
            console.error('GROK_API_KEY not configured');
            return new Response(
                JSON.stringify({ error: 'API key not configured. Please add GROK_API_KEY to .env.local' }),
                { status: 500, headers }
            );
        }

        const { messages } = await request.json() as { messages: ChatMessage[] };

        if (!messages || !Array.isArray(messages)) {
            return new Response(
                JSON.stringify({ error: 'Invalid request: messages array required' }),
                { status: 400, headers }
            );
        }

        // Call Grok API
        const response = await fetch(GROK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROK_API_KEY}`
            },
            body: JSON.stringify({
                messages,
                model: 'grok-3', // Updated from deprecated grok-beta
                stream: false,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Grok API Error:', errorData);

            if (response.status === 429) {
                return new Response(
                    JSON.stringify({ error: 'El servicio está experimentando alta demanda. Por favor, intente nuevamente en un momento.' }),
                    { status: 429, headers }
                );
            }

            throw new Error(errorData.error?.message || 'Error contacting AI service');
        }

        const data = await response.json();
        const aiMessage = data.choices?.[0]?.message?.content;

        if (!aiMessage) {
            throw new Error('Invalid response from AI service');
        }

        return new Response(
            JSON.stringify({ message: aiMessage }),
            { status: 200, headers }
        );

    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : 'Internal server error'
            }),
            { status: 500, headers }
        );
    }
};

// Handle OPTIONS for CORS preflight
export const OPTIONS: APIRoute = async () => {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
};
