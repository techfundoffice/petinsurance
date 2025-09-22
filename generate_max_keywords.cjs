// Generate maximum keywords that fit within 3MB Cloudflare limit
const fs = require('fs');

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle", "Denver", "Washington", "Boston", "El Paso", "Nashville", "Detroit", "Oklahoma City", "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Mesa", "Kansas City", "Atlanta", "Long Beach", "Colorado Springs", "Raleigh", "Miami", "Virginia Beach", "Omaha", "Oakland", "Minneapolis", "Tulsa", "Arlington", "Tampa", "New Orleans", "Wichita", "Cleveland", "Bakersfield", "Aurora", "Anaheim", "Honolulu", "Santa Ana", "Riverside", "Corpus Christi", "Lexington", "Stockton", "Henderson", "Saint Paul", "St. Louis", "Cincinnati", "Pittsburgh", "Greensboro", "Anchorage", "Plano", "Lincoln", "Orlando", "Irvine", "Newark", "Toledo", "Durham", "Chula Vista", "Fort Wayne", "Jersey City", "St. Petersburg", "Laredo", "Madison", "Chandler", "Buffalo", "Lubbock", "Scottsdale", "Reno", "Glendale", "Gilbert", "Winston Salem", "North Las Vegas", "Norfolk", "Chesapeake", "Garland", "Irving", "Hialeah", "Fremont", "Boise", "Richmond", "Baton Rouge", "Spokane", "Des Moines"];

const breeds = ["Golden Retriever", "Labrador Retriever", "German Shepherd", "French Bulldog", "Bulldog", "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier", "Dachshund", "Siberian Husky", "Boxer", "Boston Terrier", "Shih Tzu", "Chihuahua", "Border Collie", "Australian Shepherd", "Cocker Spaniel", "Mastiff", "Great Dane", "Doberman Pinscher", "Bernese Mountain Dog", "Cavalier King Charles Spaniel", "Saint Bernard", "Newfoundland", "Bloodhound", "Basset Hound", "Afghan Hound", "Akita", "Alaskan Malamute", "American Bulldog", "American Pit Bull Terrier", "Australian Cattle Dog", "Brittany", "Bull Terrier", "Cane Corso", "Chinese Shar Pei", "Chow Chow", "Collie", "English Springer Spaniel", "Great Pyrenees", "Havanese", "Irish Setter", "Jack Russell Terrier", "Maltese", "Papillon", "Pembroke Welsh Corgi", "Pomeranian", "Portuguese Water Dog", "Pug", "Rhodesian Ridgeback", "Samoyed", "Scottish Terrier", "Shetland Sheepdog", "Staffordshire Bull Terrier", "Standard Poodle", "Vizsla", "Weimaraner", "West Highland White Terrier", "Whippet", "Persian Cat", "Maine Coon", "British Shorthair", "Ragdoll", "Bengal", "Abyssinian", "Birman", "Oriental Shorthair", "Siamese", "American Shorthair", "Scottish Fold", "Sphynx", "Russian Blue", "Cornish Rex", "Devon Rex", "Norwegian Forest Cat", "Manx", "Exotic Shorthair", "Turkish Angora", "Burmese", "Tonkinese", "Somali", "Chartreux", "Balinese", "Egyptian Mau", "Japanese Bobtail", "Korat", "LaPerm", "Ocicat", "Selkirk Rex", "Singapura", "Turkish Van"];

const conditions = ["Hip Dysplasia", "Arthritis", "Cancer", "Diabetes", "Heart Disease", "Kidney Disease", "Liver Disease", "Epilepsy", "Allergies", "Skin Conditions", "Eye Problems", "Ear Infections", "Dental Disease", "Obesity", "Bloat", "Pancreatitis", "Urinary Blockage", "Respiratory Issues", "Neurological Disorders", "Autoimmune Disease", "Thyroid Problems", "Cushing's Disease", "Addison's Disease", "Inflammatory Bowel Disease", "Luxating Patella", "Cruciate Ligament Injury", "Spinal Disorders", "Fractures", "Poisoning", "Heatstroke", "Hypothermia", "Dehydration", "Shock", "Seizures", "Paralysis", "Blindness", "Deafness", "Lameness", "Limping", "Vomiting", "Diarrhea", "Constipation", "Loss of Appetite", "Weight Loss", "Lethargy", "Fever", "Coughing", "Sneezing", "Difficulty Breathing", "Excessive Drinking"];

const procedures = ["Surgery", "X-Ray", "Ultrasound", "MRI", "CT Scan", "Blood Work", "Biopsy", "Chemotherapy", "Radiation Therapy", "Physical Therapy", "Dental Cleaning", "Tooth Extraction", "Spay", "Neuter", "Emergency Care", "Hospitalization", "Medication", "Vaccination", "Microchipping", "Grooming"];

const keywords = [];
const TARGET_SIZE_MB = 2.5; // Leave some buffer under 3MB
const BYTES_PER_MB = 1024 * 1024;

// Generate keywords and check size
for (let i = 0; i < cities.length; i++) {
  for (let j = 0; j < breeds.length; j++) {
    for (let k = 0; k < conditions.length; k++) {
      // Add 4 variations per combination
      const variations = [
        `${breeds[j]} ${conditions[k]} Insurance ${cities[i]}`,
        `${cities[i]} ${breeds[j]} ${conditions[k]} Treatment`,
        `${conditions[k]} ${breeds[j]} Coverage ${cities[i]}`,
        `${cities[i]} Pet Insurance ${breeds[j]} ${conditions[k]}`
      ];
      
      for (const variation of variations) {
        keywords.push(variation);
        
        // Check size every 1000 keywords
        if (keywords.length % 1000 === 0) {
          let testOutput = 'function getAllKeywords() {\n  return [\n';
          for (let x = 0; x < keywords.length; x++) {
            testOutput += `    "${keywords[x]}"`;
            if (x < keywords.length - 1) testOutput += ',';
            testOutput += '\n';
          }
          testOutput += '  ];\n}';
          
          const sizeInMB = Buffer.byteLength(testOutput, 'utf8') / BYTES_PER_MB;
          console.log(`${keywords.length} keywords = ${sizeInMB.toFixed(2)} MB`);
          
          if (sizeInMB > TARGET_SIZE_MB) {
            console.log(`Stopping at ${keywords.length - 1} keywords to stay under ${TARGET_SIZE_MB}MB`);
            keywords.pop(); // Remove the last one that pushed us over
            break;
          }
        }
      }
      if (keywords.length % 1000 === 999) break; // Break from conditions loop
    }
    if (keywords.length % 1000 === 999) break; // Break from breeds loop
  }
  if (keywords.length % 1000 === 999) break; // Break from cities loop
}

// Final size check
let output = 'function getAllKeywords() {\n  return [\n';
for (let i = 0; i < keywords.length; i++) {
  output += `    "${keywords[i]}"`;
  if (i < keywords.length - 1) output += ',';
  output += '\n';
}
output += '  ];\n}';

const finalSizeInMB = Buffer.byteLength(output, 'utf8') / BYTES_PER_MB;

// Write to file
fs.writeFileSync('keywords_max.js', output);
console.log(`\nFINAL: Generated ${keywords.length} keywords`);
console.log(`File size: ${finalSizeInMB.toFixed(2)} MB`);
console.log(`Saved to keywords_max.js`);
