#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

async function updateKeywordsInIndex() {
  console.log('=== UPDATING getAllKeywords() WITH BREED KEYWORDS ===\n');
  
  // Load the replacement plan
  const plan = JSON.parse(readFileSync('breed-keyword-replacement-plan.json', 'utf8'));
  const newBreedKeywords = plan.newBreedKeywords;
  
  // Load the current index.js
  let indexContent = readFileSync('./src/index.js', 'utf8');
  
  // Find the getAllKeywords function
  const functionStart = indexContent.indexOf('function getAllKeywords() {');
  const arrayStart = indexContent.indexOf('return [', functionStart);
  const arrayEnd = indexContent.indexOf('];', arrayStart);
  
  // Extract current keywords array content
  const arrayContent = indexContent.substring(arrayStart + 8, arrayEnd);
  const currentKeywords = arrayContent.match(/"[^"]+"/g).map(k => k.replace(/"/g, ''));
  
  console.log(`Current keywords: ${currentKeywords.length}`);
  console.log(`Keywords to replace: ${plan.keywordsToReplace.length}`);
  console.log(`New breed keywords: ${newBreedKeywords.length}`);
  
  // Create the updated keywords array
  const updatedKeywords = [...currentKeywords];
  
  // Replace keywords starting at position 849 (index 848)
  let replacementIndex = 0;
  for (let i = 848; i < updatedKeywords.length && replacementIndex < newBreedKeywords.length; i++) {
    updatedKeywords[i] = newBreedKeywords[replacementIndex];
    replacementIndex++;
  }
  
  // If we still have breed keywords left, we need to append them
  if (replacementIndex < newBreedKeywords.length) {
    console.log(`\nNote: Only replaced ${replacementIndex} keywords. ${newBreedKeywords.length - replacementIndex} breed keywords not added.`);
  }
  
  // Generate the new array content
  const newArrayContent = updatedKeywords.map(k => `    "${k}"`).join(',\n');
  
  // Replace in the file content
  const newFunctionContent = `function getAllKeywords() {
  return [
${newArrayContent}
  ];
}`;
  
  // Find and replace the entire function
  const functionEnd = indexContent.indexOf('}', arrayEnd);
  const oldFunctionContent = indexContent.substring(functionStart, functionEnd + 1);
  
  indexContent = indexContent.replace(oldFunctionContent, newFunctionContent);
  
  // Write the updated file
  writeFileSync('./src/index.js', indexContent);
  
  console.log('\n✅ Successfully updated getAllKeywords() function');
  console.log(`   Total keywords: ${updatedKeywords.length}`);
  
  // Count breed keywords in the updated array
  const breedCount = updatedKeywords.filter(k => 
    k.includes('Retriever') || k.includes('Shepherd') || k.includes('Bulldog') ||
    k.includes('Terrier') || k.includes('Persian') || k.includes('Maine Coon') ||
    k.includes('Siamese') || k.includes('Bengal') || k.includes('Poodle') ||
    k.includes('Beagle') || k.includes('Husky') || k.includes('Dane') ||
    k.includes('Pug') || k.includes('Mastiff') || k.includes('Spaniel')
  ).length;
  
  console.log(`   Breed keywords: ${breedCount}`);
  console.log(`   Original keywords preserved: 848`);
  console.log(`   Emergency/dental keywords replaced: ${replacementIndex}`);
  
  // Test a few pages
  console.log('\n📊 Testing implementation...');
  
  // Verify the health endpoint shows correct count
  const healthResponse = await fetch('https://million-pages.catsluvusboardinghotel.workers.dev/health');
  const healthData = await healthResponse.json();
  console.log(`   Health check - Total keywords: ${healthData.keywords}`);
  
  return {
    totalKeywords: updatedKeywords.length,
    breedKeywords: breedCount,
    replacedCount: replacementIndex
  };
}

updateKeywordsInIndex().catch(console.error);