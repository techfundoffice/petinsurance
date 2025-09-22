#!/usr/bin/env node

import { readFileSync } from 'fs';

// Get the REAL breed count using COMPLETE patterns
console.log('=== CHECKING BREED COUNT TRUTH ===\n');

const content = readFileSync('./src/index.js', 'utf8');
const match = content.match(/function getAllKeywords\(\) {\s*return \[([\s\S]*?)\];\s*}/);
const keywords = match[1].match(/"[^"]+"/g).map(k => k.replace(/"/g, ''));

// Use the COMPLETE breed lists from the functions
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

// Count using COMPLETE patterns
let breedCount = 0;
keywords.forEach(keyword => {
  const isBreed = [...allDogBreeds, ...allCatBreeds].some(breed => keyword.includes(breed));
  if (isBreed) breedCount++;
});

console.log('Method 1 (Complete patterns): ' + breedCount + ' breed keywords');

// Compare with limited patterns from count-exact.js
const limitedCount = keywords.filter(k => 
  k.match(/Golden Retriever|Labrador Retriever|German Shepherd|French Bulldog|Bulldog|Poodle|Beagle|Rottweiler|Yorkshire Terrier|Dachshund|Boxer|Husky|Great Dane|Pug|Boston Terrier|Shih Tzu|Pomeranian|Havanese|Mastiff|Chihuahua|Maltese|Collie|Akita|Whippet|Greyhound|Persian Cat|Maine Coon|Siamese Cat|Bengal Cat|Ragdoll|Sphynx|Scottish Fold|Russian Blue|British Shorthair|Devon Rex|Abyssinian|Birman|Burmese/i)
).length;

console.log('Method 2 (Limited patterns): ' + limitedCount + ' breed keywords');

// Show the truth
console.log('\n🚨 THE TRUTH:');
console.log('- actual-current-keywords.json claims: 410');
console.log('- count-exact.js finds: 101 (using incomplete patterns)');
console.log('- REAL count with complete patterns: ' + breedCount);

// Save the truth
const truthData = {
  claimedInJSON: 410,
  foundByLimitedPatterns: limitedCount,
  actualWithCompletePatterns: breedCount,
  totalKeywords: keywords.length
};

console.log('\n✅ This is the TRUTH about breed keywords.');