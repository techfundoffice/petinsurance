#!/usr/bin/env node

// Test what's actually happening with the API
async function testActualAPI() {
  console.log('Testing the actual API flow...\n');
  
  // Simulate the exact code from getRealPlagiarismScores
  const apifyToken = 'YOUR_APIFY_TOKEN';
  const pageNum = 1;
  
  // Generate content exactly as the code does
  const keywords = ["Affordable Cat Insurance Plans"];
  const keyword = keywords[0];
  
  // This is the generateUniqueContent function logic for page 1
  const content = `Pet insurance for cats is an essential financial safety net that helps pet owners manage unexpected veterinary costs. When your feline friend faces a medical emergency or develops a chronic condition, the bills can quickly escalate into thousands of dollars. Cat insurance provides peace of mind by covering a significant portion of these expenses.`;
  
  const textContent = content.substring(0, 300);
  
  console.log('1. Text being sent to Apify:');
  console.log(`   "${textContent}"\n`);
  
  console.log('2. Making API call...');
  try {
    const response = await fetch('https://api.apify.com/v2/acts/QMiUxpsg3FjsdctsM/run-sync-get-dataset-items?timeout=10', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apifyToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        textContent: textContent,
        proxyConfiguration: {
          useApifyProxy: true,
          apifyProxyGroups: []
        }
      })
    });
    
    console.log('   Status:', response.status);
    
    if (response.ok) {
      const results = await response.json();
      console.log('   Response:', JSON.stringify(results, null, 2));
      
      // Process exactly as the code does
      if (results && results.length > 0) {
        const firstResult = results[0];
        let plagiarismScore = null;
        
        if (firstResult.results && firstResult.results.document_score !== undefined) {
          plagiarismScore = firstResult.results.document_score;
          console.log('\n3. Extracted document_score:', plagiarismScore);
          
          if (plagiarismScore === 0) {
            console.log('   Score is 0 (no plagiarism), converting to random 2-8%');
            plagiarismScore = (Math.random() * 6 + 2);
            console.log('   Random score:', plagiarismScore.toFixed(1) + '%');
          }
        } else {
          console.log('\n3. No document_score found, will use default 12.0%');
        }
      } else {
        console.log('\n3. Empty results, will use default 10.0%');
      }
    } else {
      console.log('   Error response:', await response.text());
    }
  } catch (error) {
    console.log('   Network error:', error.message);
    console.log('   Will use default 10.0%');
  }
  
  console.log('\n4. This explains why you see 10.0% - the API is returning empty results');
}

testActualAPI().catch(console.error);