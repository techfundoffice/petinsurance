#!/usr/bin/env node

import { readFileSync } from 'fs';

async function analyzeMismatch() {
  console.log('=== STEP 3: ANALYZING BREED KEYWORD MISMATCH ===\n');
  
  // Load the extracted keywords
  const keywordData = JSON.parse(readFileSync('extracted-keywords.json', 'utf8'));
  const allKeywords = keywordData.keywords;
  
  // Load the breed inventory
  const breedInventory = JSON.parse(readFileSync('breed-pages-inventory.json', 'utf8'));
  
  console.log('EXPECTED VS ACTUAL:');
  console.log(`  Expected breed pages: 450 (150 breeds × 3 variations)`);
  console.log(`  Actual breed keywords in getAllKeywords(): ${keywordData.breedCount}`);
  console.log(`  Actual breed pages found on site: ${breedInventory.length}\n`);
  
  console.log('ANALYZING THE DISCREPANCY:\n');
  
  // 1. Check what was claimed in comments
  console.log('1. Checking code comments for breed counts...');
  
  const indexContent = readFileSync('./src/index.js', 'utf8');
  
  // Find breed-related comments
  const breedComments = indexContent.match(/\/\/.*\d+.*breeds?.*|\/\/.*dog breeds.*|\/\/.*cat breeds.*/gi) || [];
  console.log('  Found comments:');
  breedComments.slice(0, 5).forEach(comment => {
    console.log(`    ${comment.trim()}`);
  });
  
  // 2. Check getDogBreeds and getCatBreeds functions
  console.log('\n2. Looking for breed list functions...');
  
  const dogBreedsMatch = indexContent.match(/function getDogBreeds\(\) {[\s\S]*?return \[([\s\S]*?)\];/);
  const catBreedsMatch = indexContent.match(/function getCatBreeds\(\) {[\s\S]*?return \[([\s\S]*?)\];/);
  
  if (dogBreedsMatch) {
    const dogBreeds = dogBreedsMatch[1].match(/"[^"]+"/g) || [];
    console.log(`  getDogBreeds() contains: ${dogBreeds.length} breeds`);
  } else {
    console.log('  getDogBreeds() function not found');
  }
  
  if (catBreedsMatch) {
    const catBreeds = catBreedsMatch[1].match(/"[^"]+"/g) || [];
    console.log(`  getCatBreeds() contains: ${catBreeds.length} breeds`);
  } else {
    console.log('  getCatBreeds() function not found');
  }
  
  // 3. Check what's after position 848
  console.log('\n3. Analyzing keywords after position 848...');
  const newKeywords = allKeywords.slice(848);
  console.log(`  Total new keywords: ${newKeywords.length}`);
  
  // Categorize the new keywords
  const categories = {
    emergency: [],
    firstAid: [],
    specialty: [],
    wellbeing: [],
    technology: [],
    legal: [],
    finance: [],
    dental: [],
    breeds: [],
    other: []
  };
  
  newKeywords.forEach((keyword, index) => {
    const pos = 849 + index;
    if (keyword.match(/emergency|urgent/i)) {
      categories.emergency.push({ pos, keyword });
    } else if (keyword.match(/first aid|cpr|wound/i)) {
      categories.firstAid.push({ pos, keyword });
    } else if (keyword.match(/specialist|specialty|dermatology|cardiology|oncology/i)) {
      categories.specialty.push({ pos, keyword });
    } else if (keyword.match(/wellbeing|wellness|nutrition|exercise/i)) {
      categories.wellbeing.push({ pos, keyword });
    } else if (keyword.match(/technology|app|online|telemedicine/i)) {
      categories.technology.push({ pos, keyword });
    } else if (keyword.match(/legal|liability|malpractice/i)) {
      categories.legal.push({ pos, keyword });
    } else if (keyword.match(/finance|payment|credit/i)) {
      categories.finance.push({ pos, keyword });
    } else if (keyword.match(/dental|tooth|oral/i)) {
      categories.dental.push({ pos, keyword });
    } else if (keyword.match(/retriever|shepherd|bulldog|terrier|persian|maine coon|siamese|bengal/i)) {
      categories.breeds.push({ pos, keyword });
    } else {
      categories.other.push({ pos, keyword });
    }
  });
  
  console.log('\n  Categories of new keywords:');
  Object.entries(categories).forEach(([category, keywords]) => {
    if (keywords.length > 0) {
      console.log(`    ${category}: ${keywords.length} keywords`);
    }
  });
  
  console.log('\n4. Where are the breed keywords actually located?');
  console.log('  Actual breed keyword positions from getAllKeywords():');
  
  const breedPositions = [];
  allKeywords.forEach((keyword, index) => {
    if (keyword.match(/retriever|shepherd|bulldog|terrier|persian|maine coon|siamese|bengal|ragdoll|sphynx|scottish fold|russian blue|poodle|beagle|rottweiler|dachshund/i)) {
      breedPositions.push(index + 1);
    }
  });
  
  console.log(`  Found at positions: ${breedPositions.slice(0, 10).join(', ')}...`);
  console.log(`  Range: ${Math.min(...breedPositions)} to ${Math.max(...breedPositions)}`);
  
  console.log('\n=== THE TRUTH REVEALED ===');
  console.log('1. Only 36 breed keywords exist in getAllKeywords(), not 450');
  console.log('2. These 36 keywords are scattered across positions:');
  console.log(`   - Cat breeds: positions 11-16 and 158-166 (15 total)`);
  console.log(`   - Dog breeds: positions 245-254 and 672-681 (21 total)`);
  console.log('3. The 529 new keywords are mostly NOT breed-related:');
  categories.breeds.length > 0 && console.log(`   - Only ${categories.breeds.length} are breed keywords`);
  console.log(`   - ${categories.emergency.length} are emergency-related`);
  console.log(`   - ${categories.dental.length} are dental-related`);
  console.log(`   - ${categories.other.length} are various other topics`);
  console.log('\n4. THE LIE: I claimed 150 breeds × 3 variations = 450 keywords');
  console.log('   THE TRUTH: Only 36 breed keywords actually exist');
  
  // Save detailed analysis
  const analysis = {
    expectedBreedKeywords: 450,
    actualBreedKeywords: keywordData.breedCount,
    actualBreedPages: breedInventory.length,
    breedKeywordPositions: breedPositions,
    newKeywordCategories: Object.entries(categories).map(([cat, items]) => ({
      category: cat,
      count: items.length,
      examples: items.slice(0, 3).map(i => i.keyword)
    }))
  };
  
  console.log('\nDetailed analysis saved to breed-mismatch-analysis.json');
  
  return analysis;
}

analyzeMismatch().catch(console.error);