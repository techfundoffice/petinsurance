#!/usr/bin/env node

async function testBreedFix() {
  console.log('=== TESTING BREED-SPECIFIC CONTENT FIX ===\n');
  
  const testPages = [
    { page: 11, title: 'Persian Cat Health Insurance', expectedType: 'cat' },
    { page: 161, title: 'Bengal Cat Insurance Options', expectedType: 'cat' },
    { page: 251, title: 'Yorkshire Terrier Insurance', expectedType: 'dog' }
  ];
  
  for (const { page, title, expectedType } of testPages) {
    console.log(`Testing Page ${page}: ${title}`);
    
    try {
      const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${page}`);
      const html = await response.text();
      
      // Check for breed-specific content signatures
      const breedSignatures = {
        hasHealthConcerns: html.includes('Common Health Concerns for') || 
                          html.includes('health challenges that can lead to significant veterinary expenses'),
        hasInsuranceCosts: html.includes('Average Insurance Costs for') || 
                          html.includes('Insurance premiums for') ||
                          html.includes('Insurance Pricing for'),
        hasRecommendedCoverage: html.includes('Recommended Coverage for') || 
                               html.includes('Essential Coverage Features for'),
        hasProvidersList: html.includes('Top Insurance Providers for') || 
                         html.includes('Leading Insurance Options for'),
        hasSavingsTips: html.includes('Money-Saving Tips for') || 
                        html.includes('Cost-Saving Strategies for'),
        hasRealExamples: html.includes('Insurance Claims Examples') || 
                        html.includes('Actual') && html.includes('Claims'),
        hasBreedMentions: false,
        hasCatSpecific: false,
        hasDogSpecific: false
      };
      
      // Count breed mentions
      const breedMatches = expectedType === 'cat' 
        ? html.match(/Persian|Bengal|Yorkshire/gi) 
        : html.match(/Yorkshire|Terrier/gi);
      
      breedSignatures.hasBreedMentions = breedMatches && breedMatches.length > 5;
      
      // Check for cat/dog specific content
      breedSignatures.hasCatSpecific = html.includes('kitten') || html.includes('feline') || html.includes('cat');
      breedSignatures.hasDogSpecific = html.includes('puppy') || html.includes('canine') || html.includes('dog');
      
      // Calculate score
      const score = Object.values(breedSignatures).filter(v => v === true).length;
      
      console.log(`  Breed-specific content score: ${score}/9`);
      console.log('  Content checks:');
      for (const [key, value] of Object.entries(breedSignatures)) {
        console.log(`    ${key}: ${value ? '✓' : '✗'}`);
      }
      
      // Check if it's using generic content instead
      const hasGenericContent = html.includes('Understanding Your Options') || 
                               html.includes('Comprehensive Overview of');
      console.log(`  Using generic generator: ${hasGenericContent ? 'YES' : 'NO'}`);
      
      console.log('');
      
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`  Error: ${error.message}`);
    }
  }
  
  console.log('=== CHECKING SPECIFIC CONTENT ===\n');
  
  // Check a specific page in detail
  const detailPage = 11; // Persian Cat
  const response = await fetch(`https://million-pages.catsluvusboardinghotel.workers.dev/${detailPage}`);
  const html = await response.text();
  
  // Extract first H2
  const h2Match = html.match(/<h2>([^<]+)<\/h2>/);
  console.log(`First H2 on page ${detailPage}: "${h2Match ? h2Match[1] : 'Not found'}"`);
  
  // Check for breed-specific health issues
  const healthIssues = ['breathing problems', 'kidney disease', 'eye conditions', 'dental disease',
                       'hip dysplasia', 'heart disease', 'skin conditions'];
  const foundHealthIssues = healthIssues.filter(issue => html.includes(issue));
  console.log(`\nBreed health issues mentioned: ${foundHealthIssues.length > 0 ? foundHealthIssues.join(', ') : 'None'}`);
  
  // Check for cost information
  const costMatch = html.match(/\$\d+/g);
  console.log(`\nCost figures found: ${costMatch ? costMatch.length : 0}`);
  if (costMatch && costMatch.length > 0) {
    console.log(`Sample costs: ${costMatch.slice(0, 5).join(', ')}`);
  }
}

testBreedFix().catch(console.error);