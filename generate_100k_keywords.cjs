// Generate exactly 100,000 static keywords
const fs = require('fs');

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle", "Denver", "Washington", "Boston", "El Paso", "Nashville", "Detroit", "Oklahoma City", "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Mesa", "Kansas City", "Atlanta", "Long Beach", "Colorado Springs", "Raleigh", "Miami", "Virginia Beach", "Omaha", "Oakland", "Minneapolis", "Tulsa", "Arlington", "Tampa", "New Orleans", "Wichita", "Cleveland", "Bakersfield", "Aurora", "Anaheim", "Honolulu", "Santa Ana", "Riverside", "Corpus Christi", "Lexington", "Stockton", "Henderson", "Saint Paul", "St. Louis", "Cincinnati", "Pittsburgh", "Greensboro", "Anchorage", "Plano", "Lincoln", "Orlando", "Irvine", "Newark", "Toledo", "Durham", "Chula Vista", "Fort Wayne", "Jersey City", "St. Petersburg", "Laredo", "Madison", "Chandler", "Buffalo", "Lubbock", "Scottsdale", "Reno", "Glendale", "Gilbert", "Winston Salem", "North Las Vegas", "Norfolk", "Chesapeake", "Garland", "Irving", "Hialeah", "Fremont", "Boise", "Richmond", "Baton Rouge", "Spokane", "Des Moines"];

const breeds = ["Golden Retriever", "Labrador Retriever", "German Shepherd", "French Bulldog", "Bulldog", "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier", "Dachshund", "Siberian Husky", "Boxer", "Boston Terrier", "Shih Tzu", "Chihuahua", "Border Collie", "Australian Shepherd", "Cocker Spaniel", "Mastiff", "Great Dane", "Doberman Pinscher", "Bernese Mountain Dog", "Cavalier King Charles Spaniel", "Saint Bernard", "Newfoundland", "Bloodhound", "Basset Hound", "Afghan Hound", "Akita", "Alaskan Malamute", "American Bulldog", "American Pit Bull Terrier", "Australian Cattle Dog", "Brittany", "Bull Terrier", "Cane Corso", "Chinese Shar Pei", "Chow Chow", "Collie", "English Springer Spaniel", "Great Pyrenees", "Havanese", "Irish Setter", "Jack Russell Terrier", "Maltese", "Papillon", "Pembroke Welsh Corgi", "Pomeranian", "Portuguese Water Dog", "Pug", "Rhodesian Ridgeback", "Samoyed", "Scottish Terrier", "Shetland Sheepdog", "Staffordshire Bull Terrier", "Standard Poodle", "Vizsla", "Weimaraner", "West Highland White Terrier", "Whippet", "Persian Cat", "Maine Coon", "British Shorthair", "Ragdoll", "Bengal", "Abyssinian", "Birman", "Oriental Shorthair", "Siamese", "American Shorthair", "Scottish Fold", "Sphynx", "Russian Blue", "Cornish Rex", "Devon Rex", "Norwegian Forest Cat", "Manx", "Exotic Shorthair", "Turkish Angora", "Burmese", "Tonkinese", "Somali", "Chartreux", "Balinese", "Egyptian Mau", "Japanese Bobtail", "Korat", "LaPerm", "Ocicat", "Selkirk Rex", "Singapura", "Turkish Van"];

const conditions = ["Hip Dysplasia", "Arthritis", "Cancer", "Diabetes", "Heart Disease", "Kidney Disease", "Liver Disease", "Epilepsy", "Allergies", "Skin Conditions", "Eye Problems", "Ear Infections", "Dental Disease", "Obesity", "Bloat", "Pancreatitis", "Urinary Blockage", "Respiratory Issues", "Neurological Disorders", "Autoimmune Disease", "Thyroid Problems", "Cushing's Disease", "Addison's Disease", "Inflammatory Bowel Disease", "Luxating Patella", "Cruciate Ligament Injury", "Spinal Disorders", "Fractures", "Poisoning", "Heatstroke", "Hypothermia", "Dehydration", "Shock", "Seizures", "Paralysis", "Blindness", "Deafness", "Lameness", "Limping", "Vomiting", "Diarrhea", "Constipation", "Loss of Appetite", "Weight Loss", "Lethargy", "Fever", "Coughing", "Sneezing", "Difficulty Breathing", "Excessive Drinking"];

const procedures = ["Surgery", "X-Ray", "Ultrasound", "MRI", "CT Scan", "Blood Work", "Biopsy", "Chemotherapy", "Radiation Therapy", "Physical Therapy", "Dental Cleaning", "Tooth Extraction", "Spay", "Neuter", "Emergency Care", "Hospitalization", "Medication", "Vaccination", "Microchipping", "Grooming"];

const keywords = [];

// Generate exactly 100,000 combinations
for (let i = 0; i < cities.length; i++) {
  for (let j = 0; j < breeds.length; j++) {
    for (let k = 0; k < conditions.length; k++) {
      if (keywords.length >= 100000) break;
      keywords.push(`${breeds[j]} ${conditions[k]} Insurance ${cities[i]}`);
      if (keywords.length >= 100000) break;
      keywords.push(`${cities[i]} ${breeds[j]} ${conditions[k]} Treatment`);
      if (keywords.length >= 100000) break;
      keywords.push(`${conditions[k]} ${breeds[j]} Coverage ${cities[i]}`);
      if (keywords.length >= 100000) break;
      keywords.push(`${cities[i]} Pet Insurance ${breeds[j]} ${conditions[k]}`);
    }
    if (keywords.length >= 100000) break;
  }
  if (keywords.length >= 100000) break;
}

// Add procedures if we need more
for (let i = 0; i < cities.length && keywords.length < 100000; i++) {
  for (let j = 0; j < breeds.length && keywords.length < 100000; j++) {
    for (let k = 0; k < procedures.length && keywords.length < 100000; k++) {
      if (keywords.length >= 100000) break;
      keywords.push(`${procedures[k]} Cost ${breeds[j]} ${cities[i]}`);
      if (keywords.length >= 100000) break;
      keywords.push(`${cities[i]} ${procedures[k]} ${breeds[j]} Price`);
    }
  }
}

// Trim to exactly 100,000
keywords.length = 100000;

// Format as JavaScript array
let output = 'function getAllKeywords() {\n  return [\n';
for (let i = 0; i < keywords.length; i++) {
  output += `    "${keywords[i]}"`;
  if (i < keywords.length - 1) output += ',';
  output += '\n';
}
output += '  ];\n}';

// Write to file
fs.writeFileSync('keywords_100k.js', output);
console.log(`Generated exactly ${keywords.length} keywords`);
console.log(`File size: ${Math.round(fs.statSync('keywords_100k.js').size / 1024 / 1024 * 100) / 100} MB`);
