const { checkPlagiarism } = require('./plagiarism-check.cjs');

async function checkPage50Similarity() {
  // Test page 50 against a few other pages to find what it's similar to
  const testPages = [
    { pageNumber: 50, title: "Cat Insurance Age Limits", url: "https://million-pages.catsluvusboardinghotel.workers.dev/50" },
    { pageNumber: 600, title: "Pet Insurance Age Limits", url: "https://million-pages.catsluvusboardinghotel.workers.dev/600" },
    { pageNumber: 10, title: "Pet Insurance for Multiple Cats", url: "https://million-pages.catsluvusboardinghotel.workers.dev/10" },
    { pageNumber: 100, title: "Cat Insurance Myths Debunked", url: "https://million-pages.catsluvusboardinghotel.workers.dev/100" }
  ];

  console.log('📋 Checking page 50 similarity against specific pages...');
  
  const textSamples = [];
  
  for (const page of testPages) {
    try {
      const response = await fetch(page.url);
      const html = await response.text();
      
      // Extract introduction paragraph
      const introMatch = html.match(/<section id="introduction"[^>]*>.*?<p>(.*?)<\/p>/s);
      const content = introMatch ? introMatch[1].replace(/<[^>]*>/g, '') : 'Content not found';
      
      textSamples.push({
        pageNumber: page.pageNumber,
        title: page.title,
        content: content.substring(0, 500)
      });
      
      console.log(`✅ Extracted content from page ${page.pageNumber}`);
    } catch (error) {
      console.error(`❌ Failed to fetch page ${page.pageNumber}:`, error.message);
    }
  }

  return await checkPlagiarism(textSamples);
}

checkPage50Similarity()
  .then(results => {
    console.log('\n🎯 Page 50 Similarity Analysis:');
    console.log('============================');
    
    results.forEach(result => {
      console.log(`\n📄 Page ${result.title}`);
      console.log(`   Similarity Score: ${result.plagiarismPercentage.toFixed(1)}%`);
    });
  })
  .catch(error => {
    console.error('❌ Test failed:', error);
  });