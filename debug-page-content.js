#!/usr/bin/env node

async function debugPageContent() {
  const response = await fetch('https://million-pages.catsluvusboardinghotel.workers.dev/1');
  const html = await response.text();
  
  console.log('Page 1 HTML length:', html.length);
  
  // Check for main tag
  const hasMain = html.includes('<main');
  console.log('Has <main> tag:', hasMain);
  
  // Try to extract content
  const contentMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (contentMatch) {
    console.log('Main content length:', contentMatch[1].length);
    console.log('First 200 chars:', contentMatch[1].substring(0, 200));
  } else {
    console.log('Could not extract main content');
    
    // Check for article instead
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
    if (articleMatch) {
      console.log('Article content length:', articleMatch[1].length);
    }
  }
}

debugPageContent().catch(console.error);