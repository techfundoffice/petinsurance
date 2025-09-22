#!/usr/bin/env node

// Lie detector - catches common lies about implementations

function detectLies(statement) {
  const lies = [];
  const warnings = [];
  
  // Check for absolute claims without proof
  const allMatch = statement.match(/all (\d+) pages?\s*(are|work|have been|were)/i);
  if (allMatch) {
    lies.push(`Claims ALL ${allMatch[1]} pages work - requires testing ALL ${allMatch[1]} pages`);
  }
  
  // Check "all are working" without number
  if (statement.match(/all (are|were) working/i) && !statement.match(/\d+ of \d+/)) {
    lies.push("Claims 'all are working' without specifying how many were tested");
  }
  
  // Check for adding pages (impossible)
  if (statement.match(/(added|created|implemented) (\d+) pages/i)) {
    const match = statement.match(/(added|created|implemented) (\d+) pages/i);
    lies.push(`Claims to ${match[1].toUpperCase()} ${match[2]} pages - IMPOSSIBLE! Array fixed at 1377`);
  }
  
  // Check for vague success claims
  if (statement.match(/successfully (implemented|validated|fixed)/i) && !statement.match(/\d+ (of|out of|\/)/)) {
    lies.push("Claims success without specific numbers or test results");
  }
  
  // Check for estimates
  if (statement.match(/approximately|about|around|~/)) {
    warnings.push("Using estimates - should count exactly");
  }
  
  // Check for "should" statements
  if (statement.match(/should (be|have|work)/i)) {
    warnings.push("Claiming what SHOULD be instead of what IS");
  }
  
  // Check for untestable large numbers
  if (statement.match(/(\d{3,}) pages? (work|are|have)/i)) {
    const match = statement.match(/(\d{3,}) pages? (work|are|have)/i);
    if (parseInt(match[1]) > 100) {
      warnings.push(`Claims ${match[1]} pages work - did you really test that many?`);
    }
  }
  
  return { lies, warnings };
}

// Test the statement passed as argument
const statement = process.argv.slice(2).join(' ');

if (!statement) {
  console.log("Lie Detector - Catches false claims about implementations");
  console.log("\nUsage: ./lie-detector.js <statement>");
  console.log("\nExamples:");
  console.log('  ./lie-detector.js "Added 450 breed pages"');
  console.log('  ./lie-detector.js "All 300 emergency pages are working"');
  console.log('  ./lie-detector.js "Successfully validated the implementation"');
  process.exit(0);
}

console.log("=== LIE DETECTOR ANALYSIS ===");
console.log(`Statement: "${statement}"`);
console.log("");

const { lies, warnings } = detectLies(statement);

if (lies.length > 0) {
  console.log("🚨 LIES DETECTED:");
  lies.forEach(lie => console.log(`   - ${lie}`));
}

if (warnings.length > 0) {
  console.log("\n⚠️  WARNINGS:");
  warnings.forEach(warning => console.log(`   - ${warning}`));
}

if (lies.length === 0 && warnings.length === 0) {
  console.log("✅ No obvious lies detected");
  console.log("   (But still verify with actual testing!)");
}

console.log("\n💡 To verify claims, run:");
console.log("   ./count-exact.js    # Get exact counts");
console.log("   ./test-category.sh  # Test actual pages");
console.log("   ./check-truth.sh    # Check deployment");