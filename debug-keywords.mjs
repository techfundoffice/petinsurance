#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the worker code
const workerCode = fs.readFileSync(path.join(__dirname, 'src/index.js'), 'utf8');

// Extract the keywords array more carefully
const keywordsMatch = workerCode.match(/const keywords = \[([\s\S]*?)\s*\];\s*const originalKeywords = keywords;/);

if (keywordsMatch) {
  const keywordsContent = keywordsMatch[1];
  const keywordsList = keywordsContent.match(/"[^"]+"/g);
  
  console.log('Original keywords in first array:', keywordsList.length);
  console.log('Last 5 original keywords:');
  for (let i = keywordsList.length - 5; i < keywordsList.length; i++) {
    console.log(`  ${i + 1}: ${keywordsList[i]}`);
  }
  
  // Now check if breed keywords are being added
  console.log('\nChecking for breed keyword addition...');
  
  // Look for the return statement in getAllKeywords
  const returnMatch = workerCode.match(/return \[\s*\.\.\.originalKeywords,[\s\S]*?\];/);
  if (returnMatch) {
    console.log('\nFound getAllKeywords return statement:');
    console.log(returnMatch[0].substring(0, 200) + '...');
    
    // Count the spread operations
    const spreads = returnMatch[0].match(/\.\.\.\w+/g);
    console.log('\nSpread operations found:', spreads.length);
    spreads.forEach(s => console.log(`  ${s}`));
  }
} else {
  console.error('Could not find keywords array');
}

// Also check for the actual breed arrays
const dogBreedsMatch = workerCode.match(/function getDogBreeds\(\) \{[\s\S]*?return \[([\s\S]*?)\];\s*\}/);
if (dogBreedsMatch) {
  const breeds = dogBreedsMatch[1].match(/"[^"]+"/g);
  console.log('\nDog breeds found:', breeds.length);
  console.log('First 5 dog breeds:', breeds.slice(0, 5).map(b => b.replace(/"/g, '')));
}

const catBreedsMatch = workerCode.match(/function getCatBreeds\(\) \{[\s\S]*?return \[([\s\S]*?)\];\s*\}/);
if (catBreedsMatch) {
  const breeds = catBreedsMatch[1].match(/"[^"]+"/g);
  console.log('\nCat breeds found:', breeds.length);
  console.log('First 5 cat breeds:', breeds.slice(0, 5).map(b => b.replace(/"/g, '')));
}