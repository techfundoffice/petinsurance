#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load the worker code
const workerCode = fs.readFileSync(path.join(__dirname, 'src/index.js'), 'utf8');

// Create a minimal environment to run getAllKeywords
const mockEnv = {};

// Extract and evaluate just the functions we need
const functionsCode = workerCode.match(/function getDogBreeds[\s\S]*?function getAllKeywords[\s\S]*?\n}/g);
if (functionsCode) {
  // Create a sandboxed execution
  const sandbox = `
    ${functionsCode.join('\n')}
    
    const keywords = getAllKeywords();
    console.log('Total keywords:', keywords.length);
    console.log('\\nLast 10 original keywords:');
    for (let i = 840; i < 850 && i < keywords.length; i++) {
      console.log(\`  \${i + 1}: \${keywords[i]}\`);
    }
    
    console.log('\\nChecking for breed keywords:');
    const breedKeywords = keywords.filter(k => 
      k.includes('Retriever') || 
      k.includes('Bulldog') || 
      k.includes('Persian') ||
      k.includes('Siamese')
    );
    console.log('Found breed keywords:', breedKeywords.length);
    if (breedKeywords.length > 0) {
      console.log('First 5 breed keywords:', breedKeywords.slice(0, 5));
    }
    
    // Find where breed keywords start
    for (let i = 0; i < keywords.length; i++) {
      if (keywords[i].includes('Golden Retriever')) {
        console.log(\`\\nFirst Golden Retriever keyword at index \${i + 1}: \${keywords[i]}\`);
        break;
      }
    }
  `;
  
  try {
    eval(sandbox);
  } catch (error) {
    console.error('Error evaluating code:', error.message);
  }
} else {
  console.error('Could not extract functions from worker code');
}