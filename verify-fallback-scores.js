#!/usr/bin/env node

// Verify if displayed scores match fallback formula
const actualData = [
  { page: 1, keyword: "Affordable Cat Insurance Plans", actualScore: 6.0 },
  { page: 2, keyword: "Best Pet Insurance for Kittens", actualScore: 14.0 },
  { page: 3, keyword: "Senior Cat Health Coverage", actualScore: 14.0 },
  { page: 4, keyword: "Emergency Vet Visit Protection", actualScore: 14.0 },
  { page: 5, keyword: "Dental Care for Cats Insurance", actualScore: 6.0 },
  { page: 6, keyword: "Multi-Cat Household Discounts", actualScore: 16.0 },
  { page: 7, keyword: "Accident-Only Cat Insurance", actualScore: 9.0 },
  { page: 8, keyword: "Comprehensive Feline Coverage", actualScore: 9.0 },
  { page: 9, keyword: "Indoor Cat Insurance Benefits", actualScore: 13.0 },
  { page: 10, keyword: "Outdoor Cat Protection Plans", actualScore: 7.0 }
];

console.log('Verifying if actual scores match fallback formula:\n');
console.log('Page | Keyword | Actual | Expected | Match?');
console.log('-----|---------|--------|----------|-------');

actualData.forEach(({ page, keyword, actualScore }) => {
  // Apply fallback formula
  const lower = keyword.toLowerCase();
  let estimatedScore = 8;
  
  if (lower.includes('cat') || lower.includes('dog')) estimatedScore -= 3;
  if (lower.includes('emergency') || lower.includes('cancer') || lower.includes('dental')) estimatedScore -= 4;
  if (lower.includes('senior') || lower.includes('kitten')) estimatedScore -= 2;
  if (lower.includes('cost') || lower.includes('comparison')) estimatedScore += 5;
  
  const variation = (page * 7 + keyword.length) % 12;
  const expectedScore = Math.max(2, Math.min(25, estimatedScore + variation));
  
  const match = Math.abs(actualScore - expectedScore) < 0.1;
  
  console.log(
    `${page.toString().padEnd(4)} | ` +
    `${keyword.substring(0, 30).padEnd(30)} | ` +
    `${actualScore.toFixed(1).padStart(6)}% | ` +
    `${expectedScore.toFixed(1).padStart(8)}% | ` +
    `${match ? '✓' : '✗'}`
  );
});

console.log('\nConclusion: The scores are using the FALLBACK formula, not real Apify API data.');