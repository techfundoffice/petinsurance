#!/usr/bin/env python3
"""
Auto-continue script for pet insurance content generation.
Monitors the last page count and automatically sends 'continue' command
when generation stops.
"""

import subprocess
import time
import re
import sys
import os
from datetime import datetime

class ContentGeneratorMonitor:
    def __init__(self):
        self.last_page_count = self.get_current_page_count()
        self.target_pages = 5000  # Target number of pages
        self.check_interval = 30  # Check every 30 seconds
        self.idle_threshold = 60  # Consider idle after 60 seconds of no change
        self.last_change_time = time.time()
        
    def get_current_page_count(self):
        """Extract the current page count from the index.js file"""
        try:
            with open('/root/million-pages/src/index.js', 'r') as f:
                content = f.read()
                # Count all keywords in the getAllKeywords array
                keywords = re.findall(r'"[^"]+",?\s*(?://.*)?$', content, re.MULTILINE)
                # Filter out comments and empty matches
                keywords = [k for k in keywords if not k.strip().startswith('//')]
                return len(keywords)
        except Exception as e:
            print(f"Error reading index.js: {e}")
            return 0
    
    def check_last_deployment(self):
        """Check the last deployment time and page count"""
        try:
            # Try to fetch a high page number to see current count
            result = subprocess.run(
                ['curl', '-s', 'https://petinsurance.catsluvusboardinghotel.workers.dev/page/2049'],
                capture_output=True,
                text=True
            )
            if 'Page 2049 of' in result.stdout:
                match = re.search(r'Page \d+ of (\d+)', result.stdout)
                if match:
                    total_pages = int(match.group(1))
                    return total_pages - 3  # Subtract static pages
            return 0
        except Exception as e:
            print(f"Error checking deployment: {e}")
            return 0
    
    def send_continue_command(self):
        """Send continue command to resume generation"""
        print(f"\n{'='*50}")
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Sending CONTINUE command")
        print(f"Current pages: {self.last_page_count}")
        print(f"Target pages: {self.target_pages}")
        print(f"{'='*50}\n")
        
        # Output continue command for the assistant
        print("continue")
        sys.stdout.flush()
        
    def monitor_and_continue(self):
        """Main monitoring loop"""
        print(f"Starting content generation monitor...")
        print(f"Current pages: {self.last_page_count}")
        print(f"Target pages: {self.target_pages}")
        print(f"Check interval: {self.check_interval} seconds")
        print(f"Idle threshold: {self.idle_threshold} seconds\n")
        
        while self.last_page_count < self.target_pages:
            time.sleep(self.check_interval)
            
            current_count = self.get_current_page_count()
            deployed_count = self.check_last_deployment()
            
            # Use the higher of file count or deployed count
            current_count = max(current_count, deployed_count)
            
            if current_count > self.last_page_count:
                # Progress detected
                print(f"[{datetime.now().strftime('%H:%M:%S')}] Progress: {self.last_page_count} → {current_count} pages")
                self.last_page_count = current_count
                self.last_change_time = time.time()
            else:
                # No progress
                idle_time = time.time() - self.last_change_time
                print(f"[{datetime.now().strftime('%H:%M:%S')}] No change. Idle for {int(idle_time)}s")
                
                if idle_time > self.idle_threshold:
                    # Been idle too long, send continue
                    self.send_continue_command()
                    self.last_change_time = time.time()
                    
                    # Give some time for the command to be processed
                    time.sleep(10)
        
        print(f"\n{'='*50}")
        print(f"TARGET REACHED! Generated {self.last_page_count} pages!")
        print(f"{'='*50}")

def main():
    """Run the monitor"""
    monitor = ContentGeneratorMonitor()
    
    # Show current status
    print("Pet Insurance Content Auto-Generator")
    print("===================================")
    print(f"This script will automatically send 'continue' commands")
    print(f"whenever content generation stops.\n")
    
    # Check if we should start with a continue command
    if len(sys.argv) > 1 and sys.argv[1] == '--start':
        print("Starting with initial continue command...")
        monitor.send_continue_command()
        time.sleep(5)
    
    try:
        monitor.monitor_and_continue()
    except KeyboardInterrupt:
        print("\n\nMonitoring stopped by user.")
        print(f"Final page count: {monitor.last_page_count}")

if __name__ == "__main__":
    main()