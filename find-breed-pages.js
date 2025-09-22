#!/usr/bin/env node

async function findBreedPages() {
  console.log('=== Finding Breed-Specific Pages ===\n');
  
  // Binary search to find where breed content starts
  let low = 800;
  let high = 1377;
  let firstBreedPage = -1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    try {
      const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${mid}`);
      const html = await response.text();
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1] : '';
      
      console.log(`Checking page ${mid}: ${title}`);
      
      // Check if this is a breed-specific page
      const isBreedPage = title.includes('Retriever') || 
                         title.includes('Bulldog') || 
                         title.includes('Shepherd') ||
                         title.includes('Poodle') ||
                         title.includes('Persian') ||
                         title.includes('Maine Coon') ||
                         title.includes('Siamese');
      
      if (isBreedPage) {
        firstBreedPage = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error checking page ${mid}:`, error.message);
      break;
    }
  }
  
  console.log(`\nFirst breed page found at: ${firstBreedPage}`);
  
  // Now test a few pages around that point
  if (firstBreedPage > 0) {
    console.log('\n=== Testing pages around the transition ===');
    for (let i = firstBreedPage - 2; i <= firstBreedPage + 2; i++) {
      if (i < 1 || i > 1377) continue;
      
      try {
        const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${i}`);
        const html = await response.text();
        const titleMatch = html.match(/<title>([^<]+)<\/title>/);
        const title = titleMatch ? titleMatch[1] : '';
        
        console.log(`Page ${i}: ${title}`);
        
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error fetching page ${i}:`, error.message);
      }
    }
  }
}

findBreedPages().catch(console.error);