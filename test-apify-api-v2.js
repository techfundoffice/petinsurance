#!/usr/bin/env node

// Test the Apify API with different endpoints
async function testApifyAPI() {
  const apifyToken = 'YOUR_APIFY_TOKEN';
  const baseUrl = 'https://million-pages.catsluvusboardinghotel.workers.dev';
  
  // Test with just a few URLs
  const testPageNumbers = [1, 2, 3];
  const urls = testPageNumbers.map(num => `${baseUrl}/${num}`);
  
  console.log('Testing Apify API...');
  console.log('URLs to check:', urls);
  
  // Try different actor IDs
  const actorIds = [
    'apify/content-checker',
    'content-checker',
    'apify~content-checker',
    'lukaskrivka/content-checker',
    'apify/website-content-checker'
  ];
  
  for (const actorId of actorIds) {
    console.log(`\n\nTrying actor ID: ${actorId}`);
    
    try {
      const response = await fetch(`https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items`, {
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
      
      if (response.ok) {
        const results = await response.json();
        console.log('SUCCESS! API Response:');
        console.log(JSON.stringify(results, null, 2));
        break;
      } else {
        const errorText = await response.text();
        console.log('Error response:', errorText);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  }
  
  // Also try to list available actors
  console.log('\n\nTrying to list available actors:');
  try {
    const listResponse = await fetch('https://api.apify.com/v2/acts', {
      headers: {
        'Authorization': `Bearer ${apifyToken}`
      }
    });
    
    if (listResponse.ok) {
      const actors = await listResponse.json();
      console.log('Available actors:', JSON.stringify(actors.data?.slice(0, 5), null, 2));
    } else {
      console.log('Could not list actors:', listResponse.status);
    }
  } catch (error) {
    console.log('Error listing actors:', error.message);
  }
}

// Run the test
testApifyAPI().then(() => {
  console.log('\nTest complete');
}).catch(error => {
  console.error('Test failed:', error);
});