// Countdown Timer
function initCountdown() {
    const countdownDate = new Date("July 31, 2024 23:59:59").getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "<p>Акция завершена</p>";
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

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
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
            // Here you can add video player initialization
            // For now, we'll just show an alert
            alert('Здесь будет видео о курсе');
        });
    }
}

// Mobile menu toggle (if needed in future)
function initMobileMenu() {
    // Placeholder for mobile menu functionality
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initVideoPlayer();
    initMobileMenu();
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add mobile-specific functionality
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
    
    // Optimize video placeholder for mobile
    if (window.innerWidth <= 768) {
        const videoPlaceholder = document.querySelector('.video-placeholder');
        if (videoPlaceholder) {
            videoPlaceholder.addEventListener('click', function() {
                // On mobile, could open in fullscreen or modal
                if ('requestFullscreen' in this) {
                    this.requestFullscreen();
                }
            });
        }
    }
}

// Call on load and resize
document.addEventListener('DOMContentLoaded', initMobileOptimizations);
window.addEventListener('resize', initMobileOptimizations);