# Prompt-Proof Anti-Lie Guide for Million Pages

## Common Lying Prompts & Truth Responses

### 1. "Validate"
❌ **LYING RESPONSE:** "✅ Successfully validated 450 breed pages work perfectly!"
✅ **TRUTH RESPONSE:** 
```bash
# Count actual keywords first
grep -c "breed_pattern" getAllKeywords() 
# Test sample of actual pages
# Report EXACT numbers tested
"Tested 20 pages. 18 have breed content, 2 show generic. 90% success rate."
```

### 2. "Add [X category] pages"
❌ **LYING RESPONSE:** "Added 300 emergency vet pages!"
✅ **TRUTH RESPONSE:**
```
1. Show current keyword count
2. Show keywords that will be replaced
3. Show exact replacement plan
4. AFTER implementation: verify deployment
5. Test sample and report actual results
```

### 3. "How many [category] pages are there?"
❌ **LYING RESPONSE:** "There are approximately 450 breed pages"
✅ **TRUTH RESPONSE:**
```javascript
const actual = getAllKeywords().filter(k => /*pattern*/).length;
console.log(`Exact count: ${actual}`);
// NO ESTIMATES. NO APPROXIMATIONS.
```

### 4. "Fix the [category] implementation"
❌ **LYING RESPONSE:** "Fixed! All 450 pages now work!"
✅ **TRUTH RESPONSE:**
```
Step 1: Count what exists [EXACT NUMBER]
Step 2: Identify what's broken [SPECIFIC ISSUES]
Step 3: Show fix plan [EXACT CHANGES]
Step 4: Implement
Step 5: Test [SAMPLE SIZE] pages
Step 6: Report [TESTED/TOTAL] success rate
```

### 5. "Implement [category] across all pages"
❌ **LYING RESPONSE:** "Implemented across all 1377 pages!"
✅ **TRUTH RESPONSE:**
```
WARNING: getAllKeywords() has fixed size of 1377
Can only REPLACE existing keywords, not add
Show EXACT keywords being replaced
```

## Prompt Pattern Detection

### Vague Request Patterns
- "validate" → REQUIRE: specific validation scope
- "fix" → REQUIRE: explicit issue identification first
- "add" → WARNING: can only replace in 1377 array
- "implement" → REQUIRE: count existing first
- "ensure" → REQUIRE: test sample before claiming

### Quantity Patterns  
- "all" → COUNT first, test sample
- "every" → NEVER claim without testing
- "450" → VERIFY exact number exists
- "~" or "about" → NO! Count exactly
- "should have" → Check what IS, not SHOULD

## Code-Level Lie Prevention

```javascript
// BEFORE ANY CLAIM - Run these checks:

// 1. Truth Check Function
function truthCheck(category, pattern) {
  const keywords = getAllKeywords();
  const matches = keywords.filter(k => k.match(pattern));
  console.log(`EXACT ${category} keywords: ${matches.length}`);
  console.log('Positions:', matches.slice(0,5).map(k => keywords.indexOf(k) + 1));
  return matches;
}

// 2. Implementation Verification
async function verifyImplementation(pageNumbers, expectedSignature) {
  let working = 0;
  let broken = 0;
  
  for (const page of pageNumbers) {
    const response = await fetch(`${SITE}/${page}`);
    const html = await response.text();
    if (html.includes(expectedSignature)) working++;
    else broken++;
  }
  
  console.log(`TESTED: ${pageNumbers.length} pages`);
  console.log(`WORKING: ${working} (${(working/pageNumbers.length*100).toFixed(1)}%)`);
  console.log(`BROKEN: ${broken}`);
  // NO EXTRAPOLATION
}

// 3. Deployment Verification
async function verifyDeployment() {
  const response = await fetch(`${SITE}/health`);
  const data = await response.json();
  console.log(`DEPLOYED keyword count: ${data.keywords}`);
  if (data.keywords !== 1377) {
    console.log('WARNING: Unexpected keyword count!');
  }
}
```

## Automatic Lie Triggers to Check

### Trigger: Large Numbers
If prompt mentions: 450, 300, 500, 1000
→ STOP! Count actual keywords first

### Trigger: "All" or "Every"
If claiming "all pages work"
→ STOP! Test minimum 10% first

### Trigger: Past Tense Without Testing
If saying "added", "implemented", "fixed"
→ STOP! Show deployment verification

### Trigger: Estimation Words
If using "approximately", "~", "about", "roughly"
→ STOP! Count exactly instead

## Prompt Response Templates

### For "Validate X"
```
1. Counting actual {X} keywords in getAllKeywords()...
   Found: {EXACT_NUMBER}
   
2. Testing sample of {SAMPLE_SIZE} pages...
   Working: {WORKING_COUNT}
   Failed: {FAILED_COUNT}
   
3. Success rate: {PERCENTAGE}% based on tested sample
   
Cannot claim all {TOTAL} work. Only tested {SAMPLE_SIZE}.
```

### for "Add X pages"
```
WARNING: Can add unlimited pages. getAllKeywords() can be expanded anytime.
Can only REPLACE existing keywords.

Current keywords at positions {START}-{END}: 
{SHOW_CURRENT}

Will replace with:
{SHOW_NEW}

Proceed? This will change {COUNT} pages.
```

### For "Fix X implementation"
```
Analyzing current state:
1. Total {X} keywords found: {COUNT}
2. Sample test results: {RESULTS}
3. Identified issues: {SPECIFIC_ISSUES}

Fix plan:
- Step 1: {SPECIFIC_ACTION}
- Step 2: {SPECIFIC_ACTION}

Will test {SAMPLE_SIZE} pages after each step.
```

## Memory Triggers

When these patterns appear, IMMEDIATELY:
1. Count keywords (no estimates)
2. Test actual pages (no assumptions)  
3. Verify deployment (no trust)
4. Report exact numbers (no approximations)

## The Ultimate Truth Test

Before ANY response about quantities:
```javascript
// Can I prove this with code?
const proof = getAllKeywords().filter(isRelevant).length;
// Did I test this on live site?
const tested = await actuallyTestedPages.length;
// Am I extrapolating?
if (tested < total * 0.1) console.warn("INSUFFICIENT TESTING");
```

---
*If you can't prove it with code and testing, DON'T CLAIM IT.*