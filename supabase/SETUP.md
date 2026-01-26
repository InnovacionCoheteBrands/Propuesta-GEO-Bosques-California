# Supabase Edge Function Setup Instructions

## Prerequisites
- Supabase CLI installed: `npm install -g supabase`
- Supabase project created (you already have MCP configured)

## Step 1: Link Your Project
```bash
cd "c:\Users\Departamento AI\OneDrive\Documents\Códigos\Propuesta-GEO-Alta-California"
supabase link --project-ref YOUR_PROJECT_REF
```

## Step 2: Set the Secret (IMPORTANT - Do This First!)
```bash
supabase secrets set GROK_API_KEY=your_actual_grok_api_key_here
```

## Step 3: Deploy the Edge Function
```bash
supabase functions deploy chat
```

## Step 4: Update Frontend Environment Variables
Add to your `.env.local`:
```env
VITE_SUPABASE_FUNCTION_URL=https://YOUR_PROJECT.supabase.co/functions/v1/chat
```

Replace `YOUR_PROJECT` with your actual Supabase project reference.

## Step 5: Remove Old API Key (Security)
Remove this line from `.env.local`:
```env
# VITE_GROK_API_KEY=... (DELETE THIS - No longer needed!)
```

## Testing Locally (Optional)
To test the Edge Function locally before deploying:
```bash
# Terminal 1: Start Supabase local dev
supabase start

# Terminal 2: Serve the function locally
supabase functions serve chat --env-file .env.local

# Update VITE_SUPABASE_FUNCTION_URL to http://localhost:54321/functions/v1/chat
```

## Verification
1. Deploy everything.
2. Open the app in browser.
3. Send a chat message.
4. Check browser DevTools > Network > Response should come from Supabase, not x.ai.
5. Build the app: `npm run build`
6. Search dist folder for your Grok API key - it should NOT appear!

---

## Troubleshooting

### "GROK_API_KEY not configured"
- Run `supabase secrets set GROK_API_KEY=...` again.
- Secrets are environment-specific. Make sure you're deploying to the right project.

### CORS Errors
- Ensure `_shared/cors.ts` is properly configured.
- Check that your Supabase project allows your frontend domain.

### 500 Errors
- Check Supabase function logs: `supabase functions logs chat`
- Verify the Grok API key is valid.
