#!/usr/bin/env node

// Search Apify Store for plagiarism/content checking actors
async function searchApifyStore() {
  const apifyToken = 'YOUR_APIFY_TOKEN';
  
  console.log('Searching Apify Store for plagiarism/content checking actors...\n');
  
  // Search the store (public actors)
  const searchTerms = ['plagiarism', 'content', 'similarity', 'duplicate', 'copyscape'];
  
  for (const term of searchTerms) {
    console.log(`\nSearching for: "${term}"`);
    try {
      // Search in the store (different endpoint)
      const storeResponse = await fetch(`https://api.apify.com/v2/store?search=${encodeURIComponent(term)}&limit=5`, {
        headers: {
          'Authorization': `Bearer ${apifyToken}`
        }
      });
      
      console.log('Store search status:', storeResponse.status);
      
      if (storeResponse.ok) {
        const storeData = await storeResponse.json();
        if (storeData.data && storeData.data.length > 0) {
          console.log(`Found ${storeData.data.length} actors:`);
          storeData.data.forEach(actor => {
            console.log(`\n  Actor: ${actor.username}/${actor.name}`);
            console.log(`  Title: ${actor.title}`);
            console.log(`  Description: ${actor.description?.substring(0, 100)}...`);
            console.log(`  ID: ${actor.id}`);
          });
        } else {
          console.log('No actors found for this search term.');
        }
      } else {
        const error = await storeResponse.text();
        console.log('Store search error:', error);
      }
    } catch (error) {
      console.log(`Error searching for "${term}":`, error.message);
    }
  }
  
  // Try to run a known public actor
  console.log('\n\nTrying to run a public web scraper actor:');
  const testUrls = [
    'https://million-pages.catsluvusboardinghotel.workers.dev/1',
    'https://million-pages.catsluvusboardinghotel.workers.dev/2'
  ];
  
  try {
    // Use the correct endpoint for running an actor
    const runResponse = await fetch('https://api.apify.com/v2/acts/apify~web-scraper/runs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apifyToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startUrls: testUrls.map(url => ({ url })),
        pseudoUrls: [],
        linkSelector: '',
        pageFunction: `async function pageFunction(context) {
          const { $, request } = context;
          return {
            url: request.url,
            title: $('title').text(),
            h1: $('h1').text(),
            text: $('body').text().substring(0, 500)
          };
        }`
      })
    });
    
    console.log('Run actor response status:', runResponse.status);
    
    if (runResponse.ok) {
      const runData = await runResponse.json();
      console.log('Actor run started successfully!');
      console.log('Run ID:', runData.data.id);
      console.log('Status:', runData.data.status);
      
      // Wait a bit and check the results
      console.log('\nWaiting 5 seconds for run to complete...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Get run results
      const resultsResponse = await fetch(`https://api.apify.com/v2/actor-runs/${runData.data.id}/dataset/items`, {
        headers: {
          'Authorization': `Bearer ${apifyToken}`
        }
      });
      
      if (resultsResponse.ok) {
        const results = await resultsResponse.json();
        console.log('\nRun results:');
        console.log(JSON.stringify(results, null, 2));
      }
    } else {
      const error = await runResponse.text();
      console.log('Run error:', error);
    }
  } catch (error) {
    console.log('Error running actor:', error.message);
  }
}

// Run the search
searchApifyStore().then(() => {
  console.log('\nSearch complete');
}).catch(error => {
  console.error('Search failed:', error);
});