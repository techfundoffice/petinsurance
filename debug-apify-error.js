#!/usr/bin/env node

async function debugApifyError() {
  const apifyToken = 'YOUR_APIFY_TOKEN';
  
  console.log('Debugging Apify API 400 error...\n');
  
  try {
    const response = await fetch('https://api.apify.com/v2/acts/QMiUxpsg3FjsdctsM/run-sync-get-dataset-items?timeout=30', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apifyToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        textContent: "Sample text for plagiarism checking",
        proxyConfiguration: {
          useApifyProxy: true,
          apifyProxyGroups: []
        }
      })
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('\nResponse body:', text);
    
    if (text.includes('error')) {
      console.log('\n❌ Error details found in response');
    }
  } catch (error) {
    console.error('Network error:', error.message);
  }
}

debugApifyError().catch(console.error);