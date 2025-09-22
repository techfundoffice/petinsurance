// Updates for specialty content generators to use the sophisticated system

// Replace the current generateCardiologyContent with:
function generateCardiologyContent(title, pageNumber) {
  const categorySlug = 'veterinary-cardiology';
  return generateInsuranceContent(title, pageNumber, categorySlug);
}

// Replace the current generateNeurologyContent with:
function generateNeurologyContent(title, pageNumber) {
  const categorySlug = 'veterinary-neurology';
  return generateInsuranceContent(title, pageNumber, categorySlug);
}

// Replace the current generateDentalContent with:
function generateDentalContent(title, pageNumber) {
  const categorySlug = 'veterinary-dental';
  return generateInsuranceContent(title, pageNumber, categorySlug);
}

// Note: generateSurgeryContent already uses generateInsuranceContent
// Note: generateEmergencyContent and generateOncologyContent have sophisticated implementations