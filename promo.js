//countdown Timer
function initCountdown() {
    const countdownDate = new Date("July 31, 2024 23:59:59").getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (document.getElementById("days")) {
            document.getElementById("days").innerText = days.toString().padStart(2, '0');
            document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
        }
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (document.getElementById("countdown")) {
                document.getElementById("countdown").innerHTML = "<p>Акция завершена</p>";
            }
        }
    };
    
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

// FAQ Toggle
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for anchor links (EXCLUDING mobile menu items)
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not(.menu-item)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = window.innerWidth <= 768 ? 60 : 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.feature-card, .module-card, .pricing-card, .testimonial-card, .step').forEach(el => {
        observer.observe(el);
    });
}

// Video placeholder click handler
function initVideoPlayer() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            alert('Здесь будет видео о курсе');
        });
    }
}

// Mobile-specific functionality
function initMobileOptimizations() {
    // Add swipe indicators
    const scrollContainers = document.querySelectorAll('.features-grid, .steps, .pricing-grid');
    
    scrollContainers.forEach(container => {
        // Check if content is scrollable
        if (container.scrollWidth > container.clientWidth) {
            container.classList.add('is-scrollable');
        }
        
        // Update scroll indicators on scroll
        container.addEventListener('scroll', function() {
            if (this.scrollLeft > 0) {
                this.classList.add('is-scrolled');
            } else {
                this.classList.remove('is-scrolled');
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuItems = document.querySelectorAll('.menu-item');

    if (menuToggle && mobileMenu) {
        // Toggle menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a menu item
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Get the target section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Close menu
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                // Scroll to section after a small delay to ensure menu is closed
                if (targetSection) {
                    setTimeout(() => {
                        const offsetTop = targetSection.offsetTop - 60;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active')) {
                if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                    menuToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initVideoPlayer();
    initMobileMenu();
    initMobileOptimizations();
});

// Resize handler
window.addEventListener('resize', initMobileOptimizations);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});