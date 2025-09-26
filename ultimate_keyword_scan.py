# Ultimate keyword scan - finding the last high-value opportunities
import re

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

# Ultimate high-value patterns
ultimate_patterns = {
    'Extreme Urgency Keywords': [
        'pet insurance right now',
        'pet insurance this second',
        'pet insurance immediately please',
        'pet insurance urgent help',
        'pet insurance emergency approval',
        'pet insurance crisis coverage',
        'pet insurance desperate need',
        'pet insurance life or death',
        'pet insurance critical situation',
        'pet insurance help me now'
    ],
    'Specific Dollar + Condition Combos': [
        'pet insurance $10000 cancer treatment',
        'pet insurance $5000 hip surgery',
        'pet insurance $8000 heart surgery',
        'pet insurance $15000 spinal surgery',
        'pet insurance $3000 dental surgery',
        'pet insurance $12000 kidney treatment',
        'pet insurance $20000 emergency surgery',
        'pet insurance $7000 eye surgery',
        'pet insurance $4000 skin treatment',
        'pet insurance $25000 accident coverage'
    ],
    'Extreme Comparison Keywords': [
        'pet insurance better than nothing',
        'pet insurance vs going broke',
        'pet insurance vs euthanasia decision',
        'pet insurance vs selling house',
        'pet insurance vs maxing credit cards',
        'pet insurance vs borrowing money',
        'pet insurance vs gofundme campaign',
        'pet insurance vs payment plan',
        'pet insurance vs second mortgage',
        'pet insurance vs bankruptcy'
    ],
    'Ultra-Specific Breed + Age + Condition': [
        '15 year old labrador cancer insurance',
        '8 week old french bulldog insurance',
        '13 year old cat kidney insurance',
        '2 year old german shepherd hip insurance',
        '11 year old poodle heart insurance',
        '16 year old cat thyroid insurance',
        '9 year old golden retriever insurance',
        '14 year old dachshund back insurance',
        '3 month old kitten insurance',
        '17 year old dog insurance possible'
    ],
    'Specific Treatment + Cost + Coverage': [
        'chemotherapy pet insurance coverage amount',
        'radiation therapy pet insurance cost',
        'dialysis pet insurance coverage',
        'organ transplant pet insurance',
        'brain surgery pet insurance coverage',
        'heart valve replacement pet insurance',
        'artificial joint pet insurance coverage',
        'stem cell treatment insurance coverage',
        'gene therapy pet insurance',
        'experimental drug coverage pet insurance'
    ],
    'Extreme Financial Situations': [
        'pet insurance bad credit ok',
        'pet insurance no credit check',
        'pet insurance payment plan available',
        'pet insurance defer first payment',
        'pet insurance financial hardship',
        'pet insurance income based pricing',
        'pet insurance sliding scale',
        'pet insurance charity options',
        'pet insurance government assistance',
        'pet insurance poverty discount'
    ],
    'Super Specific Time Windows': [
        'pet insurance within 1 hour',
        'pet insurance next 30 minutes',
        'pet insurance by midnight tonight',
        'pet insurance before surgery tomorrow',
        'pet insurance activates in 2 hours',
        'pet insurance backdated coverage',
        'pet insurance retroactive claims',
        'pet insurance pre approved instantly',
        'pet insurance while at vet',
        'pet insurance during emergency'
    ],
    'Extreme Specific Scenarios': [
        'pet insurance dog hit by car',
        'pet insurance cat fell from balcony',
        'pet insurance dog ate chocolate',
        'pet insurance cat poisoned',
        'pet insurance dog attacked',
        'pet insurance cat burned',
        'pet insurance dog drowning',
        'pet insurance cat electrocuted',
        'pet insurance dog snake bite',
        'pet insurance cat bee sting reaction'
    ],
    'Ultra-Specific Policy Features': [
        'pet insurance zero deductible',
        'pet insurance no copay',
        'pet insurance first dollar coverage',
        'pet insurance no paperwork',
        'pet insurance auto approval',
        'pet insurance guaranteed acceptance',
        'pet insurance no medical records',
        'pet insurance honor any vet',
        'pet insurance worldwide coverage',
        'pet insurance lifetime price lock'
    ],
    'Extreme Emotional Keywords': [
        'pet insurance save my dog life',
        'pet insurance cant lose my cat',
        'pet insurance family member dying',
        'pet insurance heartbroken owner',
        'pet insurance last hope',
        'pet insurance miracle needed',
        'pet insurance desperate situation',
        'pet insurance please help us',
        'pet insurance crying owner',
        'pet insurance devastating diagnosis'
    ]
}

# Find missing ultimate keywords
total_ultimate = 0
print("=== ULTIMATE HIGH-VALUE KEYWORD OPPORTUNITIES ===\n")

for category, keywords in ultimate_patterns.items():
    missing = [k for k in keywords if k.lower() not in existing_set]
    if missing:
        print(f"{category} ({len(missing)} missing):")
        for kw in missing[:5]:
            print(f"  - {kw}")
        if len(missing) > 5:
            print(f"  ... and {len(missing) - 5} more")
        print()
        total_ultimate += len(missing)

# Check for completely unused high-value words
print("\n=== HIGH-VALUE WORDS USAGE ===")
high_value_words = {
    'desperate': len([k for k in existing_keywords if 'desperate' in k.lower()]),
    'bankrupt': len([k for k in existing_keywords if 'bankrupt' in k.lower()]),
    'dying': len([k for k in existing_keywords if 'dying' in k.lower()]),
    'broke': len([k for k in existing_keywords if 'broke' in k.lower()]),
    'urgent': len([k for k in existing_keywords if 'urgent' in k.lower()]),
    'miracle': len([k for k in existing_keywords if 'miracle' in k.lower()]),
    'devastat': len([k for k in existing_keywords if 'devastat' in k.lower()]),
    'retroactive': len([k for k in existing_keywords if 'retroactive' in k.lower()])
}

for word, count in high_value_words.items():
    status = "✓" if count > 0 else "❌"
    print(f"{status} '{word}': {count} keywords")

# Find micro-niche opportunities
print("\n=== MICRO-NICHE OPPORTUNITIES ===")
micro_niches = {
    'Specific US States Not Covered': [],
    'Specific Insurance Features Missing': [],
    'Specific Financial Situations': [],
    'Specific Medical Specialists': []
}

# Check state coverage
states = ['california', 'texas', 'florida', 'new york', 'pennsylvania', 'illinois', 
          'ohio', 'georgia', 'north carolina', 'michigan', 'arizona', 'virginia',
          'washington', 'massachusetts', 'tennessee', 'indiana', 'missouri', 'maryland']

for state in states:
    state_keywords = [k for k in existing_keywords if state in k.lower()]
    if len(state_keywords) < 3:
        micro_niches['Specific US States Not Covered'].append(state)

if micro_niches['Specific US States Not Covered']:
    print(f"States with low coverage (<3 keywords): {', '.join(micro_niches['Specific US States Not Covered'][:5])}")

print(f"\n=== FINAL ULTIMATE SUMMARY ===")
print(f"Ultimate keyword gaps found: {total_ultimate}")
print(f"Estimated value per keyword: $50-100 CPC")
print(f"Total monthly value: ${total_ultimate * 75} - ${total_ultimate * 100}")
print(f"Total annual value: ${total_ultimate * 75 * 12} - ${total_ultimate * 100 * 12}")

# Final keyword count potential
print(f"\nCurrent keywords: {len(existing_keywords)}")
print(f"Potential after ultimate expansion: {len(existing_keywords) + total_ultimate}")
print(f"Total expansion from original 8,885: {len(existing_keywords) + total_ultimate - 8885}")