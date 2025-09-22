#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

function generateBreedKeywords() {
  console.log('=== STEP 4: GENERATING MISSING BREED KEYWORDS ===\n');
  
  // Define all breeds from the getDogBreeds and getCatBreeds functions
  const dogBreeds = [
    "Golden Retriever", "Labrador Retriever", "German Shepherd", "French Bulldog",
    "Bulldog", "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier", "Dachshund",
    "Boxer", "Siberian Husky", "Great Dane", "Pug", "Boston Terrier",
    "Shih Tzu", "Pomeranian", "Havanese", "Shetland Sheepdog", "Brittany Spaniel",
    "Bernese Mountain Dog", "Cocker Spaniel", "Border Collie", "Vizsla", "Basset Hound",
    "Mastiff", "Chihuahua", "Maltese", "Weimaraner", "Collie",
    "Newfoundland", "Rhodesian Ridgeback", "Shiba Inu", "West Highland Terrier", "Bichon Frise",
    "Bloodhound", "Akita", "Saint Bernard", "Bull Terrier", "Whippet",
    "Chinese Crested", "Papillon", "Bullmastiff", "Soft Coated Wheaten Terrier", "Scottish Terrier",
    "Dalmatian", "Airedale Terrier", "Portuguese Water Dog", "Alaskan Malamute", "Australian Cattle Dog",
    "English Setter", "Chinese Shar-Pei", "Cairn Terrier", "Staffordshire Bull Terrier", "Pembroke Welsh Corgi",
    "Irish Setter", "Norwegian Elkhound", "Great Pyrenees", "Greyhound", "Old English Sheepdog",
    "Italian Greyhound", "Chow Chow", "German Shorthaired Pointer", "Pekingese", "Irish Wolfhound",
    "Miniature Schnauzer", "Lhasa Apso", "German Wirehaired Pointer", "American Eskimo Dog", "Afghan Hound",
    "English Bulldog", "Samoyed", "Brittany", "Cardigan Welsh Corgi", "Flat-Coated Retriever",
    "Basenji", "English Springer Spaniel", "Brussels Griffon", "Standard Schnauzer", "Norfolk Terrier",
    "Wire Fox Terrier", "Cavalier King Charles Spaniel", "Borzoi", "Chesapeake Bay Retriever", "Giant Schnauzer",
    "Gordon Setter", "Japanese Chin", "Keeshond", "Neapolitan Mastiff", "Norwich Terrier",
    "Parson Russell Terrier", "Silky Terrier", "Tibetan Terrier", "Toy Fox Terrier", "Schipperke",
    "American Staffordshire Terrier", "Belgian Malinois", "Belgian Sheepdog", "Belgian Tervuren", "Bernedoodle"
  ];
  
  const catBreeds = [
    "Persian", "Maine Coon", "Siamese", "Ragdoll", "British Shorthair",
    "Sphynx", "Bengal", "Scottish Fold", "Russian Blue", "Norwegian Forest",
    "Abyssinian", "American Shorthair", "Devon Rex", "Oriental Shorthair", "Birman",
    "American Curl", "Tonkinese", "Ocicat", "Burmese",
    "Somali", "Turkish Angora", "Balinese", "Egyptian Mau", "Manx",
    "Singapura", "Himalayan", "Japanese Bobtail", "Turkish Van", "European Burmese",
    "Chartreux", "Korat", "Selkirk Rex", "American Bobtail", "Havana Brown",
    "LaPerm", "American Wirehair", "Colorpoint Shorthair", "Bombay", "Siberian",
    "Cymric", "Munchkin", "Javanese", "Snowshoe", "York Chocolate",
    "Nebelung", "Peterbald", "Pixiebob", "Australian Mist"
  ];
  
  // Load existing keywords
  const existingData = JSON.parse(readFileSync('extracted-keywords.json', 'utf8'));
  const existingKeywords = existingData.keywords;
  
  // Find which breed keywords already exist
  const existingBreedKeywords = new Set();
  existingKeywords.forEach(keyword => {
    const allBreeds = [...dogBreeds, ...catBreeds];
    allBreeds.forEach(breed => {
      if (keyword.includes(breed)) {
        existingBreedKeywords.add(keyword);
      }
    });
  });
  
  console.log(`Existing breed keywords: ${existingBreedKeywords.size}`);
  console.log('Sample existing breed keywords:');
  [...existingBreedKeywords].slice(0, 5).forEach(k => console.log(`  - "${k}"`));
  
  // Generate the 3 variations for each breed
  const newBreedKeywords = [];
  
  // Dog breed variations
  dogBreeds.forEach(breed => {
    const variations = [
      `${breed} Insurance Costs`,
      `${breed} Health Coverage`,
      `${breed} Insurance Plans`
    ];
    
    variations.forEach(variation => {
      if (![...existingBreedKeywords].some(k => k.includes(breed))) {
        newBreedKeywords.push(variation);
      }
    });
  });
  
  // Cat breed variations
  catBreeds.forEach(breed => {
    const variations = [
      `${breed} Cat Health Insurance`,
      `${breed} Cat Insurance Options`,
      `${breed} Cat Coverage Plans`
    ];
    
    variations.forEach(variation => {
      if (![...existingBreedKeywords].some(k => k.includes(breed))) {
        newBreedKeywords.push(variation);
      }
    });
  });
  
  console.log(`\nNew breed keywords to add: ${newBreedKeywords.length}`);
  console.log('Sample new breed keywords:');
  newBreedKeywords.slice(0, 10).forEach(k => console.log(`  - "${k}"`));
  
  // Calculate how many keywords need to be replaced
  const totalExisting = existingKeywords.length;
  const totalNeeded = existingKeywords.length; // Keep same total
  const breedKeywordsNeeded = 450; // 150 breeds × 3 variations
  
  console.log('\n=== REPLACEMENT STRATEGY ===');
  console.log(`Total keywords currently: ${totalExisting}`);
  console.log(`Breed keywords needed: ${breedKeywordsNeeded}`);
  console.log(`Breed keywords existing: ${existingBreedKeywords.size}`);
  console.log(`Breed keywords to add: ${newBreedKeywords.length}`);
  
  // Identify keywords to replace (the generic emergency/dental ones after 848)
  const keywordsToReplace = [];
  for (let i = 848; i < existingKeywords.length && keywordsToReplace.length < newBreedKeywords.length; i++) {
    const keyword = existingKeywords[i];
    // Skip if it's already a breed keyword
    if (![...existingBreedKeywords].includes(keyword)) {
      keywordsToReplace.push({ index: i, keyword });
    }
  }
  
  console.log(`\nKeywords to replace: ${keywordsToReplace.length}`);
  console.log('Sample keywords being replaced:');
  keywordsToReplace.slice(0, 5).forEach(({ index, keyword }) => {
    console.log(`  Position ${index + 1}: "${keyword}"`);
  });
  
  // Save the replacement plan
  const replacementPlan = {
    existingBreedCount: existingBreedKeywords.size,
    newBreedKeywordsCount: newBreedKeywords.length,
    totalBreedKeywordsAfter: existingBreedKeywords.size + newBreedKeywords.length,
    keywordsToReplace: keywordsToReplace,
    newBreedKeywords: newBreedKeywords
  };
  
  writeFileSync('breed-keyword-replacement-plan.json', JSON.stringify(replacementPlan, null, 2));
  console.log('\nReplacement plan saved to breed-keyword-replacement-plan.json');
  
  // Generate the code to update getAllKeywords
  console.log('\n=== NEXT STEP ===');
  console.log('To implement this fix:');
  console.log('1. Replace the keywords at positions 849+ with the new breed keywords');
  console.log('2. This will give us the claimed 450 breed-related keywords');
  console.log('3. Each breed will have 3 variations as originally intended');
  
  return replacementPlan;
}

generateBreedKeywords();