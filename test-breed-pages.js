#!/usr/bin/env node

async function testBreedPages() {
  console.log('=== Testing Breed-Specific Pages ===\n');
  
  // The original keywords end at "pet dental cleaning cost"
  // Breed keywords should start after that
  const originalKeywordCount = 1377; // This is what we found
  
  // Test pages around where breed content should appear
  const testPages = [
    1, // First page
    848, // Last original keyword page
    849, // Should be first breed page (but it's not)
    900, 1000, 1100, 1200, 1300, 1377 // Various pages
  ];
  
  for (const pageNum of testPages) {
    try {
      const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${pageNum}`);
      const html = await response.text();
      
      // Extract title
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1] : 'No title found';
      
      // Check for breed-specific content
      const hasBreedContent = html.includes('breed-specific') || 
                             html.includes('Retriever') || 
                             html.includes('Bulldog') ||
                             html.includes('Persian') ||
                             html.includes('Siamese');
      
      console.log(`Page ${pageNum}: ${title}`);
      console.log(`  Has breed content: ${hasBreedContent}`);
      
      // Check what type of content it's generating
      if (html.includes('emergency')) {
        console.log('  Type: Emergency content');
      } else if (html.includes('cancer') || html.includes('oncology')) {
        console.log('  Type: Oncology content');
      } else if (html.includes('surgery')) {
        console.log('  Type: Surgery content');
      } else if (html.includes('dental')) {
        console.log('  Type: Dental content');
      }
      
      console.log('');
    } catch (error) {
      console.error(`Error fetching page ${pageNum}:`, error.message);
    }
  }
  
  console.log('\n=== Analysis ===');
  console.log('Total keywords from health endpoint: 1377');
  console.log('Expected breakdown:');
  console.log('- Original keywords: 848');
  console.log('- Dog breed keywords: 300 (100 breeds × 3 variations)');
  console.log('- Cat breed keywords: 150 (50 breeds × 3 variations)');
  console.log('- Total new keywords: 450');
  console.log('- Grand total should be: 1298');
  console.log('\nDiscrepancy: 1377 - 1298 = 79 extra keywords');
  console.log('\nThis suggests there might be additional keywords beyond the breeds.');
}

testBreedPages().catch(console.error);