// Professional Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== NAVIGATION ==================== //
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');

    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile nav when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== SCROLL EFFECTS ==================== //
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Add scrolled class to navbar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/hide back to top button
        if (scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Update active navigation link
        updateActiveNavLink();
    }

    // Throttled scroll handler for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ==================== ACTIVE NAVIGATION ==================== //
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ==================== BACK TO TOP - FIXED VERSION ==================== //
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Also handle keyboard accessibility
        backToTopBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ==================== CONTACT FORM ==================== //
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // Remove has-value class from form inputs after reset
            const formInputs = contactForm.querySelectorAll('.form-control');
            formInputs.forEach(input => {
                input.classList.remove('has-value', 'focused');
            });
        });
    }

    // ==================== HELPER FUNCTIONS ==================== //
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        });

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // ==================== KEYBOARD NAVIGATION ==================== //
    document.addEventListener('keydown', function(e) {
        // ESC to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Ctrl + Home to go to top
        if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // ==================== ACCESSIBILITY IMPROVEMENTS ==================== //
    
    // Skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.focus();
            homeSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add tabindex to home section for skip link focus
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.setAttribute('tabindex', '-1');
    }

    // ==================== PROFILE PICTURE REPLACEMENT ==================== //
    window.replaceProfilePicture = function(imageUrl) {
        const profileImg = document.getElementById('profile-pic');
        if (profileImg && imageUrl) {
            // Validate URL format
            if (!imageUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) && !imageUrl.startsWith('data:image/') && !imageUrl.startsWith('https://')) {
                console.error('Invalid image URL. Please provide a valid image URL.');
                return false;
            }
            
            profileImg.src = imageUrl;
            profileImg.alt = "P. Dashwanth Raj - Profile Picture";
            console.log('Profile picture updated successfully!');
            return true;
        } else {
            console.error('Profile picture element not found or invalid URL provided');
            return false;
        }
    };

    // ==================== FORM ENHANCEMENTS ==================== //
    
    // Add floating label effect to form inputs
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        // Check if input has value on load
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }

        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });

        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });

    // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== //
    
    // Simple fade-in animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for fade-in effect
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ==================== UTILITY FUNCTIONS ==================== //
    
    // Debounce function for performance optimization
    function debounce(func, wait) {
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

    // Throttle function for scroll events
    function throttle(func, limit) {
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

    // ==================== RESIZE HANDLER ==================== //
    const handleResize = debounce(() => {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // ==================== INITIAL SETUP ==================== //
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Initialize scroll effects
    handleScroll();

    // Add smooth scroll behavior to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== CONSOLE INFO ==================== //
    console.log('✨ Professional Portfolio Website Loaded Successfully!');
    console.log('🖼️ To replace the profile picture, use: replaceProfilePicture("your-image-url")');
    console.log('📱 Responsive design with professional styling applied');
    console.log('♿ Accessibility features enabled');
    console.log('🔧 Back-to-top button functionality fixed');

    // Add CSS for enhanced form styling and animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        .form-control.has-value + .form-label,
        .form-control.focused + .form-label {
            transform: translateY(-12px) scale(0.85);
            color: var(--color-primary);
        }
        
        .skip-link:focus {
            position: absolute !important;
            top: 6px !important;
            left: 6px;
            width: auto;
            height: auto;
            overflow: visible;
        }
        
        .notification {
            animation: slideInRight 0.3s ease;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .card {
            transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
            box-shadow: var(--shadow-lg);
        }
        
        .back-to-top {
            cursor: pointer;
        }
        
        .back-to-top:focus {
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
    `;
    document.head.appendChild(additionalStyles);

    // Ensure back to top button is properly initialized
    setTimeout(() => {
        if (backToTopBtn) {
            console.log('✅ Back-to-top button initialized and ready');
        }
    }, 100);

});