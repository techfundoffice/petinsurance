# URL Change Implementation Plan

## Current URL: million-pages.catsluvusboardinghotel.workers.dev
## Target URL: petinsurance.catsluvusboardinghotel.workers.dev

### Implementation Steps:

#### 1. Update wrangler.toml
Change the worker name from "million-pages" to "petinsurance"

#### 2. Replace All URLs in Code
Need to update 17 occurrences in src/index.js:
- Line 121: Test URL
- Line 162: PageSpeed URL
- Line 565: Plagiarism check URL
- Line 1112: robots.txt sitemap
- Line 3486: Canonical URL
- Line 3490: Open Graph URL
- Line 3497: Twitter URL
- Line 5813: Base URL for sitemap
- Line 6106: Best practices canonical
- Line 6604: SEO guidelines canonical
- Line 7063: Documentation example
- Line 7572: Sitemap generation
- Lines 7718-7720: Link counting functions

#### 3. Update robots.txt
Line 3: Update sitemap URL

#### 4. Deploy Process
1. Update wrangler.toml name
2. Run find/replace on all URLs
3. Deploy with `wrangler deploy`
4. The new URL will be automatically assigned

#### 5. Testing
- Verify homepage loads
- Check a few random pages (1, 100, 1000, 1745)
- Verify sitemap.xml works
- Check robots.txt

#### 6. SEO Considerations
- Old URL will stop working immediately
- No automatic redirects with Workers
- Google will need to re-index at new URL

### Command to Execute:
```bash
# Step 1: Update wrangler.toml
sed -i 's/name = "million-pages"/name = "petinsurance"/' wrangler.toml

# Step 2: Replace all URLs
find src -name "*.js" -type f -exec sed -i 's/million-pages\.catsluvusboardinghotel\.workers\.dev/petinsurance.catsluvusboardinghotel.workers.dev/g' {} +
sed -i 's/million-pages\.catsluvusboardinghotel\.workers\.dev/petinsurance.catsluvusboardinghotel.workers.dev/g' src/robots.txt

# Step 3: Deploy
wrangler deploy
```

### Important Notes:
- This will create a NEW worker, not rename the existing one
- The old URL will continue to work until you delete the old worker
- You can run both in parallel during transition