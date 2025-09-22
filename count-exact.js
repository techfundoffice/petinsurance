#!/usr/bin/env node
import { readFileSync } from 'fs';

console.log('=== EXACT KEYWORD COUNT - NO ESTIMATES ===\n');

try {
  // Extract keywords from index.js
  const content = readFileSync('./src/index.js', 'utf8');
  const match = content.match(/function getAllKeywords\(\) {\s*return \[([\s\S]*?)\];\s*}/);
  if (!match) {
    console.error('ERROR: Cannot find getAllKeywords() function');
    process.exit(1);
  }

  const keywords = match[1].match(/"[^"]+"/g).map(k => k.replace(/"/g, ''));
  console.log(`Total keywords in getAllKeywords(): ${keywords.length}`);
  
  if (keywords.length !== 1377) {
    console.log(`⚠️  WARNING: Expected 1377, got ${keywords.length}`);
  }

  // Count different categories
  console.log('\nCategory counts:');
  
  const categories = {
    'breed (all)': /Golden Retriever|Labrador Retriever|German Shepherd|French Bulldog|Bulldog|Poodle|Beagle|Rottweiler|Yorkshire Terrier|Dachshund|Boxer|Siberian Husky|Great Dane|Pug|Boston Terrier|Shih Tzu|Pomeranian|Havanese|Shetland Sheepdog|Brittany|Bernese Mountain Dog|Cocker Spaniel|Border Collie|Vizsla|Basset Hound|Mastiff|Chihuahua|Maltese|Weimaraner|Collie|Newfoundland|Rhodesian Ridgeback|Shiba Inu|West Highland|Bichon Frise|Bloodhound|Akita|Saint Bernard|Bull Terrier|Whippet|Chinese Crested|Papillon|Bullmastiff|Wheaten Terrier|Scottish Terrier|Dalmatian|Airedale Terrier|Portuguese Water Dog|Alaskan Malamute|Australian Cattle Dog|English Setter|Shar-Pei|Cairn Terrier|Staffordshire|Welsh Corgi|Irish Setter|Norwegian Elkhound|Great Pyrenees|Greyhound|Old English Sheepdog|Italian Greyhound|Chow Chow|Shorthaired Pointer|Pekingese|Irish Wolfhound|Schnauzer|Lhasa Apso|Wirehaired Pointer|American Eskimo|Afghan Hound|English Bulldog|Samoyed|Brittany|Flat-Coated Retriever|Basenji|English Springer Spaniel|Brussels Griffon|Norfolk Terrier|Wire Fox Terrier|Cavalier King Charles|Borzoi|Chesapeake Bay|Gordon Setter|Japanese Chin|Keeshond|Neapolitan Mastiff|Norwich Terrier|Parson Russell|Silky Terrier|Tibetan Terrier|Toy Fox Terrier|Schipperke|American Staffordshire|Belgian Malinois|Belgian Sheepdog|Belgian Tervuren|Bernedoodle|Persian|Maine Coon|Siamese|Ragdoll|British Shorthair|Sphynx|Bengal|Scottish Fold|Russian Blue|Norwegian Forest|Abyssinian|American Shorthair|Devon Rex|Oriental Shorthair|Birman|American Curl|Tonkinese|Ocicat|Burmese|Somali|Turkish Angora|Balinese|Egyptian Mau|Manx|Singapura|Himalayan|Japanese Bobtail|Turkish Van|European Burmese|Chartreux|Korat|Selkirk Rex|American Bobtail|Havana Brown|LaPerm|American Wirehair|Colorpoint Shorthair|Bombay|Siberian|Cymric|Munchkin|Javanese|Snowshoe|York Chocolate|Nebelung|Peterbald|Pixiebob|Australian Mist/i,
    'emergency': /emergency|urgent|crisis|critical|24.hour|after.hours/i,
    'dental': /dental|tooth|teeth|oral|periodontal|orthodontic/i,
    'surgery': /surgery|surgical|operation|procedure/i,
    'wellness': /wellness|preventive|routine|checkup|annual/i,
    'specialty': /specialist|dermatology|cardiology|oncology|orthopedic/i
  };

  let totalCategorized = 0;
  Object.entries(categories).forEach(([name, pattern]) => {
    const count = keywords.filter(k => pattern.test(k)).length;
    console.log(`  ${name}: ${count}`);
    totalCategorized += count;
  });
  
  console.log(`\nUncategorized: ${keywords.length - totalCategorized}`);
  
  // Show position ranges for breeds
  console.log('\nBreed keyword positions:');
  const breedPositions = [];
  keywords.forEach((k, i) => {
    if (categories['breed (all)'].test(k)) {
      breedPositions.push(i + 1);
    }
  });
  
  if (breedPositions.length > 0) {
    console.log(`  First breed: position ${breedPositions[0]}`);
    console.log(`  Last breed: position ${breedPositions[breedPositions.length - 1]}`);
    console.log(`  Total breed keywords: ${breedPositions.length}`);
  }

  console.log('\n✅ These are EXACT counts. Not estimates.');
  
} catch (error) {
  console.error('ERROR:', error.message);
  console.error('Make sure you run this from the million-pages directory');
  process.exit(1);
}