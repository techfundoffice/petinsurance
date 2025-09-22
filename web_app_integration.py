#!/usr/bin/env python3
"""
Web Application Integration for Google Ads Click Tracking
This can be used with Flask, FastAPI, or any Python web framework
"""

import json
import hashlib
from datetime import datetime, timedelta
from typing import Dict, Any, Optional
import sqlite3
import os


class GoogleAdsWebIntegration:
    """Handle Google Ads data persistence and retrieval for web apps"""
    
    def __init__(self, db_path: str = "google_ads_clicks.db"):
        self.db_path = db_path
        self._init_database()
        
    def _init_database(self):
        """Initialize SQLite database for click data persistence"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS click_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                keyword TEXT,
                campaign TEXT,
                source TEXT,
                medium TEXT,
                content TEXT,
                gclid TEXT UNIQUE,
                full_url TEXT,
                ip_address TEXT,
                user_agent TEXT,
                converted BOOLEAN DEFAULT 0,
                conversion_value REAL DEFAULT 0
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS page_content (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                keyword TEXT UNIQUE,
                headline TEXT,
                subheadline TEXT,
                body_content TEXT,
                cta_text TEXT,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        conn.commit()
        conn.close()
        
    def save_click_data(self, click_data: Dict[str, Any], 
                       request_info: Dict[str, str]) -> str:
        """Save Google Ads click data to database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Generate session ID
        session_id = self._generate_session_id(click_data, request_info)
        
        try:
            cursor.execute("""
                INSERT INTO click_data 
                (session_id, keyword, campaign, source, medium, content, 
                 gclid, full_url, ip_address, user_agent)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                session_id,
                click_data.get('keyword'),
                click_data.get('campaign'),
                click_data.get('source'),
                click_data.get('medium'),
                click_data.get('content'),
                click_data.get('gclid'),
                click_data.get('url'),
                request_info.get('ip_address'),
                request_info.get('user_agent')
            ))
            conn.commit()
        except sqlite3.IntegrityError:
            # GCLID already exists, update the record
            cursor.execute("""
                UPDATE click_data 
                SET timestamp = CURRENT_TIMESTAMP
                WHERE gclid = ?
            """, (click_data.get('gclid'),))
            conn.commit()
        finally:
            conn.close()
            
        return session_id
    
    def get_session_data(self, session_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve click data for a session"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM click_data 
            WHERE session_id = ? 
            ORDER BY timestamp DESC 
            LIMIT 1
        """, (session_id,))
        
        row = cursor.fetchone()
        conn.close()
        
        if row:
            return dict(row)
        return None
    
    def get_content_for_keyword(self, keyword: str) -> Optional[Dict[str, str]]:
        """Get cached content for a keyword"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM page_content 
            WHERE keyword = ?
        """, (keyword,))
        
        row = cursor.fetchone()
        conn.close()
        
        if row:
            return dict(row)
        return None
    
    def save_content_for_keyword(self, keyword: str, content: Dict[str, str]):
        """Cache content for a keyword"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT OR REPLACE INTO page_content 
            (keyword, headline, subheadline, body_content, cta_text)
            VALUES (?, ?, ?, ?, ?)
        """, (
            keyword,
            content.get('headline'),
            content.get('subheadline'),
            content.get('body_text'),
            content.get('cta_text')
        ))
        
        conn.commit()
        conn.close()
    
    def track_conversion(self, session_id: str, conversion_value: float = 0):
        """Track a conversion for a session"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            UPDATE click_data 
            SET converted = 1, conversion_value = ? 
            WHERE session_id = ?
        """, (conversion_value, session_id))
        
        conn.commit()
        conn.close()
    
    def get_analytics(self, days: int = 30) -> Dict[str, Any]:
        """Get analytics for the last N days"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cutoff_date = datetime.now() - timedelta(days=days)
        
        # Overall stats
        cursor.execute("""
            SELECT 
                COUNT(*) as total_clicks,
                COUNT(DISTINCT keyword) as unique_keywords,
                COUNT(DISTINCT campaign) as unique_campaigns,
                SUM(converted) as total_conversions,
                SUM(conversion_value) as total_revenue,
                AVG(CASE WHEN converted = 1 THEN 1.0 ELSE 0.0 END) * 100 as conversion_rate
            FROM click_data
            WHERE timestamp > ?
        """, (cutoff_date,))
        
        overall_stats = dict(zip(
            [d[0] for d in cursor.description], 
            cursor.fetchone()
        ))
        
        # Top keywords
        cursor.execute("""
            SELECT 
                keyword,
                COUNT(*) as clicks,
                SUM(converted) as conversions,
                AVG(CASE WHEN converted = 1 THEN 1.0 ELSE 0.0 END) * 100 as conversion_rate
            FROM click_data
            WHERE timestamp > ? AND keyword IS NOT NULL
            GROUP BY keyword
            ORDER BY clicks DESC
            LIMIT 10
        """, (cutoff_date,))
        
        top_keywords = [dict(zip([d[0] for d in cursor.description], row)) 
                       for row in cursor.fetchall()]
        
        # Top campaigns
        cursor.execute("""
            SELECT 
                campaign,
                COUNT(*) as clicks,
                SUM(converted) as conversions,
                SUM(conversion_value) as revenue
            FROM click_data
            WHERE timestamp > ? AND campaign IS NOT NULL
            GROUP BY campaign
            ORDER BY revenue DESC
            LIMIT 10
        """, (cutoff_date,))
        
        top_campaigns = [dict(zip([d[0] for d in cursor.description], row)) 
                        for row in cursor.fetchall()]
        
        conn.close()
        
        return {
            'period_days': days,
            'overall_stats': overall_stats,
            'top_keywords': top_keywords,
            'top_campaigns': top_campaigns
        }
    
    def _generate_session_id(self, click_data: Dict[str, Any], 
                           request_info: Dict[str, str]) -> str:
        """Generate unique session ID"""
        data = f"{click_data.get('gclid', '')}{request_info.get('ip_address', '')}{datetime.now().isoformat()}"
        return hashlib.sha256(data.encode()).hexdigest()[:16]


# Flask integration example
def create_flask_integration():
    """Example Flask integration"""
    from flask import Flask, request, jsonify, render_template_string
    
    app = Flask(__name__)
    tracker = GoogleAdsWebIntegration()
    
    @app.route('/')
    def landing_page():
        # Extract Google Ads parameters
        click_data = {
            'keyword': request.args.get('utm_term'),
            'campaign': request.args.get('utm_campaign'),
            'source': request.args.get('utm_source'),
            'medium': request.args.get('utm_medium'),
            'content': request.args.get('utm_content'),
            'gclid': request.args.get('gclid'),
            'url': request.url
        }
        
        request_info = {
            'ip_address': request.remote_addr,
            'user_agent': request.headers.get('User-Agent')
        }
        
        # Save click data
        session_id = tracker.save_click_data(click_data, request_info)
        
        # Generate dynamic content
        from google_ads_tracker import GoogleAdsDataProcessor
        processor = GoogleAdsDataProcessor()
        content = processor.generate_dynamic_content(click_data)
        
        # Cache content
        if click_data['keyword']:
            tracker.save_content_for_keyword(click_data['keyword'], content)
        
        # Render template with dynamic content
        return render_template_string("""
            <!DOCTYPE html>
            <html>
            <head>
                <title>{{ headline }}</title>
                <meta name="description" content="{{ meta_description }}">
            </head>
            <body>
                <h1>{{ headline }}</h1>
                <h2>{{ subheadline }}</h2>
                {{ body_text|safe }}
                <button onclick="convert()">{{ cta_text }}</button>
                
                <script>
                    sessionStorage.setItem('session_id', '{{ session_id }}');
                    
                    function convert() {
                        fetch('/convert', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({session_id: '{{ session_id }}'})
                        });
                    }
                </script>
            </body>
            </html>
        """, 
        session_id=session_id,
        **content)
    
    @app.route('/convert', methods=['POST'])
    def track_conversion():
        data = request.get_json()
        session_id = data.get('session_id')
        conversion_value = data.get('value', 0)
        
        tracker.track_conversion(session_id, conversion_value)
        
        return jsonify({'status': 'success'})
    
    @app.route('/analytics')
    def analytics():
        days = int(request.args.get('days', 30))
        stats = tracker.get_analytics(days)
        return jsonify(stats)
    
    return app


if __name__ == "__main__":
    # Test the integration
    integration = GoogleAdsWebIntegration()
    
    # Simulate click data
    test_click = {
        'keyword': 'blue widgets',
        'campaign': 'summer_sale',
        'source': 'google',
        'medium': 'cpc',
        'gclid': 'test_gclid_123'
    }
    
    test_request = {
        'ip_address': '127.0.0.1',
        'user_agent': 'Mozilla/5.0 Test Browser'
    }
    
    session_id = integration.save_click_data(test_click, test_request)
    print(f"Session ID: {session_id}")
    
    # Get analytics
    stats = integration.get_analytics(30)
    print("\nAnalytics:")
    print(json.dumps(stats, indent=2))