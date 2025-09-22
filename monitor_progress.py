#!/usr/bin/env python3
import time
import re
from datetime import datetime

def get_keyword_count():
    try:
        with open('/root/million-pages/src/index.js', 'r') as f:
            content = f.read()
        keywords = re.findall(r'"[^"]+",?\s*(?://.*)?$', content, re.MULTILINE)
        keywords = [k for k in keywords if '"' in k and not k.strip().startswith('//')]
        return len(keywords)
    except:
        return 0

def monitor():
    last_count = get_keyword_count()
    stall_count = 0
    
    while last_count < 5000:
        time.sleep(30)  # Check every 30 seconds
        current_count = get_keyword_count()
        
        timestamp = datetime.now().strftime('%H:%M:%S')
        
        if current_count > last_count:
            print(f"[{timestamp}] Progress: {last_count} → {current_count} keywords (+{current_count - last_count})")
            with open('/tmp/continue_signal.txt', 'w') as f:
                f.write('')
            last_count = current_count
            stall_count = 0
        else:
            stall_count += 1
            print(f"[{timestamp}] No progress. Stall #{stall_count}")
            
            if stall_count >= 2:  # After 1 minute of no progress
                print(f"[{timestamp}] SENDING CONTINUE SIGNAL")
                with open('/tmp/continue_signal.txt', 'w') as f:
                    f.write('continue')
                print("continue")  # This is the actual continue command
                stall_count = 0

print(f"Monitor started. Current keywords: {get_keyword_count()}")
print("Target: 5000 keywords")
print("-" * 40)
monitor()