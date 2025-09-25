# Final comprehensive opportunity scan
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

# Final ultra-specific opportunities
final_opportunities = {
    'Question + Action Combos': [
        'where to buy pet insurance online',
        'when to get pet insurance for puppy',
        'why pet insurance is worth it',
        'which pet insurance covers everything',
        'whose pet insurance is best',
        'whom to contact pet insurance',
        'where to find pet insurance quotes',
        'when does pet insurance start',
        'why pet insurance claims denied',
        'how quickly pet insurance works'
    ],
    'ASAP/Urgency Keywords': [
        'pet insurance asap',
        'pet insurance quickly',
        'pet insurance fast approval',
        'pet insurance rapid coverage',
        'pet insurance express service',
        'pet insurance priority processing',
        'pet insurance same hour',
        'pet insurance instant decision',
        'pet insurance quick quote',
        'pet insurance speedy claims'
    ],
    'Specific Denial Reasons': [
        'pet insurance claim denied pre existing',
        'pet insurance claim denied late filing',
        'pet insurance claim denied not covered',
        'pet insurance claim denied documentation',
        'pet insurance claim denied waiting period',
        'pet insurance claim denied age limit',
        'pet insurance claim denied breed exclusion',
        'pet insurance claim denied experimental',
        'pet insurance claim denied cosmetic',
        'pet insurance claim denied behavioral'
    ],
    'Multi-Pet Specific': [
        'pet insurance 3 dogs discount',
        'pet insurance 4 cats pricing',
        'pet insurance 5 pets maximum',
        'pet insurance multiple species',
        'pet insurance family plan unlimited',
        'pet insurance household discount',
        'pet insurance multi pet calculator',
        'pet insurance bulk discount',
        'pet insurance group rate',
        'pet insurance pack coverage'
    ],
    'Specific Contract Terms': [
        'pet insurance contract cancellation',
        'pet insurance contract review',
        'pet insurance contract loopholes',
        'pet insurance contract fine print',
        'pet insurance contract negotiation',
        'pet insurance contract comparison',
        'pet insurance contract length',
        'pet insurance contract renewal terms',
        'pet insurance contract disputes',
        'pet insurance contract lawyer'
    ],
    'Payment Method Keywords': [
        'pet insurance paypal accepted',
        'pet insurance cryptocurrency payment',
        'pet insurance venmo payment',
        'pet insurance apple pay',
        'pet insurance google pay',
        'pet insurance cash app',
        'pet insurance wire transfer',
        'pet insurance check payment',
        'pet insurance automatic withdrawal',
        'pet insurance payment options'
    ],
    'Specific Time Frames': [
        'pet insurance 48 hour approval',
        'pet insurance 7 day trial',
        'pet insurance 30 day guarantee',
        'pet insurance 60 day review',
        'pet insurance 90 day probation',
        'pet insurance 180 day waiting',
        'pet insurance 365 day coverage',
        'pet insurance 5 year contract',
        'pet insurance 10 year guarantee',
        'pet insurance lifetime commitment'
    ],
    'Employer/Benefits Keywords': [
        'pet insurance employee benefit',
        'pet insurance workplace discount',
        'pet insurance company perks',
        'pet insurance corporate plan',
        'pet insurance employer sponsored',
        'pet insurance benefits package',
        'pet insurance hr department',
        'pet insurance voluntary benefit',
        'pet insurance payroll deduction',
        'pet insurance group coverage'
    ],
    'Specific Life Events': [
        'pet insurance new baby',
        'pet insurance divorce settlement',
        'pet insurance estate planning',
        'pet insurance moving abroad',
        'pet insurance job loss',
        'pet insurance retirement planning',
        'pet insurance disability income',
        'pet insurance bankruptcy protection',
        'pet insurance inheritance',
        'pet insurance life changes'
    ],
    'Technology Integration': [
        'pet insurance alexa skill',
        'pet insurance google assistant',
        'pet insurance siri shortcuts',
        'pet insurance fitbit integration',
        'pet insurance apple watch',
        'pet insurance smart home',
        'pet insurance iot devices',
        'pet insurance api access',
        'pet insurance developer tools',
        'pet insurance open banking'
    ]
}

# Count missing opportunities
total_final_missing = 0
ultra_specific_missing = []

print("=== FINAL ULTRA-SPECIFIC OPPORTUNITIES ===\n")
for category, keywords in final_opportunities.items():
    missing = [k for k in keywords if k.lower() not in existing_set]
    if missing:
        print(f"{category} ({len(missing)} missing):")
        for kw in missing[:5]:
            print(f"  - {kw}")
            ultra_specific_missing.append(kw)
        if len(missing) > 5:
            print(f"  ... and {len(missing) - 5} more")
        print()
        total_final_missing += len(missing)

# Check for zero-result patterns
print("\n=== ZERO-RESULT PATTERNS ===")
zero_patterns = {
    'ASAP keywords': len([k for k in existing_keywords if 'asap' in k.lower()]),
    'Quickly keywords': len([k for k in existing_keywords if 'quickly' in k.lower()]),
    'Paypal keywords': len([k for k in existing_keywords if 'paypal' in k.lower()]),
    'Crypto keywords': len([k for k in existing_keywords if 'crypto' in k.lower()]),
    'Employee keywords': len([k for k in existing_keywords if 'employee' in k.lower()]),
    'Workplace keywords': len([k for k in existing_keywords if 'workplace' in k.lower()]),
    'API keywords': len([k for k in existing_keywords if 'api' in k.lower()]),
    'Alexa keywords': len([k for k in existing_keywords if 'alexa' in k.lower()])
}

for pattern, count in zero_patterns.items():
    if count == 0:
        print(f"❌ {pattern}: COMPLETELY MISSING")
    else:
        print(f"✓ {pattern}: {count} found")

print(f"\n=== FINAL SUMMARY ===")
print(f"Total ultra-specific gaps: {total_final_missing}")
print(f"Estimated monthly value: ${total_final_missing * 35} - ${total_final_missing * 60}")
print(f"Estimated annual value: ${total_final_missing * 35 * 12} - ${total_final_missing * 60 * 12}")
print(f"\nCurrent keyword total: {len(existing_keywords)}")
print(f"Potential new total: {len(existing_keywords) + total_final_missing}")