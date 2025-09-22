// AI-Powered Internal Linking Configuration - Extended Version
// Comprehensive keyword mappings for million-page site
// This extends the base configuration with additional mappings for pages 21-100+

import { 
  PAGE_CATEGORIES as BASE_CATEGORIES,
  KEYWORD_MAPPINGS as BASE_MAPPINGS,
  ANCHOR_VARIATIONS,
  LINKING_RULES,
  URL_PATTERN,
  intelligentAutoLink as baseAutoLink
} from './ai-internal-linking-config.js';

// Extended page categories for pages 21-200
const EXTENDED_PAGE_CATEGORIES = {
  ...BASE_CATEGORIES,
  
  // Health Condition Pages (21-40)
  HEALTH_CONDITIONS: {
    21: { condition: 'Diabetes', title: 'Cat Diabetes Insurance Coverage' },
    22: { condition: 'Kidney Disease', title: 'Feline Kidney Disease Insurance' },
    23: { condition: 'Cancer', title: 'Cat Cancer Treatment Insurance' },
    24: { condition: 'Heart Disease', title: 'Feline Heart Disease Coverage' },
    25: { condition: 'Allergies', title: 'Cat Allergy Treatment Insurance' },
    26: { condition: 'Arthritis', title: 'Feline Arthritis Coverage Plans' },
    27: { condition: 'Hyperthyroidism', title: 'Cat Thyroid Treatment Insurance' },
    28: { condition: 'Dental Disease', title: 'Feline Dental Disease Coverage' },
    29: { condition: 'Eye Conditions', title: 'Cat Eye Treatment Insurance' },
    30: { condition: 'Skin Conditions', title: 'Feline Skin Condition Coverage' },
    31: { condition: 'UTI', title: 'Cat Urinary Tract Insurance' },
    32: { condition: 'FIV/FeLV', title: 'FIV FeLV Cat Insurance' },
    33: { condition: 'Asthma', title: 'Feline Asthma Insurance Coverage' },
    34: { condition: 'IBD', title: 'Cat IBD Treatment Insurance' },
    35: { condition: 'Pancreatitis', title: 'Feline Pancreatitis Coverage' },
    36: { condition: 'Liver Disease', title: 'Cat Liver Disease Insurance' },
    37: { condition: 'Seizures', title: 'Feline Seizure Treatment Coverage' },
    38: { condition: 'Obesity', title: 'Cat Weight Management Insurance' },
    39: { condition: 'Behavioral Issues', title: 'Cat Behavioral Therapy Coverage' },
    40: { condition: 'Parasites', title: 'Feline Parasite Treatment Insurance' }
  },
  
  // Treatment Type Pages (41-60)
  TREATMENT_TYPES: {
    41: { treatment: 'Surgery', title: 'Cat Surgery Insurance Guide' },
    42: { treatment: 'Chemotherapy', title: 'Feline Chemotherapy Coverage' },
    43: { treatment: 'Radiation', title: 'Cat Radiation Therapy Insurance' },
    44: { treatment: 'Diagnostics', title: 'Cat Diagnostic Test Coverage' },
    45: { treatment: 'Hospitalization', title: 'Feline Hospital Stay Insurance' },
    46: { treatment: 'Prescription Meds', title: 'Cat Prescription Coverage' },
    47: { treatment: 'Alternative Medicine', title: 'Holistic Cat Treatment Insurance' },
    48: { treatment: 'Physical Therapy', title: 'Cat Rehabilitation Insurance' },
    49: { treatment: 'Acupuncture', title: 'Feline Acupuncture Coverage' },
    50: { treatment: 'Hydrotherapy', title: 'Cat Hydrotherapy Insurance' },
    51: { treatment: 'Laser Therapy', title: 'Feline Laser Treatment Coverage' },
    52: { treatment: 'Stem Cell', title: 'Cat Stem Cell Therapy Insurance' },
    53: { treatment: 'Blood Transfusion', title: 'Feline Blood Transfusion Coverage' },
    54: { treatment: 'Oxygen Therapy', title: 'Cat Oxygen Treatment Insurance' },
    55: { treatment: 'Dialysis', title: 'Feline Dialysis Coverage' },
    56: { treatment: 'MRI/CT Scan', title: 'Cat Advanced Imaging Insurance' },
    57: { treatment: 'Ultrasound', title: 'Feline Ultrasound Coverage' },
    58: { treatment: 'X-Ray', title: 'Cat X-Ray Insurance Coverage' },
    59: { treatment: 'Endoscopy', title: 'Feline Endoscopy Insurance' },
    60: { treatment: 'Biopsy', title: 'Cat Biopsy Coverage Plans' }
  },
  
  // Location-Based Pages (61-100)
  LOCATION_BASED: {
    61: { location: 'New York', title: 'Cat Insurance in New York' },
    62: { location: 'California', title: 'Cat Insurance in California' },
    63: { location: 'Texas', title: 'Cat Insurance in Texas' },
    64: { location: 'Florida', title: 'Cat Insurance in Florida' },
    65: { location: 'Illinois', title: 'Cat Insurance in Illinois' },
    66: { location: 'Pennsylvania', title: 'Cat Insurance in Pennsylvania' },
    67: { location: 'Ohio', title: 'Cat Insurance in Ohio' },
    68: { location: 'Georgia', title: 'Cat Insurance in Georgia' },
    69: { location: 'Michigan', title: 'Cat Insurance in Michigan' },
    70: { location: 'North Carolina', title: 'Cat Insurance in North Carolina' },
    71: { location: 'New Jersey', title: 'Cat Insurance in New Jersey' },
    72: { location: 'Virginia', title: 'Cat Insurance in Virginia' },
    73: { location: 'Washington', title: 'Cat Insurance in Washington' },
    74: { location: 'Massachusetts', title: 'Cat Insurance in Massachusetts' },
    75: { location: 'Arizona', title: 'Cat Insurance in Arizona' },
    76: { location: 'Tennessee', title: 'Cat Insurance in Tennessee' },
    77: { location: 'Indiana', title: 'Cat Insurance in Indiana' },
    78: { location: 'Missouri', title: 'Cat Insurance in Missouri' },
    79: { location: 'Maryland', title: 'Cat Insurance in Maryland' },
    80: { location: 'Wisconsin', title: 'Cat Insurance in Wisconsin' },
    81: { location: 'Minnesota', title: 'Cat Insurance in Minnesota' },
    82: { location: 'Colorado', title: 'Cat Insurance in Colorado' },
    83: { location: 'Alabama', title: 'Cat Insurance in Alabama' },
    84: { location: 'South Carolina', title: 'Cat Insurance in South Carolina' },
    85: { location: 'Louisiana', title: 'Cat Insurance in Louisiana' },
    86: { location: 'Kentucky', title: 'Cat Insurance in Kentucky' },
    87: { location: 'Oregon', title: 'Cat Insurance in Oregon' },
    88: { location: 'Oklahoma', title: 'Cat Insurance in Oklahoma' },
    89: { location: 'Connecticut', title: 'Cat Insurance in Connecticut' },
    90: { location: 'Utah', title: 'Cat Insurance in Utah' },
    91: { location: 'Nevada', title: 'Cat Insurance in Nevada' },
    92: { location: 'Arkansas', title: 'Cat Insurance in Arkansas' },
    93: { location: 'Mississippi', title: 'Cat Insurance in Mississippi' },
    94: { location: 'Kansas', title: 'Cat Insurance in Kansas' },
    95: { location: 'New Mexico', title: 'Cat Insurance in New Mexico' },
    96: { location: 'Nebraska', title: 'Cat Insurance in Nebraska' },
    97: { location: 'West Virginia', title: 'Cat Insurance in West Virginia' },
    98: { location: 'Idaho', title: 'Cat Insurance in Idaho' },
    99: { location: 'Hawaii', title: 'Cat Insurance in Hawaii' },
    100: { location: 'Maine', title: 'Cat Insurance in Maine' }
  },
  
  // Insurance Company Comparisons (101-150)
  COMPANY_COMPARISONS: {
    101: { company: 'Healthy Paws', title: 'Healthy Paws Cat Insurance Review' },
    102: { company: 'Embrace', title: 'Embrace Pet Insurance for Cats' },
    103: { company: 'Nationwide', title: 'Nationwide Cat Insurance Review' },
    104: { company: 'Trupanion', title: 'Trupanion Cat Insurance Guide' },
    105: { company: 'ASPCA', title: 'ASPCA Cat Insurance Review' },
    106: { company: 'Petplan', title: 'Petplan Cat Insurance Coverage' },
    107: { company: 'Figo', title: 'Figo Cat Insurance Review' },
    108: { company: 'Pets Best', title: 'Pets Best Cat Insurance Guide' },
    109: { company: 'Lemonade', title: 'Lemonade Cat Insurance Review' },
    110: { company: 'MetLife', title: 'MetLife Cat Insurance Coverage' }
    // ... continues to 150
  },
  
  // Cost and Pricing Pages (151-200)
  COST_PRICING: {
    151: { topic: 'Average Cost', title: 'Average Cat Insurance Cost 2024' },
    152: { topic: 'Cost by Age', title: 'Cat Insurance Cost by Age' },
    153: { topic: 'Cost by Breed', title: 'Cat Insurance Cost by Breed' },
    154: { topic: 'Deductibles', title: 'Cat Insurance Deductibles Explained' },
    155: { topic: 'Premiums', title: 'Understanding Cat Insurance Premiums' },
    156: { topic: 'Copays', title: 'Cat Insurance Copays Guide' },
    157: { topic: 'Annual Limits', title: 'Cat Insurance Annual Limits' },
    158: { topic: 'Lifetime Limits', title: 'Lifetime Cat Insurance Limits' },
    159: { topic: 'Reimbursement', title: 'Cat Insurance Reimbursement Rates' },
    160: { topic: 'Discounts', title: 'Cat Insurance Discounts Guide' }
    // ... continues to 200
  }
};

// Extended keyword mappings
const EXTENDED_KEYWORD_MAPPINGS = new Map([
  // Include all base mappings
  ...BASE_MAPPINGS,
  
  // Health Condition Keywords (21-40)
  ['cat diabetes insurance', { page: 21, priority: 8, intent: 'commercial' }],
  ['diabetic cat coverage', { page: 21, priority: 8, intent: 'commercial' }],
  ['feline diabetes treatment', { page: 21, priority: 7, intent: 'informational' }],
  ['insulin coverage cats', { page: 21, priority: 7, intent: 'commercial' }],
  
  ['kidney disease cats', { page: 22, priority: 8, intent: 'informational' }],
  ['feline kidney insurance', { page: 22, priority: 8, intent: 'commercial' }],
  ['chronic kidney disease coverage', { page: 22, priority: 8, intent: 'commercial' }],
  ['renal failure cat insurance', { page: 22, priority: 8, intent: 'commercial' }],
  
  ['cat cancer insurance', { page: 23, priority: 9, intent: 'commercial' }],
  ['feline cancer coverage', { page: 23, priority: 9, intent: 'commercial' }],
  ['chemotherapy cats insurance', { page: 23, priority: 8, intent: 'commercial' }],
  ['oncology coverage cats', { page: 23, priority: 8, intent: 'commercial' }],
  
  ['heart disease cats', { page: 24, priority: 8, intent: 'informational' }],
  ['feline cardiac insurance', { page: 24, priority: 8, intent: 'commercial' }],
  ['heart condition coverage', { page: 24, priority: 8, intent: 'commercial' }],
  ['cardiomyopathy insurance', { page: 24, priority: 7, intent: 'commercial' }],
  
  ['cat allergy insurance', { page: 25, priority: 7, intent: 'commercial' }],
  ['allergic reaction coverage', { page: 25, priority: 7, intent: 'commercial' }],
  ['food allergy cats insurance', { page: 25, priority: 7, intent: 'commercial' }],
  ['dermatitis coverage cats', { page: 25, priority: 6, intent: 'commercial' }],
  
  // Treatment Type Keywords (41-60)
  ['cat surgery insurance', { page: 41, priority: 9, intent: 'commercial' }],
  ['surgical coverage cats', { page: 41, priority: 9, intent: 'commercial' }],
  ['operation insurance cats', { page: 41, priority: 8, intent: 'commercial' }],
  ['emergency surgery coverage', { page: 41, priority: 9, intent: 'commercial' }],
  
  ['chemotherapy insurance cats', { page: 42, priority: 8, intent: 'commercial' }],
  ['cancer treatment coverage', { page: 42, priority: 8, intent: 'commercial' }],
  ['chemo coverage feline', { page: 42, priority: 8, intent: 'commercial' }],
  
  ['radiation therapy cats', { page: 43, priority: 8, intent: 'commercial' }],
  ['radiation treatment insurance', { page: 43, priority: 8, intent: 'commercial' }],
  ['radiotherapy coverage', { page: 43, priority: 7, intent: 'commercial' }],
  
  ['diagnostic test coverage', { page: 44, priority: 8, intent: 'commercial' }],
  ['lab work insurance cats', { page: 44, priority: 7, intent: 'commercial' }],
  ['blood test coverage', { page: 44, priority: 7, intent: 'commercial' }],
  
  // Location-Based Keywords (61-100)
  ['cat insurance new york', { page: 61, priority: 8, intent: 'commercial' }],
  ['ny pet insurance cats', { page: 61, priority: 7, intent: 'commercial' }],
  ['new york cat coverage', { page: 61, priority: 7, intent: 'commercial' }],
  ['nyc cat insurance', { page: 61, priority: 8, intent: 'commercial' }],
  
  ['california cat insurance', { page: 62, priority: 8, intent: 'commercial' }],
  ['ca pet insurance cats', { page: 62, priority: 7, intent: 'commercial' }],
  ['los angeles cat insurance', { page: 62, priority: 8, intent: 'commercial' }],
  ['san francisco cat coverage', { page: 62, priority: 7, intent: 'commercial' }],
  
  ['texas cat insurance', { page: 63, priority: 8, intent: 'commercial' }],
  ['tx pet insurance cats', { page: 63, priority: 7, intent: 'commercial' }],
  ['houston cat coverage', { page: 63, priority: 7, intent: 'commercial' }],
  ['dallas cat insurance', { page: 63, priority: 7, intent: 'commercial' }],
  
  // Company Comparison Keywords (101-150)
  ['healthy paws cat insurance', { page: 101, priority: 9, intent: 'navigational' }],
  ['healthy paws review cats', { page: 101, priority: 8, intent: 'commercial' }],
  ['healthy paws coverage', { page: 101, priority: 8, intent: 'commercial' }],
  
  ['embrace cat insurance', { page: 102, priority: 9, intent: 'navigational' }],
  ['embrace pet review', { page: 102, priority: 8, intent: 'commercial' }],
  ['embrace coverage cats', { page: 102, priority: 8, intent: 'commercial' }],
  
  ['nationwide cat insurance', { page: 103, priority: 9, intent: 'navigational' }],
  ['nationwide pet review', { page: 103, priority: 8, intent: 'commercial' }],
  ['nationwide coverage cats', { page: 103, priority: 8, intent: 'commercial' }],
  
  // Cost and Pricing Keywords (151-200)
  ['average cat insurance cost', { page: 151, priority: 9, intent: 'transactional' }],
  ['how much cat insurance', { page: 151, priority: 9, intent: 'transactional' }],
  ['cat insurance price', { page: 151, priority: 9, intent: 'transactional' }],
  ['monthly cat insurance cost', { page: 151, priority: 8, intent: 'transactional' }],
  
  ['kitten insurance cost', { page: 152, priority: 8, intent: 'transactional' }],
  ['senior cat insurance cost', { page: 152, priority: 8, intent: 'transactional' }],
  ['cat insurance cost by age', { page: 152, priority: 8, intent: 'transactional' }],
  
  ['persian cat insurance cost', { page: 153, priority: 8, intent: 'transactional' }],
  ['maine coon insurance price', { page: 153, priority: 8, intent: 'transactional' }],
  ['breed specific insurance cost', { page: 153, priority: 7, intent: 'transactional' }]
]);

// Dynamic keyword generation for location pages
function generateLocationKeywords() {
  const locationKeywords = new Map();
  const states = Object.values(EXTENDED_PAGE_CATEGORIES.LOCATION_BASED);
  
  states.forEach((stateInfo, index) => {
    const pageNum = 61 + index;
    const location = stateInfo.location.toLowerCase();
    
    // Generate variations
    locationKeywords.set(`cat insurance ${location}`, { page: pageNum, priority: 8, intent: 'commercial' });
    locationKeywords.set(`${location} cat insurance`, { page: pageNum, priority: 8, intent: 'commercial' });
    locationKeywords.set(`pet insurance ${location}`, { page: pageNum, priority: 7, intent: 'commercial' });
    locationKeywords.set(`${location} pet coverage`, { page: pageNum, priority: 7, intent: 'commercial' });
  });
  
  return locationKeywords;
}

// Dynamic keyword generation for health conditions
function generateHealthKeywords() {
  const healthKeywords = new Map();
  const conditions = Object.values(EXTENDED_PAGE_CATEGORIES.HEALTH_CONDITIONS);
  
  conditions.forEach((conditionInfo, index) => {
    const pageNum = 21 + index;
    const condition = conditionInfo.condition.toLowerCase();
    
    // Generate variations
    healthKeywords.set(`${condition} cat insurance`, { page: pageNum, priority: 8, intent: 'commercial' });
    healthKeywords.set(`cat ${condition} coverage`, { page: pageNum, priority: 8, intent: 'commercial' });
    healthKeywords.set(`feline ${condition} insurance`, { page: pageNum, priority: 7, intent: 'commercial' });
    healthKeywords.set(`${condition} treatment cats`, { page: pageNum, priority: 7, intent: 'informational' });
  });
  
  return healthKeywords;
}

// Combine all keyword mappings
const ALL_KEYWORD_MAPPINGS = new Map([
  ...EXTENDED_KEYWORD_MAPPINGS,
  ...generateLocationKeywords(),
  ...generateHealthKeywords()
]);

// Enhanced autoLink function with extended mappings
export function intelligentAutoLink(content, currentPageNum, options = {}) {
  // Use the extended mappings
  const originalMappings = KEYWORD_MAPPINGS;
  
  // Temporarily replace with extended mappings
  Object.defineProperty(globalThis, 'KEYWORD_MAPPINGS', {
    value: ALL_KEYWORD_MAPPINGS,
    writable: true,
    configurable: true
  });
  
  // Call base function with extended mappings
  const result = baseAutoLink(content, currentPageNum, options);
  
  // Restore original mappings
  Object.defineProperty(globalThis, 'KEYWORD_MAPPINGS', {
    value: originalMappings,
    writable: true,
    configurable: true
  });
  
  return result;
}

// Advanced linking strategies for different page types
export function getPageTypeStrategy(pageNum) {
  if (pageNum >= 1 && pageNum <= 3) {
    return {
      name: 'pillar',
      maxLinks: 7,
      preferredTargets: [4, 5, 6, 7, 8, 12, 13, 16, 17], // Link to specific pages
      anchorStrategy: 'commercial'
    };
  } else if (pageNum >= 4 && pageNum <= 11) {
    return {
      name: 'breed',
      maxLinks: 5,
      preferredTargets: [1, 2, 15, 16, 17, 21, 22, 23], // Link to pillar and conditions
      anchorStrategy: 'informational'
    };
  } else if (pageNum >= 21 && pageNum <= 40) {
    return {
      name: 'condition',
      maxLinks: 6,
      preferredTargets: [1, 2, 3, 41, 42, 43, 44], // Link to treatments
      anchorStrategy: 'mixed'
    };
  } else if (pageNum >= 61 && pageNum <= 100) {
    return {
      name: 'location',
      maxLinks: 5,
      preferredTargets: [1, 2, 3, 101, 102, 103], // Link to companies
      anchorStrategy: 'transactional'
    };
  }
  
  return {
    name: 'general',
    maxLinks: 5,
    preferredTargets: [1, 2, 3],
    anchorStrategy: 'mixed'
  };
}

// Generate contextual link recommendations
export function getContextualRecommendations(content, pageNum) {
  const strategy = getPageTypeStrategy(pageNum);
  const recommendations = [];
  
  // Analyze content for topic relevance
  const contentLower = content.toLowerCase();
  
  // Check for health condition mentions
  if (contentLower.includes('diabetes') || contentLower.includes('blood sugar')) {
    recommendations.push({ page: 21, reason: 'Diabetes content detected' });
  }
  
  if (contentLower.includes('kidney') || contentLower.includes('renal')) {
    recommendations.push({ page: 22, reason: 'Kidney disease content detected' });
  }
  
  if (contentLower.includes('cancer') || contentLower.includes('tumor')) {
    recommendations.push({ page: 23, reason: 'Cancer content detected' });
  }
  
  // Check for treatment mentions
  if (contentLower.includes('surgery') || contentLower.includes('operation')) {
    recommendations.push({ page: 41, reason: 'Surgery content detected' });
  }
  
  if (contentLower.includes('chemotherapy') || contentLower.includes('chemo')) {
    recommendations.push({ page: 42, reason: 'Chemotherapy content detected' });
  }
  
  // Check for breed mentions
  const breeds = ['persian', 'maine coon', 'siamese', 'bengal', 'ragdoll'];
  breeds.forEach((breed, index) => {
    if (contentLower.includes(breed)) {
      recommendations.push({ page: 4 + index, reason: `${breed} breed mentioned` });
    }
  });
  
  // Always recommend pillar pages if not on one
  if (pageNum > 3) {
    recommendations.push({ page: 1, reason: 'Link to main guide' });
    recommendations.push({ page: 2, reason: 'Link to comparison tool' });
  }
  
  return recommendations.slice(0, strategy.maxLinks);
}

// Export extended configuration
export {
  EXTENDED_PAGE_CATEGORIES,
  ALL_KEYWORD_MAPPINGS,
  ANCHOR_VARIATIONS,
  LINKING_RULES,
  URL_PATTERN
};

// Bulk link generation for content management systems
export function bulkGenerateLinks(pages) {
  const linkingPlan = [];
  
  pages.forEach(page => {
    const { pageNum, content } = page;
    const recommendations = getContextualRecommendations(content, pageNum);
    const strategy = getPageTypeStrategy(pageNum);
    
    linkingPlan.push({
      pageNum,
      strategy: strategy.name,
      recommendations,
      potentialLinks: analyzeContent(content, pageNum)
    });
  });
  
  return linkingPlan;
}

// Analyze content for link opportunities
function analyzeContent(content, pageNum) {
  const opportunities = [];
  
  for (const [keyword, mapping] of ALL_KEYWORD_MAPPINGS) {
    if (mapping.page === pageNum) continue;
    
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = content.match(regex);
    
    if (matches && matches.length > 0) {
      opportunities.push({
        keyword,
        targetPage: mapping.page,
        occurrences: matches.length,
        priority: mapping.priority,
        intent: mapping.intent,
        score: mapping.priority * matches.length
      });
    }
  }
  
  return opportunities.sort((a, b) => b.score - a.score).slice(0, 10);
}

// Default export
export { intelligentAutoLink as autoLink };