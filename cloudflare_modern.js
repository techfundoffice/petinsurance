// Modern Cloudflare Worker using ES Modules (Recommended for 2025)
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    
    // Get Google Ads parameters
    const keyword = url.searchParams.get('utm_term') || ''
    const campaign = url.searchParams.get('utm_campaign') || ''
    const source = url.searchParams.get('utm_source') || ''
    const gclid = url.searchParams.get('gclid') || ''
    
    // Generate content based on keyword
    let headline = 'Welcome'
    let message = 'Browse our products'
    let button = 'Shop Now'
    
    if (keyword) {
      const clean = keyword.replace(/\+/g, ' ')
      headline = `Looking for ${clean}?`
      message = `You searched for "${clean}" - we have it!`
      button = `Get ${clean} Now`
    }
    
    // Simple HTML response
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>${headline}</title>
    <style>
        body { font-family: Arial; margin: 40px; }
        .data { background: #f0f0f0; padding: 20px; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>${headline}</h1>
    <p>${message}</p>
    
    <div class="data">
        <p><b>Keyword:</b> ${keyword || 'none'}</p>
        <p><b>Campaign:</b> ${campaign || 'none'}</p>
        <p><b>Source:</b> ${source || 'none'}</p>
        <p><b>Click ID:</b> ${gclid || 'none'}</p>
    </div>
    
    <button onclick="alert('Clicked!')">${button}</button>
</body>
</html>`
    
    return new Response(html, {
      headers: { 'content-type': 'text/html' }
    })
  }
}