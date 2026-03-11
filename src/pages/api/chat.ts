export const prerender = false; // Enable SSR for this route

import type { APIRoute } from 'astro';
import { generateResponse } from '../../lib/grok';
import { buildContext } from '../../lib/rag/assembler';

export const POST: APIRoute = async ({ request }) => {
    try {
        // 1. Validate Body
        const body = await request.json();
        const { message, history } = body;

        if (!message) {
            return new Response(JSON.stringify({ error: 'Message required' }), { status: 400 });
        }

        // 2. Build Integration Context (RAG)
        const context = buildContext();

        // 3. Call AI
        const reply = await generateResponse(message, context, history || []);

        // 4. Return
        return new Response(JSON.stringify({ reply }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
