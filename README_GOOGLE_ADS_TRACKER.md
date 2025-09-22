# Google Ads Click Tracking for Cloudflare Workers

This system tracks Google Ads clicks and dynamically populates web page content based on the user's search keywords and campaign parameters.

## Files Created

1. **`google_ads_tracker.py`** - Core Python module for processing Google Ads data
2. **`cloudflare-worker.js`** - Cloudflare Worker script for edge deployment  
3. **`web_app_integration.py`** - Python web app integration with SQLite persistence
4. **`client_integration.html`** - Client-side JavaScript implementation example

## How It Works

### 1. URL Parameter Extraction
The system captures these Google Ads parameters:
- `utm_term` (keyword the user searched)
- `utm_campaign` (campaign name)
- `utm_source` (traffic source)
- `utm_medium` (medium like cpc)
- `utm_content` (ad variation)
- `gclid` (Google Click ID)

### 2. Dynamic Content Generation
Based on the keyword, the system generates:
- Personalized headlines
- Targeted subheadlines
- Relevant body text
- Custom call-to-action buttons
- SEO meta descriptions

### 3. Data Persistence
- Stores click data in SQLite database
- Tracks conversions and revenue
- Provides analytics on keywords and campaigns

## Deployment Options

### Option 1: Cloudflare Worker (Recommended)
```bash
# Deploy the cloudflare-worker.js file to your Cloudflare account
wrangler publish cloudflare-worker.js
```

### Option 2: Python Web App
```bash
# Install dependencies
pip install flask

# Run the Flask app
python web_app_integration.py
```

### Option 3: Static HTML
Simply host `client_integration.html` on any web server.

## Testing

### Test URLs with Parameters:
```
https://yourdomain.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale&utm_term=blue+widgets&gclid=CjwKCAjw_test123

https://yourdomain.com/?utm_term=buy+cheap+electronics&utm_campaign=black_friday&gclid=CjwKCAjw_test456
```

### Test the Python module:
```bash
python google_ads_tracker.py
```

## Features

### Real-time Personalization
- Headlines adapt to search keywords
- CTAs change based on intent (buy, free trial, etc.)
- Content matches user's search query

### Conversion Tracking
- Track which keywords convert best
- Monitor campaign performance
- Calculate ROI per keyword/campaign

### Analytics Dashboard
Access analytics at `/analytics` endpoint:
```json
{
  "overall_stats": {
    "total_clicks": 1523,
    "conversion_rate": 3.2,
    "total_revenue": 45670.50
  },
  "top_keywords": [...],
  "top_campaigns": [...]
}
```

## Integration with Google Analytics

Add your Google Analytics ID to track events:
```javascript
gtag('config', 'GA_MEASUREMENT_ID');
```

Events tracked:
- `google_ads_landing` - Initial page load
- `cta_click` - Button clicks
- `engagement` - Time on page
- `conversion` - Completed conversions

## Security Considerations

1. **Validate Input**: Always sanitize URL parameters
2. **HTTPS Only**: Use secure connections
3. **Rate Limiting**: Implement rate limits to prevent abuse
4. **Data Privacy**: Follow GDPR/privacy regulations

## Customization

### Modify Content Templates
Edit the generation functions in `google_ads_tracker.py`:
- `_generate_headline()`
- `_generate_subheadline()`
- `_generate_cta()`
- `_generate_body_text()`

### Add New Parameters
Extend the `utm_params` list to track additional parameters.

### Custom Conversion Values
Set conversion values based on product/service:
```python
tracker.track_conversion(session_id, conversion_value=99.99)
```

## Performance Tips

1. **Cache Content**: Store generated content for repeated keywords
2. **CDN Integration**: Use Cloudflare's edge network
3. **Lazy Loading**: Load analytics asynchronously
4. **Database Indexing**: Index keyword and campaign columns

## Support

For issues or questions:
- Check browser console for JavaScript errors
- Review Cloudflare Worker logs
- Verify URL parameters are properly formatted
- Test with the provided test URLs first