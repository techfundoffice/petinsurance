// Simple authentication for admin panel

// Generate login page HTML
export function generateLoginPage(error = null) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KPSXGQWC');</script>
    <!-- End Google Tag Manager -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Million Pages</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background: #f5f7fa;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .login-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 40px;
            max-width: 400px;
            width: 100%;
            margin: 20px;
        }
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .login-header h1 {
            margin: 0 0 10px 0;
            color: #4f46e5;
            font-size: 28px;
        }
        .login-header p {
            margin: 0;
            color: #6b7280;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            font-weight: 600;
            margin-bottom: 5px;
            color: #4b5563;
        }
        input[type="password"] {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 16px;
            transition: all 0.2s;
            box-sizing: border-box;
        }
        input:focus {
            outline: none;
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        button {
            width: 100%;
            background: #4f46e5;
            color: white;
            border: none;
            padding: 14px 20px;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }
        button:hover {
            background: #4338ca;
        }
        .error {
            background: #fee2e2;
            color: #991b1b;
            border: 1px solid #fca5a5;
            padding: 12px 16px;
            border-radius: 6px;
            margin-bottom: 20px;
            text-align: center;
        }
        .back-link {
            display: block;
            text-align: center;
            margin-top: 20px;
            color: #6b7280;
            text-decoration: none;
            font-size: 14px;
        }
        .back-link:hover {
            color: #4f46e5;
        }
        .lock-icon {
            display: block;
            font-size: 48px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KPSXGQWC"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div class="login-container">
        <div class="login-header">
            <span class="lock-icon">🔐</span>
            <h1>Admin Access</h1>
            <p>Please enter your password to continue</p>
        </div>
        
        ${error ? `<div class="error">${error}</div>` : ''}
        
        <form method="POST" action="/admin/login">
            <div class="form-group">
                <label for="password">Admin Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    autofocus 
                    placeholder="Enter your admin password"
                >
            </div>
            
            <button type="submit">🔓 Login to Admin Panel</button>
        </form>
        
        <a href="/" class="back-link">← Back to Homepage</a>
    </div>
</body>
</html>`;
}

// Verify admin password
export async function verifyAdminPassword(password, env) {
  // Get password from environment variable
  const adminPassword = env.ADMIN_PASSWORD || 'admin123'; // Default for development
  
  // In production, you should use a secure hashing method
  // For now, simple comparison
  return password === adminPassword;
}

// Generate session token
export function generateSessionToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Check if request has valid session
export function isAuthenticated(request) {
  const cookie = request.headers.get('Cookie');
  if (!cookie) return false;
  
  const sessionMatch = cookie.match(/admin_session=([^;]+)/);
  if (!sessionMatch) return false;
  
  // In production, validate session token against database
  // For now, any non-empty token is valid
  return sessionMatch[1].length > 0;
}

// Handle login
export async function handleAdminLogin(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }
  
  const formData = await request.formData();
  const password = formData.get('password');
  
  if (!password) {
    return new Response(generateLoginPage('Password is required'), {
      status: 400,
      headers: { 'content-type': 'text/html;charset=UTF-8' }
    });
  }
  
  const isValid = await verifyAdminPassword(password, env);
  
  if (!isValid) {
    return new Response(generateLoginPage('Invalid password'), {
      status: 401,
      headers: { 'content-type': 'text/html;charset=UTF-8' }
    });
  }
  
  // Create session
  const sessionToken = generateSessionToken();
  
  // Redirect to admin panel with session cookie
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/admin',
      'Set-Cookie': `admin_session=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
    }
  });
}

// Handle logout
export function handleAdminLogout() {
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/',
      'Set-Cookie': 'admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0'
    }
  });
}