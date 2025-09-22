#!/bin/bash
echo "Monitor started at $(date)"
echo "Will check every 60 seconds and output 'continue' if no progress"

last_count=$(grep -c '".*",$' /root/million-pages/src/index.js)

while true; do
    sleep 60
    current_count=$(grep -c '".*",$' /root/million-pages/src/index.js)
    
    if [ "$current_count" -gt "$last_count" ]; then
        echo "[$(date '+%H:%M:%S')] Progress: $last_count → $current_count"
        last_count=$current_count
    else
        echo "[$(date '+%H:%M:%S')] No progress - sending continue"
        echo "continue"
    fi
done