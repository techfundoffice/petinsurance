#!/bin/bash
echo "=== MILLION PAGES TRUTH CHECK ==="
echo "This tells you EXACTLY what exists. No lies."
echo ""

# 1. Check deployment
echo "1. CHECKING DEPLOYMENT..."
HEALTH=$(curl -s https://million-pages.catsluvusboardinghotel.workers.dev/health)
TOTAL_KEYWORDS=$(echo $HEALTH | jq -r .keywords)
echo "   Total Keywords: $TOTAL_KEYWORDS"
if [ "$TOTAL_KEYWORDS" != "1377" ]; then
  echo "   ⚠️  WARNING: Expected 1377 keywords!"
fi

# 2. Test sample pages
echo ""
echo "2. TESTING REAL PAGES..."
echo "   Testing pages 11, 161, 251, 849, 850..."
for page in 11 161 251 849 850; do
  TITLE=$(curl -s https://million-pages.catsluvusboardinghotel.workers.dev/$page | grep -o '<title>[^<]*' | sed 's/<title>//')
  echo "   Page $page: $TITLE"
done

# 3. Show current directory
echo ""
echo "3. CURRENT STATE..."
echo "   Directory: $(pwd)"
echo "   Index.js exists: $([ -f src/index.js ] && echo 'YES' || echo 'NO')"
echo "   Last modified: $(stat -c %y src/index.js 2>/dev/null || stat -f "%Sm" src/index.js 2>/dev/null || echo 'Unknown')"

echo ""
echo "✅ TRUTH CHECK COMPLETE"
echo "These are the REAL numbers. Anything else is a lie."