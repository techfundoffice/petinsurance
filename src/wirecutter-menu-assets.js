// Wirecutter-style hamburger menu assets for Million Pages

export const menuHTML = `
<!-- Hamburger Button -->
<button class="wc-hamburger" 
        aria-label="Open navigation menu" 
        aria-expanded="false"
        aria-controls="wc-nav-menu"
        data-menu-trigger>
  <svg class="wc-hamburger-icon" width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H18V2H0V0Z" fill="currentColor"/>
    <path d="M0 6.5H18V8.5H0V6.5Z" fill="currentColor"/>
    <path d="M0 13H18V15H0V13Z" fill="currentColor"/>
  </svg>
  <span class="visually-hidden">Menu</span>
</button>

<!-- White Background Blocker -->
<div class="wc-menu-backdrop" aria-hidden="true"></div>

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
      <span class="logo-text">Pet Insurance Guide</span>
    </a>
    <button class="wc-menu-close" 
            aria-label="Close navigation menu"
            data-menu-close>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
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
              <path d="M10 2L12 8h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="currentColor" opacity="0.8"/>
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
              <rect x="4" y="10" width="12" height="8" fill="currentColor" opacity="0.8"/>
              <path d="M10 2L6 10h8z" fill="currentColor" opacity="0.8"/>
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
              <path d="M10 2L8 6l-4 1 3 3-1 4 4-2 4 2-1-4 3-3-4-1z" fill="currentColor" opacity="0.8"/>
            </svg>
          </span>
          <span class="wc-menu-text">Cat Health & Cat Lifestyle</span>
          <span class="wc-menu-count">42</span>
        </a>
      </li>
      <li role="none">
        <a href="/cat-tech" 
           class="wc-menu-link"
           data-category="cat-tech"
           data-menu-item="4">
          <span class="wc-menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <rect x="3" y="6" width="14" height="10" rx="1" fill="currentColor" opacity="0.8"/>
              <rect x="7" y="3" width="2" height="3" fill="currentColor" opacity="0.8"/>
              <rect x="11" y="3" width="2" height="3" fill="currentColor" opacity="0.8"/>
            </svg>
          </span>
          <span class="wc-menu-text">Cat Tech</span>
        </a>
      </li>
      <li role="none">
        <a href="/cat-baby-kid" 
           class="wc-menu-link"
           data-category="cat-baby-kid"
           data-menu-item="5">
          <span class="wc-menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="6" r="3" fill="currentColor" opacity="0.8"/>
              <path d="M10 10c-3.3 0-6 2.7-6 6v1h12v-1c0-3.3-2.7-6-6-6z" fill="currentColor" opacity="0.8"/>
            </svg>
          </span>
          <span class="wc-menu-text">Cat Baby & Cat Kid</span>
        </a>
      </li>
      <li role="none">
        <a href="/cat-style" 
           class="wc-menu-link"
           data-category="cat-style"
           data-menu-item="6">
          <span class="wc-menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 2l2.5 5 5.5.8-4 3.9 1 5.8L10 14.8l-5 2.7 1-5.8-4-3.9 5.5-.8z" fill="currentColor" opacity="0.8"/>
            </svg>
          </span>
          <span class="wc-menu-text">Cat Style</span>
        </a>
      </li>
      <li role="none">
        <a href="/cat-gifts" 
           class="wc-menu-link"
           data-category="cat-gifts"
           data-menu-item="7">
          <span class="wc-menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <rect x="3" y="7" width="14" height="10" fill="currentColor" opacity="0.8"/>
              <path d="M7 7V5c0-1.1.9-2 2-2s2 .9 2 2v2m2 0V5c0-1.1.9-2 2-2s2 .9 2 2v2" stroke="currentColor" fill="none" opacity="0.8"/>
            </svg>
          </span>
          <span class="wc-menu-text">Cat Gifts</span>
        </a>
      </li>
      <li role="none">
        <a href="/cat-podcast" 
           class="wc-menu-link"
           data-category="cat-podcast"
           data-menu-item="8">
          <span class="wc-menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="2" fill="none" opacity="0.8"/>
              <path d="M7 10v5h2v-5c0-1.7 1.3-3 3-3s3 1.3 3 3v5h2v-5" stroke="currentColor" stroke-width="2" fill="none" opacity="0.8"/>
            </svg>
          </span>
          <span class="wc-menu-text">Cat Podcast</span>
        </a>
      </li>
      <li role="none">
        <a href="/cat-deals" 
           class="wc-menu-link"
           data-category="cat-deals"
           data-menu-item="9">
          <span class="wc-menu-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 3l2 4 4 .5-3 3 .7 4.5L10 13l-3.7 2 .7-4.5-3-3 4-.5z" fill="currentColor" opacity="0.8"/>
            </svg>
          </span>
          <span class="wc-menu-text">Cat Deals</span>
          <span class="wc-menu-badge">Hot</span>
        </a>
      </li>
    </ul>
  </div>
  
  <!-- Secondary Navigation -->
  <div class="wc-menu-footer" role="group" aria-label="Secondary navigation">
    <a href="/about" class="wc-menu-footer-link">About</a>
    <a href="/contact" class="wc-menu-footer-link">Contact</a>
    <a href="/privacy" class="wc-menu-footer-link">Privacy</a>
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
`;

export const menuCSS = `
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
  --wc-z-hamburger: 10001;
  --wc-z-menu: 9999;
  --wc-z-overlay: 9998;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --wc-color-text: #ffffff;
    --wc-color-text-secondary: #aaaaaa;
    --wc-color-bg: #1a1a1a;
    --wc-color-border: #333333;
    --wc-color-bg-hover: #2a2a2a;
    --wc-color-primary: #5a9fd4;
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
  background: #333333; /* Changed from blue to dark gray */
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 0 0 4px 0;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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
  background: #fff;
  border: 2px solid transparent;
  padding: 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: all var(--wc-transition-speed) var(--wc-transition-easing);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
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

/* Hamburger Icon SVG */
.wc-hamburger-icon {
  display: block;
  width: 18px;
  height: 15px;
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
  background: #ffffff; /* Explicit white background */
  box-shadow: var(--wc-shadow-menu);
  transform: translateX(-100%);
  transition: transform var(--wc-transition-speed) var(--wc-transition-easing);
  z-index: var(--wc-z-menu);
  display: flex;
  flex-direction: column;
  overscroll-behavior: contain;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  /* Ensure no blue overlay */
  isolation: isolate;
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
  background: #ffffff; /* Explicit white background */
}

/* Menu Header */
.wc-menu-header {
  padding: 20px;
  border-bottom: 1px solid var(--wc-color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: #ffffff; /* Ensure white background */
  position: relative;
  z-index: 1;
}

.wc-menu-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--wc-color-text);
  font-weight: 600;
  font-size: 18px;
  transition: color 0.2s ease;
}

.wc-menu-logo:hover {
  color: var(--wc-color-primary);
}

.logo-icon {
  flex-shrink: 0;
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
  background: #ffffff; /* Ensure white background */
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
  pointer-events: none;
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
  background: #ffffff; /* Ensure white background */
}

.wc-menu-list li {
  border-bottom: 1px solid var(--wc-color-border);
  background: #ffffff; /* Ensure white background */
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
  display: inline-block;
}

.wc-menu-icon svg {
  width: 100%;
  height: 100%;
  display: block;
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

.wc-menu-badge:last-child:nth-child(3) {
  background: #ff6b6b;
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
  -webkit-backdrop-filter: blur(0px);
}

.wc-menu-overlay.active {
  background: rgba(0, 0, 0, 0.4);
  opacity: 1;
  visibility: visible;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
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

/* White backdrop to prevent bleed-through */
.wc-menu-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Cover full viewport width */
  height: 100vh;
  background: #ffffff;
  transform: translateX(-100%);
  transition: transform var(--wc-transition-speed) var(--wc-transition-easing);
  z-index: 9997;
  display: none;
}

.wc-menu-backdrop.active {
  transform: translateX(0);
  display: block;
}

/* Main content adjustment */
main {
  padding-top: 70px;
  position: relative;
  z-index: 1;
}

/* Ensure menu has higher z-index than all content */
.wc-nav-menu,
.wc-nav-menu * {
  z-index: var(--wc-z-menu) !important;
}

/* Fix for blue background bleed-through */
.hero-section,
.hero-image,
main img {
  position: relative;
  z-index: 1;
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
  .wc-menu-overlay,
  .skip-link {
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
  
  .wc-nav-menu {
    transition: none;
  }
  
  .wc-menu-overlay {
    transition: none;
  }
}
`;

export const menuJS = `
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
      backdrop: '.wc-menu-backdrop',
      closeBtn: '.wc-menu-close',
      menuLinks: '.wc-menu-link',
      menuBody: '.wc-menu-body'
    };
    
    for (const [key, selector] of Object.entries(selectors)) {
      const element = key === 'menuLinks' 
        ? document.querySelectorAll(selector)
        : document.querySelector(selector);
        
      if (!element && key !== 'menuLinks') {
        throw new Error(\`Required element not found: \${selector}\`);
      }
      this.elements[key] = element;
    }
  }
  
  bindEvents() {
    // Click events
    this.elements.hamburger?.addEventListener('click', () => this.open());
    this.elements.closeBtn?.addEventListener('click', () => this.close());
    this.elements.overlay?.addEventListener('click', () => this.close());
    
    // Keyboard events
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // Touch events for swipe gestures
    if (this.elements.menu) {
      this.elements.menu.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
      this.elements.menu.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    }
    
    // Menu link clicks
    if (this.elements.menuLinks) {
      this.elements.menuLinks.forEach(link => {
        link.addEventListener('click', (e) => this.handleLinkClick(e, link));
      });
    }
    
    // Prevent body scroll on iOS
    if (this.elements.menu && this.elements.menuBody) {
      this.elements.menu.addEventListener('touchmove', (e) => {
        if (this.elements.menuBody.scrollHeight <= this.elements.menuBody.clientHeight) {
          e.preventDefault();
        }
      });
    }
    
    // Handle focus trap
    if (this.elements.menu) {
      this.elements.menu.addEventListener('focusout', this.handleFocusOut.bind(this));
    }
  }
  
  setupA11y() {
    // Set initial ARIA states
    if (this.elements.menu) {
      this.elements.menu.setAttribute('aria-hidden', 'true');
    }
    if (this.elements.overlay) {
      this.elements.overlay.setAttribute('aria-hidden', 'true');
    }
    
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
      this.elements.backdrop?.classList.add('active');
      this.elements.menu?.classList.add('active');
      this.elements.overlay?.classList.add('active');
      document.body.classList.add('menu-open');
      
      // Update ARIA
      this.elements.hamburger?.setAttribute('aria-expanded', 'true');
      this.elements.menu?.setAttribute('aria-hidden', 'false');
      this.elements.overlay?.setAttribute('aria-hidden', 'false');
      
      // Announce to screen readers
      this.announce('Navigation menu opened');
      
      // Focus management
      setTimeout(() => {
        this.elements.closeBtn?.focus();
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
      this.elements.menu?.classList.remove('active');
      this.elements.overlay?.classList.remove('active');
      this.elements.backdrop?.classList.remove('active');
      document.body.classList.remove('menu-open');
      
      // Update ARIA
      this.elements.hamburger?.setAttribute('aria-expanded', 'false');
      this.elements.menu?.setAttribute('aria-hidden', 'true');
      this.elements.overlay?.setAttribute('aria-hidden', 'true');
      
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
    const focusableElements = this.elements.menu?.querySelectorAll(this.config.focusableSelectors);
    if (!focusableElements || focusableElements.length === 0) return;
    
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
    if (this.state.isOpen && this.elements.menu && !this.elements.menu.contains(e.relatedTarget)) {
      e.preventDefault();
      this.elements.closeBtn?.focus();
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
      
      // Also send to internal analytics if endpoint exists
      if (window.location.hostname !== 'localhost') {
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
      }
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
    style.textContent = \`
      .wc-hamburger { display: none; }
      .wc-nav-menu { 
        position: static; 
        transform: none; 
        width: 100%; 
        height: auto;
        box-shadow: none;
      }
      .wc-menu-overlay { display: none; }
    \`;
    document.head.appendChild(style);
  }
  
  destroy() {
    // Clean up for SPA navigation
    this.elements.hamburger?.removeEventListener('click', () => this.open());
    this.elements.closeBtn?.removeEventListener('click', () => this.close());
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
`;