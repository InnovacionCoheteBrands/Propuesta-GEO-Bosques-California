# Deployment Helper Script for Supabase Edge Function

Write-Host "==============================================`n" -ForegroundColor Cyan
Write-Host "  Bosques California - Chatbot Deployment" -ForegroundColor Green
Write-Host "`n==============================================" -ForegroundColor Cyan

# Step 1: Check if Supabase CLI is installed
Write-Host "`n[1/4] Checking Supabase CLI..." -ForegroundColor Yellow
try {
    $version = supabase --version 2>$null
    Write-Host "✓ Supabase CLI found: $version" -ForegroundColor Green
}
catch {
    Write-Host "✗ Supabase CLI not found!" -ForegroundColor Red
    Write-Host "Install it with: npm install -g supabase" -ForegroundColor Yellow
    exit 1
}

# Step 2: Link project (if not already linked)
Write-Host "`n[2/4] Linking Supabase project..." -ForegroundColor Yellow
Write-Host "If you haven't linked yet, you'll be prompted for your project reference." -ForegroundColor Cyan
Write-Host "Find it at: https://supabase.com/dashboard/project/_/settings/general`n" -ForegroundColor Cyan

# Step 3: Set API Key Secret
Write-Host "`n[3/4] Setting Grok API Key Secret..." -ForegroundColor Yellow
$apiKey = Read-Host "Please enter your Grok API Key"
Write-Host "Setting secret in Supabase..." -ForegroundColor Cyan

try {
    supabase secrets set GROK_API_KEY=$apiKey
    Write-Host "✓ Secret set successfully!" -ForegroundColor Green
}
catch {
    Write-Host "✗ Failed to set secret. Make sure you're linked to a project." -ForegroundColor Red
    exit 1
}

# Step 4: Deploy Function
Write-Host "`n[4/4] Deploying Edge Function..." -ForegroundColor Yellow
try {
    supabase functions deploy chat
    Write-Host "`n✓ Deployment complete!" -ForegroundColor Green
}
catch {
    Write-Host "✗ Deployment failed. Check the error above." -ForegroundColor Red
    exit 1
}

# Final Instructions
Write-Host "`n==============================================`n" -ForegroundColor Cyan
Write-Host "  🎉 Deployment Successful!" -ForegroundColor Green
Write-Host "`n==============================================`n" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Copy your Supabase Function URL" -ForegroundColor White
Write-Host "   (should be shown in the output above)" -ForegroundColor Gray
Write-Host "`n2. Update .env.local with:" -ForegroundColor White
Write-Host "   VITE_SUPABASE_FUNCTION_URL=https://YOUR_PROJECT.supabase.co/functions/v1/chat" -ForegroundColor Gray
Write-Host "`n3. Restart your dev server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host "`n4. Test the chatbot at http://localhost:3000" -ForegroundColor White
Write-Host "`n==============================================`n" -ForegroundColor Cyan
