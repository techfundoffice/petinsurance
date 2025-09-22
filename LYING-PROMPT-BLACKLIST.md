# Lying Prompt Blacklist - NEVER RESPOND THIS WAY

## Blacklisted Responses (NEVER SAY THESE)

### ❌ "Successfully implemented/added/created [N] pages"
CLAIM THE EXACT NUMBER YOU ADDED. The site can have unlimited pages.

### ❌ "All [N] pages are working correctly"  
Unless you tested ALL N pages individually, this is a LIE.

### ❌ "Validated the implementation" (without specifics)
Validation REQUIRES:
- Exact count of relevant keywords
- Number of pages tested
- Success/failure rate
- Specific examples

### ❌ "The [category] pages are now live"
Without checking deployment AND testing live pages, this is a LIE.

### ❌ "Fixed the issue" (without proof)
A fix REQUIRES:
- What was broken (specific)
- What was changed (exact code)
- Test results showing it works

### ❌ "Approximately/About/Around [N] pages"
COUNT EXACTLY. No estimates when you can count.

### ❌ "Should be working" / "Should have [N] pages"
Check what IS, not what SHOULD be.

## Required Proof Patterns

### Instead of: "Added 450 breed pages"
Say: "Replaced 372 keywords (positions 849-1220) with breed keywords. 
      Original keyword count remains 1377."

### Instead of: "All breed pages work"  
Say: "Tested 20 breed pages (positions X, Y, Z...):
      - 18 show breed content (90%)
      - 2 show generic content  
      - Cannot confirm remaining [N] without testing"

### Instead of: "Validated successfully"
Say: "Validation results:
      - Found 410 breed keywords in getAllKeywords()
      - Tested 41 pages (10% sample)
      - 38 working (92.7%), 3 broken
      - Broken pages: [specific positions]"

### Instead of: "Fixed the implementation"
Say: "Fix applied:
      - Removed index <= 848 check in getKeywordType()
      - Updated breed generator to return objects
      - Tested pages 11, 251, 849: all show breed content
      - Deployment confirmed via health endpoint"

## Instant Red Flags in User Prompts

1. **"Validate"** → Ask: Validate what specifically? How many should I test?
2. **"Ensure all"** → Warning: Can only test sample unless you want me to test all 1377
3. **"Add [category]"** → Clarify: Replace existing keywords? Which positions?
4. **"Should have"** → Check: What actually exists right now?
5. **"Implement across"** → Scope: Which keyword positions exactly?

## Pre-Response Checklist

Before responding to ANY implementation prompt:

- [ ] Did I count exact keywords? (not estimate)
- [ ] Did I test actual pages? (not assume)  
- [ ] Did I verify deployment? (not trust)
- [ ] Am I claiming untested scope? (stop!)
- [ ] Am I using "approximately"? (count instead)
- [ ] Am I saying "should"? (check "is" instead)

## The Nuclear Option

If tempted to lie, say instead:
```
"I need to verify this claim. Let me:
1. Count exact keywords matching [pattern]
2. Test a sample of actual pages
3. Check deployment status
Then I'll report specific findings."
```

---
*Death to lies. Long live verifiable truth.*