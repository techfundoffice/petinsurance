# Hamburger Menu Implementation Plan

## Overview
Add a hamburger menu to the top-left corner of the million-pages homepage with cat-themed navigation categories.

## Menu Categories
1. Cat Home & Cat Garden
2. Cat Kitchen  
3. Cat Health & Cat Lifestyle
4. Cat Tech
5. Cat Baby & Cat Kid
6. Cat Style
7. Cat Gifts
8. Cat Podcast
9. Cat Deals

## Implementation Steps

### Step 1: Update HTML Structure
- Add hamburger icon button in top-left corner
- Create off-canvas menu container
- Add navigation links for each category

### Step 2: CSS Styling
```css
/* Hamburger Icon */
.hamburger-menu {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  cursor: pointer;
}

/* Off-canvas Menu */
.nav-menu {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  transition: left 0.3s ease;
  z-index: 999;
  overflow-y: auto;
}

.nav-menu.active {
  left: 0;
}

/* Menu Categories */
.nav-menu ul {
  list-style: none;
  padding: 80px 20px 20px;
  margin: 0;
}

.nav-menu li {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.nav-menu a {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  display: block;
  padding: 10px 0;
  transition: color 0.2s;
}

.nav-menu a:hover {
  color: #0066cc;
}
```

### Step 3: JavaScript Functionality
```javascript
// Toggle menu functionality
function initHamburgerMenu() {
  const menuButton = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.menu-overlay');
  
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  overlay.addEventListener('click', () => {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}
```

### Step 4: HTML Template
```html
<!-- Hamburger Button -->
<button class="hamburger-menu" aria-label="Menu">
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </svg>
</button>

<!-- Navigation Menu -->
<nav class="nav-menu">
  <ul>
    <li><a href="/cat-home-garden">Cat Home & Cat Garden</a></li>
    <li><a href="/cat-kitchen">Cat Kitchen</a></li>
    <li><a href="/cat-health-lifestyle">Cat Health & Cat Lifestyle</a></li>
    <li><a href="/cat-tech">Cat Tech</a></li>
    <li><a href="/cat-baby-kid">Cat Baby & Cat Kid</a></li>
    <li><a href="/cat-style">Cat Style</a></li>
    <li><a href="/cat-gifts">Cat Gifts</a></li>
    <li><a href="/cat-podcast">Cat Podcast</a></li>
    <li><a href="/cat-deals">Cat Deals</a></li>
  </ul>
</nav>

<!-- Overlay -->
<div class="menu-overlay"></div>
```

### Step 5: Integration Points
1. Modify `generateHomePage()` function to include menu HTML
2. Add CSS to inline styles in page template
3. Add JavaScript initialization to page load
4. Ensure mobile responsiveness
5. Test across browsers

### Step 6: URL Routing
Since these are new categories not in the original pet insurance focus:
- Option A: Create placeholder pages with "Coming Soon" content
- Option B: Redirect to related pet insurance categories
- Option C: Generate new content for each category using the existing content generator

### Step 7: Testing Checklist
- [ ] Menu opens/closes smoothly
- [ ] Links are clickable
- [ ] Overlay prevents page interaction when menu is open
- [ ] Menu is accessible via keyboard
- [ ] Works on mobile devices
- [ ] No layout conflicts with existing content
- [ ] Page performance not impacted

## Deployment
1. Update `src/index.js` with menu code
2. Test locally with `npm run dev`
3. Deploy with `npm run deploy`
4. Verify on production URL