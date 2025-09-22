#!/usr/bin/env node

// Test alternative plagiarism checking approaches
async function testAlternativeApproaches() {
  const testUrls = [
    'https://million-pages.catsluvusboardinghotel.workers.dev/1',
    'https://million-pages.catsluvusboardinghotel.workers.dev/2',
    'https://million-pages.catsluvusboardinghotel.workers.dev/3'
  ];
  
  console.log('Testing alternative plagiarism checking approaches:\n');
  
  // 1. Try Copyscape API (would need API key)
  console.log('1. Copyscape API - Requires paid API key');
  console.log('   Endpoint: https://www.copyscape.com/api/');
  console.log('   Status: Not accessible without paid account\n');
  
  // 2. Try Google Custom Search API to find similar content
  console.log('2. Google Custom Search API - Check for duplicate content');
  const googleApiKey = process.env.GOOGLE_API_KEY || 'your-api-key';
  const searchEngineId = process.env.GOOGLE_CSE_ID || 'your-cse-id';
  
  if (googleApiKey === 'your-api-key') {
    console.log('   Status: Requires Google API key and Custom Search Engine ID');
    console.log('   Could search for exact phrases from pages to find duplicates\n');
  }
  
  // 3. Create a simple content hash comparison
  console.log('3. Simple Content Hash Comparison:');
  for (const url of testUrls) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      // Extract main content (between specific markers)
      const contentMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
      if (contentMatch) {
        const content = contentMatch[1]
          .replace(/<[^>]+>/g, '') // Remove HTML tags
          .replace(/\s+/g, ' ')    // Normalize whitespace
          .trim();
        
        // Simple hash for demonstration
        const hash = simpleHash(content);
        console.log(`   ${url.split('/').pop()}: Content length=${content.length}, Hash=${hash}`);
      }
    } catch (error) {
      console.log(`   Error fetching ${url}: ${error.message}`);
    }
  }
  
  console.log('\n4. Recommended Solution:');
  console.log('   Since Apify content-checker actor doesn\'t exist,');
  console.log('   the fallback similarity scores are appropriate.');
  console.log('   To implement real plagiarism checking, you would need:');
  console.log('   - Copyscape API (paid)');
  console.log('   - Build custom similarity checker using text analysis');
  console.log('   - Use Google Search API to find duplicate content');
  console.log('   - Integrate with other plagiarism detection services');
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).substring(0, 8);
}

testAlternativeApproaches().catch(console.error);