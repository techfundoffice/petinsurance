import fs from 'fs';
const content = fs.readFileSync('src/index-restored.js', 'utf8');

// Extract getAllKeywords function
const getAllKeywordsMatch = content.match(/function getAllKeywords\(\) \{[\s\S]+?return \[([\s\S]+?)\];\s*\}/);
if (!getAllKeywordsMatch) {
  console.log('Could not find getAllKeywords function');
  process.exit(1);
}

const keywordArrayStr = getAllKeywordsMatch[1];
const keywords = keywordArrayStr.split('\n')
  .filter(line => line.includes('"'))
  .map(line => line.trim().replace(/,$/, '').replace(/"/g, ''));

// Extract getKeywordType function
const getKeywordTypeMatch = content.match(/function getKeywordType\(title, keywordIndex\) \{[\s\S]+?return 'insurance';\s*\}/);
if (!getKeywordTypeMatch) {
  console.log('Could not find getKeywordType function');
  process.exit(1);
}

eval(getKeywordTypeMatch[0]);

console.log(`Total keywords: ${keywords.length}`);
console.log(`\nKeywords around position 848:`);
for (let i = 845; i < 855; i++) {
  console.log(`${i}: ${keywords[i-1]}`);
}

// Test classification
console.log(`\nTesting classification for positions 849+:`);
const counts = { emergency: 0, oncology: 0, surgery: 0, cardiology: 0, neurology: 0, dental: 0, insurance: 0 };

for (let i = 849; i < Math.min(keywords.length + 1, 1000); i++) {
  const keyword = keywords[i-1];
  const type = getKeywordType(keyword, i);
  counts[type]++;
  
  if (i < 860 || (i > 920 && i < 930)) {
    console.log(`${i}: "${keyword}" -> ${type}`);
  }
}

console.log(`\nCategory counts for positions 849-1000:`);
Object.entries(counts).forEach(([type, count]) => {
  if (count > 0) console.log(`${type}: ${count}`);
});