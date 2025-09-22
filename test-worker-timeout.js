#!/usr/bin/env node

async function testWorkerTimeout() {
  console.log('Testing if worker can handle 30s timeout...\n');
  
  console.log('Fetching homepage (this triggers Apify calls)...');
  const start = Date.now();
  
  try {
    const response = await fetch('https://million-pages.catsluvusboardinghotel.workers.dev/', {
      signal: AbortSignal.timeout(60000) // 60 second timeout for our request
    });
    
    const duration = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`Response received after ${duration}s`);
    console.log('Status:', response.status);
    
    if (duration > 30) {
      console.log('\n❌ Worker is timing out on Apify calls');
      console.log('Cloudflare Workers have CPU time limits that may prevent long API calls');
    }
    
    // Check the first few scores
    const html = await response.text();
    const scoreMatches = html.match(/bold;">[^<]*<\/span>/g);
    if (scoreMatches) {
      console.log('\nFirst 5 scores:');
      scoreMatches.slice(0, 5).forEach((match, i) => {
        const score = match.match(/>([^<]+)</)[1];
        console.log(`  Page ${i+1}: ${score}`);
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testWorkerTimeout().catch(console.error);