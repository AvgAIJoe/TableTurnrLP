// Enhanced Landing Page JavaScript - Modern Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initROICalculator();
    initPricingToggle();
    initScrollAnimations();
    initModalHandlers();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
            navToggle.classList.toggle('active');
        });
    }
}

// ROI Calculator functionality
function initROICalculator() {
    const revenueInput = document.getElementById('revenue2');
    const employeesInput = document.getElementById('employees2');
    const foodCostInput = document.getElementById('foodCost2');
    
    const foodWasteSavingsEl = document.getElementById('foodWasteSavings2');
    const laborSavingsEl = document.getElementById('laborSavings2');
    const timeSavingsEl = document.getElementById('timeSavings2');
    const totalSavingsEl = document.getElementById('totalSavings2');
    
    function calculateSavings() {
        const monthlyRevenue = parseFloat(revenueInput.value) || 0;
        const employees = parseFloat(employeesInput.value) || 0;
        const foodCostPercent = parseFloat(foodCostInput.value) || 0;
        
        // Calculate annual revenue
        const annualRevenue = monthlyRevenue * 12;
        
        // Food waste savings (15% reduction of food costs)
        const annualFoodCost = annualRevenue * (foodCostPercent / 100);
        const foodWasteSavings = annualFoodCost * 0.15;
        
        // Labor savings (12% of total labor costs - estimated at 30% of revenue)
        const estimatedLaborCost = annualRevenue * 0.30;
        const laborSavings = estimatedLaborCost * 0.12;
        
        // Time savings (3 hours daily at $15/hour average)
        const timeSavings = 3 * 365 * 15;
        
        // Total savings
        const totalSavings = foodWasteSavings + laborSavings + timeSavings;
        
        // Animate the updates
        animateValue(foodWasteSavingsEl, 0, foodWasteSavings, 1000);
        animateValue(laborSavingsEl, 0, laborSavings, 1000);
        animateValue(timeSavingsEl, 0, timeSavings, 1000);
        animateValue(totalSavingsEl, 0, totalSavings, 1500);
    }
    
    function animateValue(element, start, end, duration) {
        const startTime = performance.now();
        
        function updateValue(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = start + (end - start) * easeOut;
            
            element.textContent = formatCurrency(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        }
        
        requestAnimationFrame(updateValue);
    }
    
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    // Add event listeners with debouncing
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
    
    const debouncedCalculate = debounce(calculateSavings, 300);
    
    if (revenueInput) revenueInput.addEventListener('input', debouncedCalculate);
    if (employeesInput) employeesInput.addEventListener('input', debouncedCalculate);
    if (foodCostInput) foodCostInput.addEventListener('input', debouncedCalculate);
    
    // Initial calculation
    calculateSavings();
}

// Pricing toggle functionality
function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    
    if (toggle) {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('annual-pricing');
                // Add visual feedback
                monthlyPrices.forEach(price => {
                    price.style.opacity = '0';
                    setTimeout(() => {
                        price.style.display = 'none';
                        const annualPrice = price.nextElementSibling;
                        if (annualPrice) {
                            annualPrice.style.display = 'inline';
                            setTimeout(() => annualPrice.style.opacity = '1', 50);
                        }
                    }, 150);
                });
            } else {
                document.body.classList.remove('annual-pricing');
                annualPrices.forEach(price => {
                    price.style.opacity = '0';
                    setTimeout(() => {
                        price.style.display = 'none';
                        const monthlyPrice = price.previousElementSibling;
                        if (monthlyPrice) {
                            monthlyPrice.style.display = 'inline';
                            setTimeout(() => monthlyPrice.style.opacity = '1', 50);
                        }
                    }, 150);
                });
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Stagger animations for grid items
                if (entry.target.parentElement.classList.contains('problem-grid') ||
                    entry.target.parentElement.classList.contains('features-grid') ||
                    entry.target.parentElement.classList.contains('pricing-grid')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.problem-card, .feature-card, .pricing-card').forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for floating orbs
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const orbs = document.querySelectorAll('.gradient-orb');
        
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = scrollY * speed;
            orb.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// Modal handlers for CTAs
function initModalHandlers() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .calculator-cta');
    
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Trial') || 
            button.textContent.includes('Demo') || 
            button.textContent.includes('Claim') ||
            button.textContent.includes('Start')) {
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showDemoModal();
            });
        }
    });
}

function showDemoModal() {
    const modal = createEnhancedModal();
    document.body.appendChild(modal);
    
    // Animate modal in
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1) translateY(0)';
    });
}

function createEnhancedModal() {
    const modalHTML = `
        <div class="modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        ">
            <div class="modal-content" style="
                background: white;
                padding: 3rem;
                border-radius: 24px;
                max-width: 520px;
                width: 90%;
                position: relative;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                transform: scale(0.9) translateY(20px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            ">
                <button class="modal-close" style="
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: #f3f4f6;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 1.2rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                ">&times;</button>
                
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="
                        background: linear-gradient(135deg, #5551ff 0%, #764ba2 100%);
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1.5rem;
                        font-size: 2rem;
                    ">🚀</div>
                    <h3 style="margin-bottom: 0.5rem; color: #1a1a1a; font-size: 1.75rem;">Start Your Free Trial</h3>
                    <p style="color: #666; font-size: 1.1rem; line-height: 1.6;">
                        Join 500+ restaurants already saving thousands. 
                        No credit card required.
                    </p>
                </div>
                
                <form class="demo-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <input type="text" placeholder="Restaurant Name" required style="
                            padding: 16px;
                            border: 2px solid #e5e7eb;
                            border-radius: 12px;
                            font-size: 1rem;
                            transition: all 0.3s ease;
                            background: #fafbfc;
                        ">
                        <input type="text" placeholder="Your Name" required style="
                            padding: 16px;
                            border: 2px solid #e5e7eb;
                            border-radius: 12px;
                            font-size: 1rem;
                            transition: all 0.3s ease;
                            background: #fafbfc;
                        ">
                    </div>
                    <input type="email" placeholder="Email Address" required style="
                        padding: 16px;
                        border: 2px solid #e5e7eb;
                        border-radius: 12px;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        background: #fafbfc;
                    ">
                    <input type="tel" placeholder="Phone Number" required style="
                        padding: 16px;
                        border: 2px solid #e5e7eb;
                        border-radius: 12px;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        background: #fafbfc;
                    ">
                    <select required style="
                        padding: 16px;
                        border: 2px solid #e5e7eb;
                        border-radius: 12px;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        background: #fafbfc;
                    ">
                        <option value="">Number of Locations</option>
                        <option value="1">1 Location</option>
                        <option value="2-3">2-3 Locations</option>
                        <option value="4-10">4-10 Locations</option>
                        <option value="10+">10+ Locations</option>
                    </select>
                    
                    <div style="
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 16px;
                        background: rgba(85, 81, 255, 0.05);
                        border-radius: 12px;
                        border: 1px solid rgba(85, 81, 255, 0.1);
                        margin: 0.5rem 0;
                    ">
                        <input type="checkbox" id="agree" required style="
                            width: 18px;
                            height: 18px;
                            accent-color: #5551ff;
                        ">
                        <label for="agree" style="
                            font-size: 0.9rem;
                            color: #666;
                            cursor: pointer;
                        ">I agree to receive product updates and marketing communications</label>
                    </div>
                    
                    <button type="submit" style="
                        background: linear-gradient(135deg, #5551ff 0%, #764ba2 100%);
                        color: white;
                        padding: 18px;
                        border: none;
                        border-radius: 12px;
                        font-weight: 600;
                        font-size: 1.1rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        margin-top: 1rem;
                    ">🚀 Start My Free Trial</button>
                    
                    <div style="text-align: center; margin-top: 1rem;">
                        <div style="
                            display: flex;
                            justify-content: center;
                            gap: 24px;
                            color: #999;
                            font-size: 0.9rem;
                        ">
                            <span>✓ 30-day free trial</span>
                            <span>✓ No credit card</span>
                            <span>✓ Setup in 5 minutes</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = modalHTML;
    const modal = modalDiv.firstElementChild;
    
    // Enhanced close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal;
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.9) translateY(20px)';
        setTimeout(() => modal.remove(), 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    
    // Enhanced form handling
    const form = modal.querySelector('.demo-form');
    const inputs = form.querySelectorAll('input, select');
    
    // Add focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = '#5551ff';
            input.style.background = '#ffffff';
            input.style.boxShadow = '0 0 0 3px rgba(85, 81, 255, 0.1)';
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = '#e5e7eb';
            input.style.background = '#fafbfc';
            input.style.boxShadow = 'none';
        });
    });
    
    // Form submission with enhanced feedback
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Loading state
        submitBtn.textContent = '🔄 Setting up your trial...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate API call
        setTimeout(() => {
            // Success state
            submitBtn.textContent = '✅ Trial Started!';
            submitBtn.style.background = 'linear-gradient(135deg, #00d4aa 0%, #5551ff 100%)';
            
            setTimeout(() => {
                showSuccessMessage();
                closeModal();
            }, 1500);
        }, 2000);
    });
    
    return modal;
}

function showSuccessMessage() {
    const successHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00d4aa 0%, #5551ff 100%);
            color: white;
            padding: 20px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 212, 170, 0.3);
            z-index: 3000;
            transform: translateX(400px);
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 500;
        ">
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 1.5rem;">🎉</span>
                <div>
                    <div style="font-weight: 600; margin-bottom: 4px;">Welcome to TableTurnr!</div>
                    <div style="font-size: 0.9rem; opacity: 0.9;">Check your email for next steps</div>
                </div>
            </div>
        </div>
    `;
    
    const successDiv = document.createElement('div');
    successDiv.innerHTML = successHTML;
    const notification = successDiv.firstElementChild;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add loading animations to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button:not([type="submit"])')) {
        const button = e.target;
        const originalContent = button.innerHTML;
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${e.offsetX}px;
            top: ${e.offsetY}px;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Mobile menu styles */
    @media (max-width: 1024px) {
        .nav-menu.mobile-active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            gap: 1.5rem;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);