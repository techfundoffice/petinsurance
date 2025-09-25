# Deep keyword mining for final opportunities
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
print(f"Current total keywords: {len(existing_keywords)}\n")

# Deep mining for ultra-specific patterns
deep_patterns = {
    'Insurance Company + Problem Keywords': [
        'trupanion complaints',
        'healthy paws lawsuit',
        'embrace pet insurance problems',
        'nationwide pet insurance issues',
        'aspca pet insurance complaints',
        'pets best denied claims',
        'figo customer service problems',
        'lemonade pet insurance reviews negative',
        'metlife pet insurance cancellation',
        'progressive pet insurance claim denied'
    ],
    'Specific Waiting Period Keywords': [
        'pet insurance no waiting period',
        'pet insurance 24 hour waiting period',
        'pet insurance immediate coverage accident',
        'pet insurance 14 day waiting period',
        'pet insurance 30 day waiting period',
        'pet insurance 6 month waiting period',
        'pet insurance waiting period waived',
        'pet insurance waiting period comparison',
        'pet insurance shortest waiting period',
        'pet insurance bypass waiting period'
    ],
    'Specific Percentage Coverage': [
        'pet insurance 100 percent coverage',
        'pet insurance 95 percent reimbursement',
        'pet insurance 85 percent coverage',
        'pet insurance 75 percent reimbursement',
        'pet insurance 65 percent coverage',
        'pet insurance 50 percent reimbursement',
        'pet insurance actual cost coverage',
        'pet insurance benefit schedule',
        'pet insurance reimbursement calculator',
        'pet insurance coverage percentage comparison'
    ],
    'Emergency Specific Keywords': [
        'pet insurance emergency vet visit',
        'pet insurance after hours clinic',
        'pet insurance weekend emergency',
        'pet insurance holiday emergency coverage',
        'pet insurance emergency transport',
        'pet insurance emergency hospitalization',
        'pet insurance critical care coverage',
        'pet insurance ICU coverage',
        'pet insurance emergency specialist',
        'pet insurance life threatening coverage'
    ],
    'Specific Claim Process Keywords': [
        'pet insurance claim form download',
        'pet insurance claim status check',
        'pet insurance claim processing time',
        'pet insurance claim appeal process',
        'pet insurance claim documentation',
        'pet insurance claim reimbursement time',
        'pet insurance direct vet payment',
        'pet insurance claim denied reasons',
        'pet insurance claim tips',
        'pet insurance claim mistakes'
    ],
    'Comparison with Other Financial Products': [
        'pet insurance vs credit card',
        'pet insurance vs personal loan',
        'pet insurance vs emergency fund',
        'pet insurance vs HSA for pets',
        'pet insurance vs payment plan',
        'pet insurance vs crowdfunding',
        'pet insurance vs veterinary discount plan',
        'pet insurance vs wellness plan',
        'pet insurance vs pet savings account',
        'pet insurance vs pet health sharing'
    ],
    'Specific Policy Terms': [
        'pet insurance annual deductible',
        'pet insurance per incident deductible',
        'pet insurance lifetime limit',
        'pet insurance annual limit reset',
        'pet insurance benefit year',
        'pet insurance policy year vs calendar year',
        'pet insurance continuous coverage',
        'pet insurance gap in coverage',
        'pet insurance grace period',
        'pet insurance reinstatement'
    ],
    'Specific Customer Demographics': [
        'pet insurance for college students',
        'pet insurance for retirees',
        'pet insurance for low income',
        'pet insurance for veterans',
        'pet insurance for disabled owners',
        'pet insurance for foster pets',
        'pet insurance for therapy animals',
        'pet insurance for emotional support animals',
        'pet insurance for working animals',
        'pet insurance for show animals'
    ],
    'Specific Medical Equipment Coverage': [
        'pet insurance prosthetics coverage',
        'pet insurance wheelchair coverage',
        'pet insurance hearing aids pets',
        'pet insurance oxygen therapy',
        'pet insurance mobility aids',
        'pet insurance medical devices',
        'pet insurance prescription glasses',
        'pet insurance orthopedic equipment',
        'pet insurance therapeutic devices',
        'pet insurance adaptive equipment'
    ],
    'International and Travel Keywords': [
        'pet insurance international coverage',
        'pet insurance travel coverage',
        'pet insurance abroad',
        'pet insurance vacation coverage',
        'pet insurance moving states',
        'pet insurance multi state coverage',
        'pet insurance canada us coverage',
        'pet insurance mexico coverage',
        'pet insurance cruise ship',
        'pet insurance airline travel'
    ]
}

# Check for missing patterns
total_missing = 0
high_value_missing = []

print("=== DEEP KEYWORD MINING RESULTS ===\n")
for category, keywords in deep_patterns.items():
    missing = [k for k in keywords if k.lower() not in existing_set]
    if missing:
        print(f"{category} ({len(missing)} missing):")
        for kw in missing[:5]:
            print(f"  - {kw}")
            high_value_missing.append(kw)
        if len(missing) > 5:
            print(f"  ... and {len(missing) - 5} more")
        print()
        total_missing += len(missing)

# Check for question word patterns
question_words = ['what', 'when', 'where', 'why', 'how', 'which', 'who', 'whose', 'whom']
question_analysis = {}
for qw in question_words:
    count = len([k for k in existing_keywords if k.lower().startswith(qw)])
    question_analysis[qw] = count

print("\n=== QUESTION WORD ANALYSIS ===")
for qw, count in sorted(question_analysis.items(), key=lambda x: x[1]):
    print(f"{qw.capitalize()} questions: {count}")

# Check for specific high-value phrase patterns
print("\n=== HIGH-VALUE PHRASE PATTERNS ===")
valuable_phrases = {
    'immediately': len([k for k in existing_keywords if 'immediately' in k.lower()]),
    'instant': len([k for k in existing_keywords if 'instant' in k.lower()]),
    'today': len([k for k in existing_keywords if 'today' in k.lower()]),
    'now': len([k for k in existing_keywords if 'now' in k.lower()]),
    'emergency': len([k for k in existing_keywords if 'emergency' in k.lower()]),
    'urgent': len([k for k in existing_keywords if 'urgent' in k.lower()]),
    'asap': len([k for k in existing_keywords if 'asap' in k.lower()]),
    'quickly': len([k for k in existing_keywords if 'quickly' in k.lower()])
}

for phrase, count in valuable_phrases.items():
    print(f"'{phrase}' keywords: {count}")

print(f"\n=== SUMMARY ===")
print(f"Total deep mining gaps found: {total_missing}")
print(f"Estimated value: ${total_missing * 45} - ${total_missing * 70} per month")
print(f"Annual value: ${total_missing * 45 * 12} - ${total_missing * 70 * 12}")

# Identify completely missing niches
print("\n=== COMPLETELY MISSING NICHES ===")
missing_niches = []
if not any('prosthetic' in k for k in existing_keywords):
    missing_niches.append("Medical equipment/prosthetics")
if not any('international' in k or 'abroad' in k for k in existing_keywords):
    missing_niches.append("International/travel coverage")
if not any('foster' in k for k in existing_keywords):
    missing_niches.append("Foster pet insurance")
if not any('complaint' in k or 'lawsuit' in k for k in existing_keywords):
    missing_niches.append("Company complaints/issues")

for niche in missing_niches:
    print(f"- {niche}")