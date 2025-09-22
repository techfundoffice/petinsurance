#!/bin/bash

# Simple bash script to send continue commands periodically
# Usage: ./continue_loop.sh [interval_seconds] [max_iterations]

INTERVAL=${1:-60}  # Default 60 seconds
MAX_ITER=${2:-50}  # Default 50 iterations

echo "Auto-Continue Bash Script"
echo "========================"
echo "Interval: $INTERVAL seconds"
echo "Max iterations: $MAX_ITER"
echo ""

for i in $(seq 1 $MAX_ITER); do
    echo "[$(date '+%H:%M:%S')] Iteration $i/$MAX_ITER"
    echo "continue"
    echo ""
    
    if [ $i -lt $MAX_ITER ]; then
        echo "Waiting $INTERVAL seconds..."
        sleep $INTERVAL
    fi
done

echo "Completed $MAX_ITER iterations"