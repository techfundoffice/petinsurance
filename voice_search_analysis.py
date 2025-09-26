# Voice search and conversational query analysis
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

# Voice search patterns (natural language queries)
voice_patterns = {
    'Natural Questions': [
        'hey google does pet insurance cover surgeries',
        'alexa what is the best pet insurance',
        'siri how much does pet insurance cost monthly',
        'ok google is pet insurance worth it for cats',
        'hey siri where can i buy pet insurance',
        'alexa which pet insurance covers pre existing',
        'find me pet insurance near me',
        'show me pet insurance quotes',
        'i need pet insurance right now',
        'help me find affordable pet insurance'
    ],
    'Conversational Long-Tail': [
        'my dog needs surgery can i get insurance now',
        'what happens if my cat gets sick without insurance',
        'how do i know if pet insurance is good',
        'can i use pet insurance at any vet',
        'will pet insurance pay for my dogs surgery',
        'does pet insurance work like human insurance',
        'what pet insurance do vets recommend',
        'why is pet insurance so expensive',
        'when should i get pet insurance for puppy',
        'where is the cheapest pet insurance'
    ],
    'Emergency Voice Searches': [
        'my dog is hurt need insurance now',
        'cat emergency vet insurance help',
        'pet insurance for emergency surgery today',
        'urgent pet insurance my dog is sick',
        'help dog accident need insurance',
        'emergency vet accepts what insurance',
        'pet insurance covers emergency visits',
        'find emergency pet insurance coverage',
        'get pet insurance for sick dog',
        'insurance for pet emergency right now'
    ],
    'Specific Voice Queries': [
        'pet insurance covers teeth cleaning',
        'does pet insurance pay for vaccines',
        'pet insurance includes flea medicine',
        'what pet insurance covers spaying',
        'which insurance covers dog acl surgery',
        'pet insurance that covers heartworm',
        'insurance covers cat dental work',
        'pet insurance pays for prescriptions',
        'does insurance cover pet allergies',
        'pet insurance includes annual checkup'
    ],
    'Location Voice Searches': [
        'pet insurance companies near me open now',
        'find pet insurance office in my area',
        'pet insurance agents close to me',
        'best pet insurance in my city',
        'local pet insurance representatives',
        'pet insurance near my location',
        'closest pet insurance company',
        'pet insurance in my neighborhood',
        'find pet insurance near my zip code',
        'pet insurance offices around me'
    ]
}

# Analyze voice search gaps
total_voice = 0
print("=== VOICE SEARCH KEYWORD OPPORTUNITIES ===\n")

for category, keywords in voice_patterns.items():
    missing = [k for k in keywords if k.lower() not in existing_set]
    if missing:
        print(f"{category} ({len(missing)} missing):")
        for kw in missing[:5]:
            print(f"  - {kw}")
        if len(missing) > 5:
            print(f"  ... and {len(missing) - 5} more")
        print()
        total_voice += len(missing)

# Check for question starters
print("\n=== CONVERSATIONAL STARTERS ===")
starters = {
    'hey google': len([k for k in existing_keywords if 'hey google' in k.lower()]),
    'ok google': len([k for k in existing_keywords if 'ok google' in k.lower()]),
    'alexa': len([k for k in existing_keywords if 'alexa' in k.lower()]),
    'hey siri': len([k for k in existing_keywords if 'hey siri' in k.lower()]),
    'tell me': len([k for k in existing_keywords if 'tell me' in k.lower()]),
    'show me': len([k for k in existing_keywords if 'show me' in k.lower()]),
    'find me': len([k for k in existing_keywords if 'find me' in k.lower()]),
    'help me': len([k for k in existing_keywords if 'help me' in k.lower()])
}

for starter, count in starters.items():
    status = "✓" if count > 0 else "❌"
    print(f"{status} '{starter}': {count} keywords")

print(f"\n=== VOICE SEARCH SUMMARY ===")
print(f"Voice search gaps found: {total_voice}")
print(f"Estimated value: $30-60 per keyword")
print(f"Monthly value: ${total_voice * 45} - ${total_voice * 60}")

# Final comprehensive summary
print(f"\n=== COMPREHENSIVE FINAL SUMMARY ===")
print(f"Current keywords: {len(existing_keywords)}")
print(f"Ultimate gaps: 94")
print(f"Voice search gaps: {total_voice}")
print(f"Total remaining opportunities: {94 + total_voice}")
print(f"Potential final total: {len(existing_keywords) + 94 + total_voice}")
print(f"\nTotal value of remaining opportunities:")
print(f"Monthly: ${(94 + total_voice) * 60} - ${(94 + total_voice) * 80}")
print(f"Annual: ${(94 + total_voice) * 60 * 12} - ${(94 + total_voice) * 80 * 12}")