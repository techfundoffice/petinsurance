#!/usr/bin/env node

async function verifyBreedGenerators() {
  console.log('=== STEP 5: VERIFYING BREED PAGES USE CORRECT GENERATORS ===\n');
  
  // Test some of the new breed pages we added
  const testPages = [
    { page: 849, expectedBreed: 'Great Dane', type: 'dog' },
    { page: 850, expectedBreed: 'Great Dane', type: 'dog' },  
    { page: 851, expectedBreed: 'Great Dane', type: 'dog' },
    { page: 852, expectedBreed: 'Pug', type: 'dog' },
    { page: 855, expectedBreed: 'Boston Terrier', type: 'dog' },
    { page: 900, expectedBreed: 'Mastiff', type: 'dog' },
    { page: 950, expectedBreed: 'Chihuahua', type: 'dog' },
    { page: 1000, expectedBreed: 'Rhodesian Ridgeback', type: 'dog' }
  ];
  
  console.log('Testing new breed pages to ensure they use breed generators...\n');
  
  let passCount = 0;
  let failCount = 0;
  
  for (const test of testPages) {
    console.log(`Testing Page ${test.page}:`);
    
    try {
      const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${test.page}`);
      const html = await response.text();
      
      // Extract title
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].split(' - Page')[0] : 'No title';
      console.log(`  Title: "${title}"`);
      
      // Check if it contains breed
      const hasBreed = title.includes(test.expectedBreed);
      console.log(`  Contains ${test.expectedBreed}: ${hasBreed ? '✓' : '✗'}`);
      
      // Check for breed generator signatures
      const breedGeneratorSignatures = [
        'beloved companions known for their unique characteristics',
        'Real cases illustrate the importance',
        'How much does.*insurance cost',
        'Protecting your'
      ];
      
      const genericSignatures = [
        'Understanding Your Options',
        'financial well-being, understanding',
        'Comprehensive Overview of Pet Insurance'
      ];
      
      const hasBreedContent = breedGeneratorSignatures.some(sig => html.includes(sig));
      const hasGenericContent = genericSignatures.some(sig => html.includes(sig));
      
      console.log(`  Using breed generator: ${hasBreedContent ? '✓' : '✗'}`);
      console.log(`  Using generic generator: ${hasGenericContent ? '✗ YES' : '✓ NO'}`);
      
      // Extract intro to verify breed-specific content
      const introMatch = html.match(/<h2>Introduction<\/h2>\s*<p>([^<]+)</);
      if (introMatch && hasBreed) {
        const intro = introMatch[1].substring(0, 100);
        console.log(`  Intro: "${intro}..."`);
      }
      
      const testPassed = hasBreed && hasBreedContent && !hasGenericContent;
      console.log(`  Result: ${testPassed ? '✓ PASS' : '✗ FAIL'}`);
      
      if (testPassed) passCount++;
      else failCount++;
      
      console.log();
      
      // Small delay
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.log(`  Error: ${error.message}`);
      console.log(`  Result: ✗ FAIL\n`);
      failCount++;
    }
  }
  
  console.log('=== SUMMARY ===');
  console.log(`Tests passed: ${passCount}/${testPages.length}`);
  console.log(`Tests failed: ${failCount}/${testPages.length}`);
  
  if (failCount > 0) {
    console.log('\n⚠️  ISSUE DETECTED:');
    console.log('Some new breed pages are not using breed generators.');
    console.log('This might be because:');
    console.log('1. The getKeywordType() function needs updating');
    console.log('2. The keyword format doesn\'t match the breed detection pattern');
  } else {
    console.log('\n✅ All tested pages are using breed-specific generators!');
  }
  
  // Also test some original breed pages to ensure they still work
  console.log('\n=== TESTING ORIGINAL BREED PAGES ===');
  const originalPages = [11, 161, 251];
  
  for (const page of originalPages) {
    const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${page}`);
    const html = await response.text();
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1].split(' - Page')[0] : 'No title';
    
    const hasBreedContent = html.includes('beloved companions known for their unique characteristics');
    console.log(`Page ${page} ("${title}"): ${hasBreedContent ? '✓ Still works' : '✗ Broken'}`);
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

verifyBreedGenerators().catch(console.error);