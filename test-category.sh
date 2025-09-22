#!/bin/bash

if [ -z "$1" ]; then
  echo "=== CATEGORY TESTER - NO LIES ALLOWED ==="
  echo ""
  echo "Usage: ./test-category.sh <category> <url-pattern> <content-signature>"
  echo ""
  echo "Examples:"
  echo "  ./test-category.sh breed 'Persian|Poodle|Retriever' 'beloved companions'"
  echo "  ./test-category.sh emergency 'emergency|urgent' 'immediate veterinary attention'"
  echo "  ./test-category.sh dental 'dental|tooth' 'oral health'"
  echo ""
  exit 1
fi

CATEGORY=$1
PATTERN=$2
SIGNATURE=$3

echo "=== TESTING $CATEGORY IMPLEMENTATION ==="
echo "Pattern: $PATTERN"
echo "Expected content: $SIGNATURE"
echo ""

# First, count how many we expect
EXPECTED=$(node -e "
import { readFileSync } from 'fs';
const content = readFileSync('./src/index.js', 'utf8');
const match = content.match(/function getAllKeywords\\(\\) {\\s*return \\[([\\s\\S]*?)\\];\\s*}/);
if (match) {
  const keywords = match[1].match(/\"[^\"]+\"/g).map(k => k.replace(/\"/g, ''));
  const pattern = new RegExp('$PATTERN', 'i');
  const matches = keywords.filter(k => pattern.test(k));
  console.log(matches.length);
}
")

echo "Found $EXPECTED $CATEGORY keywords in getAllKeywords()"
echo ""

# Test up to 20 pages
echo "Testing sample pages (max 20)..."
TESTED=0
WORKING=0
FAILED=0

# Get page numbers
PAGES=$(node -e "
import { readFileSync } from 'fs';
const content = readFileSync('./src/index.js', 'utf8');
const match = content.match(/function getAllKeywords\\(\\) {\\s*return \\[([\\s\\S]*?)\\];\\s*}/);
if (match) {
  const keywords = match[1].match(/\"[^\"]+\"/g).map(k => k.replace(/\"/g, ''));
  const pattern = new RegExp('$PATTERN', 'i');
  keywords.forEach((k, i) => {
    if (pattern.test(k) && $TESTED < 20) {
      console.log(i + 1);
    }
  });
}
")

for page in $PAGES; do
  if [ $TESTED -ge 20 ]; then break; fi
  
  TESTED=$((TESTED + 1))
  
  # Get page content
  CONTENT=$(curl -s https://million-pages.catsluvusboardinghotel.workers.dev/$page)
  TITLE=$(echo "$CONTENT" | grep -o '<title>[^<]*' | sed 's/<title>//' | head -1)
  
  # Check for signature
  if echo "$CONTENT" | grep -q "$SIGNATURE"; then
    WORKING=$((WORKING + 1))
    echo "✅ Page $page: \"$TITLE\" - Has $CATEGORY content"
  else
    FAILED=$((FAILED + 1))
    echo "❌ Page $page: \"$TITLE\" - Missing $CATEGORY content"
    
    # Show what it has instead
    if echo "$CONTENT" | grep -q "Understanding Your Options"; then
      echo "   → Has generic content instead"
    fi
  fi
done

echo ""
echo "=== RESULTS ==="
echo "Expected $CATEGORY keywords: $EXPECTED"
echo "Pages tested: $TESTED"
echo "Working correctly: $WORKING ($((WORKING * 100 / TESTED))%)"
echo "Failed: $FAILED"
echo ""
echo "⚠️  IMPORTANT: Only tested $TESTED pages out of $EXPECTED total."
echo "Cannot claim the other $((EXPECTED - TESTED)) work without testing."