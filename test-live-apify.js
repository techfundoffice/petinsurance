#!/usr/bin/env node

async function testLiveApify() {
  console.log('Testing live Apify plagiarism data...\n');
  
  console.log('1. Fetching homepage to trigger Apify API calls...');
  const startTime = Date.now();
  
  const response = await fetch('https://million-pages.catsluvusboardinghotel.workers.dev/');
  const html = await response.text();
  const loadTime = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log(`   Page loaded in ${loadTime}s\n`);
  
  console.log('2. Extracting plagiarism scores from table...');
  
  // Extract first 10 rows of data
  const tableMatch = html.match(/<tbody id="auditTableBody">([\s\S]*?)<\/tbody>/);
  if (tableMatch) {
    const tbody = tableMatch[1];
    const rows = tbody.match(/<tr>[\s\S]*?<\/tr>/g);
    
    if (rows) {
      console.log('   First 10 pages with Apify plagiarism scores:\n');
      console.log('   Page | Keyword | Similarity % | Unique? | Source');
      console.log('   -----|---------|--------------|---------|--------');
      
      rows.slice(0, 10).forEach((row, i) => {
        const pageMatch = row.match(/Page (\d+)<\/a>/);
        const keywordMatch = row.match(/<td>([^<]+)<\/td>\s*<td>\1<\/td>/);
        const scoreMatch = row.match(/font-weight: bold;">(\d+\.\d+)%/);
        const uniqueMatch = row.match(/status-(yes|no)">[^<]+<\/span>/);
        const sourceMatch = row.match(/Similar To[^>]*>([^<]+)<\/td>/) || 
                          row.match(/>Page (\d+)<\/a><\/td>$/);
        
        const page = pageMatch ? pageMatch[1] : '?';
        const keyword = keywordMatch ? keywordMatch[1].substring(0, 30) : '?';
        const score = scoreMatch ? scoreMatch[1] : '?';
        const unique = uniqueMatch ? (uniqueMatch[1] === 'yes' ? 'YES' : 'NO') : '?';
        const source = sourceMatch ? (sourceMatch[1] === '-' ? 'None' : `Page ${sourceMatch[1]}`) : '?';
        
        console.log(
          `   ${page.padEnd(4)} | ` +
          `${keyword.padEnd(30)} | ` +
          `${(score + '%').padEnd(12)} | ` +
          `${unique.padEnd(7)} | ` +
          `${source}`
        );
      });
      
      // Check if scores look like they're from Apify (should be varied, not just fallback pattern)
      const scores = rows.slice(0, 50).map(row => {
        const match = row.match(/font-weight: bold;">(\d+\.\d+)%/);
        return match ? parseFloat(match[1]) : null;
      }).filter(s => s !== null);
      
      const uniqueScores = [...new Set(scores)].length;
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      
      console.log(`\n3. Analysis of first ${scores.length} scores:`);
      console.log(`   - Unique values: ${uniqueScores}`);
      console.log(`   - Average: ${avgScore.toFixed(1)}%`);
      console.log(`   - Min: ${Math.min(...scores)}%`);
      console.log(`   - Max: ${Math.max(...scores)}%`);
      
      if (uniqueScores > 40) {
        console.log('\n✅ Scores appear to be from Apify API (high variation)');
      } else {
        console.log('\n⚠️  Scores might be using fallback formula (low variation)');
      }
    }
  }
  
  console.log('\n4. Check worker logs for API calls:');
  console.log('   Run: npx wrangler tail million-pages');
  console.log('   Look for "Calling Apify API for real plagiarism data..."');
}

testLiveApify().catch(console.error);