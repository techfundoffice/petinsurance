# Deep dive into ultra-high-value keywords
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

# Ultra-high-value patterns ($40-80 CPC)
ultra_patterns = {
    'Insurance Calculator Keywords': [
        'pet insurance calculator by breed',
        'pet insurance cost calculator 2025',
        'pet insurance premium calculator',
        'pet insurance deductible calculator',
        'pet insurance savings calculator',
        'pet insurance comparison calculator',
        'pet insurance quote calculator free',
        'pet insurance roi calculator',
        'pet insurance coverage calculator',
        'pet insurance estimate tool'
    ],
    'Specific Dollar Amount Claims': [
        'pet insurance $5000 claim',
        'pet insurance $10000 claim',
        'pet insurance $20000 surgery',
        'pet insurance $30000 cancer treatment',
        'pet insurance pays $15000',
        'pet insurance million dollar claims',
        'pet insurance $500 monthly premium',
        'pet insurance $1000 emergency',
        'pet insurance $25000 coverage',
        'pet insurance $50000 lifetime'
    ],
    'Insurance Myths and Misconceptions': [
        'pet insurance scam or legit',
        'pet insurance waste of money',
        'pet insurance never pays claims',
        'pet insurance loopholes to avoid',
        'pet insurance hidden fees exposed',
        'pet insurance fine print warnings',
        'pet insurance tricks companies use',
        'pet insurance denied claim stories',
        'pet insurance class action lawsuit',
        'pet insurance bait and switch'
    ],
    'Comparison with Human Insurance': [
        'pet insurance like human insurance',
        'pet insurance vs human health insurance',
        'pet insurance copay explained',
        'pet insurance hmo vs ppo',
        'pet insurance in network vets',
        'pet insurance preauthorization required',
        'pet insurance referral needed',
        'pet insurance primary care vet',
        'pet insurance specialist coverage',
        'pet insurance emergency room coverage'
    ],
    'Specific Age + Breed Combos': [
        'pet insurance 8 week old puppy',
        'pet insurance 6 month old kitten',
        'pet insurance 10 year old golden retriever',
        'pet insurance 12 year old cat',
        'pet insurance senior german shepherd',
        'pet insurance elderly siamese cat',
        'pet insurance middle aged labrador',
        'pet insurance young french bulldog',
        'pet insurance adult maine coon',
        'pet insurance teenage dachshund'
    ],
    'Vet Specialties Insurance': [
        'pet insurance veterinary oncologist',
        'pet insurance veterinary cardiologist',
        'pet insurance veterinary neurologist',
        'pet insurance veterinary ophthalmologist',
        'pet insurance veterinary dermatologist',
        'pet insurance veterinary behaviorist',
        'pet insurance veterinary nutritionist',
        'pet insurance veterinary radiologist',
        'pet insurance veterinary anesthesiologist',
        'pet insurance emergency specialist'
    ],
    'Insurance Renewal Keywords': [
        'pet insurance renewal increase',
        'pet insurance renewal denied',
        'pet insurance cancel renewal',
        'pet insurance renewal discount',
        'pet insurance automatic renewal',
        'pet insurance renewal date',
        'pet insurance renewal premium hike',
        'pet insurance switch at renewal',
        'pet insurance renewal review',
        'pet insurance renewal negotiation'
    ],
    'Specific Exclusions Focus': [
        'pet insurance grooming covered',
        'pet insurance boarding covered',
        'pet insurance training covered',
        'pet insurance food covered',
        'pet insurance supplements covered',
        'pet insurance cosmetic surgery',
        'pet insurance elective procedures',
        'pet insurance breeding costs',
        'pet insurance cloning coverage',
        'pet insurance experimental treatment'
    ]
}

total_ultra = 0
print('=== ULTRA-HIGH-VALUE KEYWORD OPPORTUNITIES ($40-80 CPC) ===\n')
for category, keywords in ultra_patterns.items():
    missing = [k for k in keywords if k.lower() not in existing_set]
    if missing:
        print(f'{category} ({len(missing)} missing):')
        for kw in missing[:5]:
            print(f'  - {kw}')
        if len(missing) > 5:
            print(f'  ... and {len(missing) - 5} more')
        print()
        total_ultra += len(missing)

print(f'\nTOTAL ULTRA-HIGH-VALUE GAPS: {total_ultra}')
print(f'\nEstimated monthly revenue loss: ${total_ultra * 50 * 0.02 * 50:,.0f}')
print(f'Estimated annual revenue loss: ${total_ultra * 50 * 0.02 * 50 * 12:,.0f}')

# Check for "who" questions
who_keywords = [kw for kw in existing_keywords if kw.lower().startswith('who')]
print(f'\n=== WHO QUESTIONS ANALYSIS ===')
print(f'Total "who" keywords: {len(who_keywords)}')
if who_keywords:
    print('Examples:', who_keywords[:5])

# Check for negative/problem keywords
negative_keywords = [kw for kw in existing_keywords if any(neg in kw.lower() for neg in ['worst', 'avoid', 'problem', 'issue', 'complaint', 'scam', 'bad', 'terrible'])]
print(f'\n=== NEGATIVE/PROBLEM KEYWORDS ===')
print(f'Total negative keywords: {len(negative_keywords)}')

# Check for future year keywords
future_keywords = [kw for kw in existing_keywords if any(year in kw for year in ['2026', '2027', '2028'])]
print(f'\n=== FUTURE YEAR KEYWORDS ===')
print(f'Total future year keywords: {len(future_keywords)}')