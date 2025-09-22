#!/usr/bin/env python3
"""
Smart auto-continue script that monitors page generation progress
and sends continue commands when needed
"""

import subprocess
import time
import re
import os
from datetime import datetime

class SmartContinueBot:
    def __init__(self):
        self.index_file = '/root/million-pages/src/index.js'
        self.base_url = 'https://petinsurance.catsluvusboardinghotel.workers.dev'
        self.target_pages = 5000
        self.continue_interval = 45  # seconds
        self.last_known_count = self.get_keyword_count()
        self.stall_counter = 0
        self.max_stalls = 3
        
    def get_keyword_count(self):
        """Count keywords in the index.js file"""
        try:
            with open(self.index_file, 'r') as f:
                content = f.read()
            
            # Find the getAllKeywords function
            match = re.search(r'function getAllKeywords\(\)\s*\{[\s\S]*?return\s*\[([\s\S]*?)\];', content)
            if match:
                keywords_section = match.group(1)
                # Count quoted strings, excluding comments
                keywords = re.findall(r'"[^"]+"\s*,?(?:\s*//[^\n]*)?', keywords_section)
                # Filter out pure comment lines
                keywords = [k for k in keywords if '"' in k]
                return len(keywords)
        except Exception as e:
            print(f"Error reading keywords: {e}")
        return 0
    
    def check_deployed_pages(self):
        """Check how many pages are actually deployed"""
        try:
            # Check a page we know should exist to get the total
            test_page = min(2000, self.last_known_count)
            cmd = f'curl -s {self.base_url}/page/{test_page} | grep -o "Page [0-9]* of [0-9]*"'
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            if result.stdout:
                match = re.search(r'Page \d+ of (\d+)', result.stdout)
                if match:
                    total = int(match.group(1))
                    return total - 3  # Subtract static pages
        except Exception as e:
            print(f"Error checking deployment: {e}")
        return 0
    
    def send_continue(self):
        """Send the continue command"""
        timestamp = datetime.now().strftime('%H:%M:%S')
        print(f"\n{'='*60}")
        print(f"[{timestamp}] AUTO-CONTINUE TRIGGERED")
        print(f"Current Keywords: {self.last_known_count}")
        print(f"Target: {self.target_pages}")
        print(f"Progress: {(self.last_known_count/self.target_pages)*100:.1f}%")
        print(f"{'='*60}\n")
        print("continue")
        print("")  # Extra newline for clarity
        
    def monitor_progress(self):
        """Main monitoring loop"""
        print("🤖 Smart Continue Bot Started")
        print(f"📊 Initial keyword count: {self.last_known_count}")
        print(f"🎯 Target: {self.target_pages} pages")
        print(f"⏱️  Check interval: {self.continue_interval} seconds")
        print("-" * 60)
        
        while self.last_known_count < self.target_pages:
            # Wait before checking
            time.sleep(self.continue_interval)
            
            # Check current state
            current_count = self.get_keyword_count()
            deployed_count = self.check_deployed_pages()
            
            # Use the maximum of the two
            actual_count = max(current_count, deployed_count)
            
            timestamp = datetime.now().strftime('%H:%M:%S')
            
            if actual_count > self.last_known_count:
                # Progress made!
                added = actual_count - self.last_known_count
                print(f"[{timestamp}] ✅ Progress: +{added} keywords (Total: {actual_count})")
                self.last_known_count = actual_count
                self.stall_counter = 0
            else:
                # No progress
                self.stall_counter += 1
                print(f"[{timestamp}] ⏸️  No progress detected (Stall #{self.stall_counter})")
                
                if self.stall_counter >= self.max_stalls:
                    self.send_continue()
                    self.stall_counter = 0
                    # Give time for the continue to be processed
                    time.sleep(10)
        
        # Target reached!
        print(f"\n{'🎉'*20}")
        print(f"TARGET REACHED! Generated {self.last_known_count} keywords!")
        print(f"{'🎉'*20}")
    
    def run(self):
        """Run the bot with error handling"""
        try:
            # Start with a continue if we're not at target
            if self.last_known_count < self.target_pages:
                print("\n🚀 Starting with initial continue command...")
                self.send_continue()
                time.sleep(5)
            
            self.monitor_progress()
        except KeyboardInterrupt:
            print(f"\n\n🛑 Bot stopped by user")
            print(f"📊 Final count: {self.last_known_count} keywords")
        except Exception as e:
            print(f"\n❌ Error: {e}")

if __name__ == "__main__":
    bot = SmartContinueBot()
    bot.run()