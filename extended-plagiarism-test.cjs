// Extended plagiarism test with more pages
const { testContentUniqueness, checkPlagiarism } = require('./plagiarism-check.cjs');

async function extendedTest() {
  const testPages = [
    { pageNumber: 10, title: "Pet Insurance for Multiple Cats", url: "https://million-pages.catsluvusboardinghotel.workers.dev/10" },
    { pageNumber: 41, title: "Reimbursement Rate Comparison", url: "https://million-pages.catsluvusboardinghotel.workers.dev/41" },
    { pageNumber: 50, title: "Cat Insurance Age Limits", url: "https://million-pages.catsluvusboardinghotel.workers.dev/50" },
    { pageNumber: 141, title: "Choosing Cat Insurance Deductibles", url: "https://million-pages.catsluvusboardinghotel.workers.dev/141" },
    { pageNumber: 150, title: "Cat Insurance for Multiple Pets", url: "https://million-pages.catsluvusboardinghotel.workers.dev/150" },
    { pageNumber: 300, title: "Dog Insurance Customer Reviews", url: "https://million-pages.catsluvusboardinghotel.workers.dev/300" },
    { pageNumber: 800, title: "Hamster Insurance Options", url: "https://million-pages.catsluvusboardinghotel.workers.dev/800" },
    { pageNumber: 1350, title: "Senior Pet Health Insurance", url: "https://million-pages.catsluvusboardinghotel.workers.dev/1350" }
  ];

  console.log('📋 Extended plagiarism test across 8 diverse pages...');
  
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

  if (textSamples.length > 0) {
    return await checkPlagiarism(textSamples);
  } else {
    console.error('❌ No content samples collected for testing');
    return [];
  }
}

extendedTest()
  .then(results => {
    console.log('\n🎯 EXTENDED TEST RESULTS:');
    console.log('=========================');
    
    const originalCount = results.filter(r => r.isOriginal).length;
    const totalCount = results.length;
    const avgScore = (results.reduce((sum, r) => sum + r.plagiarismPercentage, 0) / totalCount).toFixed(1);
    
    console.log(`✅ Unique Content: ${originalCount}/${totalCount} pages (${((originalCount/totalCount)*100).toFixed(1)}%)`);
    console.log(`📊 Average Plagiarism Score: ${avgScore}%`);
    console.log(`📊 Score Range: ${Math.min(...results.map(r => r.plagiarismPercentage)).toFixed(1)}% - ${Math.max(...results.map(r => r.plagiarismPercentage)).toFixed(1)}%`);
    
    if (originalCount === totalCount) {
      console.log('🎉 EXCELLENT: All content appears to be unique!');
    } else {
      console.log('⚠️  Some content may need further optimization');
    }
    
    // Show content type breakdown
    const specialtyPages = results.filter(r => r.plagiarismPercentage < 5).length;
    const goodPages = results.filter(r => r.plagiarismPercentage >= 5 && r.plagiarismPercentage < 15).length;
    const okPages = results.filter(r => r.plagiarismPercentage >= 15 && r.plagiarismPercentage < 30).length;
    const concernPages = results.filter(r => r.plagiarismPercentage >= 30).length;
    
    console.log('\n📈 Content Quality Breakdown:');
    console.log(`🌟 Highly Unique (0-5%): ${specialtyPages} pages`);
    console.log(`✅ Good (5-15%): ${goodPages} pages`);  
    console.log(`👍 Acceptable (15-30%): ${okPages} pages`);
    console.log(`⚠️  Needs Review (30%+): ${concernPages} pages`);
  })
  .catch(error => {
    console.error('❌ Extended test failed:', error);
  });