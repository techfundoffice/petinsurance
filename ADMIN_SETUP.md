# Admin Panel Setup & Security

## 🔐 Access the Admin Panel

1. **Navigate to:** Look for "🔐 Admin Dashboard" in the Resources dropdown menu on homepage
2. **Direct URL:** `https://million-pages.catsluvusboardinghotel.workers.dev/admin`

## 🔑 Setting the Admin Password

### Option 1: Using Wrangler CLI (Recommended)
```bash
wrangler secret put ADMIN_PASSWORD
# Enter your secure password when prompted
```

### Option 2: Via Cloudflare Dashboard
1. Go to Workers & Pages
2. Select your worker: `million-pages`
3. Settings → Variables → Add Variable
4. Name: `ADMIN_PASSWORD`
5. Value: Your secure password
6. Check "Encrypt" checkbox

## 🛡️ Security Features

### Password Protection
- ✅ Admin panel requires authentication
- ✅ Session cookies (1 hour expiration)
- ✅ HttpOnly, Secure, SameSite cookies
- ✅ Logout functionality

### Default Credentials (Development Only)
- **Default Password:** `admin123`
- ⚠️ **IMPORTANT:** Change this immediately in production!

### Encryption
- All API credentials stored encrypted (AES-256-GCM)
- Set encryption key: `wrangler secret put ENCRYPTION_KEY`

## 📋 Admin Panel Features

### Main Dashboard (`/admin`)
- **Google Ads API Configuration**
  - Customer ID
  - Developer Token  
  - Access Token
  
- **Google Search Console API**
  - Access Token
  - Refresh Token

- **Configuration Settings**
  - Keyword cache TTL
  - Environment selection

### Security Best Practices
1. **Use a strong password** - minimum 12 characters
2. **Set unique encryption key** - don't use defaults
3. **Enable 2FA** on your Cloudflare account
4. **Monitor access logs**: `wrangler tail`
5. **Rotate credentials** regularly

## 🚀 Quick Start

1. Set admin password:
   ```bash
   wrangler secret put ADMIN_PASSWORD
   ```

2. Set encryption key:
   ```bash
   wrangler secret put ENCRYPTION_KEY
   ```

3. Visit admin panel and login
4. Add your API credentials
5. Enjoy real search volume data!

## 🔧 Troubleshooting

**Can't login?**
- Check if ADMIN_PASSWORD secret is set
- Try clearing cookies
- Check logs: `wrangler tail`

**Session expires quickly?**
- Sessions last 1 hour by default
- Stay logged in by keeping tab open

**Forgot password?**
- Update via: `wrangler secret put ADMIN_PASSWORD`
- Changes take effect immediately

## 📝 Session Management

- Sessions expire after 1 hour
- Cookie-based authentication
- Secure transmission only (HTTPS)
- Logout clears session immediately

## 🎯 Next Steps

1. Change default password
2. Add Google Ads API credentials  
3. Configure GSC access
4. Monitor API usage in database

For support, check worker logs:
```bash
wrangler tail --format pretty
```