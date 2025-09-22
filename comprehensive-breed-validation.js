#!/usr/bin/env node

async function comprehensiveBreedValidation() {
  console.log('=== COMPREHENSIVE BREED CONTENT VALIDATION ===\n');
  
  const results = {
    totalPages: 0,
    breedPagesFound: 0,
    workingBreedPages: 0,
    brokenPages: [],
    sampleContent: []
  };
  
  // 1. Verify total page count
  console.log('1. Verifying Total Page Count...');
  try {
    const healthResponse = await fetch('https://million-pages.catsluvusboardinghotel.workers.dev/health');
    const healthData = await healthResponse.json();
    results.totalPages = healthData.keywords;
    console.log(`   ✓ Total pages: ${results.totalPages}`);
  } catch (error) {
    console.log(`   ✗ Error: ${error.message}`);
  }
  
  // 2. Test known breed pages extensively
  console.log('\n2. Testing Known Breed Pages...');
  const knownBreedPages = [
    { page: 11, title: 'Persian Cat Health Insurance', breed: 'Persian', type: 'cat' },
    { page: 161, title: 'Bengal Cat Insurance Options', breed: 'Bengal', type: 'cat' },
    { page: 251, title: 'Yorkshire Terrier Insurance', breed: 'Yorkshire', type: 'dog' },
    // Let's find more breed pages
    { page: 73, title: 'Unknown', breed: 'Unknown', type: 'unknown' },
    { page: 125, title: 'Unknown', breed: 'Unknown', type: 'unknown' },
    { page: 200, title: 'Unknown', breed: 'Unknown', type: 'unknown' },
    { page: 300, title: 'Unknown', breed: 'Unknown', type: 'unknown' }
  ];
  
  for (const pageInfo of knownBreedPages) {
    try {
      const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${pageInfo.page}`);
      const html = await response.text();
      
      // Extract actual title
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const actualTitle = titleMatch ? titleMatch[1].split(' - Page')[0] : 'Not found';
      pageInfo.title = actualTitle;
      
      // Detect if it's a breed page
      const breedIndicators = [
        'Retriever', 'Terrier', 'Bulldog', 'Shepherd', 'Poodle',
        'Persian', 'Siamese', 'Bengal', 'Maine Coon', 'Ragdoll'
      ];
      
      const isBreedPage = breedIndicators.some(breed => actualTitle.includes(breed));
      
      if (isBreedPage) {
        results.breedPagesFound++;
        
        // Extract breed name
        const foundBreed = breedIndicators.find(breed => actualTitle.includes(breed));
        pageInfo.breed = actualTitle.includes('Retriever') ? actualTitle.match(/(.*Retriever)/)?.[1] : foundBreed;
        pageInfo.type = actualTitle.toLowerCase().includes('cat') ? 'cat' : 'dog';
        
        // Validate breed-specific content
        const validation = {
          hasBreedInIntro: html.includes(`${pageInfo.breed}s are beloved companions`),
          hasHealthIssues: html.includes('breathing problems') || html.includes('hip dysplasia') || 
                          html.includes('kidney disease') || html.includes('dental disease'),
          hasCostRanges: (html.match(/\$\d+/g) || []).length > 10,
          hasBreedMentions: (html.match(new RegExp(pageInfo.breed, 'gi')) || []).length > 20,
          hasInsuranceProviders: html.includes('Embrace') || html.includes('Healthy Paws'),
          hasRealExamples: html.includes('Real cases illustrate'),
          hasFAQSection: html.includes('How much does') && html.includes('insurance cost?'),
          isNotGeneric: !html.includes('Understanding Your Options')
        };
        
        const score = Object.values(validation).filter(v => v).length;
        
        console.log(`\n   Page ${pageInfo.page}: ${actualTitle}`);
        console.log(`   Breed: ${pageInfo.breed} (${pageInfo.type})`);
        console.log(`   Content validation: ${score}/8 checks passed`);
        
        if (score >= 6) {
          results.workingBreedPages++;
          console.log(`   Status: ✓ WORKING CORRECTLY`);
          
          // Extract sample content
          const introMatch = html.match(/<p>([^<]*are beloved companions[^<]*)<\/p>/);
          if (introMatch && results.sampleContent.length < 3) {
            results.sampleContent.push({
              page: pageInfo.page,
              title: actualTitle,
              intro: introMatch[1].substring(0, 150) + '...'
            });
          }
        } else {
          results.brokenPages.push(pageInfo);
          console.log(`   Status: ✗ ISSUES FOUND`);
          for (const [check, passed] of Object.entries(validation)) {
            if (!passed) console.log(`     - Missing: ${check}`);
          }
        }
      } else {
        console.log(`   Page ${pageInfo.page}: ${actualTitle} - Not a breed page`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`   Error checking page ${pageInfo.page}: ${error.message}`);
    }
  }
  
  // 3. Search for more breed pages
  console.log('\n3. Searching for Additional Breed Pages...');
  const searchPages = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95];
  let additionalBreedPages = 0;
  
  for (const page of searchPages) {
    try {
      const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${page}`);
      const html = await response.text();
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const title = titleMatch ? titleMatch[1].split(' - Page')[0] : '';
      
      if (title.includes('Retriever') || title.includes('Persian') || title.includes('Terrier') ||
          title.includes('Bengal') || title.includes('Siamese') || title.includes('Bulldog')) {
        additionalBreedPages++;
        console.log(`   ✓ Found breed page at ${page}: ${title}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      // Silent fail for search
    }
  }
  
  // 4. Verify content quality
  console.log('\n4. Content Quality Check...');
  if (results.sampleContent.length > 0) {
    console.log('   Sample introductions from breed pages:');
    results.sampleContent.forEach(sample => {
      console.log(`\n   Page ${sample.page} (${sample.title}):`);
      console.log(`   "${sample.intro}"`);
    });
  }
  
  // 5. Summary
  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Pages: ${results.totalPages}`);
  console.log(`Breed Pages Found: ${results.breedPagesFound + additionalBreedPages}`);
  console.log(`Working Breed Pages: ${results.workingBreedPages}`);
  console.log(`Broken Pages: ${results.brokenPages.length}`);
  
  // Final verdict
  console.log('\n' + '='.repeat(60));
  if (results.workingBreedPages === results.breedPagesFound && results.brokenPages.length === 0) {
    console.log('✅ VALIDATION PASSED - ALL BREED PAGES WORKING CORRECTLY');
  } else if (results.workingBreedPages > 0) {
    console.log('⚠️  VALIDATION PASSED WITH WARNINGS');
    console.log(`${results.workingBreedPages} of ${results.breedPagesFound} breed pages are working`);
  } else {
    console.log('❌ VALIDATION FAILED');
  }
  
  return results;
}

comprehensiveBreedValidation().catch(console.error);