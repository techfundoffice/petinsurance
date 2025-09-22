#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

function accurateBreedCount() {
  console.log('=== ACCURATE BREED COUNT WITH COMPLETE PATTERNS ===\n');
  
  // Load current keywords
  const currentData = JSON.parse(readFileSync('actual-current-keywords.json', 'utf8'));
  const keywords = currentData.keywords;
  
  // COMPLETE list of breeds from getDogBreeds() and getCatBreeds()
  const allDogBreeds = [
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
  
  const allCatBreeds = [
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
  
  // Count breed keywords accurately
  let totalBreedKeywords = 0;
  const breedKeywordDetails = [];
  
  keywords.forEach((keyword, index) => {
    let isBreedKeyword = false;
    let matchedBreed = '';
    let breedType = '';
    
    // Check dog breeds
    for (const breed of allDogBreeds) {
      if (keyword.includes(breed)) {
        isBreedKeyword = true;
        matchedBreed = breed;
        breedType = 'dog';
        break;
      }
    }
    
    // Check cat breeds (if not already found)
    if (!isBreedKeyword) {
      for (const breed of allCatBreeds) {
        if (keyword.includes(breed)) {
          isBreedKeyword = true;
          matchedBreed = breed;
          breedType = 'cat';
          break;
        }
      }
    }
    
    if (isBreedKeyword) {
      totalBreedKeywords++;
      breedKeywordDetails.push({
        position: index + 1,
        keyword,
        breed: matchedBreed,
        type: breedType
      });
    }
  });
  
  console.log(`Total breed keywords found: ${totalBreedKeywords}`);
  console.log(`Dog breeds: ${allDogBreeds.length}`);
  console.log(`Cat breeds: ${allCatBreeds.length}`);
  console.log(`Total breeds: ${allDogBreeds.length + allCatBreeds.length}`);
  
  // Show distribution
  const ranges = {
    '1-100': 0,
    '101-200': 0,
    '201-300': 0,
    '301-400': 0,
    '401-500': 0,
    '501-600': 0,
    '601-700': 0,
    '701-800': 0,
    '801-900': 0,
    '901-1000': 0,
    '1001-1100': 0,
    '1101-1200': 0,
    '1201-1300': 0,
    '1301-1377': 0
  };
  
  breedKeywordDetails.forEach(({ position }) => {
    if (position <= 100) ranges['1-100']++;
    else if (position <= 200) ranges['101-200']++;
    else if (position <= 300) ranges['201-300']++;
    else if (position <= 400) ranges['301-400']++;
    else if (position <= 500) ranges['401-500']++;
    else if (position <= 600) ranges['501-600']++;
    else if (position <= 700) ranges['601-700']++;
    else if (position <= 800) ranges['701-800']++;
    else if (position <= 900) ranges['801-900']++;
    else if (position <= 1000) ranges['901-1000']++;
    else if (position <= 1100) ranges['1001-1100']++;
    else if (position <= 1200) ranges['1101-1200']++;
    else if (position <= 1300) ranges['1201-1300']++;
    else ranges['1301-1377']++;
  });
  
  console.log('\nBreed keyword distribution by position:');
  Object.entries(ranges).forEach(([range, count]) => {
    if (count > 0) {
      console.log(`  Positions ${range}: ${count} breed keywords`);
    }
  });
  
  // Update the saved data with accurate count
  currentData.breedCount = totalBreedKeywords;
  currentData.accurateBreedDetails = breedKeywordDetails;
  writeFileSync('actual-current-keywords.json', JSON.stringify(currentData, null, 2));
  
  console.log('\n✅ Updated actual-current-keywords.json with ACCURATE breed count');
  
  // Final truth
  console.log('\n=== THE ABSOLUTE TRUTH ===');
  console.log(`1. Total keywords in getAllKeywords(): ${keywords.length}`);
  console.log(`2. Total breed keywords: ${totalBreedKeywords}`);
  console.log(`3. Original breed keywords (before position 849): ${breedKeywordDetails.filter(d => d.position < 849).length}`);
  console.log(`4. New breed keywords (position 849+): ${breedKeywordDetails.filter(d => d.position >= 849).length}`);
  
  return totalBreedKeywords;
}

accurateBreedCount();