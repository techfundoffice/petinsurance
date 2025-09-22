# Breed Implementation Standard Operating Procedures

## Overview
This document contains the PROVEN procedures for implementing and validating breed-specific content in the Million Pages Cloudflare Worker project. These procedures were developed and tested on 2025-01-19 after identifying and fixing multiple issues with false claims.

## Key Learnings - What NOT to Do
1. **NEVER claim implementation without verification** - Don't say "450 breed pages exist" without checking
2. **NEVER extrapolate from small samples** - Testing 3 pages doesn't prove 450 work
3. **NEVER trust comments over code** - getDogBreeds() existing doesn't mean it's used
4. **NEVER estimate when you can count** - Count actual keywords, don't guess

## The Truth About This Codebase
- `getDogBreeds()` returns 100 dog breeds
- `getCatBreeds()` returns 50 cat breeds (actually 48 due to duplicates)
- These functions exist BUT aren't automatically used
- `getAllKeywords()` is the ONLY source of truth for what pages exist
- Each keyword in getAllKeywords() maps to exactly one page

## Standard Operating Procedure for Breed Implementation

### Step 1: Understand Current State
```bash
# Extract and count current keywords
node -e "
import { readFileSync } from 'fs';
const content = readFileSync('./src/index.js', 'utf8');
const match = content.match(/function getAllKeywords\(\) {\s*return \[([\s\S]*?)\];\s*}/);
if (match) {
  const keywords = match[1].match(/\"[^\"]+\"/g).map(k => k.replace(/\"/g, ''));
  console.log('Total keywords:', keywords.length);
  console.log('First 5:', keywords.slice(0, 5));
  console.log('Position 849:', keywords[848]);
}"
```

### Step 2: Count Actual Breed Pages
```javascript
// Use THIS code to count breed pages accurately
const allDogBreeds = [/* copy from getDogBreeds() */];
const allCatBreeds = [/* copy from getCatBreeds() */];

let breedCount = 0;
keywords.forEach(keyword => {
  if ([...allDogBreeds, ...allCatBreeds].some(breed => keyword.includes(breed))) {
    breedCount++;
  }
});
```

### Step 3: Verify Breed Detection Works
Check that `getKeywordType()` correctly identifies breeds:
```javascript
// This check MUST be removed for breeds to work:
// if (keywordIndex <= 848) return 'insurance'; // REMOVE THIS!

// Breed detection must come FIRST:
if (dogBreeds.some(breed => keyword.includes(breed))) return 'dog-breed';
if (catBreeds.some(breed => keyword.includes(breed))) return 'cat-breed';
```

### Step 4: Ensure Proper Content Generation
Breed content MUST return an object, not HTML string:
```javascript
function generateBreedContentObject(title, pageNumber, keywordType) {
  return {
    introduction: "...",
    overview: "...",
    detailedBenefits: ["...", "...", "..."],
    commonQuestions: [{q: "...", a: "..."}],
    callToAction: "..."
  };
}
```

### Step 5: Test Actual Pages
```bash
# Test specific breed pages
for page in 11 161 251 849 850; do
  echo "Testing page $page:"
  curl -s "https://million-pages.catsluvusboardinghotel.workers.dev/$page" | \
    grep -E "(title>|beloved companions|Understanding Your Options)" | head -3
  echo "---"
done
```

### Step 6: Deploy Correctly
```bash
# Always deploy and test immediately
wrangler deploy
sleep 5  # Wait for deployment
# Test that changes are live
curl -s "https://million-pages.catsluvusboardinghotel.workers.dev/health" | jq .
```

## Validation Checklist
- [ ] Count keywords in getAllKeywords() - should match current total
- [ ] Count breed keywords using COMPLETE breed lists - should be ~410
- [ ] Verify getKeywordType() has NO index <= 848 check
- [ ] Verify breed generators return objects, not HTML
- [ ] Test at least 10 random breed pages
- [ ] Confirm health endpoint shows correct total
- [ ] Document EXACT counts, not estimates

## Common Pitfalls to Avoid
1. **Incomplete breed lists** - "Shih Tzu", "Pomeranian" ARE breeds
2. **Wrong content format** - Breed generators must return objects
3. **Index checks** - Remove ALL hardcoded index boundaries
4. **Deployment gaps** - Always verify deployment worked
5. **False positives** - "Understanding Your Options" means generic content

## Quick Debug Commands
```bash
# Check what's at position 849
curl -s https://million-pages.catsluvusboardinghotel.workers.dev/849 | grep "<title>"

# Count breed pages in a range
for i in {849..870}; do
  curl -s https://million-pages.catsluvusboardinghotel.workers.dev/$i | \
    grep "<title>" | grep -E "(Retriever|Terrier|Shepherd|Poodle)"
done | wc -l

# Verify breed content vs generic
curl -s https://million-pages.catsluvusboardinghotel.workers.dev/849 | \
  grep -c "beloved companions"  # Should be > 0 for breeds
```

## Final Implementation Status (2025-01-19)
- Total keywords: 1377
- Breed keywords: 410
  - Original (positions 1-848): 38
  - Added (positions 849+): 372
- All breed pages use breed-specific generators
- No generic content on breed pages

## For Next Time
1. Read this document FIRST
2. Count keywords, don't estimate
3. Test actual pages, not assumptions
4. Be honest about limitations
5. Fix incrementally with validation at each step

---
*This SOP created after fixing false claims about 450 breed pages. The actual count is 410.*