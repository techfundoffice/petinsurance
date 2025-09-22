/**
 * Cloudflare Worker for Google Ads Click Tracking and Dynamic Content
 * This worker intercepts requests and populates content based on Google Ads parameters
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Extract Google Ads parameters
  const clickData = extractGoogleAdsData(url)
  
  // Generate dynamic content based on click data
  const dynamicContent = generateDynamicContent(clickData)
  
  // Create the HTML response
  const html = generateHTML(clickData, dynamicContent)
  
  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'no-cache, no-store, must-revalidate'
    }
  })
}

function extractGoogleAdsData(url) {
  const params = url.searchParams
  
  return {
    timestamp: new Date().toISOString(),
    url: url.toString(),
    keyword: params.get('utm_term') || params.get('keyword') || null,
    campaign: params.get('utm_campaign') || null,
    source: params.get('utm_source') || null,
    medium: params.get('utm_medium') || null,
    content: params.get('utm_content') || null,
    gclid: params.get('gclid') || null,
    allParams: Object.fromEntries(params)
  }
}

function generateDynamicContent(clickData) {
  const keyword = clickData.keyword || ''
  const campaign = clickData.campaign || ''
  
  return {
    headline: generateHeadline(keyword),
    subheadline: generateSubheadline(keyword, campaign),
    ctaText: generateCTA(keyword),
    metaDescription: generateMetaDescription(keyword),
    bodyText: generateBodyText(keyword, campaign),
    trackingScript: generateTrackingScript(clickData)
  }
}

function generateHeadline(keyword) {
  if (!keyword) return "Welcome to Our Site"
  
  const keywordClean = keyword.replace(/\+/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  return `Find the Best ${keywordClean} Solutions`
}

function generateSubheadline(keyword, campaign) {
  if (keyword) {
    const keywordClean = keyword.replace(/\+/g, ' ')
    return `You searched for '${keywordClean}' - We have exactly what you need!`
  } else if (campaign) {
    return `Special offer from our ${campaign} campaign`
  }
  return "Discover our premium products and services"
}

function generateCTA(keyword) {
  if (keyword && keyword.toLowerCase().includes('buy')) {
    return "Buy Now & Save 20%"
  } else if (keyword && keyword.toLowerCase().includes('free')) {
    return "Start Your Free Trial"
  } else if (keyword) {
    const keywordClean = keyword.replace(/\+/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    return `Get ${keywordClean} Now`
  }
  return "Learn More"
}

function generateMetaDescription(keyword) {
  if (keyword) {
    const keywordClean = keyword.replace(/\+/g, ' ')
    return `Looking for ${keywordClean}? Find the best deals and expert reviews. Free shipping on orders over $50.`
  }
  return "Discover our wide selection of products with expert reviews and competitive prices."
}

function generateBodyText(keyword, campaign) {
  if (keyword) {
    const keywordClean = keyword.replace(/\+/g, ' ')
    return `
      <p>Your search for <strong>${keywordClean}</strong> brought you to the right place!</p>
      <p>We specialize in providing high-quality ${keywordClean} solutions that meet your needs.</p>
      <p>Our customers love our ${keywordClean} products because of our commitment to quality and service.</p>
    `
  }
  return `
    <p>Welcome! We're glad you found us.</p>
    <p>Browse our extensive catalog of premium products and services.</p>
    <p>Join thousands of satisfied customers who trust us for their needs.</p>
  `
}

function generateTrackingScript(clickData) {
  // Generate tracking script to send data to analytics
  return `
    <script>
      // Store click data in sessionStorage for use across pages
      sessionStorage.setItem('googleAdsClickData', '${JSON.stringify(clickData)}');
      
      // Track the landing
      if (typeof gtag !== 'undefined') {
        gtag('event', 'google_ads_landing', {
          'keyword': '${clickData.keyword || ''}',
          'campaign': '${clickData.campaign || ''}',
          'gclid': '${clickData.gclid || ''}'
        });
      }
      
      // Custom tracking pixel
      const pixel = new Image();
      pixel.src = '/track?data=' + encodeURIComponent('${JSON.stringify(clickData)}');
    </script>
  `
}

function generateHTML(clickData, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.headline}</title>
    <meta name="description" content="${content.metaDescription}">
    
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .hero {
            background: white;
            padding: 60px 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
            margin-bottom: 40px;
        }
        h1 {
            color: #333;
            font-size: 2.5em;
            margin-bottom: 20px;
        }
        .subheadline {
            color: #666;
            font-size: 1.3em;
            margin-bottom: 30px;
        }
        .cta-button {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 15px 40px;
            font-size: 1.2em;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s;
        }
        .cta-button:hover {
            background: #0056b3;
        }
        .content {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .debug-info {
            margin-top: 40px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 5px;
            font-family: monospace;
            font-size: 0.9em;
        }
    </style>
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    </script>
</head>
<body>
    <div class="container">
        <div class="hero">
            <h1>${content.headline}</h1>
            <p class="subheadline">${content.subheadline}</p>
            <a href="#" class="cta-button" onclick="trackCTA()">${content.ctaText}</a>
        </div>
        
        <div class="content">
            ${content.bodyText}
            
            <div class="debug-info">
                <h3>Google Ads Click Data (Debug Mode)</h3>
                <pre>${JSON.stringify(clickData, null, 2)}</pre>
            </div>
        </div>
    </div>
    
    ${content.trackingScript}
    
    <script>
        function trackCTA() {
            const clickData = JSON.parse(sessionStorage.getItem('googleAdsClickData') || '{}');
            console.log('CTA clicked with data:', clickData);
            
            // Track CTA click
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'keyword': clickData.keyword || '',
                    'campaign': clickData.campaign || ''
                });
            }
        }
        
        // Log page load
        console.log('Page loaded with Google Ads data:', ${JSON.stringify(clickData)});
    </script>
</body>
</html>`
}