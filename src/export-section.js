// Main export handler for Cloudflare Workers
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Route handling
    if (path === '/' || path === '') {
      return generateHomePage();
    } else if (path === '/oauth-callback') {
      return handleOAuthCallbackPage(url);
    } else if (path === '/sitemap.xml') {
      return generateSitemap();
    } else if (path === '/seo-audit.csv') {
      return generateSEOAudit();
    } else if (path === '/best-practices') {
      return generateBestPracticesPage();
    } else if (path === '/seo-guidelines') {
      return generateSEOGuidelinesPage();
    } else if (path === '/api/track' && request.method === 'POST') {
      return handleAnalytics(request, env);
    } else if (path === '/api/oauth/token' && request.method === 'POST') {
      return handleOAuthTokenExchange(request, env);
    } else if (path === '/api/speed-test') {
      return handleSpeedTest(request);
    } else if (path === '/health') {
      return new Response('OK', { status: 200 });
    } else if (path.startsWith('/category/')) {
      const category = path.replace('/category/', '').replace(/\/$/, '');
      return generateCategoryPage(category);
    } else {
      // Extract page number from path (e.g., /1, /2, /page1, /page2)
      const pageMatch = path.match(/\/(?:page)?(\d+)$/);
      const pageNum = pageMatch ? parseInt(pageMatch[1]) : null;
      
      if (pageNum && pageNum >= 1 && pageNum <= getAllKeywords().length) {
        return generateKeywordPage(pageNum);
      }
    }
    
    // 404 page
    return new Response('Page not found', { status: 404 });
  },
};