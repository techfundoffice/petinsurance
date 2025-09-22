# Wirecutter-Style Hamburger Menu Implementation

## Wirecutter Menu Analysis

### Visual Characteristics
- **Icon**: Three horizontal lines (18x15px)
- **Position**: Fixed top-left at 20px from edges
- **Color**: Dark gray/black (#121212)
- **Background**: Transparent, no visible button border
- **Hover**: Subtle opacity change

### Menu Panel Design
- **Width**: 320px (mobile) / 375px (desktop)
- **Background**: Pure white (#FFFFFF)
- **Box Shadow**: 0 2px 8px rgba(0,0,0,0.15)
- **Animation**: Slides from left with 300ms ease-out
- **Overlay**: Semi-transparent black (rgba(0,0,0,0.4))

### Typography & Spacing
- **Font**: System font stack (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
- **Category Font Size**: 16px
- **Line Height**: 1.5
- **Padding**: 20px horizontal, 16px vertical per item
- **Border**: 1px solid #E2E2E2 between items

### Color Palette
- **Text**: #121212 (primary black)
- **Links**: #326891 (Wirecutter blue)
- **Hover**: #265073 (darker blue)
- **Borders**: #E2E2E2 (light gray)
- **Close Button**: #666666

## Implementation Code

### HTML Structure
```html
<!-- Hamburger Button -->
<button class="wc-hamburger" aria-label="Menu" aria-expanded="false">
  <svg width="18" height="15" viewBox="0 0 18 15" fill="none">
    <path d="M0 0H18V2H0V0Z" fill="currentColor"/>
    <path d="M0 6.5H18V8.5H0V6.5Z" fill="currentColor"/>
    <path d="M0 13H18V15H0V13Z" fill="currentColor"/>
  </svg>
</button>

<!-- Off-Canvas Menu -->
<div class="wc-menu-overlay" aria-hidden="true"></div>
<nav class="wc-nav-menu" aria-label="Main navigation">
  <div class="wc-menu-header">
    <button class="wc-menu-close" aria-label="Close menu">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
      </svg>
    </button>
  </div>
  
  <ul class="wc-menu-list">
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
```

### CSS Styling (Wirecutter Clone)
```css
/* Base Typography */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Hamburger Button */
.wc-hamburger {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #121212;
  transition: opacity 0.2s ease;
}

.wc-hamburger:hover {
  opacity: 0.7;
}

.wc-hamburger:focus {
  outline: 2px solid #326891;
  outline-offset: 2px;
}

/* Menu Overlay */
.wc-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 998;
}

.wc-menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Navigation Menu */
.wc-nav-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  max-width: 90vw;
  height: 100vh;
  background: #ffffff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  overflow-y: auto;
}

.wc-nav-menu.active {
  transform: translateX(0);
}

/* Menu Header */
.wc-menu-header {
  padding: 20px;
  border-bottom: 1px solid #e2e2e2;
}

.wc-menu-close {
  background: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #666666;
  margin-left: auto;
  display: block;
  transition: color 0.2s ease;
}

.wc-menu-close:hover {
  color: #121212;
}

/* Menu List */
.wc-menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.wc-menu-list li {
  border-bottom: 1px solid #e2e2e2;
}

.wc-menu-list a {
  display: block;
  padding: 16px 20px;
  color: #121212;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.wc-menu-list a:hover {
  background-color: #f8f8f8;
  color: #326891;
}

.wc-menu-list a:focus {
  outline: 2px solid #326891;
  outline-offset: -2px;
}

/* Desktop Adjustments */
@media (min-width: 768px) {
  .wc-nav-menu {
    width: 375px;
  }
  
  .wc-menu-list a {
    padding: 20px 24px;
  }
}

/* Accessibility */
.wc-nav-menu[aria-hidden="true"] {
  pointer-events: none;
}

/* Prevent body scroll when menu is open */
body.menu-open {
  overflow: hidden;
}
```

### JavaScript Functionality
```javascript
function initWirecutterMenu() {
  const hamburger = document.querySelector('.wc-hamburger');
  const menu = document.querySelector('.wc-nav-menu');
  const overlay = document.querySelector('.wc-menu-overlay');
  const closeBtn = document.querySelector('.wc-menu-close');
  const menuLinks = document.querySelectorAll('.wc-menu-list a');
  
  let isOpen = false;
  
  function openMenu() {
    isOpen = true;
    menu.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    
    // Focus management
    setTimeout(() => closeBtn.focus(), 300);
  }
  
  function closeMenu() {
    isOpen = false;
    menu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    
    // Return focus to hamburger
    hamburger.focus();
  }
  
  // Event listeners
  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });
  
  // Trap focus within menu
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && isOpen) {
      const focusableElements = menu.querySelectorAll('button, a');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
  
  // Handle menu link clicks
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initWirecutterMenu);
```

## Integration with Million Pages

### Modified generateHomePage function
```javascript
function generateHomePage() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pet Insurance Guide - Million Pages</title>
      <style>
        /* Include all Wirecutter menu styles here */
        ${wirecutterMenuCSS}
        
        /* Adjust main content to account for fixed hamburger */
        main {
          padding-top: 60px;
        }
      </style>
    </head>
    <body>
      <!-- Wirecutter Menu -->
      ${wirecutterMenuHTML}
      
      <!-- Main Content -->
      <main>
        <!-- Existing homepage content -->
      </main>
      
      <script>
        ${wirecutterMenuJS}
      </script>
    </body>
    </html>
  `;
}
```

## Key Wirecutter Features to Implement

1. **Smooth Animations**: Use cubic-bezier for natural movement
2. **Focus Management**: Proper keyboard navigation and focus trapping
3. **Accessibility**: ARIA labels, expanded states, and screen reader support
4. **Responsive**: Adapts width for mobile/desktop
5. **Clean Design**: Minimal borders, subtle shadows, plenty of whitespace
6. **Performance**: CSS transforms for hardware acceleration