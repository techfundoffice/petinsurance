#!/usr/bin/env python3
"""Test the tracker with sample URLs"""

# Test URLs that would come from Google Ads
test_urls = [
    "simple_tracker.html?utm_term=blue+widgets&utm_campaign=summer_sale&utm_source=google",
    "simple_tracker.html?utm_term=buy+cheap+phones&utm_campaign=electronics&gclid=CjwKCAjw123",
    "simple_tracker.html?keyword=laptop+deals&utm_source=google&utm_medium=cpc"
]

print("Test these URLs in your browser:\n")
for url in test_urls:
    print(f"file:///root/million-pages/{url}")
    
print("\nFor Flask app, run: python3 simple_flask_app.py")
print("Then visit: http://localhost:5000/?utm_term=your+keyword+here")