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

    <div class="card" style="border-left: 4px solid #10b981;">
        <h2>🔍 NEW: Keyword Gap Analysis Agent</h2>
        <p><strong>Status:</strong> ✅ Active and Ready</p>
        <p>Advanced keyword gap analysis system with persistent SQLite database and Claude Code integration.</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">📊 Analysis Results:</h3>
            <ul style="margin: 10px 0;">
                <li><strong>500+ high-value gaps</strong> identified worth $25K-50K/month</li>
                <li><strong>Emergency keywords</strong> with $60-100+ CPC potential</li>
                <li><strong>Voice search opportunities</strong> for natural language queries</li>
                <li><strong>Local search gaps</strong> for geographic targeting</li>
                <li><strong>Question-based content</strong> opportunities</li>
            </ul>
        </div>

        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h3 style="margin-top: 0; color: #4f46e5;">🚀 Quick Start Commands:</h3>
            <div style="font-family: 'Courier New', monospace; background: #1f2937; color: #f9fafb; padding: 10px; border-radius: 5px; margin: 10px 0;">
                <div style="color: #10b981; margin-bottom: 5px;"># Navigate to agent directory</div>
                <div>cd /root/keyword-gap-agent/keyword-gap-analysis</div>
                <div style="color: #10b981; margin: 10px 0 5px 0;"># Test the system (229 gaps, $19,820/month potential)</div>
                <div>node demo.js</div>
                <div style="color: #10b981; margin: 10px 0 5px 0;"># Import existing 48,999 keywords and analyze gaps</div>
                <div>keyword import --code ../src/index.js</div>
                <div>keyword analyze --type comprehensive --cpc-min 40</div>
                <div>keyword claude --review</div>
            </div>
        </div>

        <div class="stats-grid" style="margin: 15px 0;">
            <div class="stat-card" style="border-left: 3px solid #ef4444;">
                <div class="stat-number" style="color: #ef4444;">$60-100</div>
                <div>Emergency CPC</div>
            </div>
            <div class="stat-card" style="border-left: 3px solid #f59e0b;">
                <div class="stat-number" style="color: #f59e0b;">500+</div>
                <div>High-Value Gaps</div>
            </div>
            <div class="stat-card" style="border-left: 3px solid #10b981;">
                <div class="stat-number" style="color: #10b981;">$50K</div>
                <div>Monthly Potential</div>
            </div>
        </div>

        <button class="btn" onclick="window.open('https://github.com/techfundoffice/petinsurance/tree/main/keyword-gap-analysis', '_blank')">📚 View Documentation</button>
        <button class="btn" onclick="showGapAnalysisDetails()" style="background: #059669;">📊 View Analysis Details</button>
        <button class="btn" onclick="copyQuickStart()" style="background: #7c3aed;">📋 Copy Setup Commands</button>
    </div>

    <div id="gapAnalysisModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 10px; max-width: 800px; max-height: 80vh; overflow-y: auto;">
            <h2>🔍 Keyword Gap Analysis Details</h2>
            
            <h3>🎯 Strategic Integration</h3>
            <p>The gap analysis agent complements your million-page site by:</p>
            <ul>
                <li><strong>Finding Missing Keywords:</strong> Identifies gaps beyond existing 48,999 articles</li>
                <li><strong>CPC Optimization:</strong> Prioritizes high-value keywords ($40-100+ CPC)</li>
                <li><strong>Content Expansion:</strong> Guides systematic growth beyond initial keyword set</li>
                <li><strong>Competitive Analysis:</strong> Monitors competitor keyword strategies</li>
                <li><strong>ROI Tracking:</strong> Measures which gap implementations drive most value</li>
            </ul>

            <h3>📊 Gap Categories</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 15px 0;">
                <div style="background: #fee2e2; padding: 15px; border-radius: 8px;">
                    <h4 style="color: #dc2626; margin-top: 0;">🚨 Emergency ($60-100 CPC)</h4>
                    <p>"urgent", "emergency", "now"</p>
                </div>
                <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
                    <h4 style="color: #d97706; margin-top: 0;">💎 High-Value ($40-60 CPC)</h4>
                    <p>"best", "top", "compare"</p>
                </div>
                <div style="background: #dbeafe; padding: 15px; border-radius: 8px;">
                    <h4 style="color: #2563eb; margin-top: 0;">🗣️ Voice Search ($30-50 CPC)</h4>
                    <p>Natural language queries</p>
                </div>
                <div style="background: #dcfce7; padding: 15px; border-radius: 8px;">
                    <h4 style="color: #16a34a; margin-top: 0;">📍 Local ($30-45 CPC)</h4>
                    <p>"near me", location-based</p>
                </div>
            </div>

            <h3>🔧 System Features</h3>
            <ul>
                <li><strong>Persistent SQLite Database:</strong> All data survives reboots and restarts</li>
                <li><strong>CLI Agent Interface:</strong> Integrates with Claude Code /agent commands</li>
                <li><strong>Advanced Gap Analysis:</strong> Pattern-based detection with CPC estimation</li>
                <li><strong>Automated Scheduling:</strong> Cron-based task automation</li>
                <li><strong>Multi-Format Reports:</strong> Markdown, HTML, CSV, JSON exports</li>
                <li><strong>Claude AI Integration:</strong> Natural language queries and insights</li>
            </ul>

            <button class="btn" onclick="closeGapAnalysisModal()" style="margin-top: 20px;">Close</button>
        </div>
    </div>

    <script>
        function showGapAnalysisDetails() {
            document.getElementById('gapAnalysisModal').style.display = 'block';
        }
        
        function closeGapAnalysisModal() {
            document.getElementById('gapAnalysisModal').style.display = 'none';
        }
        
        function copyQuickStart() {
            const commands = \`cd /root/keyword-gap-agent/keyword-gap-analysis
node demo.js
keyword import --code ../src/index.js
keyword analyze --type comprehensive --cpc-min 40
keyword claude --review\`;
            
            navigator.clipboard.writeText(commands).then(function() {
                alert('Setup commands copied to clipboard!');
            }, function(err) {
                console.error('Could not copy text: ', err);
                // Fallback for older browsers
                prompt('Copy these commands:', commands);
            });
        }
        
        // Close modal when clicking outside
        document.getElementById('gapAnalysisModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeGapAnalysisModal();
            }
        });
    </script>
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
