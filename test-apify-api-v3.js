#!/usr/bin/env node

// Test the Apify API with correct endpoints
async function testApifyAPI() {
  const apifyToken = 'YOUR_APIFY_TOKEN';
  
  console.log('Testing Apify API authentication and endpoints...\n');
  
  // First, test if the token is valid
  console.log('1. Testing token validity:');
  try {
    const userResponse = await fetch('https://api.apify.com/v2/users/me', {
      headers: {
        'Authorization': `Bearer ${apifyToken}`
      }
    });
    
    console.log('User info response status:', userResponse.status);
    if (userResponse.ok) {
      const userInfo = await userResponse.json();
      console.log('Token is valid! User:', userInfo.data?.username || 'Unknown');
    } else {
      const error = await userResponse.text();
      console.log('Token validation failed:', error);
      return;
    }
  } catch (error) {
    console.log('Error validating token:', error.message);
    return;
  }
  
  // List available actors
  console.log('\n2. Listing available actors:');
  try {
    const actorsResponse = await fetch('https://api.apify.com/v2/acts?limit=10', {
      headers: {
        'Authorization': `Bearer ${apifyToken}`
      }
    });
    
    if (actorsResponse.ok) {
      const actorsData = await actorsResponse.json();
      console.log('Total actors:', actorsData.total || 0);
      if (actorsData.items && actorsData.items.length > 0) {
        console.log('First few actors:');
        actorsData.items.slice(0, 5).forEach(actor => {
          console.log(`  - ${actor.username}/${actor.name}: ${actor.title || 'No title'}`);
        });
      }
    }
  } catch (error) {
    console.log('Error listing actors:', error.message);
  }
  
  // Search for plagiarism/content checking actors
  console.log('\n3. Searching for plagiarism/content checking actors:');
  const searchTerms = ['plagiarism', 'content check', 'similarity', 'duplicate content'];
  
  for (const term of searchTerms) {
    try {
      const searchResponse = await fetch(`https://api.apify.com/v2/acts?search=${encodeURIComponent(term)}&limit=5`, {
        headers: {
          'Authorization': `Bearer ${apifyToken}`
        }
      });
      
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        if (searchData.items && searchData.items.length > 0) {
          console.log(`\nFound actors for "${term}":`);
          searchData.items.forEach(actor => {
            console.log(`  - ${actor.username}/${actor.name}: ${actor.title || 'No title'}`);
            console.log(`    ID: ${actor.id}`);
          });
        }
      }
    } catch (error) {
      console.log(`Error searching for "${term}":`, error.message);
    }
  }
  
  // Try the standard run endpoint format
  console.log('\n4. Testing standard actor run format:');
  const testUrls = [
    'https://million-pages.catsluvusboardinghotel.workers.dev/1',
    'https://million-pages.catsluvusboardinghotel.workers.dev/2'
  ];
  
  // Try running as a simple web scraper instead
  try {
    console.log('\nTrying to run a simple web scraper:');
    const runResponse = await fetch('https://api.apify.com/v2/actor-tasks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apifyToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        actId: 'apify/web-scraper',
        name: 'test-scrape',
        input: {
          startUrls: testUrls.map(url => ({ url })),
          pseudoUrls: [],
          linkSelector: 'a[href]',
          pageFunction: async function pageFunction(context) {
            const { $ } = context;
            return {
              url: context.request.url,
              title: $('title').text(),
              content: $('body').text().substring(0, 1000)
            };
          }.toString()
        }
      })
    });
    
    console.log('Create task response status:', runResponse.status);
    if (!runResponse.ok) {
      const error = await runResponse.text();
      console.log('Error:', error);
    }
  } catch (error) {
    console.log('Error running scraper:', error.message);
  }
}

// Run the test
testApifyAPI().then(() => {
  console.log('\nTest complete');
}).catch(error => {
  console.error('Test failed:', error);
});