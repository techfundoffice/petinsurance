// WordPress Internal Link Juicer Clone - SIMPLE keyword → link replacement

// Configuration - change URL pattern here if needed
const URL_PATTERN = '/page'; // Results in /page123

// Pre-defined keyword mappings (keyword → page number)
// In WordPress plugin, you'd set these in admin panel
const KEYWORD_MAPPINGS = new Map([
  // Cat breeds
  ['persian cat', 4],
  ['persian', 4],
  ['siamese cat', 6], 
  ['siamese', 6],
  ['maine coon', 5],
  ['bengal cat', 7],
  ['bengal', 7],
  ['ragdoll', 8],
  
  // Common terms
  ['cat insurance', 1],
  ['pet insurance', 2],
  ['senior cat', 13],
  ['kitten insurance', 12],
  
  // Add more mappings as needed
]);

// Simple function to add links to content
export function autoLink(content, currentPageNum) {
  if (!content || typeof content !== 'string') return content;
  
  let result = content;
  let linksAdded = 0;
  const maxLinks = 3; // Limit links per page
  
  // Sort by length (longest first) to avoid partial replacements
  const sortedMappings = Array.from(KEYWORD_MAPPINGS.entries())
    .filter(([_, pageNum]) => pageNum !== currentPageNum) // Don't link to self
    .sort((a, b) => b[0].length - a[0].length);
  
  for (const [keyword, targetPage] of sortedMappings) {
    if (linksAdded >= maxLinks) break;
    
    // Simple case-insensitive word boundary match
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    
    // Replace first occurrence only
    result = result.replace(regex, (match) => {
      if (linksAdded < maxLinks) {
        linksAdded++;
        return `<a href="${URL_PATTERN}${targetPage}">${match}</a>`;
      }
      return match;
    });
  }
  
  return result;
}

// That's it. No breed detection, no smart matching, no complexity.
// Just keyword → link like WordPress Internal Link Juicer.