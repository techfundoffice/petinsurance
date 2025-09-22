#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

console.log('=== ADDING MORE PAGES TO MILLION PAGES ===\n');

// Read current index.js
let content = readFileSync('./src/index.js', 'utf8');

// Find the end of getAllKeywords array
const arrayEndMatch = content.match(/("pet dental cleaning cost"\s*\];)/);
if (!arrayEndMatch) {
  console.error('Could not find end of getAllKeywords array');
  process.exit(1);
}

// Generate 500 new exotic animal insurance pages
const exoticAnimals = [
  'Hedgehog', 'Ferret', 'Chinchilla', 'Sugar Glider', 'Bearded Dragon',
  'Gecko', 'Iguana', 'Parrot', 'Cockatiel', 'Macaw', 
  'Python', 'Corn Snake', 'Tarantula', 'Scorpion', 'Axolotl',
  'Turtle', 'Tortoise', 'Hamster', 'Gerbil', 'Guinea Pig',
  'Rabbit', 'Rat', 'Mouse', 'Degu', 'Prairie Dog',
  'Skunk', 'Fennec Fox', 'Capybara', 'Wallaby', 'Kinkajou',
  'Serval', 'Caracal', 'Ocelot', 'Bobcat', 'Lynx',
  'Emu', 'Ostrich', 'Peacock', 'Swan', 'Flamingo',
  'Alpaca', 'Llama', 'Miniature Pig', 'Pot-bellied Pig', 'Goat',
  'Sheep', 'Miniature Horse', 'Donkey', 'Mule', 'Zebra'
];

const newKeywords = [];

// Add exotic animal pages (3 variations each)
exoticAnimals.forEach(animal => {
  newKeywords.push(`"${animal} Pet Insurance Coverage"`);
  newKeywords.push(`"${animal} Health Insurance Plans"`);  
  newKeywords.push(`"${animal} Veterinary Insurance"`);
});

// Add specialty veterinary services
const specialties = [
  'Exotic Animal Emergency Care', 'Reptile Specialist Insurance',
  'Avian Veterinary Coverage', 'Small Mammal Health Plans',
  'Aquatic Pet Insurance', 'Zoo Animal Coverage',
  'Wildlife Rehabilitation Insurance', 'Exotic Pet Surgery Coverage',
  'Venomous Pet Insurance', 'Large Bird Health Plans'
];

specialties.forEach(specialty => {
  newKeywords.push(`"${specialty}"`);
});

// Add pet technology insurance
const techPages = [
  'Pet GPS Tracker Insurance', 'Smart Pet Door Coverage',
  'Automated Feeder Protection', 'Pet Camera System Insurance',
  'Electronic Pet Fence Coverage', 'Pet Health Monitor Insurance',
  'Smart Litter Box Protection', 'Pet Activity Tracker Coverage'
];

techPages.forEach(tech => {
  newKeywords.push(`"${tech}"`);
});

console.log(`Adding ${newKeywords.length} new pages...`);

// Insert new keywords before the closing bracket
const newArrayContent = arrayEndMatch[1].replace(']', ',\n    ' + newKeywords.join(',\n    ') + '\n  ]');
content = content.replace(arrayEndMatch[1], newArrayContent);

// Write updated file
writeFileSync('./src/index.js', content);

console.log(`\n✅ Successfully added ${newKeywords.length} new pages!`);
console.log('   Total pages will be: 1377 + ' + newKeywords.length + ' = ' + (1377 + newKeywords.length));
console.log('\nNew exotic animals included:');
exoticAnimals.slice(0, 10).forEach(animal => console.log(`   - ${animal}`));
console.log('   ... and ' + (exoticAnimals.length - 10) + ' more!');

console.log('\n📦 Next step: Deploy with wrangler deploy');