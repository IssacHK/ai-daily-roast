#!/bin/bash

# AI Daily Roast - Cron Setup Script
# Run this script to set up automatic daily roast generation at 5:00 AM (UTC+8)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CRON_JOB="0 5 * * * cd $SCRIPT_DIR && node generate-roast.js >> /tmp/roast-cron.log 2>&1"

echo "🔥 AI Daily Roast - Cron Setup"
echo "================================"
echo ""

# Check if cron is available
if ! command -v crontab &> /dev/null; then
    echo "❌ cron is not installed. Please install cron first."
    exit 1
fi

# Add the cron job
(crontab -l 2>/dev/null | grep -v "generate-roast.js"; echo "$CRON_JOB") | crontab -

echo "✅ Cron job installed successfully!"
echo ""
echo "📅 Schedule: 5:00 AM daily (UTC+8)"
echo "📝 Command: node generate-roast.js"
echo ""
echo "📋 Current crontab:"
crontab -l
echo ""
echo "💡 To view logs: tail -f /tmp/roast-cron.log"
