#!/usr/bin/env node

// Request homepage to trigger Apify API calls
console.log('Requesting homepage to trigger getRealPlagiarismScores...\n');

fetch('https://million-pages.catsluvusboardinghotel.workers.dev/')
  .then(response => {
    console.log('Homepage response status:', response.status);
    console.log('\nNow check the worker logs to see Apify API calls:');
    console.log('Run: npx wrangler tail million-pages --format pretty\n');
    console.log('Look for logs like:');
    console.log('- getRealPlagiarismScores called with:');
    console.log('- Checking page X with text:');
    console.log('- Apify API response for page X:');
    console.log('- Apify results for page X:');
    console.log('- Page X plagiarism score:');
    return response.text();
  })
  .then(html => {
    // Extract first few scores to see if they changed
    const scoreMatches = html.match(/font-weight: bold;">(\d+\.\d+)%<\/span>/g);
    if (scoreMatches) {
      console.log('\nFirst 5 similarity scores from HTML:');
      scoreMatches.slice(0, 5).forEach((match, i) => {
        const score = match.match(/(\d+\.\d+)%/)[1];
        console.log(`  Page ${i+1}: ${score}%`);
      });
    }
  })
  .catch(error => console.error('Error:', error.message));