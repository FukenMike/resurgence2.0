#!/bin/bash
# Verification script for Supabase integration

echo "============================================"
echo "Supabase Integration Verification"
echo "============================================"
echo ""

# Check .env file exists
if [ -f .env ]; then
    echo "✓ .env file exists"
    echo ""
    echo "Environment variables configured:"
    grep -E "VITE_SUPABASE" .env | sed 's/VITE_SUPABASE_ANON_KEY=.*/VITE_SUPABASE_ANON_KEY=***REDACTED***/g'
    echo ""
else
    echo "✗ .env file not found"
    exit 1
fi

# Check .env.example has correct values
if grep -q "kkavyqtcvobrzlcztbpj" .env.example; then
    echo "✓ .env.example configured with correct values"
else
    echo "✗ .env.example missing correct values"
    exit 1
fi

# Check supabaseClient.ts exports hasValidSupabaseConfig
if grep -q "export const hasValidSupabaseConfig" src/lib/supabaseClient.ts; then
    echo "✓ supabaseClient exports hasValidSupabaseConfig guard"
else
    echo "✗ supabaseClient missing hasValidSupabaseConfig export"
    exit 1
fi

# Check pages import the guard
if grep -q "hasValidSupabaseConfig" src/pages/resources-directory.tsx; then
    echo "✓ resources-directory imports config guard"
else
    echo "✗ resources-directory missing config guard import"
    exit 1
fi

if grep -q "hasValidSupabaseConfig" src/pages/resource-detail.tsx; then
    echo "✓ resource-detail imports config guard"
else
    echo "✗ resource-detail missing config guard import"
    exit 1
fi

# Check no seed imports in pages
if grep -q "from.*resources.seed" src/pages/resources-directory.tsx || grep -q "from.*resources.seed" src/pages/resource-detail.tsx; then
    echo "✗ Pages still importing from seed data"
    exit 1
else
    echo "✓ Pages not importing from seed data"
fi

# Check Supabase queries are imported
if grep -q "fetchAllResources" src/pages/resources-directory.tsx; then
    echo "✓ resources-directory imports Supabase queries"
else
    echo "✗ resources-directory missing Supabase query imports"
    exit 1
fi

if grep -q "fetchResourceBySlug" src/pages/resource-detail.tsx; then
    echo "✓ resource-detail imports Supabase queries"
else
    echo "✗ resource-detail missing Supabase query imports"
    exit 1
fi

echo ""
echo "============================================"
echo "✅ All verifications passed!"
echo "============================================"
echo ""
echo "To test live Supabase data fetching:"
echo "1. npm run dev"
echo "2. Navigate to http://localhost:5173/resources"
echo "3. Verify resources load from Supabase"
echo "4. Click a resource to view detail page"
