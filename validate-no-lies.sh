#!/bin/bash

echo "=== MILLION PAGES NO-LIES VALIDATOR ==="
echo "Running all truth checks..."
echo ""

# 1. Basic truth check
echo "1. DEPLOYMENT CHECK"
echo "==================="
./check-truth.sh
echo ""

# 2. Exact counts
echo "2. EXACT KEYWORD COUNTS"
echo "======================="
./count-exact.js
echo ""

# 3. Test breeds specifically since that's what we worked on
echo "3. BREED IMPLEMENTATION TEST"
echo "============================"
./test-category.sh breed "Retriever|Shepherd|Terrier|Poodle|Persian|Maine Coon|Siamese|Bengal" "beloved companions"
echo ""

# 4. Summary
echo "4. TRUTH SUMMARY"
echo "================"
echo "✅ The above numbers are the TRUTH"
echo "❌ Any claims beyond tested pages are LIES"
echo "📋 To test other categories:"
echo "   ./test-category.sh emergency 'emergency|urgent' 'immediate attention'"
echo "   ./test-category.sh dental 'dental|tooth' 'oral health'"
echo ""
echo "🎯 Golden Rule: If you didn't test it, don't claim it!"