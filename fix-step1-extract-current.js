#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

async function extractCurrentKeywords() {
  console.log('=== STEP 1: EXTRACTING ACTUAL CURRENT KEYWORDS ===\n');
  
  // Read the CURRENT index.js file
  const indexContent = readFileSync('./src/index.js', 'utf8');
  
  // Find the getAllKeywords function
  const startMatch = indexContent.match(/function getAllKeywords\(\) {\s*return \[/);
  if (!startMatch) {
    console.error('Could not find getAllKeywords function');
    return;
  }
  
  const startIndex = indexContent.indexOf('return [', startMatch.index) + 8;
  
  // Find the end of the array
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
  
  // Show what's ACTUALLY at positions 849-860
  console.log('\nActual keywords at positions 849-860:');
  for (let i = 848; i < 860 && i < keywords.length; i++) {
    console.log(`  ${i + 1}: "${keywords[i]}"`);
  }
  
  // Count breed keywords with comprehensive patterns
  const breedPatterns = [
    'Retriever', 'Shepherd', 'Bulldog', 'Terrier', 'Persian', 'Maine Coon', 
    'Siamese', 'Bengal', 'Ragdoll', 'Sphynx', 'Scottish Fold', 'Russian Blue',
    'Poodle', 'Beagle', 'Rottweiler', 'Dachshund', 'Boxer', 'Husky',
    'Great Dane', 'Pug', 'Mastiff', 'Chihuahua', 'Maltese', 'Collie',
    'Akita', 'Shiba Inu', 'Corgi', 'Spaniel', 'Setter', 'Pointer'
  ];
  
  let breedCount = 0;
  const breedKeywords = [];
  
  keywords.forEach((keyword, index) => {
    if (breedPatterns.some(breed => keyword.includes(breed))) {
      breedCount++;
      breedKeywords.push({ position: index + 1, keyword });
    }
  });
  
  console.log(`\nBreed keywords found: ${breedCount}`);
  
  // Save the ACTUAL current keywords
  const actualData = {
    total: keywords.length,
    keywords: keywords,
    breedCount: breedCount,
    breedKeywords: breedKeywords,
    extractedAt: new Date().toISOString(),
    extractedFrom: 'src/index.js (current deployed version)'
  };
  
  writeFileSync('actual-current-keywords.json', JSON.stringify(actualData, null, 2));
  
  console.log('\n✅ Saved ACTUAL current keywords to actual-current-keywords.json');
  console.log(`   This file contains the TRUTH about what's currently in getAllKeywords()`);
  
  // Also update the old extracted-keywords.json
  writeFileSync('extracted-keywords.json', JSON.stringify(actualData, null, 2));
  console.log('✅ Updated extracted-keywords.json with current data');
  
  return actualData;
}

extractCurrentKeywords().catch(console.error);