// Configuration object for easy customization
const CONFIG = {
    countdownHours: 24, // Set countdown duration in hours
    spotsRemaining: 7, // Number of spots left
    animationDelay: 100, // Delay between animation triggers in ms
};

// Countdown Timer
function initCountdown() {
    const countdownBar = document.getElementById('countdownBar');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Check if countdown data exists in localStorage
    let endTime = localStorage.getItem('countdownEndTime');
    
    if (!endTime) {
        // Set new countdown end time (24 hours from now)
        endTime = Date.now() + (CONFIG.countdownHours * 60 * 60 * 1000);
        localStorage.setItem('countdownEndTime', endTime);
    }
    
    function updateCountdown() {
        const now = Date.now();
        const distance = endTime - now;
        
        if (distance < 0) {
            // Countdown expired, reset for another 24 hours
            endTime = Date.now() + (CONFIG.countdownHours * 60 * 60 * 1000);
            localStorage.setItem('countdownEndTime', endTime);
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Pricing Toggle
function togglePricing(type) {
    const buttons = document.querySelectorAll('.toggle-btn');
    const cards = document.querySelectorAll('.pricing-card');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if ((type === 'monthly' && btn.textContent.includes('Monthly')) ||
            (type === 'lifetime' && btn.textContent.includes('Lifetime'))) {
            btn.classList.add('active');
        }
    });
    
    // This is a simple toggle - in production, you'd show/hide different pricing cards
    // For now, it just updates the active state
}

// Smooth scroll to pricing
function scrollToPricing() {
    const pricingSection = document.getElementById('pricing');
    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// FAQ Toggle
function toggleFaq(button) {
    const faqItem = button.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Checkout function (placeholder)
function checkout(plan) {
    // In production, this would redirect to your payment processor
    alert(`Redirecting to checkout for ${plan} plan...`);
    
    // Example: Redirect to payment page
    // window.location.href = `/checkout?plan=${plan}`;
    
    // Track conversion event
    trackEvent('checkout_initiated', { plan });
}

// Event tracking (placeholder)
function trackEvent(eventName, data) {
    console.log(`Event tracked: ${eventName}`, data);
    
    // In production, integrate with analytics:
    // gtag('event', eventName, data);
    // fbq('track', eventName, data);
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animationDelay = '0s';
                        entry.target.style.opacity = '1';
                    }, index * CONFIG.animationDelay);
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );
    
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// Update spots remaining
function updateSpotsRemaining() {
    const spotsEl = document.getElementById('spotsLeft');
    if (spotsEl) {
        // Simulate decreasing spots based on time
        const baseSpots = CONFIG.spotsRemaining;
        const randomReduction = Math.floor(Math.random() * 3);
        const remainingSpots = Math.max(1, baseSpots - randomReduction);
        spotsEl.textContent = remainingSpots;
    }
}

// Duplicate marquee content for seamless loop
function initMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        const clone = marqueeContent.cloneNode(true);
        marqueeContent.parentElement.appendChild(clone);
    }
}

// Social proof notifications (optional feature)
function showSocialProof() {
    const notifications = [
        "Sarah from California just enrolled!",
        "John from New York purchased the Lifetime plan!",
        "Maria from Texas started the course!",
        "David from Florida joined the community!"
    ];
    
    // Create notification element
    function createNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'social-proof-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🎉</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 40px rgba(15, 23, 42, 0.15);
            z-index: 9999;
            animation: slideInLeft 0.5s ease-out, slideOutLeft 0.5s ease-out 4s forwards;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after animation
        setTimeout(() => {
            notification.remove();
        }, 4500);
    }
    
    // Show random notification every 10-20 seconds
    function scheduleNotification() {
        const delay = Math.random() * 10000 + 10000; // 10-20 seconds
        setTimeout(() => {
            const randomMessage = notifications[Math.floor(Math.random() * notifications.length)];
            createNotification(randomMessage);
            scheduleNotification();
        }, delay);
    }
    
    // Start showing notifications after initial delay
    setTimeout(scheduleNotification, 5000);
}

// Add notification animations to CSS dynamically
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInLeft {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutLeft {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(-100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-icon {
            font-size: 1.5rem;
        }
        
        .notification-text {
            font-family: var(--font-display);
            font-weight: 600;
            font-size: 0.9rem;
            color: var(--text);
        }
    `;
    document.head.appendChild(style);
}

// Track scroll depth for analytics
function trackScrollDepth() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const tracked = new Set();
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            milestones.forEach(milestone => {
                if (maxScroll >= milestone && !tracked.has(milestone)) {
                    tracked.add(milestone);
                    trackEvent('scroll_depth', { depth: milestone });
                }
            });
        }
    });
}

// Exit intent detection
function initExitIntent() {
    let shown = false;
    
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !shown) {
            shown = true;
            // Show exit intent popup or special offer
            console.log('Exit intent detected - show special offer');
            trackEvent('exit_intent_detected');
            
            // In production, show a modal with special offer
            // showExitIntentModal();
        }
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initScrollAnimations();
    initMarquee();
    updateSpotsRemaining();
    trackScrollDepth();
    initExitIntent();
    addNotificationStyles();
    showSocialProof();
    
    // Track page view
    trackEvent('page_view', { page: 'course_funnel' });
    
    // Add click tracking to CTA buttons
    document.querySelectorAll('.cta-button, .pricing-btn').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('cta_clicked', { 
                buttonText: button.textContent.trim(),
                location: button.closest('section')?.id || 'unknown'
            });
        });
    });
});

// Prevent countdown from resetting on page refresh (persistence)
window.addEventListener('beforeunload', () => {
    // Data is already saved in localStorage by countdown function
});

// Handle visibility change (tab switching)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Update countdown when user returns to tab
        initCountdown();
    }
});
