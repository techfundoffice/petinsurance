#!/usr/bin/env node

async function findAllBreedPages() {
  console.log('=== STEP 1: FINDING ALL BREED PAGES ===\n');
  
  // Define all breeds we're looking for
  const dogBreeds = [
    'Golden Retriever', 'Labrador Retriever', 'German Shepherd', 'French Bulldog',
    'Bulldog', 'Poodle', 'Beagle', 'Rottweiler', 'Yorkshire Terrier', 'Dachshund',
    'Boxer', 'Siberian Husky', 'Great Dane', 'Pug', 'Boston Terrier',
    'Shih Tzu', 'Pomeranian', 'Havanese', 'Shetland Sheepdog', 'Brittany',
    'Bernese Mountain Dog', 'Cocker Spaniel', 'Border Collie', 'Vizsla', 'Basset Hound'
  ];
  
  const catBreeds = [
    'Persian', 'Maine Coon', 'Siamese', 'Ragdoll', 'British Shorthair',
    'Sphynx', 'Bengal', 'Scottish Fold', 'Russian Blue', 'Norwegian Forest',
    'Abyssinian', 'American Shorthair', 'Devon Rex', 'Oriental Shorthair', 'Birman',
    'Tonkinese', 'Somali', 'Egyptian Mau', 'Ocicat', 'Burmese'
  ];
  
  const allBreeds = [...dogBreeds, ...catBreeds];
  const foundBreedPages = [];
  const totalPages = 1377;
  
  console.log(`Scanning all ${totalPages} pages for breed content...`);
  console.log('This will take a few minutes...\n');
  
  // Check EVERY page
  for (let page = 1; page <= totalPages; page++) {
    if (page % 100 === 0) {
      console.log(`Progress: ${page}/${totalPages} pages checked...`);
    }
    
    try {
      const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${page}`);
      const html = await response.text();
      
      // Extract title
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].split(' - Page')[0] : '';
      
      // Check if title contains any breed
      let foundBreed = null;
      for (const breed of allBreeds) {
        if (title.includes(breed)) {
          foundBreed = breed;
          break;
        }
      }
      
      if (foundBreed) {
        const type = dogBreeds.includes(foundBreed) ? 'dog' : 'cat';
        foundBreedPages.push({
          page,
          title,
          breed: foundBreed,
          type
        });
        console.log(`✓ Found: Page ${page} - ${title}`);
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 20));
      
    } catch (error) {
      console.error(`Error checking page ${page}: ${error.message}`);
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('COMPLETE BREED PAGE INVENTORY');
  console.log('='.repeat(60));
  console.log(`Total pages scanned: ${totalPages}`);
  console.log(`Total breed pages found: ${foundBreedPages.length}`);
  console.log(`Percentage of breed pages: ${(foundBreedPages.length / totalPages * 100).toFixed(2)}%`);
  
  // Group by breed
  console.log('\nBreed Distribution:');
  const breedCounts = {};
  foundBreedPages.forEach(page => {
    breedCounts[page.breed] = (breedCounts[page.breed] || 0) + 1;
  });
  
  Object.entries(breedCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([breed, count]) => {
      console.log(`  ${breed}: ${count} pages`);
    });
  
  // Show page ranges
  console.log('\nPage Number Ranges:');
  if (foundBreedPages.length > 0) {
    const dogPages = foundBreedPages.filter(p => p.type === 'dog').map(p => p.page);
    const catPages = foundBreedPages.filter(p => p.type === 'cat').map(p => p.page);
    
    if (dogPages.length > 0) {
      console.log(`  Dog breed pages: ${Math.min(...dogPages)} - ${Math.max(...dogPages)}`);
      console.log(`  Dog breed count: ${dogPages.length}`);
    }
    
    if (catPages.length > 0) {
      console.log(`  Cat breed pages: ${Math.min(...catPages)} - ${Math.max(...catPages)}`);
      console.log(`  Cat breed count: ${catPages.length}`);
    }
  }
  
  // Save results
  const fs = require('fs').promises;
  await fs.writeFile(
    'breed-pages-inventory.json', 
    JSON.stringify(foundBreedPages, null, 2)
  );
  console.log('\nResults saved to breed-pages-inventory.json');
  
  return foundBreedPages;
}

findAllBreedPages().catch(console.error);