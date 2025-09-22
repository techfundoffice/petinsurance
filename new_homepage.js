// New public homepage function
function generatePublicHomePage() {
  const keywords = getAllKeywords();
  const totalArticles = keywords.length;
  
  const html = `<!DOCTYPE html>
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
    <title>Complete Pet Insurance Guide - ${totalArticles} Expert Articles</title>
    <meta name="description" content="Comprehensive pet insurance guide with ${totalArticles} expert articles covering cats, dogs, emergency care, and specialty veterinary services. Find the perfect coverage for your pet.">
    <meta name="keywords" content="pet insurance, cat insurance, dog insurance, veterinary care, pet health coverage">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8fafc;
        }
        
        /* Header Navigation */
        .header {
            background: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 70px;
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #4f46e5;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 30px;
            align-items: center;
        }
        
        .nav-link {
            text-decoration: none;
            color: #64748b;
            font-weight: 500;
            padding: 8px 16px;
            border-radius: 6px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .nav-link:hover {
            color: #4f46e5;
            background: #f1f5f9;
        }
        
        .admin-link {
            background: #4f46e5;
            color: white !important;
        }
        
        .admin-link:hover {
            background: #3730a3;
        }
        
        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 80px 20px;
            text-align: center;
        }
        
        .hero-container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            line-height: 1.2;
        }
        
        .hero p {
            font-size: 1.25rem;
            margin-bottom: 40px;
            opacity: 0.9;
        }
        
        .search-container {
            max-width: 600px;
            margin: 0 auto 40px;
            position: relative;
        }
        
        .search-input {
            width: 100%;
            padding: 16px 50px 16px 20px;
            font-size: 16px;
            border: none;
            border-radius: 50px;
            outline: none;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .search-btn {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            background: #4f46e5;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .cta-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s;
            border: 2px solid transparent;
        }
        
        .btn-primary {
            background: white;
            color: #4f46e5;
        }
        
        .btn-secondary {
            background: transparent;
            color: white;
            border-color: white;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        /* Stats Section */
        .stats {
            background: white;
            padding: 60px 20px;
        }
        
        .stats-container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
            text-align: center;
        }
        
        .stat-item {
            padding: 20px;
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: 700;
            color: #4f46e5;
            display: block;
        }
        
        .stat-label {
            font-size: 1.1rem;
            color: #64748b;
            margin-top: 8px;
        }
        
        /* Categories Section */
        .categories {
            padding: 80px 20px;
            background: #f8fafc;
        }
        
        .section-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .section-title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #1e293b;
        }
        
        .section-subtitle {
            text-align: center;
            font-size: 1.2rem;
            color: #64748b;
            margin-bottom: 60px;
        }
        
        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .category-card {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: all 0.3s;
            text-decoration: none;
            color: inherit;
        }
        
        .category-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        
        .category-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-bottom: 20px;
        }
        
        .category-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: #1e293b;
        }
        
        .category-count {
            color: #64748b;
            font-size: 0.9rem;
            margin-bottom: 15px;
        }
        
        .category-description {
            color: #64748b;
            line-height: 1.6;
        }
        
        /* Footer */
        .footer {
            background: #1e293b;
            color: white;
            padding: 60px 20px 30px;
        }
        
        .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
        }
        
        .footer-section h3 {
            font-size: 1.2rem;
            margin-bottom: 20px;
            color: white;
        }
        
        .footer-links {
            list-style: none;
        }
        
        .footer-links li {
            margin-bottom: 10px;
        }
        
        .footer-links a {
            color: #94a3b8;
            text-decoration: none;
            transition: color 0.2s;
        }
        
        .footer-links a:hover {
            color: white;
        }
        
        .footer-bottom {
            border-top: 1px solid #334155;
            margin-top: 40px;
            padding-top: 20px;
            text-align: center;
            color: #94a3b8;
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .cta-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .categories-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KPSXGQWC"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <!-- Header Navigation -->
    <header class="header">
        <div class="nav-container">
            <a href="/" class="logo">
                🐾 Pet Insurance Guide
            </a>
            <nav>
                <ul class="nav-menu">
                    <li><a href="/" class="nav-link">🏠 Home</a></li>
                    <li><a href="/categories" class="nav-link">🏷️ Categories</a></li>
                    <li><a href="/best-practices" class="nav-link">📚 Resources</a></li>
                    <li><a href="/seo-guidelines" class="nav-link">🛠️ Tools</a></li>
                    <li><a href="/admin" class="nav-link admin-link">👤 Admin</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-container">
            <h1>Complete Pet Insurance Guide</h1>
            <p>${totalArticles.toLocaleString()} comprehensive articles covering every aspect of pet insurance for cats, dogs, and specialty care</p>
            
            <div class="search-container">
                <input type="text" class="search-input" placeholder="Search all ${totalArticles.toLocaleString()} pet insurance topics..." id="searchInput">
                <button class="search-btn" onclick="performSearch()">🔍</button>
            </div>
            
            <div class="cta-buttons">
                <a href="/1" class="btn btn-primary">📖 Start Reading</a>
                <a href="/categories" class="btn btn-secondary">🏷️ Browse Categories</a>
                <a href="/admin" class="btn btn-secondary">📊 Admin Dashboard</a>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
        <div class="stats-container">
            <div class="stat-item">
                <span class="stat-number">${totalArticles.toLocaleString()}</span>
                <div class="stat-label">Expert Articles</div>
            </div>
            <div class="stat-item">
                <span class="stat-number">9</span>
                <div class="stat-label">Categories Covered</div>
            </div>
            <div class="stat-item">
                <span class="stat-number">100</span>
                <div class="stat-label">Cities Covered</div>
            </div>
            <div class="stat-item">
                <span class="stat-number">164</span>
                <div class="stat-label">Breeds Covered</div>
            </div>
        </div>
    </section>

    <!-- Categories Section -->
    <section class="categories">
        <div class="section-container">
            <h2 class="section-title">Explore Pet Insurance Categories</h2>
            <p class="section-subtitle">Find comprehensive coverage information for your specific needs</p>
            
            <div class="categories-grid">
                <a href="/category/cat-insurance" class="category-card">
                    <div class="category-icon" style="background: #fef2f2; color: #dc2626;">🐱</div>
                    <h3 class="category-title">Cat Insurance</h3>
                    <div class="category-count">200 articles</div>
                    <p class="category-description">Comprehensive coverage for feline health, from routine care to emergency treatments and breed-specific conditions.</p>
                </a>
                
                <a href="/category/dog-insurance" class="category-card">
                    <div class="category-icon" style="background: #f0f9ff; color: #0284c7;">🐕</div>
                    <h3 class="category-title">Dog Insurance</h3>
                    <div class="category-count">100 articles</div>
                    <p class="category-description">Complete dog insurance guides covering all breeds, sizes, and health conditions with expert recommendations.</p>
                </a>
                
                <a href="/category/emergency-care" class="category-card">
                    <div class="category-icon" style="background: #fef2f2; color: #dc2626;">🚨</div>
                    <h3 class="category-title">Emergency Care</h3>
                    <div class="category-count">Premium coverage</div>
                    <p class="category-description">Critical emergency veterinary services, 24/7 care options, and high-cost procedure coverage.</p>
                </a>
                
                <a href="/category/specialty-care" class="category-card">
                    <div class="category-icon" style="background: #f3e8ff; color: #7c3aed;">⚕️</div>
                    <h3 class="category-title">Specialty Medicine</h3>
                    <div class="category-count">Advanced treatments</div>
                    <p class="category-description">Oncology, cardiology, neurology, and other specialized veterinary services with detailed coverage analysis.</p>
                </a>
                
                <a href="/category/surgery" class="category-card">
                    <div class="category-icon" style="background: #fff7ed; color: #ea580c;">🏥</div>
                    <h3 class="category-title">Surgery Coverage</h3>
                    <div class="category-count">Surgical procedures</div>
                    <p class="category-description">Comprehensive surgical coverage including orthopedic, soft tissue, and emergency surgical procedures.</p>
                </a>
                
                <a href="/best-practices" class="category-card">
                    <div class="category-icon" style="background: #f0fdf4; color: #16a34a;">📋</div>
                    <h3 class="category-title">Best Practices</h3>
                    <div class="category-count">Expert guidance</div>
                    <p class="category-description">Industry best practices, choosing the right coverage, and maximizing your pet insurance benefits.</p>
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-section">
                <h3>Pet Insurance Guide</h3>
                <p>Your comprehensive resource for pet insurance information, covering ${totalArticles.toLocaleString()} topics across all aspects of pet health coverage.</p>
            </div>
            
            <div class="footer-section">
                <h3>Categories</h3>
                <ul class="footer-links">
                    <li><a href="/category/cat-insurance">Cat Insurance</a></li>
                    <li><a href="/category/dog-insurance">Dog Insurance</a></li>
                    <li><a href="/category/emergency-care">Emergency Care</a></li>
                    <li><a href="/category/specialty-care">Specialty Medicine</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Resources</h3>
                <ul class="footer-links">
                    <li><a href="/best-practices">Best Practices</a></li>
                    <li><a href="/seo-guidelines">SEO Guidelines</a></li>
                    <li><a href="/sitemap.xml">Sitemap</a></li>
                    <li><a href="/admin">Admin Dashboard</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Tools</h3>
                <ul class="footer-links">
                    <li><a href="/">Search Articles</a></li>
                    <li><a href="/categories">Browse Categories</a></li>
                    <li><a href="/1">Start Reading</a></li>
                    <li><a href="/admin">Analytics</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2025 Pet Insurance Guide. Comprehensive coverage information for informed pet owners.</p>
        </div>
    </footer>

    <script>
        function performSearch() {
            const query = document.getElementById('searchInput').value.trim();
            if (query) {
                // Simple search - redirect to first result or search page
                window.location.href = '/1?search=' + encodeURIComponent(query);
            }
        }
        
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=3600'
    },
  });
}
