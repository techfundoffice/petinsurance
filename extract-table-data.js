#!/usr/bin/env node

async function extractTableData() {
  const response = await fetch('https://million-pages.catsluvusboardinghotel.workers.dev/');
  const html = await response.text();
  
  // Extract rows from audit table
  const tableMatch = html.match(/<tbody id="auditTableBody">([\s\S]*?)<\/tbody>/);
  if (tableMatch) {
    const tbody = tableMatch[1];
    const rows = tbody.match(/<tr>[\s\S]*?<\/tr>/g);
    
    if (rows) {
      console.log('First 10 rows of audit table:');
      console.log('Page | Keyword | Similarity Score');
      console.log('------|---------|------------------');
      
      rows.slice(0, 10).forEach(row => {
        // Extract page number
        const pageMatch = row.match(/Page (\d+)<\/a>/);
        const page = pageMatch ? pageMatch[1] : '?';
        
        // Extract keyword (appears twice in the row)
        const keywordMatch = row.match(/<td>([^<]+)<\/td>\s*<td>\1<\/td>/);
        const keyword = keywordMatch ? keywordMatch[1] : '?';
        
        // Extract similarity score
        const scoreMatch = row.match(/font-weight: bold;">([0-9.]+)%/);
        const score = scoreMatch ? scoreMatch[1] : '?';
        
        console.log(`${page.padEnd(5)} | ${keyword.substring(0, 30).padEnd(30)} | ${score}%`);
      });
      
      // Calculate expected scores based on fallback logic
      console.log('\n\nExpected fallback scores for first 10:');
      const keywords = [
        'Cat Boarding Luxury Suites',
        'Kitten Socialization Programs',
        'Senior Cat Care Specialists',
        'Feline Emergency Preparedness',
        'Cat Dental Health Services',
        'Multi-Cat Household Management',
        'Cat Nutrition Consultations',
        'Feline Stress Reduction',
        'Cat Grooming Spa Services',
        'Kitten Development Milestones'
      ];
      
      keywords.forEach((keyword, i) => {
        const pageNum = i + 1;
        const lower = keyword.toLowerCase();
        let estimatedScore = 8;
        
        if (lower.includes('cat') || lower.includes('dog')) estimatedScore -= 3;
        if (lower.includes('emergency') || lower.includes('cancer') || lower.includes('dental')) estimatedScore -= 4;
        if (lower.includes('senior') || lower.includes('kitten')) estimatedScore -= 2;
        if (lower.includes('cost') || lower.includes('comparison')) estimatedScore += 5;
        
        const variation = (pageNum * 7 + keyword.length) % 12;
        const score = Math.max(2, Math.min(25, estimatedScore + variation)).toFixed(1);
        
        console.log(`${pageNum} | ${keyword.substring(0, 30).padEnd(30)} | ${score}% (expected)`);
      });
    }
  }
}

extractTableData().catch(console.error);