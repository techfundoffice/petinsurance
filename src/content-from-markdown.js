// Content generation from Markdown templates
import fs from 'fs';
import path from 'path';

// Load all markdown templates
export function loadMarkdownTemplates() {
  const templatesDir = path.join(process.cwd(), 'content-templates');
  const templates = {};
  
  if (fs.existsSync(templatesDir)) {
    const files = fs.readdirSync(templatesDir);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const name = file.replace('.md', '');
        const content = fs.readFileSync(path.join(templatesDir, file), 'utf8');
        templates[name] = content;
      }
    });
  }
  
  return templates;
}

// Generate content from markdown template
export function generateFromMarkdown(templateName, variables) {
  const templates = loadMarkdownTemplates();
  let content = templates[templateName] || templates['default'] || '';
  
  // Replace variables in template
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`{${key}}`, 'g');
    content = content.replace(regex, variables[key]);
  });
  
  // Convert markdown to HTML
  return markdownToHTML(content);
}

// Simple markdown to HTML converter
function markdownToHTML(markdown) {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  
  // Lists
  html = html.replace(/^\d\. (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
  
  // Wrap consecutive list items
  html = html.replace(/(<li>.*?<\/li>\n)+/g, match => `<ul>${match}</ul>`);
  
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = `<p>${html}</p>`;
  
  // Clean up
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[1-3]>)/g, '$1');
  html = html.replace(/(<\/h[1-3]>)<\/p>/g, '$1');
  
  return html;
}

// Example usage in generateUniqueContent
export function generateContentFromTemplate(keyword, pageNumber, animalType) {
  const year = new Date().getFullYear();
  
  // Check if we have a specific template for this keyword type
  let templateName = 'default';
  if (keyword.includes('emergency')) templateName = 'emergency';
  else if (keyword.includes('cost')) templateName = 'cost-guide';
  else if (keyword.includes('breed')) templateName = 'breed-specific';
  
  const variables = {
    keyword: keyword,
    animalType: animalType,
    year: year,
    pageNumber: pageNumber,
    monthlyPremium: '$' + (15 + Math.floor(pageNumber % 55)),
    coverageLimit: '$' + (5000 + (pageNumber * 100)),
  };
  
  return generateFromMarkdown(templateName, variables);
}