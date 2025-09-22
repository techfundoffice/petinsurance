#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

async function extractAndAnalyzeKeywords() {
  console.log('=== STEP 2: EXTRACTING AND ANALYZING getAllKeywords() ===\n');
  
  // Read the index.js file
  const indexContent = readFileSync('./src/index.js', 'utf8');
  
  // Find the getAllKeywords function
  const startMatch = indexContent.match(/function getAllKeywords\(\) {\s*return \[/);
  if (!startMatch) {
    console.error('Could not find getAllKeywords function');
    return;
  }
  
  const startIndex = indexContent.indexOf('return [', startMatch.index) + 8;
  
  // Find the end of the array (look for ]; })
  let depth = 1;
  let endIndex = startIndex;
  let inString = false;
  let escapeNext = false;
  
  for (let i = startIndex; i < indexContent.length; i++) {
    const char = indexContent[i];
    
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    
    if (char === '"' || char === "'") {
      inString = !inString;
      continue;
    }
    
    if (!inString) {
      if (char === '[') depth++;
      if (char === ']') {
        depth--;
        if (depth === 0) {
          endIndex = i;
          break;
        }
      }
    }
  }
  
  // Extract the array content
  const arrayContent = indexContent.substring(startIndex, endIndex);
  
  // Parse the keywords
  const keywordMatches = arrayContent.match(/"[^"]+"/g) || [];
  const keywords = keywordMatches.map(k => k.replace(/"/g, ''));
  
  console.log(`Total keywords found: ${keywords.length}`);
  console.log(`Expected: 1377`);
  console.log(`Match: ${keywords.length === 1377 ? '✓' : '✗'}\n`);
  
  // Show first 20
  console.log('First 20 keywords:');
  for (let i = 0; i < Math.min(20, keywords.length); i++) {
    console.log(`  ${i + 1}: "${keywords[i]}"`);
  }
  
  console.log('\n' + '-'.repeat(60) + '\n');
  
  // Check around position 848
  console.log('Keywords around position 848:');
  for (let i = 845; i <= 855 && i < keywords.length; i++) {
    console.log(`  ${i + 1}: "${keywords[i]}"`);
  }
  
  console.log('\n' + '-'.repeat(60) + '\n');
  
  // Check last 20
  console.log('Last 20 keywords:');
  const startLast = Math.max(0, keywords.length - 20);
  for (let i = startLast; i < keywords.length; i++) {
    console.log(`  ${i + 1}: "${keywords[i]}"`);
  }
  
  console.log('\n' + '-'.repeat(60) + '\n');
  
  // Count breed keywords
  const breedPatterns = [
    'Golden Retriever', 'Labrador Retriever', 'German Shepherd', 'French Bulldog',
    'Bulldog', 'Poodle', 'Beagle', 'Rottweiler', 'Yorkshire Terrier', 'Dachshund',
    'Persian', 'Maine Coon', 'Siamese', 'Bengal', 'Ragdoll', 'British Shorthair',
    'Boxer', 'Husky', 'Great Dane', 'Pug', 'Boston Terrier', 'Shih Tzu',
    'Pomeranian', 'Havanese', 'Shetland Sheepdog', 'Brittany', 'Bernese Mountain Dog',
    'Cocker Spaniel', 'Border Collie', 'Vizsla', 'Basset Hound', 'Sphynx',
    'Scottish Fold', 'Russian Blue', 'Norwegian Forest', 'Abyssinian', 'Devon Rex'
  ];
  
  let breedCount = 0;
  const breedKeywords = [];
  
  keywords.forEach((keyword, index) => {
    if (breedPatterns.some(breed => keyword.includes(breed))) {
      breedCount++;
      if (breedKeywords.length < 20) {
        breedKeywords.push({ position: index + 1, keyword });
      }
    }
  });
  
  console.log('Breed keyword analysis:');
  console.log(`  Total breed-related keywords found: ${breedCount}`);
  console.log(`  First breed keywords found:`);
  breedKeywords.forEach(({ position, keyword }) => {
    console.log(`    Position ${position}: "${keyword}"`);
  });
  
  console.log('\n' + '-'.repeat(60) + '\n');
  
  // Check for duplicates
  const uniqueKeywords = new Set(keywords);
  const duplicateKeywords = [];
  const seen = new Set();
  
  keywords.forEach((keyword, index) => {
    if (seen.has(keyword)) {
      duplicateKeywords.push({ position: index + 1, keyword });
    }
    seen.add(keyword);
  });
  
  console.log('Duplicate check:');
  console.log(`  Total keywords: ${keywords.length}`);
  console.log(`  Unique keywords: ${uniqueKeywords.size}`);
  console.log(`  Duplicates: ${keywords.length - uniqueKeywords.size}`);
  
  if (duplicateKeywords.length > 0) {
    console.log(`  First 5 duplicate keywords:`);
    duplicateKeywords.slice(0, 5).forEach(({ position, keyword }) => {
      console.log(`    Position ${position}: "${keyword}"`);
    });
  }
  
  console.log('\n=== KEY FINDINGS ===');
  console.log(`1. getAllKeywords() contains ${keywords.length} keywords`);
  console.log(`2. Found ${breedCount} breed-related keywords in the array`);
  console.log(`3. ${keywords.length === 1377 ? 'Keyword count matches page count ✓' : 'MISMATCH: Keywords != Page count!'}`);
  console.log(`4. ${duplicateKeywords.length} duplicate keywords exist`);
  
  // Save keywords for analysis
  writeFileSync('extracted-keywords.json', JSON.stringify({
    total: keywords.length,
    keywords: keywords,
    breedCount: breedCount,
    duplicates: duplicateKeywords.length
  }, null, 2));
  
  console.log('\nKeywords saved to extracted-keywords.json');
}

extractAndAnalyzeKeywords().catch(console.error);