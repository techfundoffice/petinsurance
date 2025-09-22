// Simple unique content generator that actually works
function generateUniqueContent(title, pageNumber, categorySlug) {
  const lower = title.toLowerCase();
  
  // Determine content type based on keyword
  const isEmergency = lower.includes('emergency') || lower.includes('24 hour');
  const isCost = lower.includes('cost') || lower.includes('price') || lower.includes('affordable');
  const isSenior = lower.includes('senior') || lower.includes('older');
  const isKitten = lower.includes('kitten') || lower.includes('puppy');
  const isDental = lower.includes('dental') || lower.includes('teeth');
  const isCancer = lower.includes('cancer') || lower.includes('oncology');
  const isSurgery = lower.includes('surgery') || lower.includes('surgical');
  const isHeart = lower.includes('heart') || lower.includes('cardiac');
  
  // Get animal type
  let animalType = 'pet';
  if (lower.includes('cat') || lower.includes('feline')) animalType = 'cat';
  else if (lower.includes('dog') || lower.includes('canine')) animalType = 'dog';
  
  // Create variations based on page number for uniqueness
  const variation = pageNumber % 5;
  
  // Generate unique introduction
  let introduction = '';
  if (isEmergency) {
    const emergencyIntros = [
      `When every second counts, having access to ${title} can save your ${animalType}'s life. Emergency situations strike without warning, and being prepared with the right insurance coverage ensures you can focus on your ${animalType}'s health rather than worrying about costs.`,
      `The critical nature of emergency veterinary care makes ${title} an essential consideration for responsible pet owners. With emergency vet visits averaging $1,500-$5,000, having proper coverage protects both your ${animalType} and your finances.`,
      `Understanding ${title} before a crisis occurs provides invaluable peace of mind. Emergency veterinary facilities offer life-saving treatments 24/7, but these services come at premium costs that can devastate unprepared families.`,
      `In moments of crisis, ${title} becomes the difference between optimal care and financial constraints. Studies show that 40% of pets will experience an emergency requiring immediate veterinary attention during their lifetime.`,
      `The landscape of ${title} has evolved to meet the growing demand for after-hours care. Modern emergency facilities rival human hospitals in capability, making comprehensive insurance coverage more important than ever.`
    ];
    introduction = emergencyIntros[variation];
  } else if (isCost) {
    const costIntros = [
      `Finding ${title} that balances comprehensive coverage with affordability requires careful consideration. The average ${animalType} owner spends $1,500-$4,000 annually on veterinary care, making insurance a smart financial decision.`,
      `The economics of ${title} reveal surprising opportunities for savings. While monthly premiums may seem like an added expense, they often pale in comparison to unexpected veterinary bills that can reach thousands of dollars.`,
      `Budget-conscious pet owners exploring ${title} will find a range of options designed to fit different financial situations. From basic accident coverage to comprehensive plans, there's a solution for every budget.`,
      `Understanding the true cost of ${title} involves looking beyond monthly premiums. Deductibles, co-pays, and coverage limits all impact the overall value of your insurance investment.`,
      `Smart shopping for ${title} can yield significant savings without compromising care quality. Many insurers offer discounts for multiple pets, annual payments, or preventive care compliance.`
    ];
    introduction = costIntros[variation];
  } else if (isSenior) {
    const seniorIntros = [
      `Senior ${animalType}s require specialized attention, making ${title} crucial for managing age-related health conditions. As pets age, they face increased risks for chronic diseases that require ongoing, expensive treatment.`,
      `The golden years of your ${animalType}'s life bring unique health challenges that ${title} can help manage. From arthritis to kidney disease, senior pets often need multiple medications and frequent vet visits.`,
      `Protecting your aging ${animalType} with appropriate ${title} ensures they receive the best possible care without financial strain. Senior pet insurance has evolved to address the specific needs of older animals.`,
      `As your ${animalType} enters their senior years, ${title} becomes increasingly valuable. Age-related conditions like diabetes, heart disease, and cancer are more common but also more treatable with proper coverage.`,
      `The importance of ${title} grows as your ${animalType} ages. While premiums may be higher for senior pets, the coverage provides essential protection against escalating healthcare costs.`
    ];
    introduction = seniorIntros[variation];
  } else {
    // General introductions
    const generalIntros = [
      `Choosing the right ${title} represents one of the most important decisions you'll make for your ${animalType}'s health and your financial well-being. With veterinary costs rising annually, insurance provides essential protection against unexpected expenses.`,
      `The world of ${title} offers diverse options to meet the unique needs of ${animalType} owners. From basic accident coverage to comprehensive plans including wellness care, understanding your options empowers informed decisions.`,
      `Modern veterinary medicine offers remarkable treatments for ${animalType}s, but these advances come with significant costs. ${title} bridges the gap between optimal care and financial reality.`,
      `Investing in ${title} provides more than financial protection - it offers peace of mind knowing you can say yes to recommended treatments without hesitation. This freedom to choose the best care significantly impacts outcomes.`,
      `The decision to purchase ${title} reflects a commitment to your ${animalType}'s long-term health. Insurance enables access to preventive care, early intervention, and advanced treatments that might otherwise be financially prohibitive.`
    ];
    introduction = generalIntros[variation];
  }
  
  // Generate unique overview based on specific conditions
  let overview = '';
  if (isCancer) {
    overview = `Cancer treatment for ${animalType}s has advanced dramatically, with options including chemotherapy, radiation, surgery, and immunotherapy. ${title} coverage for oncology services typically includes diagnostic testing, treatment protocols, and ongoing monitoring. The average cost of cancer treatment ranges from $5,000-$20,000, making insurance coverage essential for accessing these life-saving treatments.`;
  } else if (isDental) {
    overview = `Dental disease affects 80% of ${animalType}s by age three, making ${title} for oral health increasingly important. Professional cleanings, extractions, and advanced procedures like root canals are now standard veterinary offerings. Dental coverage varies by insurer, with some requiring add-on coverage while others include it in comprehensive plans.`;
  } else if (isSurgery) {
    overview = `Surgical procedures represent some of the highest veterinary expenses, with ${title} providing crucial financial protection. Common surgeries like ACL repairs, tumor removals, and emergency procedures can cost $3,000-$8,000. Insurance coverage typically includes pre-operative testing, the surgical procedure, anesthesia, and post-operative care.`;
  } else {
    overview = `The scope of ${title} has expanded to match advances in veterinary medicine. Today's policies cover everything from routine care to complex procedures, with options to customize coverage based on your ${animalType}'s specific needs. Understanding policy details, including exclusions and limits, ensures you select appropriate protection.`;
  }
  
  // Benefits section with variations
  const benefitsList = [
    `Financial predictability through fixed monthly premiums instead of unexpected large bills`,
    `Access to advanced treatments and specialists without cost being the primary consideration`,
    `Coverage for chronic conditions that require ongoing, expensive management`,
    `Peace of mind knowing you can provide the best care without depleting savings`,
    `Preventive care incentives that encourage regular check-ups and early disease detection`
  ];
  
  // Rotate benefits based on page number
  const benefits = `Key benefits of ${title} include: ${benefitsList[variation]}, ${benefitsList[(variation + 1) % 5]}, and ${benefitsList[(variation + 2) % 5]}. These advantages make insurance an increasingly popular choice among ${animalType} owners who want to ensure the best possible care for their companions.`;
  
  // Coverage details
  const coverageDetails = `Coverage under ${title} typically includes accidents, illnesses, diagnostic tests, surgery, hospitalization, and prescription medications. Most policies have waiting periods ranging from 24 hours for accidents to 14-30 days for illnesses. Understanding what's covered and what's excluded helps set realistic expectations and avoid claim denials.`;
  
  // Considerations
  const considerations = `When evaluating ${title}, consider factors such as your ${animalType}'s age, breed-specific risks, pre-existing conditions, and your financial situation. Premium costs vary based on location, deductible choices, and reimbursement levels. Compare multiple providers to find the best combination of coverage and affordability.`;
  
  // Common mistakes
  const commonMistakes = `Common mistakes when choosing ${title} include waiting until your ${animalType} is sick to enroll, selecting coverage based solely on price, not reading policy exclusions, and letting coverage lapse. Avoiding these pitfalls ensures continuous protection and maximizes the value of your insurance investment.`;
  
  // Tips
  const tips = `Maximize your ${title} by enrolling while your ${animalType} is young and healthy, maintaining continuous coverage, keeping detailed medical records, and understanding your policy's claim process. Consider higher reimbursement levels for better long-term value, even if premiums are slightly higher.`;
  
  // Case studies - vary by page
  const caseStudies = [
    `Max, a 5-year-old Labrador, developed lymphoma requiring chemotherapy. His insurance covered 90% of the $8,000 treatment cost, allowing his family to pursue treatment without financial hardship. Max achieved remission and enjoyed two more quality years with his family.`,
    `Luna, a 3-year-old cat, swallowed a toy requiring emergency surgery. The $3,500 procedure was covered at 80% by her insurance, turning a potential financial crisis into a manageable expense. Luna recovered fully and her owners learned the value of pet insurance.`,
    `Cooper, an 8-year-old Golden Retriever, tore his ACL during play. The TPLO surgery and rehabilitation totaling $5,200 was covered by insurance, allowing optimal treatment. His family was grateful they had maintained coverage despite Cooper being healthy for years.`,
    `Bella, a 2-year-old French Bulldog, experienced breathing difficulties requiring specialist care. Her insurance covered the $4,000 in diagnostics and treatment, including surgery to correct her airways. The coverage made the decision to pursue treatment straightforward.`,
    `Oliver, a senior cat with diabetes, required daily insulin and quarterly monitoring. His insurance covered 80% of the $200 monthly costs, making long-term management affordable. This coverage allowed Oliver to live comfortably for several more years.`
  ];
  
  // FAQs
  const faqs = `
    <h3>What does ${title} typically cost?</h3>
    <p>Monthly premiums range from $10-$50 for cats and $25-$70 for dogs, depending on age, location, and coverage level. Comprehensive coverage costs more but provides better protection.</p>
    
    <h3>Are pre-existing conditions covered?</h3>
    <p>Most insurers exclude pre-existing conditions, which is why enrolling while your ${animalType} is healthy is crucial. Some insurers may cover cured conditions after waiting periods.</p>
    
    <h3>Is ${title} worth it?</h3>
    <p>For most ${animalType} owners, insurance provides valuable financial protection and peace of mind. Even one significant health event can justify years of premium payments.</p>
  `;
  
  // Conclusion
  const conclusion = `Investing in ${title} represents a proactive approach to your ${animalType}'s healthcare. By understanding your options and selecting appropriate coverage, you ensure that financial constraints never prevent your beloved companion from receiving necessary care. The peace of mind alone makes insurance a worthwhile consideration for any dedicated ${animalType} owner.`;
  
  return {
    introduction: introduction,
    overview: overview,
    benefits: benefits,
    coverageDetails: coverageDetails,
    considerations: considerations,
    commonMistakes: commonMistakes,
    tips: tips,
    caseStudies: caseStudies[variation],
    faqs: faqs,
    conclusion: conclusion
  };
}