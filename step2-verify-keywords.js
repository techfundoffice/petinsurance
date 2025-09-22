#!/usr/bin/env node

// Import the getAllKeywords function from the worker
import { getAllKeywords } from './src/index.js';

async function verifyKeywords() {
  console.log('=== STEP 2: VERIFYING getAllKeywords() FUNCTION ===\n');
  
  const allKeywords = getAllKeywords();
  
  console.log(`Total keywords: ${allKeywords.length}`);
  console.log(`Expected: 1377`);
  console.log(`Match: ${allKeywords.length === 1377 ? '✓' : '✗'}\n`);
  
  // Check structure of first 20 keywords
  console.log('First 20 keywords:');
  for (let i = 0; i < 20; i++) {
    console.log(`  ${i + 1}: "${allKeywords[i]}"`);
  }
  
  console.log('\n' + '-'.repeat(60) + '\n');
  
  // Check keywords around the 848 boundary
  console.log('Keywords around position 848 (original/new boundary):');
  for (let i = 845; i <= 855; i++) {
    if (i < allKeywords.length) {
      console.log(`  ${i + 1}: "${allKeywords[i]}"`);
    }
  }
  
  console.log('\n' + '-'.repeat(60) + '\n');
  
  // Check last 20 keywords
  console.log('Last 20 keywords:');
  for (let i = Math.max(0, allKeywords.length - 20); i < allKeywords.length; i++) {
    console.log(`  ${i + 1}: "${allKeywords[i]}"`);
  }
  
  console.log('\n' + '-'.repeat(60) + '\n');
  
  // Count breed-related keywords
  const breedKeywords = [
    'Golden Retriever', 'Labrador Retriever', 'German Shepherd', 'French Bulldog',
    'Bulldog', 'Poodle', 'Beagle', 'Rottweiler', 'Yorkshire Terrier', 'Dachshund',
    'Persian', 'Maine Coon', 'Siamese', 'Bengal', 'Ragdoll', 'British Shorthair'
  ];
  
  let breedCount = 0;
  const breedPositions = [];
  
  for (let i = 0; i < allKeywords.length; i++) {
    const keyword = allKeywords[i];
    if (breedKeywords.some(breed => keyword.includes(breed))) {
      breedCount++;
      breedPositions.push({ position: i + 1, keyword });
    }
  }
  
  console.log('Breed keyword analysis:');
  console.log(`  Total breed-related keywords found: ${breedCount}`);
  console.log(`  First 10 breed keyword positions:`);
  breedPositions.slice(0, 10).forEach(({ position, keyword }) => {
    console.log(`    Position ${position}: "${keyword}"`);
  });
  
  if (breedPositions.length > 10) {
    console.log(`  ... and ${breedPositions.length - 10} more`);
  }
  
  console.log('\n' + '-'.repeat(60) + '\n');
  
  // Check for duplicates
  const uniqueKeywords = new Set(allKeywords);
  console.log('Duplicate check:');
  console.log(`  Total keywords: ${allKeywords.length}`);
  console.log(`  Unique keywords: ${uniqueKeywords.size}`);
  console.log(`  Duplicates: ${allKeywords.length - uniqueKeywords.size}`);
  
  console.log('\n=== FINDINGS ===');
  console.log(`1. getAllKeywords() returns ${allKeywords.length} keywords`);
  console.log(`2. Found ${breedCount} breed-related keywords in the array`);
  console.log(`3. Breed keywords start appearing at position ${breedPositions[0]?.position || 'N/A'}`);
  console.log(`4. ${allKeywords.length - uniqueKeywords.size} duplicate keywords exist`);
  
  return {
    total: allKeywords.length,
    breedCount,
    breedPositions,
    duplicates: allKeywords.length - uniqueKeywords.size
  };
}

verifyKeywords().catch(console.error);