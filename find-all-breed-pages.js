#!/usr/bin/env node

async function findAllBreedPages() {
  console.log('=== SEARCHING FOR ALL BREED PAGES ===\n');
  
  const breedPages = [];
  const dogBreeds = [
    'Golden Retriever', 'Labrador Retriever', 'German Shepherd', 'French Bulldog',
    'Bulldog', 'Poodle', 'Beagle', 'Rottweiler', 'Yorkshire Terrier', 'Dachshund'
  ];
  const catBreeds = [
    'Persian', 'Maine Coon', 'Siamese', 'Ragdoll', 'British Shorthair',
    'Sphynx', 'Bengal', 'Scottish Fold', 'Russian Blue', 'Norwegian Forest'
  ];
  
  // Sample pages across the entire range
  const pagesToCheck = [];
  for (let i = 1; i <= 1377; i += 20) {
    pagesToCheck.push(i);
  }
  
  console.log(`Checking ${pagesToCheck.length} pages for breed content...\n`);
  
  for (const pageNum of pagesToCheck) {
    try {
      const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${pageNum}`);
      const html = await response.text();
      
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].split(' - Page')[0] : '';
      
      // Check for any breed in title
      let foundBreed = null;
      let breedType = null;
      
      for (const breed of dogBreeds) {
        if (title.includes(breed)) {
          foundBreed = breed;
          breedType = 'dog';
          break;
        }
      }
      
      if (!foundBreed) {
        for (const breed of catBreeds) {
          if (title.includes(breed)) {
            foundBreed = breed;
            breedType = 'cat';
            break;
          }
        }
      }
      
      if (foundBreed) {
        breedPages.push({
          page: pageNum,
          title: title,
          breed: foundBreed,
          type: breedType
        });
        console.log(`✓ Page ${pageNum}: ${title} [${foundBreed}]`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      // Continue on error
    }
  }
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Total breed pages found: ${breedPages.length}`);
  console.log(`Dog breed pages: ${breedPages.filter(p => p.type === 'dog').length}`);
  console.log(`Cat breed pages: ${breedPages.filter(p => p.type === 'cat').length}`);
  
  if (breedPages.length > 0) {
    console.log('\nBreed distribution:');
    const breedCounts = {};
    breedPages.forEach(page => {
      breedCounts[page.breed] = (breedCounts[page.breed] || 0) + 1;
    });
    
    for (const [breed, count] of Object.entries(breedCounts)) {
      console.log(`  ${breed}: ${count} pages`);
    }
  }
  
  // Test the actual content of a few pages
  console.log('\n=== CONTENT VERIFICATION ===');
  for (const page of breedPages.slice(0, 3)) {
    console.log(`\nVerifying content for page ${page.page} (${page.title})...`);
    
    try {
      const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${page.page}`);
      const html = await response.text();
      
      // Check key indicators
      const hasBreedContent = html.includes(`${page.breed}s are beloved companions`);
      const hasHealthInfo = html.includes('health risks') || html.includes('health issues');
      const hasInsuranceCosts = (html.match(/\$\d+/g) || []).length > 5;
      const isUsingBreedGenerator = hasBreedContent && hasHealthInfo && hasInsuranceCosts;
      
      console.log(`  Using breed generator: ${isUsingBreedGenerator ? '✓ YES' : '✗ NO'}`);
      if (!isUsingBreedGenerator) {
        console.log(`  - Has breed intro: ${hasBreedContent}`);
        console.log(`  - Has health info: ${hasHealthInfo}`);
        console.log(`  - Has cost data: ${hasInsuranceCosts}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.log(`  Error: ${error.message}`);
    }
  }
}

findAllBreedPages().catch(console.error);