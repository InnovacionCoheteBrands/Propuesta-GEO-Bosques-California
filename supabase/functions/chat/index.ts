import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

const GROK_API_URL = "https://api.x.ai/v1/chat/completions";

interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // Get API key from Supabase Secrets
        const GROK_API_KEY = Deno.env.get('GROK_API_KEY')
        if (!GROK_API_KEY) {
            throw new Error('GROK_API_KEY not configured in Supabase Secrets')
        }

        // Parse request body
        const { messages } = await req.json() as { messages: ChatMessage[] }

        if (!messages || !Array.isArray(messages)) {
            return new Response(
                JSON.stringify({ error: 'Invalid request: messages array required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
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
                model: 'grok-beta',
                stream: false,
                temperature: 0.7
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error('Grok API Error:', errorData)

            // Return user-friendly error based on status
            if (response.status === 429) {
                return new Response(
                    JSON.stringify({ error: 'El servicio está experimentando alta demanda. Por favor, intente nuevamente en un momento.' }),
                    { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                )
            }

            throw new Error(errorData.error?.message || 'Error contacting AI service')
        }

        const data = await response.json()
        const aiMessage = data.choices?.[0]?.message?.content

        if (!aiMessage) {
            throw new Error('Invalid response from AI service')
        }

        return new Response(
            JSON.stringify({ message: aiMessage }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.error('Edge Function Error:', error)
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : 'Internal server error'
            }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
