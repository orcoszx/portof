/*
============================================
TROY PORTFOLIO - MOBILE OPTIMIZATION
Copyright © 2024 TROY
All Rights Reserved
============================================
*/

// Mobile Optimization Features
class MobileOptimizer {
    constructor() {
        this.isMobile = this.checkMobile();
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.init();
    }
    
    init() {
        this.optimizeNavigation();
        this.optimizeForms();
        this.addTouchGestures();
        this.optimizeImages();
        this.addMobileSpecificFeatures();
        this.setupViewportControl();
    }
    
    checkMobile() {
        return window.matchMedia('(max-width: 768px)').matches || 
               'ontouchstart' in window || 
               navigator.maxTouchPoints > 0;
    }
    
    optimizeNavigation() {
        // Make nav links easier to tap on mobile
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.style.minHeight = '44px';
            link.style.padding = '12px 16px';
            link.style.display = 'flex';
            link.style.alignItems = 'center';
            link.style.justifyContent = 'center';
        });
        
        // Add touch feedback
        navLinks.forEach(link => {
            link.addEventListener('touchstart', () => {
                link.style.backgroundColor = 'rgba(88, 101, 242, 0.2)';
            });
            
            link.addEventListener('touchend', () => {
                setTimeout(() => {
                    link.style.backgroundColor = '';
                }, 150);
            });
        });
    }
    
    optimizeForms() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Increase touch target size
            input.style.minHeight = '44px';
            input.style.padding = '12px';
            input.style.fontSize = '16px'; // Prevents iOS zoom
            
            // Add focus styles for touch
            input.addEventListener('focus', () => {
                input.style.outline = 'none';
                input.style.boxShadow = '0 0 0 3px rgba(88, 101, 242, 0.3)';
            });
            
            input.addEventListener('blur', () => {
                input.style.boxShadow = '';
            });
        });
        
        // Submit button optimization
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.style.minHeight = '48px';
            submitBtn.style.fontSize = '16px';
        }
    }
    
    addTouchGestures() {
        // Swipe to close mobile menu
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!this.isMobile) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchEndX - this.touchStartX;
            const diffY = touchEndY - this.touchStartY;
            
            // Horizontal swipe detection
            if (Math.abs(diffX) > 50 && Math.abs(diffY) < 30) {
                const navMenu = document.getElementById('navMenu');
                if (navMenu && navMenu.classList.contains('active')) {
                    if (diffX > 0) {
                        // Swipe right - close menu
                        navMenu.classList.remove('active');
                        document.getElementById('navToggle').innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
        
        // Double tap to zoom prevention
        let lastTap = 0;
        document.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 300 && tapLength > 0) {
                e.preventDefault();
            }
            
            lastTap = currentTime;
        });
    }
    
    optimizeImages() {
        // Lazy loading for images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            
            // Add loading state
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
            }
        });
    }
    
    addMobileSpecificFeatures() {
        // Add touch-friendly project card interactions
        const projectCards = document.querySelectorAll('.preview-card, .info-card, .contact-card');
        projectCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.style.userSelect = 'none';
            card.style.webkitTapHighlightColor = 'transparent';
            
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
                card.style.transition = 'transform 0.2s';
            });
            
            card.addEventListener('touchend', () => {
                card.style.transform = '';
            });
            
            card.addEventListener('touchcancel', () => {
                card.style.transform = '';
            });
        });
        
        // Mobile-specific button sizes
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            if (this.isMobile) {
                btn.style.minHeight = '48px';
                btn.style.padding = '14px 24px';
                btn.style.fontSize = '16px';
                btn.style.margin = '8px 0';
            }
        });
        
        // Adjust font sizes for mobile
        if (this.isMobile) {
            this.adjustFontSizes();
        }
    }
    
    adjustFontSizes() {
        // Hero section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.fontSize = '2.5rem';
        }
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.style.fontSize = '1.2rem';
        }
        
        const sectionHeaders = document.querySelectorAll('.section-header h2');
        sectionHeaders.forEach(header => {
            header.style.fontSize = '1.8rem';
        });
        
        // Adjust project stats
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            stat.style.fontSize = '1.3rem';
        });
    }
    
    setupViewportControl() {
        // Prevent zoom on input focus for iOS
        document.addEventListener('focusin', (e) => {
            if (this.isMobile && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
                window.scrollTo(0, 0);
                document.body.style.height = '100%';
            }
        });
        
        document.addEventListener('focusout', () => {
            document.body.style.height = '';
        });
    }
    
    // Performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Update CSS for Mobile Responsiveness
function injectMobileCSS() {
    const mobileCSS = `
        /* Mobile-specific styles */
        @media (max-width: 768px) {
            /* Navigation */
            .nav-menu {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: var(--dark);
                backdrop-filter: blur(10px);
                padding: 1rem;
                flex-direction: column;
                gap: 0.5rem;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .nav-menu.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-link {
                width: 100%;
                justify-content: flex-start;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 0.5rem;
                min-height: 44px;
            }
            
            /* Hero Section */
            .hero-content {
                padding-top: 80px;
            }
            
            .avatar-circle {
                width: 120px;
                height: 120px;
                font-size: 2.5rem;
            }
            
            .hero-title {
                font-size: 2.2rem;
                line-height: 1.2;
            }
            
            .hero-subtitle {
                font-size: 1.1rem;
            }
            
            .hero-buttons {
                flex-direction: column;
                align-items: stretch;
                gap: 0.75rem;
            }
            
            .btn {
                width: 100%;
                max-width: 100%;
                margin: 0;
            }
            
            /* About Section */
            .about-main {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .about-info {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .info-card {
                padding: 1rem;
            }
            
            /* Projects Section */
            .project-header {
                flex-direction: column;
                gap: 1rem;
                align-items: flex-start;
            }
            
            .preview-content {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .preview-card {
                padding: 1rem;
            }
            
            .project-stats {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .stat {
                padding: 0.75rem;
            }
            
            .highlights {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .highlight {
                padding: 1rem;
            }
            
            .project-actions {
                flex-direction: column;
                gap: 0.75rem;
            }
            
            /* Contact Section */
            .contact-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .contact-form {
                padding: 1.5rem;
            }
            
            /* Footer */
            .footer-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .footer-links {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .footer-bottom {
                flex-direction: column;
                text-align: center;
                gap: 1rem;
            }
            
            /* General Improvements */
            .section {
                padding: 3rem 0;
            }
            
            .container {
                padding: 0 1rem;
            }
            
            .section-header h2 {
                font-size: 1.8rem;
            }
            
            /* Touch-friendly improvements */
            input, textarea, select, button {
                font-size: 16px !important;
                min-height: 44px !important;
            }
            
            .form-control {
                padding: 12px !important;
            }
            
            /* Hide scrollbars on touch devices */
            ::-webkit-scrollbar {
                display: none;
            }
            
            * {
                -webkit-overflow-scrolling: touch;
            }
        }
        
        @media (max-width: 480px) {
            .hero-title {
                font-size: 1.8rem;
            }
            
            .hero-subtitle {
                font-size: 1rem;
            }
            
            .avatar-circle {
                width: 100px;
                height: 100px;
                font-size: 2rem;
            }
            
            .section-header h2 {
                font-size: 1.5rem;
            }
            
            .project-title {
                font-size: 1.5rem;
            }
            
            .tech-stack {
                justify-content: center;
            }
            
            .tech-tag {
                font-size: 0.8rem;
                padding: 0.4rem 0.8rem;
            }
        }
        
        /* Tablet-specific styles */
        @media (min-width: 769px) and (max-width: 1024px) {
            .container {
                padding: 0 1.5rem;
            }
            
            .about-main {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .contact-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .highlights {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .preview-content {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        /* Desktop optimization */
        @media (min-width: 1025px) {
            .container {
                max-width: 1200px;
                margin: 0 auto;
            }
            
            .hero-content {
                max-width: 800px;
            }
            
            .project-single {
                max-width: 1000px;
            }
        }
        
        /* Print styles */
        @media print {
            .navbar, .hero-scroll, .back-to-top, .hero-buttons, .project-actions {
                display: none !important;
            }
            
            .hero, .section {
                padding: 1rem 0 !important;
            }
            
            body {
                color: #000 !important;
                background: #fff !important;
            }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            :root {
                --primary: #0000FF;
                --secondary: #008000;
                --dark: #000;
                --light: #fff;
            }
        }
        
        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            :root {
                --light: #f6f6f6;
                --dark: #1e2124;
                --darker: #18191c;
            }
        }
        
        /* Light mode support */
        @media (prefers-color-scheme: light) {
            :root {
                --light: #1e2124;
                --dark: #f6f6f6;
                --darker: #ffffff;
                --gray: #4f545c;
                --light-gray: #666;
            }
            
            body {
                background: #fff;
            }
            
            .card, .project-card, .contact-card, .info-card {
                background: #fff;
                border-color: #e0e0e0;
                color: #333;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = mobileCSS;
    document.head.appendChild(style);
}

// Device Detection
function detectDevice() {
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const isWindows = /Windows/.test(userAgent);
    const isMac = /Mac/.test(userAgent);
    
    return {
        isIOS,
        isAndroid,
        isWindows,
        isMac,
        isMobile: isIOS || isAndroid || /Mobile/.test(userAgent),
        isTablet: /iPad|Android(?!.*Mobile)|Tablet/.test(userAgent),
        isDesktop: !(isIOS || isAndroid || /Mobile/.test(userAgent))
    };
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Inject mobile CSS
    injectMobileCSS();
    
    // Initialize mobile optimizer
    const mobileOptimizer = new MobileOptimizer();
    
    // Detect device
    const device = detectDevice();
    console.log('Device detected:', device);
    
    // Add device class to body for CSS targeting
    document.body.classList.add(device.isMobile ? 'mobile-device' : 'desktop-device');
    if (device.isIOS) document.body.classList.add('ios-device');
    if (device.isAndroid) document.body.classList.add('android-device');
    
    // Load critical CSS first
    optimizeCriticalCSS();
    
    // Defer non-critical CSS
    deferNonCriticalCSS();
    
    // Setup service worker for PWA (optional)
    setupServiceWorker();
    
    // Add viewport meta tag dynamically
    setupViewportMeta();
    
    // Optimize scroll performance
    optimizeScrollPerformance();
});

function optimizeCriticalCSS() {
    // Inline critical CSS
    const criticalCSS = `
        .hero, .navbar, .section:first-of-type {
            opacity: 1 !important;
        }
        
        .loading {
            display: none !important;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);
}

function deferNonCriticalCSS() {
    // Defer loading of non-critical CSS
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]:not([media="print"])');
    stylesheets.forEach(sheet => {
        if (sheet.href && !sheet.href.includes('fonts.googleapis')) {
            sheet.media = 'none';
            sheet.onload = () => { sheet.media = 'all'; };
        }
    });
}

function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
        });
    }
}

function setupViewportMeta() {
    // Ensure viewport meta tag exists
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        document.head.appendChild(viewportMeta);
    }
    
    // Set appropriate viewport for device
    const device = detectDevice();
    if (device.isMobile) {
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
    } else {
        viewportMeta.content = 'width=device-width, initial-scale=1.0';
    }
}

function optimizeScrollPerformance() {
    // Use passive event listeners for better scroll performance
    const options = { passive: true };
    
    window.addEventListener('scroll', () => {}, options);
    window.addEventListener('touchmove', () => {}, options);
    window.addEventListener('wheel', () => {}, options);
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll completion
            document.body.classList.remove('scrolling');
        }, 100);
        
        document.body.classList.add('scrolling');
    });
}

// Export for global use
window.MobileOptimizer = MobileOptimizer;
window.detectDevice = detectDevice;

console.log('📱 Mobile optimization loaded successfully!');
console.log('💻 Device compatibility: Mobile, Tablet, Desktop');
console.log('⚡ Performance optimizations enabled');