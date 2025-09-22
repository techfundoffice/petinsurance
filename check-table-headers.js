#!/usr/bin/env node

async function checkTableHeaders() {
  const response = await fetch('https://million-pages.catsluvusboardinghotel.workers.dev/');
  const html = await response.text();
  
  // Extract the table headers
  const theadMatch = html.match(/<thead>([\s\S]*?)<\/thead>/);
  if (theadMatch) {
    const thead = theadMatch[1];
    const headers = thead.match(/<th[^>]*>[^<]+<\/th>/g);
    
    console.log('Table headers found:');
    if (headers) {
      headers.forEach((header, i) => {
        const title = header.match(/title="([^"]+)"/)?.[1] || '';
        const text = header.match(/>([^<]+)</)[1];
        console.log(`${i+1}. ${text} ${title ? `(${title})` : ''}`);
      });
      
      console.log('\nPlagiarism columns:');
      const hasSimilarity = headers.some(h => h.includes('Similarity'));
      const hasUnique = headers.some(h => h.includes('Unique'));
      const hasSource = headers.some(h => h.includes('Similar'));
      
      console.log(`- Similarity %: ${hasSimilarity ? '✅ Found' : '❌ Missing'}`);
      console.log(`- Unique?: ${hasUnique ? '✅ Found' : '❌ Missing'}`);
      console.log(`- Similar Source: ${hasSource ? '✅ Found' : '❌ Missing'}`);
    }
  } else {
    console.log('No table headers found!');
  }
}

checkTableHeaders().catch(console.error);