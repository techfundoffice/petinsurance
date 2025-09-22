# Production-Ready Wirecutter Hamburger Menu Implementation

## Complete Implementation Checklist

### Pre-Implementation Requirements
- [ ] Audit current CSS to prevent conflicts
- [ ] Backup current index.js and test deployment
- [ ] Create feature flag for gradual rollout
- [ ] Set up A/B testing infrastructure
- [ ] Document rollback procedure

## 1. Enhanced HTML Structure with SEO & Accessibility

```html
<!-- Hamburger Button with Multiple States -->
<button class="wc-hamburger" 
        aria-label="Open navigation menu" 
        aria-expanded="false"
        aria-controls="wc-nav-menu"
        data-menu-trigger>
  <span class="wc-hamburger-box">
    <span class="wc-hamburger-inner"></span>
  </span>
  <span class="visually-hidden">Menu</span>
</button>

<!-- Skip to Main Content Link -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Enhanced Navigation Menu -->
<nav id="wc-nav-menu" 
     class="wc-nav-menu" 
     role="navigation"
     aria-label="Main navigation"
     aria-hidden="true"
     data-menu-panel>
  
  <!-- Menu Header with Branding -->
  <div class="wc-menu-header">
    <a href="/" class="wc-menu-logo" aria-label="Pet Insurance Guide Home">
      <svg class="logo-icon" width="32" height="32" viewBox="0 0 32 32">
        <!-- Cat paw logo -->
        <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z" fill="#326891"/>
      </svg>
      <span class="logo-text">Pet Insurance Guide</span>
    </a>
    <button class="wc-menu-close" 
            aria-label="Close navigation menu"
            data-menu-close>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>
  </div>
  
  <!-- Primary Navigation -->
  <div class="wc-menu-body" role="group" aria-label="Primary navigation">
    <ul class="wc-menu-list" role="list">
      <li role="none">
        <a href="/cat-home-garden" 
           class="wc-menu-link"
           data-category="cat-home-garden"
           data-menu-item="1">
          <span class="wc-menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 2l2.39 4.84L18 7.62l-4 3.9.94 5.48L10 14.41 5.06 17l.94-5.48-4-3.9 5.61-.78z"/>
            </svg>
          </span>
          <span class="wc-menu-text">Cat Home & Cat Garden</span>
          <span class="wc-menu-badge">New</span>
        </a>
      </li>
      <li role="none">
        <a href="/cat-kitchen" 
           class="wc-menu-link"
           data-category="cat-kitchen"
           data-menu-item="2">
          <span class="wc-menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M18 3H2v2h16V3zm-2 5H4v2h12V8zm-3 5H7v2h6v-2z"/>
            </svg>
          </span>
          <span class="wc-menu-text">Cat Kitchen</span>
        </a>
      </li>
      <li role="none">
        <a href="/cat-health-lifestyle" 
           class="wc-menu-link"
           data-category="cat-health-lifestyle"
           data-menu-item="3">
          <span class="wc-menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 4.5c3 0 5.5 2.5 5.5 5.5s-2.5 5.5-5.5 5.5S4.5 13 4.5 10 7 4.5 10 4.5z"/>
            </svg>
          </span>
          <span class="wc-menu-text">Cat Health & Cat Lifestyle</span>
          <span class="wc-menu-count">42</span>
        </a>
      </li>
      <!-- Remaining items... -->
    </ul>
  </div>
  
  <!-- Secondary Navigation -->
  <div class="wc-menu-footer" role="group" aria-label="Secondary navigation">
    <a href="/about" class="wc-menu-footer-link">About</a>
    <a href="/contact" class="wc-menu-footer-link">Contact</a>
    <a href="/privacy" class="wc-menu-footer-link">Privacy Policy</a>
  </div>
</nav>

<!-- Overlay with Loading State -->
<div class="wc-menu-overlay" 
     data-menu-overlay
     aria-hidden="true">
  <div class="wc-menu-spinner" aria-label="Loading">
    <span></span><span></span><span></span>
  </div>
</div>
```

## 2. Complete CSS with All States & Edge Cases

```css
/* CSS Custom Properties for Easy Theming */
:root {
  --wc-color-primary: #326891;
  --wc-color-primary-dark: #265073;
  --wc-color-text: #121212;
  --wc-color-text-secondary: #666666;
  --wc-color-border: #e2e2e2;
  --wc-color-bg: #ffffff;
  --wc-color-bg-hover: #f8f8f8;
  --wc-shadow-menu: 0 2px 8px rgba(0, 0, 0, 0.15);
  --wc-transition-speed: 300ms;
  --wc-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --wc-menu-width: 320px;
  --wc-menu-width-desktop: 375px;
  --wc-z-hamburger: 1001;
  --wc-z-menu: 999;
  --wc-z-overlay: 998;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --wc-color-text: #ffffff;
    --wc-color-bg: #1a1a1a;
    --wc-color-border: #333333;
    --wc-color-bg-hover: #2a2a2a;
  }
}

/* Utility Classes */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--wc-color-primary);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 0 0 4px 0;
  z-index: 9999;
}

.skip-link:focus {
  top: 0;
}

/* Hamburger Button - Enhanced */
.wc-hamburger {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: var(--wc-z-hamburger);
  background: transparent;
  border: 2px solid transparent;
  padding: 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: all var(--wc-transition-speed) var(--wc-transition-easing);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.wc-hamburger:hover {
  background-color: rgba(50, 104, 145, 0.1);
}

.wc-hamburger:focus {
  outline: none;
  border-color: var(--wc-color-primary);
}

.wc-hamburger:active {
  transform: scale(0.95);
}

/* Animated Hamburger Icon */
.wc-hamburger-box {
  width: 18px;
  height: 15px;
  display: inline-block;
  position: relative;
}

.wc-hamburger-inner,
.wc-hamburger-inner::before,
.wc-hamburger-inner::after {
  width: 18px;
  height: 2px;
  background-color: var(--wc-color-text);
  border-radius: 2px;
  position: absolute;
  transition: transform 0.15s ease;
}

.wc-hamburger-inner {
  top: 50%;
  transform: translateY(-50%);
}

.wc-hamburger-inner::before {
  content: '';
  top: -6px;
}

.wc-hamburger-inner::after {
  content: '';
  bottom: -6px;
}

/* Hamburger Animation When Menu is Open */
.wc-hamburger[aria-expanded="true"] .wc-hamburger-inner {
  transform: rotate(45deg);
}

.wc-hamburger[aria-expanded="true"] .wc-hamburger-inner::before {
  top: 0;
  transform: rotate(90deg);
}

.wc-hamburger[aria-expanded="true"] .wc-hamburger-inner::after {
  bottom: 0;
  transform: rotate(90deg);
  opacity: 0;
}

/* Menu Container */
.wc-nav-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--wc-menu-width);
  max-width: 90vw;
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height for mobile */
  background: var(--wc-color-bg);
  box-shadow: var(--wc-shadow-menu);
  transform: translateX(-100%);
  transition: transform var(--wc-transition-speed) var(--wc-transition-easing);
  z-index: var(--wc-z-menu);
  display: flex;
  flex-direction: column;
  overscroll-behavior: contain;
}

.wc-nav-menu.active {
  transform: translateX(0);
}

/* Prevent iOS bounce */
.wc-nav-menu::before {
  content: '';
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  height: 50px;
  background: var(--wc-color-bg);
}

/* Menu Header */
.wc-menu-header {
  padding: 20px;
  border-bottom: 1px solid var(--wc-color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.wc-menu-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--wc-color-text);
  font-weight: 600;
  font-size: 18px;
}

.wc-menu-close {
  background: transparent;
  border: 2px solid transparent;
  padding: 8px;
  cursor: pointer;
  color: var(--wc-color-text-secondary);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.wc-menu-close:hover {
  background-color: var(--wc-color-bg-hover);
  color: var(--wc-color-text);
}

.wc-menu-close:focus {
  outline: none;
  border-color: var(--wc-color-primary);
}

/* Menu Body */
.wc-menu-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

/* Scroll Shadow */
.wc-menu-body::before,
.wc-menu-body::after {
  content: '';
  position: sticky;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), transparent);
  z-index: 1;
}

.wc-menu-body::before {
  top: 0;
}

.wc-menu-body::after {
  bottom: 0;
  transform: rotate(180deg);
}

/* Menu List */
.wc-menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.wc-menu-list li {
  border-bottom: 1px solid var(--wc-color-border);
}

/* Menu Links */
.wc-menu-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  color: var(--wc-color-text);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  transition: all 0.2s ease;
  position: relative;
}

.wc-menu-link:hover {
  background-color: var(--wc-color-bg-hover);
  color: var(--wc-color-primary);
  padding-left: 24px;
}

.wc-menu-link:focus {
  outline: 2px solid var(--wc-color-primary);
  outline-offset: -2px;
  z-index: 1;
}

/* Menu Icons */
.wc-menu-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  opacity: 0.7;
}

.wc-menu-link:hover .wc-menu-icon {
  opacity: 1;
}

/* Menu Text */
.wc-menu-text {
  flex: 1;
}

/* Menu Badge */
.wc-menu-badge {
  background: #ff4757;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  text-transform: uppercase;
}

/* Menu Count */
.wc-menu-count {
  background: var(--wc-color-border);
  color: var(--wc-color-text-secondary);
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
}

/* Menu Footer */
.wc-menu-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--wc-color-border);
  display: flex;
  gap: 16px;
  flex-shrink: 0;
}

.wc-menu-footer-link {
  color: var(--wc-color-text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.wc-menu-footer-link:hover {
  color: var(--wc-color-primary);
  text-decoration: underline;
}

/* Overlay */
.wc-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  opacity: 0;
  visibility: hidden;
  transition: all var(--wc-transition-speed) ease;
  z-index: var(--wc-z-overlay);
  cursor: pointer;
  backdrop-filter: blur(0px);
}

.wc-menu-overlay.active {
  background: rgba(0, 0, 0, 0.4);
  opacity: 1;
  visibility: visible;
  backdrop-filter: blur(2px);
}

/* Loading Spinner */
.wc-menu-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
}

.wc-menu-overlay.loading .wc-menu-spinner {
  display: flex;
  gap: 4px;
}

.wc-menu-spinner span {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: wc-pulse 1.4s ease-in-out infinite both;
}

.wc-menu-spinner span:nth-child(1) {
  animation-delay: -0.32s;
}

.wc-menu-spinner span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes wc-pulse {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Body State */
body.menu-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}

/* Desktop Adjustments */
@media (min-width: 768px) {
  .wc-nav-menu {
    width: var(--wc-menu-width-desktop);
  }
  
  .wc-menu-link {
    padding: 20px 24px;
  }
  
  .wc-menu-link:hover {
    padding-left: 28px;
  }
}

/* Print Styles */
@media print {
  .wc-hamburger,
  .wc-nav-menu,
  .wc-menu-overlay {
    display: none !important;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .wc-hamburger:focus,
  .wc-menu-close:focus {
    outline: 3px solid;
  }
  
  .wc-menu-link:focus {
    outline: 3px solid;
    outline-offset: 0;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 3. Production JavaScript with Error Handling & Analytics

```javascript
class WirecutterMenu {
  constructor() {
    this.state = {
      isOpen: false,
      isAnimating: false,
      lastFocusedElement: null,
      touchStartX: 0,
      touchStartY: 0
    };
    
    this.config = {
      menuWidth: 320,
      swipeThreshold: 50,
      animationDuration: 300,
      focusableSelectors: 'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    };
    
    this.elements = {};
    this.init();
  }
  
  init() {
    try {
      this.cacheElements();
      this.bindEvents();
      this.setupA11y();
      this.trackInitialization();
    } catch (error) {
      console.error('WirecutterMenu initialization failed:', error);
      this.fallbackMode();
    }
  }
  
  cacheElements() {
    const selectors = {
      hamburger: '.wc-hamburger',
      menu: '.wc-nav-menu',
      overlay: '.wc-menu-overlay',
      closeBtn: '.wc-menu-close',
      menuLinks: '.wc-menu-link',
      menuBody: '.wc-menu-body'
    };
    
    for (const [key, selector] of Object.entries(selectors)) {
      const element = document.querySelector(selector);
      if (!element && key !== 'menuLinks') {
        throw new Error(`Required element not found: ${selector}`);
      }
      this.elements[key] = key === 'menuLinks' 
        ? document.querySelectorAll(selector) 
        : element;
    }
  }
  
  bindEvents() {
    // Click events
    this.elements.hamburger.addEventListener('click', () => this.open());
    this.elements.closeBtn.addEventListener('click', () => this.close());
    this.elements.overlay.addEventListener('click', () => this.close());
    
    // Keyboard events
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // Touch events for swipe gestures
    this.elements.menu.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.elements.menu.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    
    // Menu link clicks
    this.elements.menuLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleLinkClick(e, link));
    });
    
    // Prevent body scroll on iOS
    this.elements.menu.addEventListener('touchmove', (e) => {
      if (this.elements.menuBody.scrollHeight <= this.elements.menuBody.clientHeight) {
        e.preventDefault();
      }
    });
    
    // Handle focus trap
    this.elements.menu.addEventListener('focusout', this.handleFocusOut.bind(this));
  }
  
  setupA11y() {
    // Set initial ARIA states
    this.elements.menu.setAttribute('aria-hidden', 'true');
    this.elements.overlay.setAttribute('aria-hidden', 'true');
    
    // Add live region for screen reader announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'visually-hidden';
    liveRegion.id = 'menu-announcer';
    document.body.appendChild(liveRegion);
    this.elements.announcer = liveRegion;
  }
  
  open() {
    if (this.state.isOpen || this.state.isAnimating) return;
    
    this.state.isAnimating = true;
    this.state.lastFocusedElement = document.activeElement;
    
    // Update state
    this.state.isOpen = true;
    
    // Update DOM
    requestAnimationFrame(() => {
      this.elements.menu.classList.add('active');
      this.elements.overlay.classList.add('active');
      document.body.classList.add('menu-open');
      
      // Update ARIA
      this.elements.hamburger.setAttribute('aria-expanded', 'true');
      this.elements.menu.setAttribute('aria-hidden', 'false');
      this.elements.overlay.setAttribute('aria-hidden', 'false');
      
      // Announce to screen readers
      this.announce('Navigation menu opened');
      
      // Focus management
      setTimeout(() => {
        this.elements.closeBtn.focus();
        this.state.isAnimating = false;
      }, this.config.animationDuration);
      
      // Track analytics
      this.trackEvent('menu_open');
    });
  }
  
  close() {
    if (!this.state.isOpen || this.state.isAnimating) return;
    
    this.state.isAnimating = true;
    this.state.isOpen = false;
    
    // Update DOM
    requestAnimationFrame(() => {
      this.elements.menu.classList.remove('active');
      this.elements.overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      
      // Update ARIA
      this.elements.hamburger.setAttribute('aria-expanded', 'false');
      this.elements.menu.setAttribute('aria-hidden', 'true');
      this.elements.overlay.setAttribute('aria-hidden', 'true');
      
      // Announce to screen readers
      this.announce('Navigation menu closed');
      
      // Restore focus
      setTimeout(() => {
        if (this.state.lastFocusedElement) {
          this.state.lastFocusedElement.focus();
        }
        this.state.isAnimating = false;
      }, this.config.animationDuration);
      
      // Track analytics
      this.trackEvent('menu_close');
    });
  }
  
  handleKeyDown(e) {
    if (!this.state.isOpen) return;
    
    switch(e.key) {
      case 'Escape':
        this.close();
        break;
      case 'Tab':
        this.handleTab(e);
        break;
    }
  }
  
  handleTab(e) {
    const focusableElements = this.elements.menu.querySelectorAll(this.config.focusableSelectors);
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
  
  handleFocusOut(e) {
    // Ensure focus stays within menu when open
    if (this.state.isOpen && !this.elements.menu.contains(e.relatedTarget)) {
      e.preventDefault();
      this.elements.closeBtn.focus();
    }
  }
  
  handleTouchStart(e) {
    this.state.touchStartX = e.touches[0].clientX;
    this.state.touchStartY = e.touches[0].clientY;
  }
  
  handleTouchMove(e) {
    if (!this.state.touchStartX || !this.state.touchStartY) return;
    
    const xDiff = this.state.touchStartX - e.touches[0].clientX;
    const yDiff = this.state.touchStartY - e.touches[0].clientY;
    
    // Only handle horizontal swipes
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff < -this.config.swipeThreshold) {
        this.close();
        this.state.touchStartX = 0;
        this.state.touchStartY = 0;
      }
    }
  }
  
  handleLinkClick(e, link) {
    const category = link.dataset.category;
    const menuItem = link.dataset.menuItem;
    
    // Track analytics
    this.trackEvent('menu_link_click', {
      category: category,
      menu_item: menuItem,
      url: link.href
    });
    
    // Close menu after navigation
    this.close();
  }
  
  announce(message) {
    if (this.elements.announcer) {
      this.elements.announcer.textContent = message;
      setTimeout(() => {
        this.elements.announcer.textContent = '';
      }, 1000);
    }
  }
  
  trackEvent(eventName, data = {}) {
    try {
      // Send to analytics endpoint
      if (window.analytics && typeof window.analytics.track === 'function') {
        window.analytics.track(eventName, {
          ...data,
          timestamp: new Date().toISOString(),
          menu_type: 'hamburger',
          viewport_width: window.innerWidth,
          viewport_height: window.innerHeight
        });
      }
      
      // Also send to internal analytics
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventName,
          data: data,
          timestamp: Date.now()
        })
      }).catch(() => {
        // Silently fail analytics
      });
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }
  
  trackInitialization() {
    this.trackEvent('menu_initialized', {
      has_touch: 'ontouchstart' in window,
      screen_reader: this.isScreenReaderActive(),
      reduced_motion: this.prefersReducedMotion()
    });
  }
  
  isScreenReaderActive() {
    // Basic heuristic - not 100% accurate
    return document.body.classList.contains('using-screen-reader') ||
           window.navigator.userAgent.includes('NVDA') ||
           window.navigator.userAgent.includes('JAWS');
  }
  
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  fallbackMode() {
    // Graceful degradation for when JavaScript fails
    const style = document.createElement('style');
    style.textContent = `
      .wc-hamburger { display: none; }
      .wc-nav-menu { 
        position: static; 
        transform: none; 
        width: 100%; 
        height: auto;
        box-shadow: none;
      }
      .wc-menu-overlay { display: none; }
    `;
    document.head.appendChild(style);
  }
  
  destroy() {
    // Clean up for SPA navigation
    this.elements.hamburger.removeEventListener('click', () => this.open());
    this.elements.closeBtn.removeEventListener('click', () => this.close());
    document.removeEventListener('keydown', this.handleKeyDown);
    
    if (this.elements.announcer) {
      this.elements.announcer.remove();
    }
    
    this.state.isOpen = false;
    document.body.classList.remove('menu-open');
  }
}

// Initialize with error boundary
document.addEventListener('DOMContentLoaded', () => {
  try {
    window.wirecutterMenu = new WirecutterMenu();
  } catch (error) {
    console.error('Failed to initialize menu:', error);
    // Optionally show a fallback UI
  }
});

// Handle SPA navigation
window.addEventListener('popstate', () => {
  if (window.wirecutterMenu && window.wirecutterMenu.state.isOpen) {
    window.wirecutterMenu.close();
  }
});
```

## 4. Integration with Cloudflare Workers

```javascript
// Add to your index.js
import { menuHTML, menuCSS, menuJS } from './wirecutter-menu-assets.js';

function generatePageWithMenu(content, pageNumber, keyword) {
  const isHomePage = pageNumber === 0;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${keyword} - Comprehensive guide">
    <title>${keyword} - Pet Insurance Guide</title>
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/fonts/system-ui.woff2" as="font" type="font/woff2" crossorigin>
    
    <!-- Inline critical CSS -->
    <style>
      /* Inline only above-the-fold critical CSS */
      ${getCriticalCSS()}
    </style>
    
    <!-- Load full CSS -->
    <style>
      ${menuCSS}
      ${getPageCSS()}
    </style>
    
    <!-- DNS Prefetch for analytics -->
    <link rel="dns-prefetch" href="https://analytics.petinsurance.com">
</head>
<body>
    <!-- Skip Link -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Hamburger Menu -->
    ${menuHTML}
    
    <!-- Main Content -->
    <main id="main-content" role="main">
        ${content}
    </main>
    
    <!-- Load JavaScript -->
    <script>
      ${menuJS}
      
      // Page-specific initialization
      document.addEventListener('DOMContentLoaded', function() {
        // Track page view
        if (window.analytics) {
          window.analytics.page('${keyword}', {
            page_number: ${pageNumber},
            is_home: ${isHomePage}
          });
        }
      });
    </script>
    
    <!-- A/B Testing -->
    ${isHomePage ? getABTestingScript() : ''}
</body>
</html>`;
}

// Critical CSS extraction
function getCriticalCSS() {
  return `
    /* Above-the-fold styles only */
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto; }
    .wc-hamburger { position: fixed; top: 20px; left: 20px; }
    main { padding: 80px 20px 20px; max-width: 800px; margin: 0 auto; }
  `;
}

// A/B Testing Script
function getABTestingScript() {
  return `
    <script>
      // Simple A/B test for menu variations
      const testVariant = Math.random() < 0.5 ? 'control' : 'variant';
      document.body.setAttribute('data-menu-test', testVariant);
      
      if (testVariant === 'variant') {
        // Apply variant changes
        document.querySelector('.wc-hamburger').style.backgroundColor = 'rgba(50, 104, 145, 0.1)';
      }
      
      // Track variant
      window.addEventListener('load', () => {
        if (window.analytics) {
          window.analytics.track('ab_test_view', {
            test_name: 'hamburger_menu_color',
            variant: testVariant
          });
        }
      });
    </script>
  `;
}

// Export for use in worker
export function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Handle analytics endpoint
  if (path === '/api/analytics' && request.method === 'POST') {
    return handleAnalytics(request);
  }
  
  // Generate page with menu
  const pageNumber = getPageNumber(path);
  const keyword = getKeyword(pageNumber);
  const content = generateContent(keyword, pageNumber);
  const html = generatePageWithMenu(content, pageNumber, keyword);
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
    }
  });
}
```

## 5. Testing & Quality Assurance

### Automated Tests
```javascript
// tests/menu.test.js
describe('WirecutterMenu', () => {
  beforeEach(() => {
    document.body.innerHTML = menuHTML;
    new WirecutterMenu();
  });
  
  test('opens on hamburger click', () => {
    const hamburger = document.querySelector('.wc-hamburger');
    const menu = document.querySelector('.wc-nav-menu');
    
    hamburger.click();
    
    expect(menu.classList.contains('active')).toBe(true);
    expect(hamburger.getAttribute('aria-expanded')).toBe('true');
  });
  
  test('closes on escape key', () => {
    const menu = document.querySelector('.wc-nav-menu');
    
    // Open menu
    document.querySelector('.wc-hamburger').click();
    
    // Press escape
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);
    
    expect(menu.classList.contains('active')).toBe(false);
  });
  
  test('traps focus within menu', () => {
    // Test tab navigation
  });
  
  test('handles touch gestures', () => {
    // Test swipe to close
  });
});
```

### Manual Testing Checklist
- [ ] Menu opens/closes smoothly on all devices
- [ ] Keyboard navigation works correctly
- [ ] Screen reader announcements are clear
- [ ] Touch gestures work on mobile
- [ ] Menu works with JavaScript disabled
- [ ] Performance metrics meet targets
- [ ] Analytics events fire correctly
- [ ] A/B testing variants display properly
- [ ] Menu works in all supported browsers
- [ ] RTL layout support (if needed)

## 6. Performance Optimization

### Bundle Size Budget
- CSS: < 10KB (minified + gzipped)
- JavaScript: < 5KB (minified + gzipped)
- Total impact on FCP: < 50ms

### Loading Strategy
1. Inline critical CSS in <head>
2. Load full CSS asynchronously
3. Defer JavaScript loading
4. Use passive event listeners
5. Implement intersection observer for lazy loading

## 7. Monitoring & Analytics

### Key Metrics to Track
- Menu open rate
- Average time menu stays open
- Most clicked categories
- Bounce rate after menu interaction
- Performance impact on Core Web Vitals

### Error Tracking
```javascript
window.addEventListener('error', (e) => {
  if (e.filename && e.filename.includes('menu')) {
    // Log to error tracking service
    trackError({
      message: e.message,
      stack: e.error?.stack,
      type: 'menu_error'
    });
  }
});
```

## 8. Rollout Strategy

### Phase 1: Internal Testing (Week 1)
- Deploy to staging environment
- Internal team testing
- Fix critical bugs

### Phase 2: Beta Release (Week 2)
- 5% of traffic with feature flag
- Monitor metrics closely
- Gather user feedback

### Phase 3: Gradual Rollout (Week 3-4)
- Increase to 25%, 50%, 75%
- A/B test variations
- Optimize based on data

### Phase 4: Full Launch (Week 5)
- 100% deployment
- Remove feature flags
- Document learnings

## 9. Rollback Plan

### Quick Rollback
```javascript
// Feature flag in worker
const MENU_ENABLED = false; // Set to false to disable

if (MENU_ENABLED) {
  // Include menu
} else {
  // Original navigation
}
```

### Full Rollback Steps
1. Set feature flag to false
2. Deploy immediately
3. Clear CDN cache
4. Monitor for issues
5. Investigate root cause

## 10. Documentation

### For Developers
- Component API documentation
- Integration examples
- Troubleshooting guide
- Performance best practices

### For Content Team
- How to add new menu items
- Analytics dashboard access
- A/B testing results
- User feedback summary