// ROI Calculator functionality
document.addEventListener('DOMContentLoaded', function() {
    const revenueInput = document.getElementById('revenue');
    const employeesInput = document.getElementById('employees');
    const foodCostInput = document.getElementById('foodCost');
    
    const foodWasteSavingsEl = document.getElementById('foodWasteSavings');
    const laborSavingsEl = document.getElementById('laborSavings');
    const timeSavingsEl = document.getElementById('timeSavings');
    const totalSavingsEl = document.getElementById('totalSavings');
    
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
        
        // Update display
        foodWasteSavingsEl.textContent = formatCurrency(foodWasteSavings);
        laborSavingsEl.textContent = formatCurrency(laborSavings);
        timeSavingsEl.textContent = formatCurrency(timeSavings);
        totalSavingsEl.textContent = formatCurrency(totalSavings);
    }
    
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    // Add event listeners
    revenueInput.addEventListener('input', calculateSavings);
    employeesInput.addEventListener('input', calculateSavings);
    foodCostInput.addEventListener('input', calculateSavings);
    
    // Initial calculation
    calculateSavings();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-menu-open');
    });
}

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links.mobile-menu-open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            gap: 1rem;
        }
    }
`;
document.head.appendChild(style);

// Form submission handlers
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Demo') || button.textContent.includes('Trial')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a simple modal or redirect to a signup form
            const modal = createModal();
            document.body.appendChild(modal);
        });
    }
});

function createModal() {
    const modalHTML = `
        <div class="modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        ">
            <div class="modal-content" style="
                background: white;
                padding: 2rem;
                border-radius: 16px;
                max-width: 500px;
                width: 90%;
                position: relative;
            ">
                <button class="modal-close" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                ">&times;</button>
                
                <h3 style="margin-bottom: 1rem; color: #333;">Get Started with TableTurnr</h3>
                <p style="margin-bottom: 2rem; color: #666;">
                    Ready to see how TableTurnr can save your restaurant thousands? 
                    Enter your details below and we'll set up your personalized demo.
                </p>
                
                <form class="demo-form">
                    <div style="margin-bottom: 1rem;">
                        <input type="text" placeholder="Restaurant Name" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            font-size: 1rem;
                        ">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <input type="text" placeholder="Your Name" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            font-size: 1rem;
                        ">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <input type="email" placeholder="Email Address" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            font-size: 1rem;
                        ">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <input type="tel" placeholder="Phone Number" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            font-size: 1rem;
                        ">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <select required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            font-size: 1rem;
                        ">
                            <option value="">Number of Locations</option>
                            <option value="1">1 Location</option>
                            <option value="2-3">2-3 Locations</option>
                            <option value="4-10">4-10 Locations</option>
                            <option value="10+">10+ Locations</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary" style="
                        width: 100%;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 12px 24px;
                        border: none;
                        border-radius: 8px;
                        font-weight: 500;
                        cursor: pointer;
                        font-size: 1rem;
                    ">Schedule My Demo</button>
                </form>
            </div>
        </div>
    `;
    
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = modalHTML;
    const modal = modalDiv.firstElementChild;
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal;
    
    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) modal.remove();
    });
    
    // Form submission
    const form = modal.querySelector('.demo-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Here you would typically send the form data to your backend
        alert('Thank you! We\'ll contact you within 24 hours to schedule your demo.');
        modal.remove();
    });
    
    return modal;
}

// Scroll animations
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

// Observe elements for animation
document.querySelectorAll('.feature-card, .problem-item, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading states to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.type !== 'submit') return;
        
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 2000);
    });
});