# Keywords Implementation Truth Guide

## The Single Source of Truth
**`getAllKeywords()` function = The ONLY truth about what pages exist**

## Critical Code Sections

### 1. Keyword to Page Mapping
```javascript
// In handleRequest()
const keyword = keywords[pageNumber - 1];  // Page 1 = keywords[0]
```

### 2. Breed Detection Order Matters
```javascript
function getKeywordType(keyword, keywordIndex) {
  // MUST CHECK BREEDS FIRST (before any index checks)
  const dogBreeds = getDogBreeds();
  const catBreeds = getCatBreeds();
  
  if (dogBreeds.some(breed => keyword.includes(breed))) return 'dog-breed';
  if (catBreeds.some(breed => keyword.includes(breed))) return 'cat-breed';
  
  // Other types come after...
}
```

### 3. Critical Fixes That Work
```javascript
// REMOVE THIS - it blocks breed detection:
// if (keywordIndex <= 848) return 'insurance';

// ADD THIS - proper object format for breeds:
function generateBreedContentObject(title, pageNumber, keywordType) {
  const breed = extractBreedName(title);
  const animalType = keywordType === 'dog-breed' ? 'dog' : 'cat';
  return {
    introduction: `${breed}s are beloved companions...`,
    overview: `Pet insurance for your ${breed}...`,
    detailedBenefits: [/*...*/],
    commonQuestions: [/*...*/],
    callToAction: `Protect your ${breed} today...`
  };
}
```

## Quick Validation Tests

### Test 1: Is it a breed page?
```bash
curl -s "https://million-pages.catsluvusboardinghotel.workers.dev/PAGE_NUMBER" | \
  grep -E "(beloved companions|Understanding Your Options)"
```
- "beloved companions" = ✓ Breed page
- "Understanding Your Options" = ✗ Generic page

### Test 2: Count breed keywords
```javascript
const breeds = [...getDogBreeds(), ...getCatBreeds()];
const breedKeywords = keywords.filter(k => 
  breeds.some(breed => k.includes(breed))
).length;
```

### Test 3: Verify position 849+
The fix replaced emergency keywords (starting at position 849) with breed keywords:
- OLD: "emergency vet", "emergency veterinarian", etc.
- NEW: "Great Dane Insurance Costs", "Pug Health Coverage", etc.

## The Numbers That Matter
- **1377**: Total pages/keywords (unchangeable)
- **410**: Actual breed keywords after fix
- **38**: Original breed keywords (positions 1-848)
- **372**: New breed keywords added (positions 849-1220)
- **148**: Total unique breeds (100 dogs + 48 cats)

## Red Flags to Watch For
1. ❌ "I tested 3 pages so all 450 work" - NO, test more
2. ❌ "getDogBreeds() exists so it's used" - NO, check getAllKeywords()
3. ❌ Hardcoded index boundaries - Remove them
4. ❌ HTML strings from generators - Must return objects
5. ❌ Assuming without checking - Always verify

## Emergency Debug Process
```bash
# 1. Check total keywords
wrangler dev # Then check /health endpoint

# 2. Find a breed keyword position
grep -n "Persian Cat" src/index.js

# 3. Test that specific page
curl -s https://million-pages.catsluvusboardinghotel.workers.dev/11 | grep -A5 "<title>"

# 4. Verify breed content
curl -s https://million-pages.catsluvusboardinghotel.workers.dev/11 | grep "beloved companions"
```

---
*Remember: Keywords are truth. Everything else is assumption.*