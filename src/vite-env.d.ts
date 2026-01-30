/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_FUNCTION_URL: string
    readonly GEMINI_API_KEY?: string
    // Add other env variables as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
