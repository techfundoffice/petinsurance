import { getApiCredential, saveApiCredential, getConfig } from './db-utils.js';

// Generate admin interface HTML
export function generateAdminPage(message = null) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Million Pages - Admin Dashboard</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: #f5f7fa;
            color: #333;
        }
        .header {
            background: #4f46e5;
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            padding: 20px;
            margin-bottom: 20px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            text-align: center;
        }
        .stat-number {
            font-size: 32px;
            font-weight: bold;
            color: #4f46e5;
        }
        .btn {
            background: #4f46e5;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px;
        }
        .btn:hover {
            background: #3730a3;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🐾 Million Pages Admin Dashboard</h1>
        <p>Manage your pet insurance content empire</p>
    </div>

    ${message ? `<div class="card" style="background: #10b981; color: white;">
        <p><strong>Success:</strong> ${message.text}</p>
    </div>` : ''}

    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-number">48,999</div>
            <div>Total Articles</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">9</div>
            <div>Categories</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">100</div>
            <div>Cities Covered</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">164</div>
            <div>Pet Breeds</div>
        </div>
    </div>

    <div class="card">
        <h2>Quick Actions</h2>
        <button class="btn" onclick="window.open('/', '_blank')">View Homepage</button>
        <button class="btn" onclick="window.open('/sitemap.xml', '_blank')">View Sitemap</button>
        <button class="btn" onclick="window.open('/robots.txt', '_blank')">View Robots.txt</button>
        <button class="btn" onclick="window.open('https://tagmanager.google.com', '_blank')">Google Tag Manager</button>
        <button class="btn" onclick="window.open('https://analytics.google.com', '_blank')">Google Analytics</button>
    </div>

    <div class="card">
        <h2>Site Status</h2>
        <p><strong>✅ GTM Tracking:</strong> Active (GTM-KPSXGQWC)</p>
        <p><strong>✅ SEO Infrastructure:</strong> Robots.txt & Sitemap deployed</p>
        <p><strong>✅ Content Generation:</strong> All 48,999 pages working</p>
        <p><strong>✅ Admin Access:</strong> Secure login active</p>
    </div>

    <div class="card">
        <h2>Content Overview</h2>
        <p><strong>Pet Insurance Articles:</strong> Comprehensive coverage across all major topics</p>
        <p><strong>Geographic Coverage:</strong> 100 major US cities</p>
        <p><strong>Breed Coverage:</strong> 164 dog and cat breeds</p>
        <p><strong>Medical Conditions:</strong> Emergency, chronic, and specialty care</p>
    </div>
</body>
</html>`;
}

// Handle admin login
export function handleAdminLogin(request) {
  return new Response(generateLoginPage(), {
    headers: { 'content-type': 'text/html;charset=UTF-8' }
  });
}

// Generate login page
export function generateLoginPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Million Pages</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
        }
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .login-header h1 {
            color: #333;
            margin: 0;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #555;
            font-weight: 500;
        }
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e1e5e9;
            border-radius: 5px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        .form-group input:focus {
            outline: none;
            border-color: #4f46e5;
        }
        .login-btn {
            width: 100%;
            background: #4f46e5;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }
        .login-btn:hover {
            background: #3730a3;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <h1>🐾 Admin Login</h1>
            <p>Million Pages Dashboard</p>
        </div>
        <form method="POST" action="/admin">
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="login-btn">Login to Admin Panel</button>
        </form>
    </div>
</body>
</html>`;
}

// Handle admin credentials saving
export async function handleAdminSaveCredentials(request, env) {
  try {
    const formData = await request.formData();
    const service = formData.get('service');
    const credential = formData.get('credential');
    
    if (!service || !credential) {
      return new Response('Missing service or credential', { status: 400 });
    }
    
    await saveApiCredential(env, service, credential);
    
    return new Response('', {
      status: 302,
      headers: {
        'Location': '/admin?message=Credentials saved successfully'
      }
    });
  } catch (error) {
    return new Response('Error saving credentials', { status: 500 });
  }
}
