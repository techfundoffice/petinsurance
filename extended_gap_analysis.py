# Extended gap analysis for more keyword opportunities

# Read existing keywords (reusing previous code)
existing_keywords = []
in_function = False
with open('src/index.js', 'r') as f:
    for line in f:
        if 'function getAllKeywords()' in line:
            in_function = True
        elif in_function and line.strip() == '];':
            break
        elif in_function and '"' in line:
            parts = line.split('"')
            for i in range(1, len(parts), 2):
                existing_keywords.append(parts[i].lower())

existing_set = set(existing_keywords)

# Additional high-value patterns
additional_gaps = {
    "Specific Dollar Amounts": [
        "pet insurance $500 deductible",
        "pet insurance $250 deductible", 
        "pet insurance $1000 deductible",
        "pet insurance $10000 annual limit",
        "pet insurance $15000 annual limit",
        "pet insurance $20000 annual limit",
        "pet insurance 90% reimbursement",
        "pet insurance 80% reimbursement",
        "pet insurance 70% reimbursement"
    ],
    "Insurance Company + Feature": [
        "trupanion no payout limits",
        "healthy paws no caps",
        "embrace diminishing deductible",
        "pets best direct deposit",
        "nationwide exotic pet coverage",
        "figo pet cloud app",
        "lemonade 2 minute claims",
        "aspca preventive care",
        "metlife family plan",
        "progressive pet insurance login"
    ],
    "Specific Breed + Condition": [
        "german shepherd hip dysplasia insurance",
        "bulldog breathing problems insurance",
        "golden retriever cancer insurance",
        "dachshund back problems insurance",
        "persian cat kidney disease insurance",
        "siamese cat asthma insurance",
        "maine coon heart disease insurance",
        "pug eye problems insurance",
        "yorkshire terrier dental insurance",
        "french bulldog spine insurance"
    ],
    "Time + Action Keywords": [
        "get pet insurance today",
        "pet insurance quote in 2 minutes",
        "instant pet insurance coverage",
        "pet insurance starts tomorrow",
        "activate pet insurance immediately",
        "pet insurance effective in 24 hours",
        "rush pet insurance approval",
        "expedited pet insurance",
        "fast track pet insurance",
        "priority pet insurance processing"
    ],
    "Specific Situations": [
        "pet insurance after diagnosis",
        "pet insurance for diabetic dog",
        "pet insurance with existing conditions",
        "pet insurance for rescue animals",
        "pet insurance military families",
        "pet insurance fixed income seniors",
        "pet insurance apartment dwellers",
        "pet insurance first time owners",
        "pet insurance multiple pets discount",
        "pet insurance breeder package"
    ],
    "Cost Comparison Keywords": [
        "pet insurance cheaper than vet bills",
        "pet insurance saves thousands",
        "pet insurance roi calculator",
        "pet insurance worth it 2025",
        "pet insurance cost benefit analysis",
        "average vet bill without insurance",
        "emergency vet costs no insurance",
        "surgery costs without pet insurance",
        "cancer treatment cost no insurance",
        "pet insurance savings examples"
    ],
    "Review & Rating Keywords": [
        "5 star pet insurance companies",
        "top rated pet insurance 2025",
        "best pet insurance reddit",
        "pet insurance trustpilot reviews",
        "bbb accredited pet insurance",
        "consumer reports pet insurance",
        "pet insurance customer testimonials",
        "verified pet insurance reviews",
        "real pet insurance experiences",
        "honest pet insurance feedback"
    ],
    "Exclusion & Limitation Keywords": [
        "pet insurance without breed restrictions",
        "pet insurance no age limit",
        "pet insurance covers pre existing",
        "pet insurance unlimited coverage", 
        "pet insurance no annual cap",
        "pet insurance covers everything",
        "pet insurance no exclusions",
        "pet insurance full coverage",
        "pet insurance complete protection",
        "pet insurance 100% coverage"
    ],
    "Alternative Medicine Coverage": [
        "pet insurance covers acupuncture",
        "pet insurance holistic treatment",
        "pet insurance chiropractic care",
        "pet insurance hydrotherapy coverage",
        "pet insurance stem cell therapy",
        "pet insurance laser therapy",
        "pet insurance cbd treatment",
        "pet insurance homeopathic medicine",
        "pet insurance rehabilitation coverage",
        "pet insurance integrative medicine"
    ],
    "Technology & Innovation Keywords": [
        "pet insurance app claims",
        "pet insurance online portal",
        "pet insurance digital id card",
        "pet insurance paperless claims",
        "pet insurance ai diagnosis",
        "pet insurance blockchain verification",
        "pet insurance smart collar integration",
        "pet insurance health tracking",
        "pet insurance predictive analytics",
        "pet insurance machine learning"
    ]
}

# Check missing keywords
print("=== EXTENDED HIGH-VALUE KEYWORD GAPS ===\n")

total_extended_gaps = 0
high_value_gaps = []

for category, keywords in additional_gaps.items():
    missing = [k for k in keywords if k.lower() not in existing_set]
    if missing:
        print(f"{category} ({len(missing)} missing):")
        for keyword in missing[:3]:
            print(f"  - {keyword}")
            high_value_gaps.append(keyword)
        if len(missing) > 3:
            print(f"  ... and {len(missing) - 3} more")
        print()
        total_extended_gaps += len(missing)

print(f"\nTotal extended gaps identified: {total_extended_gaps}")

# Check for pattern variations
print("\n=== PATTERN VARIATIONS MISSING ===\n")

patterns_to_check = {
    "Near me variations": ["pet insurance near me", "pet insurance in my area", "local pet insurance agents", "pet insurance offices nearby"],
    "Free/Trial variations": ["free pet insurance quote", "pet insurance free trial", "pet insurance free month", "try pet insurance free"],
    "Discount variations": ["pet insurance promo code 2025", "pet insurance coupon code", "pet insurance special offer", "pet insurance new customer discount"],
    "Seasonal variations": ["pet insurance black friday", "pet insurance cyber monday", "pet insurance new year deal", "pet insurance spring sale"],
    "Calculator variations": ["pet insurance calculator by breed", "pet insurance estimate tool", "pet insurance quote generator", "pet insurance pricing tool"]
}

pattern_gaps = 0
for pattern, keywords in patterns_to_check.items():
    missing = [k for k in keywords if k.lower() not in existing_set]
    if missing:
        print(f"{pattern}: {len(missing)} missing")
        pattern_gaps += len(missing)

print(f"\nTotal pattern variation gaps: {pattern_gaps}")
print(f"\n=== SUMMARY ===")
print(f"Base keyword gaps: 91")
print(f"Extended gaps: {total_extended_gaps}")
print(f"Pattern gaps: {pattern_gaps}")
print(f"TOTAL HIGH-VALUE GAPS: {91 + total_extended_gaps + pattern_gaps}")

# Show highest value opportunities
print(f"\n=== TOP 20 HIGHEST-VALUE OPPORTUNITIES (Est. $60+ CPC) ===")
premium_keywords = [
    "buy pet insurance online now",
    "pet insurance instant approval",
    "pet insurance $500 deductible",
    "trupanion direct pay coverage",
    "pet insurance under $10 month",
    "cruciate ligament surgery pet insurance",
    "pet insurance los angeles",
    "german shepherd hip dysplasia insurance",
    "pet insurance effective immediately",
    "pet insurance after diagnosis",
    "emergency vet costs no insurance",
    "pet insurance saves thousands",
    "pet insurance unlimited coverage",
    "pet insurance covers pre existing",
    "best pet insurance reddit",
    "pet insurance vs savings account",
    "what does pet insurance not cover",
    "worst pet insurance companies",
    "pet insurance bilateral conditions",
    "pet insurance before surgery"
]

for i, keyword in enumerate(premium_keywords, 1):
    if keyword.lower() not in existing_set:
        print(f"{i}. {keyword} (Est. CPC: $60-100)")

