#!/usr/bin/env python3
"""
Simple auto-continue script that outputs 'continue' command periodically
"""

import time
import sys
from datetime import datetime

def auto_continue(interval=60, max_iterations=50):
    """
    Automatically output 'continue' at specified intervals
    
    Args:
        interval: Seconds between continue commands (default 60)
        max_iterations: Maximum number of continues (default 50)
    """
    print(f"Auto-Continue Script Started")
    print(f"Will send 'continue' every {interval} seconds")
    print(f"Maximum iterations: {max_iterations}")
    print("-" * 50)
    
    for i in range(max_iterations):
        # Wait for the specified interval
        if i > 0:  # Don't wait on first iteration
            print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Waiting {interval} seconds...")
            time.sleep(interval)
        
        # Send continue command
        print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Sending continue command #{i+1}/{max_iterations}")
        print("\n>>> CONTINUE <<<\n")
        print("continue")
        sys.stdout.flush()
        
    print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Completed {max_iterations} iterations")

if __name__ == "__main__":
    # Parse command line arguments
    interval = 60  # Default 60 seconds
    iterations = 50  # Default 50 iterations
    
    if len(sys.argv) > 1:
        interval = int(sys.argv[1])
    if len(sys.argv) > 2:
        iterations = int(sys.argv[2])
    
    print("Simple Continue Generator")
    print("========================")
    print("Usage: python simple_continue.py [interval_seconds] [max_iterations]")
    print(f"Example: python simple_continue.py 30 100\n")
    
    try:
        auto_continue(interval, iterations)
    except KeyboardInterrupt:
        print("\n\nScript stopped by user.")