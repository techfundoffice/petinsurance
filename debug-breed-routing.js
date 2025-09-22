#!/usr/bin/env node

// Simulate what's happening in the worker
function getKeywordType(title, keywordIndex) {
  const titleLower = title.toLowerCase();
  
  console.log(`  getKeywordType called with:`);
  console.log(`    title: "${title}"`);
  console.log(`    keywordIndex: ${keywordIndex}`);
  console.log(`    titleLower: "${titleLower}"`);
  
  // Simulate breed checking
  const dogBreeds = ['Yorkshire Terrier', 'Golden Retriever', 'Labrador Retriever'];
  const catBreeds = ['Persian', 'Bengal', 'Maine Coon', 'Siamese'];
  
  // Check for dog breeds
  for (const breed of dogBreeds) {
    if (titleLower.includes(breed.toLowerCase()) && !titleLower.includes('cat')) {
      console.log(`    MATCH: Dog breed "${breed}" found`);
      return 'dog-breed';
    }
  }
  
  // Check for cat breeds
  for (const breed of catBreeds) {
    console.log(`    Checking cat breed "${breed}" (${breed.toLowerCase()}) in "${titleLower}"`);
    console.log(`      includes breed: ${titleLower.includes(breed.toLowerCase())}`);
    console.log(`      includes 'cat': ${titleLower.includes('cat')}`);
    if (titleLower.includes(breed.toLowerCase()) && titleLower.includes('cat')) {
      console.log(`    MATCH: Cat breed "${breed}" found`);
      return 'cat-breed';
    }
  }
  
  console.log(`    NO MATCH: Defaulting to 'insurance'`);
  return 'insurance';
}

// Test cases
const testCases = [
  { title: 'Persian Cat Health Insurance', index: 11 },
  { title: 'Bengal Cat Insurance Options', index: 161 },
  { title: 'Yorkshire Terrier Insurance', index: 251 }
];

console.log('=== DEBUGGING BREED ROUTING ===\n');

for (const { title, index } of testCases) {
  console.log(`Testing: ${title}`);
  const type = getKeywordType(title, index);
  console.log(`  Result: ${type}`);
  console.log('');
}