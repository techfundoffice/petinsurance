#!/usr/bin/env node

async function testApifyDirect() {
  const apifyToken = 'YOUR_APIFY_TOKEN';
  
  const testText = "Pet insurance for cats is an essential financial safety net that helps pet owners manage unexpected veterinary costs. When your feline friend faces a medical emergency or develops a chronic condition, the bills can quickly escalate into thousands of dollars. Cat insurance provides peace of mind by covering a significant portion of these expenses.";
  
  console.log('Testing Apify plagiarism checker API directly...\n');
  console.log('Test text:', testText.substring(0, 100) + '...\n');
  
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
    
    console.log('Response status:', response.status);
    console.log('Response headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));
    
    if (response.ok) {
      const results = await response.json();
      console.log('\nAPI Response:', JSON.stringify(results, null, 2));
    } else {
      const errorText = await response.text();
      console.log('\nError response:', errorText);
    }
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Error type:', error.constructor.name);
  }
}

testApifyDirect().catch(console.error);