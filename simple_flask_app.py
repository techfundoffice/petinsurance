#!/usr/bin/env python3
from flask import Flask, request, render_template_string
import json

app = Flask(__name__)

# Simple HTML template
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>
    <style>
        body { font-family: Arial; margin: 40px; }
        .data { background: #f0f0f0; padding: 20px; margin: 20px 0; }
        .keyword { color: blue; font-weight: bold; }
    </style>
</head>
<body>
    <h1>{{ headline }}</h1>
    <p>{{ message }}</p>
    
    <div class="data">
        <h3>Google Ads Data:</h3>
        <p>Keyword: <span class="keyword">{{ keyword or 'None' }}</span></p>
        <p>Campaign: {{ campaign or 'None' }}</p>
        <p>Source: {{ source or 'None' }}</p>
        <p>Click ID: {{ gclid or 'None' }}</p>
    </div>
    
    <button>{{ button_text }}</button>
    
    <div class="data">
        <h3>All Parameters:</h3>
        <pre>{{ all_params }}</pre>
    </div>
</body>
</html>
'''

@app.route('/')
def index():
    # Get Google Ads parameters from URL
    keyword = request.args.get('utm_term', '')
    campaign = request.args.get('utm_campaign', '')
    source = request.args.get('utm_source', '')
    gclid = request.args.get('gclid', '')
    
    # Generate dynamic content
    if keyword:
        keyword_clean = keyword.replace('+', ' ')
        headline = f"Looking for {keyword_clean}?"
        message = f'You searched for "{keyword_clean}" - we have it!'
        button_text = f"Get {keyword_clean} Now"
        title = f"{keyword_clean} - Best Deals"
    else:
        headline = "Welcome to Our Site"
        message = "Browse our products"
        button_text = "Shop Now"
        title = "Welcome"
    
    # Get all parameters for debugging
    all_params = json.dumps(dict(request.args), indent=2)
    
    return render_template_string(HTML_TEMPLATE,
        title=title,
        headline=headline,
        message=message,
        keyword=keyword,
        campaign=campaign,
        source=source,
        gclid=gclid,
        button_text=button_text,
        all_params=all_params
    )

if __name__ == '__main__':
    print("Starting Flask app...")
    print("Test URLs:")
    print("http://localhost:5000/?utm_term=blue+widgets&utm_campaign=summer_sale&utm_source=google")
    print("http://localhost:5000/?utm_term=cheap+laptops&utm_campaign=tech_deals&gclid=abc123")
    app.run(debug=True, host='0.0.0.0', port=5000)