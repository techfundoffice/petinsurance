#!/usr/bin/env node

// Test the Apify API directly
async function testApifyAPI() {
  const apifyToken = 'YOUR_APIFY_TOKEN';
  const baseUrl = 'https://million-pages.catsluvusboardinghotel.workers.dev';
  
  // Test with just a few URLs
  const testPageNumbers = [1, 2, 3, 10, 100];
  const urls = testPageNumbers.map(num => `${baseUrl}/${num}`);
  
  console.log('Testing Apify API with URLs:', urls);
  console.log('Using token:', apifyToken.substring(0, 20) + '...');
  
  try {
    console.log('\nMaking API request...');
    const response = await fetch('https://api.apify.com/v2/acts/apify~content-checker/run-sync-get-dataset-items', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apifyToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        urls: urls,
        checkDuplicates: true,
        similarityThreshold: 0.1,
        maxRequestRetries: 1,
        timeout: 30
      })
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const results = await response.json();
      console.log('\nAPI Response (successful):');
      console.log(JSON.stringify(results, null, 2));
      
      if (Array.isArray(results)) {
        console.log('\nParsed results:');
        results.forEach(item => {
          if (item.url && item.similarity !== undefined) {
            const pageNum = parseInt(item.url.split('/').pop());
            const score = (item.similarity * 100).toFixed(1);
            console.log(`Page ${pageNum}: ${score}% similarity`);
          }
        });
      }
    } else {
      const errorText = await response.text();
      console.log('API Error Response:', errorText);
    }
  } catch (error) {
    console.log('Error calling Apify API:', error);
    console.log('Error type:', error.constructor.name);
    console.log('Error message:', error.message);
    if (error.cause) {
      console.log('Error cause:', error.cause);
    }
  }
}

// Run the test
testApifyAPI().then(() => {
  console.log('\nTest complete');
}).catch(error => {
  console.error('Test failed:', error);
});