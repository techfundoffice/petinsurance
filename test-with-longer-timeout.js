#!/usr/bin/env node

async function testWithLongerTimeout() {
  const apifyToken = 'YOUR_APIFY_TOKEN';
  
  console.log('Testing Apify API with 30 second timeout...\n');
  
  const testText = "Pet insurance for cats is essential for managing unexpected veterinary costs.";
  
  console.log('Sending text (75 chars):', testText);
  console.log('Starting at:', new Date().toISOString());
  
  try {
    const response = await fetch('https://api.apify.com/v2/acts/QMiUxpsg3FjsdctsM/run-sync-get-dataset-items?timeout=30', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apifyToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        textContent: testText,
        proxyConfiguration: {
          useApifyProxy: true,
          apifyProxyGroups: []
        }
      })
    });
    
    console.log('Response received at:', new Date().toISOString());
    console.log('Status:', response.status);
    
    const text = await response.text();
    console.log('\nResponse:', text);
    
    if (response.ok) {
      const data = JSON.parse(text);
      if (data[0] && data[0].results) {
        console.log('\n✅ SUCCESS! Document score:', data[0].results.document_score);
      }
    } else if (text.includes('TIMED-OUT')) {
      console.log('\n❌ Still timing out even with 30 seconds');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testWithLongerTimeout().catch(console.error);