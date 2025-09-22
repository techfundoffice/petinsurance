# Million Pages Database Setup Guide

## 🚀 Quick Setup

### 1. Create D1 Database
Since your API token doesn't have D1 permissions, you'll need to:

1. Log into Cloudflare Dashboard: https://dash.cloudflare.com
2. Navigate to Workers & Pages → D1
3. Click "Create Database" 
4. Name it: `million-pages-db`
5. Copy the Database ID

### 2. Update Configuration
Edit `wrangler.toml` and replace `YOUR_D1_DATABASE_ID` with your actual database ID:

```toml
[[env.production.d1_databases]]
binding = "DB"
database_name = "million-pages-db" 
database_id = "YOUR_ACTUAL_ID_HERE"
```

### 3. Create Database Tables
Run the schema file to create tables:

```bash
wrangler d1 execute million-pages-db --file=./schema.sql
```

### 4. Access Admin Panel
Visit: https://million-pages.catsluvusboardinghotel.workers.dev/admin

## 🔐 Features

### Admin Dashboard (`/admin`)
- Secure storage for API credentials
- Encrypted secrets in database
- Easy configuration management
- No more environment variable hassles!

### Supported Services
- **Google Ads API**: Customer ID, Developer Token, Access Token
- **Google Search Console**: Access Token, Refresh Token
- **More coming**: OpenAI, Bing Webmaster Tools, etc.

### Benefits
- ✅ **Encrypted Storage**: All credentials are encrypted using AES-256-GCM
- ✅ **No Redeploys**: Update credentials without redeploying
- ✅ **Audit Trail**: Track when credentials were added/updated
- ✅ **Multi-Environment**: Separate credentials for dev/staging/prod
- ✅ **Caching**: Keyword volumes cached for 7 days
- ✅ **Free**: D1 free tier is extremely generous

## 📊 Database Schema

### Tables Created:
1. **api_credentials**: Stores encrypted API keys and tokens
2. **app_config**: Application configuration settings
3. **keyword_volumes**: Cached search volume data
4. **api_usage**: API usage tracking and rate limiting

## 🛡️ Security Notes

1. **Encryption Key**: Set a strong encryption key as a secret:
   ```bash
   wrangler secret put ENCRYPTION_KEY
   ```

2. **Admin Access**: Consider adding authentication to `/admin` route

3. **HTTPS Only**: All credentials are transmitted over HTTPS

## 🔍 Testing

1. Visit `/admin` 
2. Add test credentials
3. Check homepage SEO audit - should use real data if credentials are valid

## 🆘 Troubleshooting

**Database not found error:**
- Make sure you created the D1 database in Cloudflare Dashboard
- Update wrangler.toml with correct database ID
- Redeploy: `wrangler deploy --env=""`

**Credentials not saving:**
- Check browser console for errors
- Ensure database tables are created
- Verify ENCRYPTION_KEY is set

**API calls still using estimates:**
- Credentials may be incorrect
- Check API usage logs in database
- Verify Google Ads/GSC API access is enabled

## 📝 Next Steps

1. Create D1 database in Cloudflare Dashboard
2. Update wrangler.toml with database ID
3. Run schema.sql to create tables
4. Visit /admin to add credentials
5. Enjoy real search volume data!

For questions, check the error logs:
```bash
wrangler tail
```