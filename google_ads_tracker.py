#!/usr/bin/env python3
"""
Google Ads Click Data Processor for Cloudflare Workers
Extracts and processes Google Ads UTM parameters and GCLID from URLs
"""

import json
import urllib.parse
from datetime import datetime
from typing import Dict, Optional, Any


class GoogleAdsDataProcessor:
    """Process Google Ads click data from URL parameters"""
    
    def __init__(self):
        self.utm_params = [
            'utm_source',
            'utm_medium', 
            'utm_campaign',
            'utm_term',      # This contains the keyword
            'utm_content',
            'utm_id',
            'gclid'          # Google Click ID
        ]
        
    def extract_click_data(self, url: str) -> Dict[str, Any]:
        """Extract Google Ads data from URL parameters"""
        parsed_url = urllib.parse.urlparse(url)
        query_params = urllib.parse.parse_qs(parsed_url.query)
        
        click_data = {
            'timestamp': datetime.utcnow().isoformat(),
            'url': url,
            'keyword': None,
            'campaign': None,
            'source': None,
            'medium': None,
            'content': None,
            'gclid': None,
            'all_params': {}
        }
        
        # Extract UTM parameters
        for param in self.utm_params:
            if param in query_params:
                value = query_params[param][0]
                click_data['all_params'][param] = value
                
                # Map to simplified fields
                if param == 'utm_term':
                    click_data['keyword'] = value
                elif param == 'utm_campaign':
                    click_data['campaign'] = value
                elif param == 'utm_source':
                    click_data['source'] = value
                elif param == 'utm_medium':
                    click_data['medium'] = value
                elif param == 'utm_content':
                    click_data['content'] = value
                elif param == 'gclid':
                    click_data['gclid'] = value
                    
        return click_data
    
    def generate_dynamic_content(self, click_data: Dict[str, Any]) -> Dict[str, str]:
        """Generate dynamic content based on click data"""
        keyword = click_data.get('keyword', '')
        campaign = click_data.get('campaign', '')
        
        # Generate personalized content
        content = {
            'headline': self._generate_headline(keyword),
            'subheadline': self._generate_subheadline(keyword, campaign),
            'cta_text': self._generate_cta(keyword),
            'meta_description': self._generate_meta_description(keyword),
            'body_text': self._generate_body_text(keyword, campaign)
        }
        
        return content
    
    def _generate_headline(self, keyword: str) -> str:
        """Generate dynamic headline based on keyword"""
        if not keyword:
            return "Welcome to Our Site"
        
        # Clean and format keyword
        keyword_clean = keyword.replace('+', ' ').title()
        return f"Find the Best {keyword_clean} Solutions"
    
    def _generate_subheadline(self, keyword: str, campaign: str) -> str:
        """Generate dynamic subheadline"""
        if keyword:
            keyword_clean = keyword.replace('+', ' ')
            return f"You searched for '{keyword_clean}' - We have exactly what you need!"
        elif campaign:
            return f"Special offer from our {campaign} campaign"
        else:
            return "Discover our premium products and services"
    
    def _generate_cta(self, keyword: str) -> str:
        """Generate call-to-action text"""
        if keyword and 'buy' in keyword.lower():
            return "Buy Now & Save 20%"
        elif keyword and 'free' in keyword.lower():
            return "Start Your Free Trial"
        elif keyword:
            return f"Get {keyword.replace('+', ' ').title()} Now"
        else:
            return "Learn More"
    
    def _generate_meta_description(self, keyword: str) -> str:
        """Generate SEO meta description"""
        if keyword:
            keyword_clean = keyword.replace('+', ' ')
            return f"Looking for {keyword_clean}? Find the best deals and expert reviews. Free shipping on orders over $50."
        else:
            return "Discover our wide selection of products with expert reviews and competitive prices."
    
    def _generate_body_text(self, keyword: str, campaign: str) -> str:
        """Generate body text content"""
        if keyword:
            keyword_clean = keyword.replace('+', ' ')
            return f"""
                <p>Your search for <strong>{keyword_clean}</strong> brought you to the right place!</p>
                <p>We specialize in providing high-quality {keyword_clean} solutions that meet your needs.</p>
                <p>Our customers love our {keyword_clean} products because of our commitment to quality and service.</p>
            """
        else:
            return """
                <p>Welcome! We're glad you found us.</p>
                <p>Browse our extensive catalog of premium products and services.</p>
                <p>Join thousands of satisfied customers who trust us for their needs.</p>
            """
    
    def format_for_cloudflare_worker(self, click_data: Dict[str, Any], 
                                   content: Dict[str, str]) -> str:
        """Format data for Cloudflare Worker response"""
        response_data = {
            'click_data': click_data,
            'dynamic_content': content,
            'generated_at': datetime.utcnow().isoformat()
        }
        
        return json.dumps(response_data, indent=2)


def process_request(url: str) -> str:
    """Main function to process incoming request"""
    processor = GoogleAdsDataProcessor()
    
    # Extract click data
    click_data = processor.extract_click_data(url)
    
    # Generate dynamic content
    content = processor.generate_dynamic_content(click_data)
    
    # Format for Cloudflare Worker
    return processor.format_for_cloudflare_worker(click_data, content)


# Example usage and testing
if __name__ == "__main__":
    # Test URLs with Google Ads parameters
    test_urls = [
        "https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale&utm_term=blue+widgets&utm_content=ad1&gclid=CjwKCAjw_test123",
        "https://example.com/?utm_source=google&utm_medium=cpc&utm_term=buy+cheap+gadgets&gclid=CjwKCAjw_test456",
        "https://example.com/?utm_campaign=black_friday&utm_term=free+shipping+electronics"
    ]
    
    print("Google Ads Click Data Processor Test\n" + "="*50)
    
    for i, url in enumerate(test_urls, 1):
        print(f"\nTest {i}: {url}")
        print("-" * 50)
        result = process_request(url)
        print(result)