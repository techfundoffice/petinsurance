#!/usr/bin/env node

import { readFileSync } from 'fs';

async function validateStep1Truth() {
  console.log('=== VALIDATING STEP 1: AM I STILL LYING? ===\n');
  
  // 1. Load what I just saved
  const savedData = JSON.parse(readFileSync('actual-current-keywords.json', 'utf8'));
  console.log('1. What I saved in actual-current-keywords.json:');
  console.log(`   Total keywords: ${savedData.total}`);
  console.log(`   Breed keywords: ${savedData.breedCount}`);
  console.log(`   Keyword at 849: "${savedData.keywords[848]}"`);
  
  // 2. Double-check against the live site
  console.log('\n2. Testing against LIVE SITE to verify truth...');
  
  const testPages = [849, 850, 851, 852, 853];
  let matches = 0;
  let mismatches = 0;
  
  for (let i = 0; i < testPages.length; i++) {
    const page = testPages[i];
    const expectedKeyword = savedData.keywords[page - 1];
    
    try {
      const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${page}`);
      const html = await response.text();
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const actualTitle = titleMatch ? titleMatch[1].split(' - Page')[0] : '';
      
      const match = actualTitle === expectedKeyword;
      console.log(`   Page ${page}:`);
      console.log(`     Expected: "${expectedKeyword}"`);
      console.log(`     Actual:   "${actualTitle}"`);
      console.log(`     Match: ${match ? '✓' : '✗ MISMATCH!'}`);
      
      if (match) matches++;
      else mismatches++;
      
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.log(`   Page ${page}: Error - ${error.message}`);
      mismatches++;
    }
  }
  
  // 3. Verify my breed count is accurate
  console.log('\n3. Verifying breed count accuracy...');
  
  // Manual count of some breed keywords
  const breedKeywords = savedData.keywords.filter(k => 
    k.includes('Retriever') || k.includes('Shepherd') || k.includes('Bulldog') ||
    k.includes('Terrier') || k.includes('Persian') || k.includes('Maine Coon') ||
    k.includes('Siamese') || k.includes('Bengal') || k.includes('Poodle') ||
    k.includes('Beagle') || k.includes('Rottweiler') || k.includes('Dachshund') ||
    k.includes('Great Dane') || k.includes('Pug')
  );
  
  console.log(`   My claimed breed count: ${savedData.breedCount}`);
  console.log(`   Quick recount of common breeds: ${breedKeywords.length}`);
  console.log(`   Sample breed keywords found:`);
  breedKeywords.slice(0, 5).forEach((k, i) => {
    const pos = savedData.keywords.indexOf(k) + 1;
    console.log(`     Position ${pos}: "${k}"`);
  });
  
  // 4. Check if I'm missing any breed keywords
  console.log('\n4. Checking for missed breed keywords...');
  
  const additionalBreedPatterns = [
    'Boxer', 'Husky', 'Mastiff', 'Chihuahua', 'Maltese', 'Collie',
    'Akita', 'Shiba Inu', 'Corgi', 'Spaniel', 'Setter', 'Pointer',
    'Sphynx', 'Scottish Fold', 'Russian Blue', 'Ragdoll'
  ];
  
  let additionalFound = 0;
  additionalBreedPatterns.forEach(pattern => {
    const found = savedData.keywords.filter(k => k.includes(pattern)).length;
    if (found > 0) {
      additionalFound += found;
      console.log(`   Found ${found} keywords with "${pattern}"`);
    }
  });
  
  // 5. Final truth check
  console.log('\n=== FINAL TRUTH CHECK ===');
  console.log(`Live site matches saved data: ${matches}/${testPages.length}`);
  console.log(`Mismatches: ${mismatches}`);
  
  if (mismatches > 0) {
    console.log('\n❌ STILL LYING: Saved data doesn\'t match live site!');
  } else {
    console.log('\n✅ TRUTH CONFIRMED: Saved data matches live site');
  }
  
  // 6. Check the original claim
  console.log('\n=== CHECKING ORIGINAL CLAIMS ===');
  console.log('I originally claimed:');
  console.log('- 450 breed keywords (150 breeds × 3 variations)');
  console.log('- Replaced 372 emergency keywords with breed keywords');
  
  console.log('\nActual truth:');
  console.log(`- ${savedData.breedCount} breed keywords exist in getAllKeywords()`);
  console.log('- Let me check how many were actually replaced...');
  
  // Load the backup to compare
  try {
    const backupContent = readFileSync('./src/index.js.backup', 'utf8');
    const backupMatch = backupContent.match(/function getAllKeywords\(\) {\s*return \[([\s\S]*?)\];\s*}/);
    if (backupMatch) {
      const backupKeywords = backupMatch[1].match(/"[^"]+"/g).map(k => k.replace(/"/g, ''));
      
      let replacedCount = 0;
      for (let i = 848; i < savedData.keywords.length; i++) {
        if (backupKeywords[i] !== savedData.keywords[i]) {
          replacedCount++;
        }
      }
      
      console.log(`- Actually replaced ${replacedCount} keywords starting at position 849`);
    }
  } catch (error) {
    console.log('- Cannot verify replacements (no backup found)');
  }
  
  return {
    dataMatches: mismatches === 0,
    breedCount: savedData.breedCount,
    claimedBreedCount: 450
  };
}

validateStep1Truth().catch(console.error);