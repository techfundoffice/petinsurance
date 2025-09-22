#!/usr/bin/env node

async function findActualBreeds() {
  console.log('=== SEARCHING FOR ACTUAL BREED PAGES ===\n');
  
  // We know the site has 1377 pages total
  // Let's check every 10th page to find where breeds start appearing
  
  const breedKeywords = [
    'Golden Retriever', 'Labrador Retriever', 'German Shepherd', 'French Bulldog',
    'Bulldog', 'Poodle', 'Beagle', 'Rottweiler', 'Yorkshire Terrier', 'Dachshund',
    'Persian', 'Maine Coon', 'Siamese', 'Ragdoll', 'British Shorthair',
    'Sphynx', 'Bengal', 'Scottish Fold', 'Russian Blue', 'Norwegian Forest'
  ];
  
  console.log('Sampling pages to find breed content...\n');
  
  const foundBreeds = [];
  
  // Check every 10th page
  for (let i = 1; i <= 1377; i += 10) {
    try {
      const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${i}`);
      const html = await response.text();
      
      // Extract title
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].split(' - Page')[0] : '';
      
      // Check if title contains any breed
      const foundBreed = breedKeywords.find(breed => title.includes(breed));
      
      if (foundBreed) {
        foundBreeds.push({ page: i, title, breed: foundBreed });
        console.log(`✓ Page ${i}: ${title} [${foundBreed}]`);
      } else if (i % 100 === 1) {
        // Show progress
        console.log(`  Checked up to page ${i}: ${title}`);
      }
      
      // Small delay
      await new Promise(resolve => setTimeout(resolve, 50));
      
    } catch (error) {
      console.error(`Error checking page ${i}:`, error.message);
    }
  }
  
  console.log(`\n=== RESULTS ===`);
  console.log(`Found ${foundBreeds.length} breed pages out of ${Math.floor(1377/10)} checked`);
  
  if (foundBreeds.length > 0) {
    console.log('\nBreed pages found:');
    foundBreeds.forEach(({ page, title, breed }) => {
      console.log(`  Page ${page}: ${title}`);
    });
    
    // Find the range
    const firstBreedPage = Math.min(...foundBreeds.map(b => b.page));
    const lastBreedPage = Math.max(...foundBreeds.map(b => b.page));
    console.log(`\nBreed content appears to be in range: ${firstBreedPage} - ${lastBreedPage}`);
  } else {
    console.log('\n⚠️  No breed pages found in sample!');
    console.log('\nPossible reasons:');
    console.log('1. Breed keywords might not be in titles');
    console.log('2. Breed content might be after page 1377');
    console.log('3. Keywords might not be properly added to getAllKeywords()');
    
    // Let's check if breed content is in the body instead
    console.log('\nChecking if breed content is in page body instead of title...');
    
    const testPage = 1300;
    try {
      const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${testPage}`);
      const html = await response.text();
      
      const hasBreedInBody = breedKeywords.some(breed => html.includes(breed));
      console.log(`Page ${testPage} has breed content in body: ${hasBreedInBody}`);
      
      if (hasBreedInBody) {
        const foundBreedsInBody = breedKeywords.filter(breed => html.includes(breed));
        console.log(`Breeds found in body: ${foundBreedsInBody.join(', ')}`);
      }
    } catch (error) {
      console.error('Error checking page body:', error.message);
    }
  }
}

findActualBreeds().catch(console.error);