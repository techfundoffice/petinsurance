// Keyword Loader - Centralized keyword management
// This module loads keywords ONCE and exports them

// Import the actual keywords from wherever they're defined
// This is a simplified version - in production you might load from a file or database

const ALL_KEYWORDS = [
  "Affordable Cat Insurance Plans",
  "Best Pet Insurance for Senior Cats", 
  "Cat Insurance Comparison Guide 2024",
  "Persian Cat Health Insurance Coverage",
  "Maine Coon Insurance Costs and Benefits",
  "Siamese Cat Insurance Premium Calculator",
  "Bengal Cat Medical Insurance Options",
  "Ragdoll Cat Veterinary Insurance Plans",
  "British Shorthair Insurance Requirements",
  "Cat Dental Insurance Coverage Explained",
  "Multi-Cat Insurance Discount Programs",
  "Kitten Insurance Essential Coverage Guide",
  "Indoor Cat Insurance Policy Benefits",
  "Emergency Cat Surgery Insurance Coverage",
  "Chronic Illness Cat Insurance Options",
  // ... add the rest of your keywords here
  // In production, this would be loaded from your actual keyword source
];

// For now, let's generate more keywords to simulate your actual dataset
function generateAllKeywords() {
  const baseKeywords = ALL_KEYWORDS;
  const keywords = [...baseKeywords];
  
  // Generate variations to simulate thousands of keywords
  const modifiers = ['Affordable', 'Best', 'Cheap', 'Premium', 'Comprehensive'];
  const locations = ['New York', 'California', 'Texas', 'Florida', 'Illinois'];
  const breeds = ['Persian', 'Siamese', 'Maine Coon', 'Bengal', 'Ragdoll', 'British Shorthair'];
  
  // Generate location-based keywords
  breeds.forEach(breed => {
    locations.forEach(location => {
      keywords.push(`${breed} Cat Insurance in ${location}`);
      keywords.push(`${breed} Cat Vets in ${location}`);
    });
  });
  
  // Generate service-based keywords
  breeds.forEach(breed => {
    modifiers.forEach(modifier => {
      keywords.push(`${modifier} ${breed} Cat Insurance`);
      keywords.push(`${modifier} ${breed} Cat Health Plans`);
    });
  });
  
  // Add more generic keywords
  for (let i = 1; i <= 1000; i++) {
    keywords.push(`Cat Insurance Guide Part ${i}`);
    keywords.push(`Pet Insurance FAQ ${i}`);
  }
  
  return keywords;
}

// Generate and freeze the keyword list
const KEYWORDS = Object.freeze(generateAllKeywords());

// Export function to match existing interface
export function getAllKeywords() {
  return KEYWORDS;
}

// Export some metadata
export const KEYWORD_STATS = {
  total: KEYWORDS.length,
  unique: new Set(KEYWORDS).size,
  loaded: new Date().toISOString()
};