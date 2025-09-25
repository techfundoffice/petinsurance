# Read existing keywords from file
existing_keywords = []
in_function = False
with open('src/index.js', 'r') as f:
    for line in f:
        if 'function getAllKeywords()' in line:
            in_function = True
        elif in_function and line.strip() == '];':
            break
        elif in_function and '"' in line:
            # Extract keywords from quotes
            parts = line.split('"')
            for i in range(1, len(parts), 2):
                existing_keywords.append(parts[i].lower())

# Convert to set for faster lookup
existing_set = set(existing_keywords)

# Define high-value keyword gaps
gaps = {
    "High Commercial Intent Transactional": [],
    "Long-tail Medical Procedures": [],
    "Location-based Keywords": [],
    "Brand-specific Features": [],
    "Price/Cost Variations": [],
    "Question Keywords": [],
    "Negative Keywords": [],
    "Comparison Keywords": [],
    "Policy Feature Keywords": [],
    "Time-sensitive/Urgency Keywords": []
}

# Check for specific gaps
# 1. High Commercial Intent Transactional
transactional_terms = [
    "buy pet insurance online now",
    "purchase pet insurance today",
    "get instant pet insurance quote",
    "apply for pet insurance immediately",
    "sign up pet insurance now",
    "enroll pet insurance today",
    "pet insurance instant approval",
    "pet insurance immediate coverage",
    "start pet insurance policy today",
    "activate pet insurance now"
]

# 2. Long-tail Medical Procedures
medical_procedures = [
    "cruciate ligament surgery pet insurance",
    "mast cell tumor removal coverage",
    "gastric dilatation volvulus insurance",
    "intervertebral disc disease coverage",
    "patellar luxation surgery insurance",
    "cherry eye surgery coverage",
    "entropion surgery pet insurance",
    "osteosarcoma treatment coverage",
    "lymphoma treatment pet insurance",
    "hemangiosarcoma coverage",
    "pyometra surgery insurance",
    "foreign body removal coverage",
    "bladder stone surgery insurance",
    "glaucoma treatment coverage",
    "corneal ulcer treatment insurance"
]

# 3. Location-based Keywords
location_keywords = [
    "pet insurance los angeles",
    "pet insurance chicago",
    "pet insurance houston", 
    "pet insurance phoenix",
    "pet insurance philadelphia",
    "pet insurance san antonio",
    "pet insurance san diego",
    "pet insurance dallas",
    "pet insurance austin",
    "pet insurance seattle",
    "pet insurance denver",
    "pet insurance boston",
    "pet insurance portland",
    "pet insurance miami",
    "pet insurance atlanta"
]

# 4. Brand-specific Features
brand_features = [
    "trupanion direct pay coverage",
    "healthy paws unlimited benefits",
    "embrace wellness rewards",
    "pets best routine care",
    "nationwide whole pet coverage",
    "figo cloud technology",
    "lemonade instant claims",
    "aspca 10% multi-pet discount",
    "petplan covered for life",
    "prudent pet accident forgiveness"
]

# 5. Price/Cost Variations
price_keywords = [
    "pet insurance under $10 month",
    "pet insurance under $20 month",
    "pet insurance under $30 month",
    "cheap pet insurance under $50",
    "budget pet insurance 2025",
    "most affordable pet insurance",
    "lowest cost pet insurance",
    "best value pet insurance",
    "pet insurance price match",
    "pet insurance cost breakdown"
]

# 6. Question Keywords
question_keywords = [
    "what does pet insurance not cover",
    "when should i get pet insurance",
    "how much does pet insurance cost monthly",
    "why is pet insurance so expensive",
    "which pet insurance covers everything",
    "who has the best pet insurance",
    "where to buy pet insurance",
    "what age to get pet insurance",
    "how to file pet insurance claim",
    "when does pet insurance start"
]

# 7. Negative Keywords
negative_keywords = [
    "worst pet insurance companies",
    "pet insurance companies to avoid",
    "pet insurance scams",
    "pet insurance complaints",
    "pet insurance problems",
    "pet insurance ripoffs",
    "pet insurance not worth it",
    "pet insurance claim denied",
    "pet insurance bad reviews",
    "pet insurance horror stories"
]

# 8. Comparison Keywords
comparison_keywords = [
    "pet insurance vs savings account",
    "pet insurance vs credit card",
    "pet insurance vs care credit",
    "pet insurance vs emergency fund",
    "pet insurance or self insurance",
    "trupanion vs healthy paws 2025",
    "embrace vs nationwide 2025",
    "pets best vs figo 2025",
    "lemonade vs aspca 2025",
    "metlife vs progressive 2025"
]

# 9. Policy Feature Keywords
policy_features = [
    "pet insurance bilateral conditions",
    "pet insurance per condition deductible",
    "pet insurance annual deductible",
    "pet insurance coinsurance options",
    "pet insurance benefit schedule",
    "pet insurance maximum payout",
    "pet insurance lifetime limits",
    "pet insurance continuing care",
    "pet insurance chronic coverage",
    "pet insurance exam fee coverage"
]

# 10. Time-sensitive/Urgency Keywords
urgency_keywords = [
    "pet insurance before surgery",
    "emergency pet insurance today",
    "last minute pet insurance",
    "urgent pet insurance coverage",
    "pet insurance effective immediately",
    "same day pet insurance",
    "24 hour pet insurance activation",
    "weekend pet insurance enrollment",
    "holiday pet insurance signup",
    "after hours pet insurance"
]

# Check which keywords are missing
all_test_keywords = {
    "High Commercial Intent Transactional": transactional_terms,
    "Long-tail Medical Procedures": medical_procedures,
    "Location-based Keywords": location_keywords,
    "Brand-specific Features": brand_features,
    "Price/Cost Variations": price_keywords,
    "Question Keywords": question_keywords,
    "Negative Keywords": negative_keywords,
    "Comparison Keywords": comparison_keywords,
    "Policy Feature Keywords": policy_features,
    "Time-sensitive/Urgency Keywords": urgency_keywords
}

for category, keywords in all_test_keywords.items():
    for keyword in keywords:
        if keyword.lower() not in existing_set:
            gaps[category].append(keyword)

# Print analysis
print(f"Total existing keywords: {len(existing_keywords)}")
print(f"\n=== HIGH-VALUE KEYWORD GAPS ANALYSIS ===\n")

total_gaps = 0
for category, missing in gaps.items():
    if missing:
        print(f"{category} ({len(missing)} missing):")
        for keyword in missing[:5]:  # Show first 5
            print(f"  - {keyword}")
        if len(missing) > 5:
            print(f"  ... and {len(missing) - 5} more")
        print()
        total_gaps += len(missing)

print(f"\nTotal high-value gaps identified: {total_gaps}")

# Estimate potential value
print(f"\nPotential value estimate:")
print(f"- Average CPC for these keywords: $40-80")
print(f"- Total potential monthly value: ${total_gaps * 50 * 100:,} (assuming 100 clicks/keyword)")

