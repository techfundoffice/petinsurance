// Skip Apify API for now, use manual checking
// const { ApifyApi } = require('apify-client');

async function checkPlagiarism(textSamples) {
  console.log('🔄 Using manual uniqueness analysis (Apify API not configured)...');
  return manualUniquenessCheck(textSamples);
}

function manualUniquenessCheck(textSamples) {
  console.log('📝 Manual Content Uniqueness Analysis:');
  
  const results = [];
  
  for (let i = 0; i < textSamples.length; i++) {
    let duplicateCount = 0;
    let similarityScore = 0;
    let mostSimilarPage = null;
    
    for (let j = i + 1; j < textSamples.length; j++) {
      const similarity = calculateSimilarity(textSamples[i].content, textSamples[j].content);
      if (similarity > 0.8) duplicateCount++;
      if (similarity > similarityScore) {
        similarityScore = similarity;
        mostSimilarPage = textSamples[j];
      }
    }
    
    const plagiarismScore = similarityScore * 100;
    const isOriginal = plagiarismScore < 30; // Consider <30% as original
    
    console.log(`\n📄 Page ${textSamples[i].pageNumber}: ${textSamples[i].title}`);
    console.log(`   Max Similarity: ${plagiarismScore.toFixed(1)}%`);
    if (mostSimilarPage && plagiarismScore > 30) {
      console.log(`   Most similar to: Page ${mostSimilarPage.pageNumber} (${mostSimilarPage.title})`);
    }
    console.log(`   Unique Content: ${isOriginal ? '✅ YES' : '❌ NO'}`);
    console.log(`   Duplicate Count: ${duplicateCount}`);
    
    results.push({
      title: textSamples[i].title,
      plagiarismPercentage: plagiarismScore,
      isOriginal: isOriginal,
      duplicateCount: duplicateCount
    });
  }
  
  return results;
}

function calculateSimilarity(text1, text2) {
  // Simple Jaccard similarity coefficient
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

async function testContentUniqueness() {
  const testPages = [
    {
      pageNumber: 1,
      title: "Affordable Cat Insurance Plans",
      url: "https://million-pages.catsluvusboardinghotel.workers.dev/1"
    },
    {
      pageNumber: 100,
      title: "Cat Insurance Myths Debunked",
      url: "https://million-pages.catsluvusboardinghotel.workers.dev/100"
    },
    {
      pageNumber: 500,
      title: "Senior Dog Health Coverage",
      url: "https://million-pages.catsluvusboardinghotel.workers.dev/500"
    },
    {
      pageNumber: 1000,
      title: "Emergency Vet Fund",
      url: "https://million-pages.catsluvusboardinghotel.workers.dev/1000"
    },
    {
      pageNumber: 1100,
      title: "Feline Chemotherapy",
      url: "https://million-pages.catsluvusboardinghotel.workers.dev/1100"
    }
  ];

  console.log('📋 Testing content uniqueness across 5 sample pages...');
  
  // Fetch content from each page
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
        content: content.substring(0, 500) // First 500 chars for testing
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

// Run the test
if (require.main === module) {
  testContentUniqueness()
    .then(results => {
      console.log('\n🎯 FINAL RESULTS:');
      console.log('================');
      
      const originalCount = results.filter(r => r.isOriginal).length;
      const totalCount = results.length;
      
      console.log(`✅ Original Content: ${originalCount}/${totalCount} pages (${((originalCount/totalCount)*100).toFixed(1)}%)`);
      console.log(`📊 Average Plagiarism Score: ${(results.reduce((sum, r) => sum + r.plagiarismPercentage, 0) / totalCount).toFixed(1)}%`);
      
      if (originalCount === totalCount) {
        console.log('🎉 SUCCESS: All content appears to be unique!');
      } else {
        console.log('⚠️  WARNING: Some content may be duplicated or plagiarized');
      }
    })
    .catch(error => {
      console.error('❌ Test failed:', error);
    });
}

module.exports = { testContentUniqueness, checkPlagiarism };