#!/usr/bin/env node

// Test the deployed worker to see console logs
async function testDeployedWorker() {
  console.log('Testing deployed worker API call logging...\n');
  
  // Request the main page which should trigger getRealPlagiarismScores
  console.log('1. Requesting main page to trigger API calls:');
  try {
    const response = await fetch('https://million-pages.catsluvusboardinghotel.workers.dev/');
    console.log('Response status:', response.status);
    
    // Check if the response contains the audit table
    const html = await response.text();
    const hasAuditTable = html.includes('auditTableBody');
    const hasSimilarityScores = html.includes('%</span>');
    
    console.log('Has audit table:', hasAuditTable);
    console.log('Has similarity scores:', hasSimilarityScores);
    
    // Extract a few similarity scores from the HTML
    const scoreMatches = html.match(/color: #[^;]+; font-weight: bold;">(\d+\.\d+)%<\/span>/g);
    if (scoreMatches) {
      console.log('\nFound similarity scores in HTML:');
      scoreMatches.slice(0, 5).forEach((match, i) => {
        const score = match.match(/(\d+\.\d+)%/)[1];
        console.log(`  Score ${i+1}: ${score}%`);
      });
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
  
  console.log('\n2. Waiting a moment then checking worker logs...');
  console.log('Run: npx wrangler tail million-pages --format pretty');
  console.log('To see if getRealPlagiarismScores was called and what the API returned.');
}

testDeployedWorker().catch(console.error);