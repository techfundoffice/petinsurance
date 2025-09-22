#!/usr/bin/env node

import { readFileSync } from 'fs';

function step1FinalCheck() {
  console.log('=== STEP 1 FINAL CHECK: WHAT EXACTLY DID I REPLACE? ===\n');
  
  // Load current keywords
  const currentData = JSON.parse(readFileSync('actual-current-keywords.json', 'utf8'));
  const currentKeywords = currentData.keywords;
  
  // Check what's at positions 849-1220 (372 positions)
  console.log('Analyzing keywords from position 849 to 1220 (372 keywords)...\n');
  
  const categories = {
    dogBreeds: [],
    catBreeds: [],
    notBreeds: []
  };
  
  // Known breed patterns
  const dogBreedPatterns = [
    'Retriever', 'Shepherd', 'Bulldog', 'Terrier', 'Poodle', 'Beagle', 
    'Rottweiler', 'Dachshund', 'Boxer', 'Husky', 'Great Dane', 'Pug',
    'Mastiff', 'Chihuahua', 'Maltese', 'Collie', 'Akita', 'Shiba Inu',
    'Corgi', 'Spaniel', 'Setter', 'Pointer', 'Whippet', 'Greyhound'
  ];
  
  const catBreedPatterns = [
    'Persian Cat', 'Maine Coon Cat', 'Siamese Cat', 'Bengal Cat', 
    'Ragdoll Cat', 'Sphynx Cat', 'Scottish Fold Cat', 'Russian Blue Cat',
    'Abyssinian Cat', 'Birman Cat', 'Burmese Cat', 'Devon Rex Cat'
  ];
  
  // Check each keyword from 849-1220
  for (let i = 848; i < 1220 && i < currentKeywords.length; i++) {
    const keyword = currentKeywords[i];
    
    if (dogBreedPatterns.some(breed => keyword.includes(breed))) {
      categories.dogBreeds.push({ position: i + 1, keyword });
    } else if (catBreedPatterns.some(breed => keyword.includes(breed))) {
      categories.catBreeds.push({ position: i + 1, keyword });
    } else {
      categories.notBreeds.push({ position: i + 1, keyword });
    }
  }
  
  console.log(`Results for positions 849-1220:`);
  console.log(`  Dog breed keywords: ${categories.dogBreeds.length}`);
  console.log(`  Cat breed keywords: ${categories.catBreeds.length}`);
  console.log(`  NON-breed keywords: ${categories.notBreeds.length}`);
  console.log(`  Total: ${categories.dogBreeds.length + categories.catBreeds.length + categories.notBreeds.length}`);
  
  console.log('\nSample dog breed keywords:');
  categories.dogBreeds.slice(0, 5).forEach(({ position, keyword }) => {
    console.log(`  ${position}: "${keyword}"`);
  });
  
  console.log('\nSample cat breed keywords:');
  categories.catBreeds.slice(0, 5).forEach(({ position, keyword }) => {
    console.log(`  ${position}: "${keyword}"`);
  });
  
  console.log('\nSample NON-breed keywords in this range:');
  categories.notBreeds.slice(0, 10).forEach(({ position, keyword }) => {
    console.log(`  ${position}: "${keyword}"`);
  });
  
  // Check what's after position 1220
  console.log('\n\nWhat\'s after position 1220?');
  for (let i = 1220; i < 1230 && i < currentKeywords.length; i++) {
    console.log(`  ${i + 1}: "${currentKeywords[i]}"`);
  }
  
  console.log('\n=== THE COMPLETE TRUTH ===');
  console.log(`1. I replaced keywords starting at position 849`);
  console.log(`2. But I didn't replace ALL 372 with breed keywords`);
  console.log(`3. In the 849-1220 range:`);
  console.log(`   - ${categories.dogBreeds.length + categories.catBreeds.length} are breed keywords`);
  console.log(`   - ${categories.notBreeds.length} are NOT breed keywords`);
  
  console.log('\n4. Total breed keywords in entire array: 152');
  console.log('   This means some breed keywords exist OUTSIDE the 849-1220 range');
  console.log('   (like positions 11-16, 158-166, 245-254, etc.)');
  
  return {
    replacedRange: [849, 1220],
    breedKeywordsInRange: categories.dogBreeds.length + categories.catBreeds.length,
    nonBreedKeywordsInRange: categories.notBreeds.length
  };
}

step1FinalCheck();