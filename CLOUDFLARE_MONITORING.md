# Cloudflare Built-in Monitoring Setup

## 1. View Analytics (Already Active)
Go to: Cloudflare Dashboard → Workers & Pages → million-pages → Analytics

Shows:
- Requests per minute
- Error rate
- CPU time used
- Response times
- Success/error breakdown

## 2. Set Up Email Alerts

### In Cloudflare Dashboard:
1. Click **Notifications** (top menu)
2. Click **Create**
3. Select **Workers**
4. Choose alert types:
   - **Workers Health Alert** - When worker goes down
   - **Workers Error Alert** - When errors exceed threshold
   - **Workers Success Rate Alert** - When success rate drops

### Configure each alert:
- **Error threshold**: 1% error rate
- **Time window**: 5 minutes
- **Email to**: your-email@domain.com

## 3. Health Check Endpoint
Your worker now has `/health` endpoint:
```
https://million-pages.catsluvusboardinghotel.workers.dev/health
```

Returns:
```json
{
  "status": "healthy",
  "timestamp": "2025-09-05T22:45:00.000Z",
  "keywords": 847,
  "version": "1.0.0"
}
```

## 4. Free Uptime Monitoring Services
Use these to monitor your `/health` endpoint:

### UptimeRobot (Free)
1. Sign up at uptimerobot.com
2. Add monitor:
   - URL: `https://million-pages.catsluvusboardinghotel.workers.dev/health`
   - Check interval: 5 minutes
   - Alert contacts: Your email

### Pingdom (Free tier)
1. Sign up at pingdom.com
2. Add uptime check for `/health`
3. Get alerts via email/SMS

## 5. Monitor CPU Usage
In Cloudflare Analytics, watch for:
- **P50 CPU Time**: Should be < 10ms
- **P99 CPU Time**: Should be < 50ms
- **Max CPU Time**: Should never hit limit

## 6. Set Up Slack Notifications (Free)
1. In Slack: Add "Email" app
2. Get email like: `your-channel-abc123@your-workspace.slack.com`
3. Use this email in Cloudflare Notifications
4. Get alerts directly in Slack

## 7. Quick Health Check Script
Run this from your terminal:
```bash
# Check health
curl https://million-pages.catsluvusboardinghotel.workers.dev/health

# Check a few pages
for i in 1 100 500 847; do
  echo "Testing page $i..."
  time curl -s -o /dev/null -w "%{http_code}" \
    https://million-pages.catsluvusboardinghotel.workers.dev/$i
  echo ""
done
```

## That's It!
No external dependencies, no complex setup. Just Cloudflare's built-in features + optional free monitoring services.