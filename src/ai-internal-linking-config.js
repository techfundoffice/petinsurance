// AI-Powered Internal Linking Configuration
// Comprehensive keyword-to-page mapping following Google 2024 best practices
// Generated with natural language understanding and semantic clustering

const URL_PATTERN = '/page';

// Page category definitions based on content analysis
const PAGE_CATEGORIES = {
  // Pillar Pages (1-3) - High commercial intent, broad topics
  PILLAR_PAGES: {
    1: { title: 'Cat Insurance Ultimate Guide', type: 'pillar', intent: 'commercial' },
    2: { title: 'Compare Pet Insurance Plans', type: 'pillar', intent: 'transactional' },
    3: { title: 'Pet Insurance Coverage Types', type: 'pillar', intent: 'commercial' }
  },
  
  // Cat Breed Pages (4-11) - Breed-specific content
  CAT_BREEDS: {
    4: { breed: 'Persian', title: 'Persian Cat Insurance Guide' },
    5: { breed: 'Maine Coon', title: 'Maine Coon Insurance Coverage' },
    6: { breed: 'Siamese', title: 'Siamese Cat Insurance Plans' },
    7: { breed: 'Bengal', title: 'Bengal Cat Insurance Options' },
    8: { breed: 'Ragdoll', title: 'Ragdoll Cat Insurance Guide' },
    9: { breed: 'British Shorthair', title: 'British Shorthair Insurance' },
    10: { breed: 'Scottish Fold', title: 'Scottish Fold Insurance Coverage' },
    11: { breed: 'Sphynx', title: 'Sphynx Cat Insurance Plans' }
  },
  
  // Age-Specific Pages (12-13)
  AGE_SPECIFIC: {
    12: { age: 'kitten', title: 'Kitten Insurance Essential Guide' },
    13: { age: 'senior', title: 'Senior Cat Insurance Coverage' }
  },
  
  // Multi-Cat & Special Coverage (14-20)
  SPECIAL_COVERAGE: {
    14: { title: 'Multi-Cat Insurance Discounts', type: 'discount' },
    15: { title: 'Cat Dental Insurance Coverage', type: 'dental' },
    16: { title: 'Emergency Vet Visit Coverage', type: 'emergency' },
    17: { title: 'Chronic Illness Cat Insurance', type: 'chronic' },
    18: { title: 'Cat Surgery Insurance Coverage', type: 'surgery' },
    19: { title: 'Preventive Care Cat Insurance', type: 'wellness' },
    20: { title: 'Indoor Cat Insurance Benefits', type: 'lifestyle' }
  }
};

// Comprehensive keyword mappings with semantic understanding
const KEYWORD_MAPPINGS = new Map([
  // High Commercial Intent - Route to Pillar Pages
  ['cat insurance', { page: 1, priority: 10, intent: 'commercial' }],
  ['pet insurance', { page: 2, priority: 10, intent: 'commercial' }],
  ['compare pet insurance', { page: 2, priority: 10, intent: 'transactional' }],
  ['best cat insurance', { page: 1, priority: 9, intent: 'commercial' }],
  ['affordable cat insurance', { page: 1, priority: 9, intent: 'transactional' }],
  ['cat insurance plans', { page: 3, priority: 9, intent: 'commercial' }],
  ['pet insurance coverage', { page: 3, priority: 9, intent: 'informational' }],
  ['cat health insurance', { page: 1, priority: 8, intent: 'commercial' }],
  ['feline insurance', { page: 1, priority: 8, intent: 'commercial' }],
  ['get pet insurance quote', { page: 2, priority: 10, intent: 'transactional' }],
  ['pet insurance comparison', { page: 2, priority: 10, intent: 'transactional' }],
  
  // Breed-Specific Keywords
  ['persian cat insurance', { page: 4, priority: 8, intent: 'commercial' }],
  ['persian cat health', { page: 4, priority: 7, intent: 'informational' }],
  ['persian cat coverage', { page: 4, priority: 8, intent: 'commercial' }],
  ['persian cat vet costs', { page: 4, priority: 7, intent: 'informational' }],
  
  ['maine coon insurance', { page: 5, priority: 8, intent: 'commercial' }],
  ['maine coon health coverage', { page: 5, priority: 8, intent: 'commercial' }],
  ['maine coon health issues', { page: 5, priority: 7, intent: 'informational' }],
  ['large cat insurance', { page: 5, priority: 7, intent: 'commercial' }],
  
  ['siamese cat insurance', { page: 6, priority: 8, intent: 'commercial' }],
  ['siamese health plans', { page: 6, priority: 8, intent: 'commercial' }],
  ['siamese cat health', { page: 6, priority: 7, intent: 'informational' }],
  ['oriental cat insurance', { page: 6, priority: 7, intent: 'commercial' }],
  
  ['bengal cat insurance', { page: 7, priority: 8, intent: 'commercial' }],
  ['bengal insurance cost', { page: 7, priority: 8, intent: 'transactional' }],
  ['bengal health coverage', { page: 7, priority: 8, intent: 'commercial' }],
  ['exotic cat insurance', { page: 7, priority: 7, intent: 'commercial' }],
  
  ['ragdoll insurance', { page: 8, priority: 8, intent: 'commercial' }],
  ['ragdoll cat coverage', { page: 8, priority: 8, intent: 'commercial' }],
  ['ragdoll health insurance', { page: 8, priority: 8, intent: 'commercial' }],
  ['docile cat insurance', { page: 8, priority: 6, intent: 'commercial' }],
  
  ['british shorthair insurance', { page: 9, priority: 8, intent: 'commercial' }],
  ['british shorthair coverage', { page: 9, priority: 8, intent: 'commercial' }],
  ['british cat insurance', { page: 9, priority: 7, intent: 'commercial' }],
  
  ['scottish fold insurance', { page: 10, priority: 8, intent: 'commercial' }],
  ['scottish fold health', { page: 10, priority: 7, intent: 'informational' }],
  ['fold cat coverage', { page: 10, priority: 7, intent: 'commercial' }],
  
  ['sphynx cat insurance', { page: 11, priority: 8, intent: 'commercial' }],
  ['hairless cat insurance', { page: 11, priority: 7, intent: 'commercial' }],
  ['sphynx health coverage', { page: 11, priority: 8, intent: 'commercial' }],
  
  // Age-Specific Keywords
  ['kitten insurance', { page: 12, priority: 9, intent: 'commercial' }],
  ['puppy cat insurance', { page: 12, priority: 8, intent: 'commercial' }],
  ['young cat insurance', { page: 12, priority: 8, intent: 'commercial' }],
  ['kitten health coverage', { page: 12, priority: 8, intent: 'commercial' }],
  ['first time cat owner', { page: 12, priority: 7, intent: 'informational' }],
  
  ['senior cat insurance', { page: 13, priority: 9, intent: 'commercial' }],
  ['elderly cat coverage', { page: 13, priority: 8, intent: 'commercial' }],
  ['older cat insurance', { page: 13, priority: 8, intent: 'commercial' }],
  ['geriatric cat health', { page: 13, priority: 7, intent: 'informational' }],
  ['cat insurance over 10', { page: 13, priority: 8, intent: 'transactional' }],
  
  // Special Coverage Keywords
  ['multi cat discount', { page: 14, priority: 8, intent: 'transactional' }],
  ['multiple cat insurance', { page: 14, priority: 8, intent: 'commercial' }],
  ['multi pet insurance', { page: 14, priority: 8, intent: 'commercial' }],
  ['family cat plan', { page: 14, priority: 7, intent: 'commercial' }],
  
  ['cat dental insurance', { page: 15, priority: 8, intent: 'commercial' }],
  ['dental coverage cats', { page: 15, priority: 8, intent: 'commercial' }],
  ['cat teeth cleaning', { page: 15, priority: 7, intent: 'informational' }],
  ['feline dental care', { page: 15, priority: 7, intent: 'informational' }],
  
  ['emergency vet coverage', { page: 16, priority: 9, intent: 'commercial' }],
  ['emergency cat care', { page: 16, priority: 9, intent: 'commercial' }],
  ['after hours vet insurance', { page: 16, priority: 8, intent: 'commercial' }],
  ['urgent care cat', { page: 16, priority: 8, intent: 'informational' }],
  
  ['chronic illness insurance', { page: 17, priority: 8, intent: 'commercial' }],
  ['chronic cat conditions', { page: 17, priority: 8, intent: 'informational' }],
  ['diabetes cat insurance', { page: 17, priority: 8, intent: 'commercial' }],
  ['kidney disease coverage', { page: 17, priority: 8, intent: 'commercial' }],
  
  ['cat surgery insurance', { page: 18, priority: 8, intent: 'commercial' }],
  ['surgical coverage cats', { page: 18, priority: 8, intent: 'commercial' }],
  ['operation insurance cat', { page: 18, priority: 8, intent: 'commercial' }],
  ['cat surgery costs', { page: 18, priority: 7, intent: 'informational' }],
  
  ['preventive care insurance', { page: 19, priority: 8, intent: 'commercial' }],
  ['wellness plan cats', { page: 19, priority: 8, intent: 'commercial' }],
  ['routine care coverage', { page: 19, priority: 8, intent: 'commercial' }],
  ['cat vaccination insurance', { page: 19, priority: 7, intent: 'commercial' }],
  
  ['indoor cat insurance', { page: 20, priority: 8, intent: 'commercial' }],
  ['house cat coverage', { page: 20, priority: 7, intent: 'commercial' }],
  ['apartment cat insurance', { page: 20, priority: 7, intent: 'commercial' }],
  ['indoor only cats', { page: 20, priority: 7, intent: 'informational' }]
]);

// Natural anchor text variations by intent and context
const ANCHOR_VARIATIONS = {
  commercial: [
    keyword => `learn about ${keyword}`,
    keyword => `explore ${keyword} options`,
    keyword => `discover ${keyword}`,
    keyword => `${keyword} guide`,
    keyword => `comprehensive ${keyword}`
  ],
  transactional: [
    keyword => `get ${keyword}`,
    keyword => `compare ${keyword}`,
    keyword => `find ${keyword}`,
    keyword => `${keyword} quotes`,
    keyword => `shop for ${keyword}`
  ],
  informational: [
    keyword => `understand ${keyword}`,
    keyword => `${keyword} explained`,
    keyword => `about ${keyword}`,
    keyword => `${keyword} information`,
    keyword => `learn more about ${keyword}`
  ],
  navigational: [
    keyword => keyword,
    keyword => `visit ${keyword}`,
    keyword => `see ${keyword}`,
    keyword => `${keyword} page`,
    keyword => `go to ${keyword}`
  ]
};

// Context-aware link insertion rules
const LINKING_RULES = {
  maxLinksPerPage: 5,
  maxLinksPerTargetPage: 2,
  minWordsBetweenLinks: 150,
  prioritizeFirstParagraph: true,
  avoidHeaderLinks: true,
  preferSentenceMiddle: true,
  contextualRelevance: 0.7
};

// Smart linking function with AI-like intelligence
export function intelligentAutoLink(content, currentPageNum, options = {}) {
  if (!content || typeof content !== 'string') return content;
  
  const settings = { ...LINKING_RULES, ...options };
  let result = content;
  const linkedPages = new Map();
  let totalLinks = 0;
  let lastLinkPosition = -settings.minWordsBetweenLinks;
  
  // Get relevant keywords sorted by priority and contextual relevance
  const relevantKeywords = getRelevantKeywords(content, currentPageNum);
  
  for (const { keyword, mapping, score } of relevantKeywords) {
    if (totalLinks >= settings.maxLinksPerPage) break;
    
    const targetPage = mapping.page;
    const pageLinks = linkedPages.get(targetPage) || 0;
    if (pageLinks >= settings.maxLinksPerTargetPage) continue;
    
    // Find best position for link insertion
    const position = findBestLinkPosition(
      result, 
      keyword, 
      lastLinkPosition,
      settings
    );
    
    if (position !== -1) {
      // Generate natural anchor text
      const anchorText = generateNaturalAnchor(
        keyword,
        mapping.intent,
        pageLinks
      );
      
      // Get page title for accessibility
      const pageInfo = getPageInfo(targetPage);
      const title = pageInfo.title || `Page ${targetPage}`;
      
      // Insert link
      result = insertLink(
        result,
        position,
        keyword,
        `${URL_PATTERN}${targetPage}`,
        anchorText,
        title
      );
      
      totalLinks++;
      linkedPages.set(targetPage, pageLinks + 1);
      lastLinkPosition = position;
    }
  }
  
  return result;
}

// Helper function to find relevant keywords with contextual scoring
function getRelevantKeywords(content, currentPageNum) {
  const contentLower = content.toLowerCase();
  const keywords = [];
  
  for (const [keyword, mapping] of KEYWORD_MAPPINGS) {
    if (mapping.page === currentPageNum) continue;
    
    const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'gi');
    const matches = contentLower.match(regex);
    
    if (matches && matches.length > 0) {
      // Calculate relevance score
      const score = calculateRelevanceScore(
        keyword,
        mapping,
        matches.length,
        content
      );
      
      keywords.push({ keyword, mapping, score });
    }
  }
  
  // Sort by score (relevance * priority)
  return keywords.sort((a, b) => b.score - a.score);
}

// Calculate relevance score based on multiple factors
function calculateRelevanceScore(keyword, mapping, occurrences, content) {
  let score = mapping.priority || 5;
  
  // Boost score for multiple occurrences (diminishing returns)
  score += Math.log(occurrences + 1) * 2;
  
  // Boost for keywords in headers
  if (/<h[1-3][^>]*>.*?${escapeRegex(keyword)}.*?<\/h[1-3]>/i.test(content)) {
    score += 3;
  }
  
  // Boost for keywords in first paragraph
  const firstPara = content.match(/<p[^>]*>.*?<\/p>/i);
  if (firstPara && firstPara[0].toLowerCase().includes(keyword)) {
    score += 2;
  }
  
  // Intent matching bonus
  if (mapping.intent === 'commercial' || mapping.intent === 'transactional') {
    score += 1;
  }
  
  return score;
}

// Find the best position to insert a link
function findBestLinkPosition(content, keyword, lastLinkPosition, settings) {
  const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'gi');
  let match;
  let bestPosition = -1;
  let bestScore = -1;
  
  while ((match = regex.exec(content)) !== null) {
    const position = match.index;
    
    // Skip if too close to last link
    if (position - lastLinkPosition < settings.minWordsBetweenLinks) continue;
    
    // Skip if already in a link
    if (isInsideLink(content, position)) continue;
    
    // Skip if in header (if setting enabled)
    if (settings.avoidHeaderLinks && isInsideHeader(content, position)) continue;
    
    // Calculate position score
    const score = calculatePositionScore(content, position, settings);
    
    if (score > bestScore) {
      bestScore = score;
      bestPosition = position;
    }
  }
  
  return bestPosition;
}

// Generate natural anchor text variations
function generateNaturalAnchor(keyword, intent, variationIndex) {
  const variations = ANCHOR_VARIATIONS[intent] || ANCHOR_VARIATIONS.informational;
  const generator = variations[variationIndex % variations.length];
  return generator(keyword);
}

// Get page information
function getPageInfo(pageNum) {
  // Check all category objects
  return PAGE_CATEGORIES.PILLAR_PAGES[pageNum] ||
         PAGE_CATEGORIES.CAT_BREEDS[pageNum] ||
         PAGE_CATEGORIES.AGE_SPECIFIC[pageNum] ||
         PAGE_CATEGORIES.SPECIAL_COVERAGE[pageNum] ||
         { title: `Page ${pageNum}` };
}

// Insert link at specific position
function insertLink(content, position, keyword, url, anchorText, title) {
  const before = content.substring(0, position);
  const after = content.substring(position + keyword.length);
  
  return `${before}<a href="${url}" title="${title}" data-internal-link="true">${anchorText}</a>${after}`;
}

// Helper utilities
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isInsideLink(content, position) {
  const checkStart = Math.max(0, position - 100);
  const checkEnd = Math.min(content.length, position + 100);
  const surrounding = content.substring(checkStart, checkEnd);
  const relativePos = position - checkStart;
  
  // Check if position is inside <a> tags
  const linkStart = surrounding.lastIndexOf('<a', relativePos);
  const linkEnd = surrounding.indexOf('</a>', relativePos);
  
  return linkStart !== -1 && linkEnd !== -1 && linkStart < relativePos;
}

function isInsideHeader(content, position) {
  const checkStart = Math.max(0, position - 200);
  const checkEnd = Math.min(content.length, position + 200);
  const surrounding = content.substring(checkStart, checkEnd);
  const relativePos = position - checkStart;
  
  // Check if position is inside header tags
  const headerMatch = surrounding.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi);
  if (!headerMatch) return false;
  
  for (const header of headerMatch) {
    const headerStart = surrounding.indexOf(header);
    const headerEnd = headerStart + header.length;
    if (headerStart <= relativePos && relativePos <= headerEnd) {
      return true;
    }
  }
  
  return false;
}

function calculatePositionScore(content, position, settings) {
  let score = 100;
  
  // Prefer positions in first third of content
  const relativePosition = position / content.length;
  if (relativePosition < 0.33) {
    score += 20;
  } else if (relativePosition < 0.66) {
    score += 10;
  }
  
  // Prefer middle of sentences
  if (settings.preferSentenceMiddle) {
    const sentenceStart = content.lastIndexOf('.', position);
    const sentenceEnd = content.indexOf('.', position);
    if (sentenceStart !== -1 && sentenceEnd !== -1) {
      const sentenceLength = sentenceEnd - sentenceStart;
      const posInSentence = position - sentenceStart;
      const relPosInSentence = posInSentence / sentenceLength;
      
      if (relPosInSentence > 0.2 && relPosInSentence < 0.8) {
        score += 15;
      }
    }
  }
  
  // Prefer positions after commas or connecting words
  const precedingText = content.substring(Math.max(0, position - 50), position);
  if (/,\s*$/.test(precedingText) || /\b(and|but|or|with|for)\s+$/i.test(precedingText)) {
    score += 10;
  }
  
  return score;
}

// Export configuration for external use
export {
  PAGE_CATEGORIES,
  KEYWORD_MAPPINGS,
  ANCHOR_VARIATIONS,
  LINKING_RULES,
  URL_PATTERN
};

// Analytics and tracking functions
export function trackInternalLink(fromPage, toPage, anchorText) {
  // This would integrate with your analytics system
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'internal_link_click', {
      from_page: fromPage,
      to_page: toPage,
      anchor_text: anchorText
    });
  }
}

// Link performance reporting
export function generateLinkingReport(content, pageNum) {
  const report = {
    pageNumber: pageNum,
    pageTitle: getPageInfo(pageNum).title,
    potentialKeywords: [],
    recommendedLinks: [],
    linkDensity: 0
  };
  
  // Analyze content for linking opportunities
  for (const [keyword, mapping] of KEYWORD_MAPPINGS) {
    if (mapping.page === pageNum) continue;
    
    const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'gi');
    const matches = content.match(regex);
    
    if (matches && matches.length > 0) {
      report.potentialKeywords.push({
        keyword,
        targetPage: mapping.page,
        occurrences: matches.length,
        priority: mapping.priority,
        intent: mapping.intent
      });
    }
  }
  
  // Sort by opportunity score
  report.potentialKeywords.sort((a, b) => 
    (b.priority * b.occurrences) - (a.priority * a.occurrences)
  );
  
  // Generate recommendations
  report.recommendedLinks = report.potentialKeywords
    .slice(0, LINKING_RULES.maxLinksPerPage)
    .map(k => ({
      keyword: k.keyword,
      targetPage: k.targetPage,
      targetTitle: getPageInfo(k.targetPage).title,
      reason: `High ${k.intent} intent with ${k.occurrences} occurrences`
    }));
  
  // Calculate link density
  const currentLinks = (content.match(/<a[^>]*>/g) || []).length;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  report.linkDensity = ((currentLinks / wordCount) * 100).toFixed(2) + '%';
  
  return report;
}

// Default export for drop-in replacement
export { intelligentAutoLink as autoLink };