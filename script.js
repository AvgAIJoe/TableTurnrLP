// Feature Tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

// ROI Calculator functionality
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

// Google Forms Integration Function
function openDemoForm() {
    const modal = createDemoModal();
    document.body.appendChild(modal);
}

function createDemoModal() {
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
                max-height: 90vh;
                overflow-y: auto;
            ">
                <button class="modal-close" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    z-index: 10;
                ">&times;</button>
                
                <h3 style="margin-bottom: 1rem; color: #333; font-size: 1.5rem;">Request Your TableTurnr Demo</h3>
                <p style="margin-bottom: 2rem; color: #666; line-height: 1.5;">
                    See how TableTurnr can save your restaurant thousands of dollars. Fill out the form below and we'll schedule a personalized demo for you.
                </p>
                
                <form class="demo-form" id="googleForm">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">Restaurant Name *</label>
                        <input type="text" name="restaurant_name" placeholder="e.g., Tony's Italian Bistro" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            font-size: 1rem;
                            box-sizing: border-box;
                        ">
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">Your Name *</label>
                        <input type="text" name="contact_name" placeholder="e.g., John Smith" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            font-size: 1rem;
                            box-sizing: border-box;
                        ">
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">Email Address *</label>
                        <input type="email" name="email" placeholder="e.g., john@restaurant.com" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            font-size: 1rem;
                            box-sizing: border-box;
                        ">
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">Phone Number *</label>
                        <input type="tel" name="phone" placeholder="e.g., (555) 123-4567" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            font-size: 1rem;
                            box-sizing: border-box;
                        ">
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">Number of Locations *</label>
                        <select name="locations" required style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            font-size: 1rem;
                            box-sizing: border-box;
                        ">
                            <option value="">Select number of locations</option>
                            <option value="1">1 Location</option>
                            <option value="2-3">2-3 Locations</option>
                            <option value="4-10">4-10 Locations</option>
                            <option value="10+">10+ Locations</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">Monthly Revenue (Optional)</label>
                        <select name="revenue" style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            font-size: 1rem;
                            box-sizing: border-box;
                        ">
                            <option value="">Select monthly revenue</option>
                            <option value="under-25k">Under $25,000</option>
                            <option value="25k-50k">$25,000 - $50,000</option>
                            <option value="50k-100k">$50,000 - $100,000</option>
                            <option value="100k-250k">$100,000 - $250,000</option>
                            <option value="250k+">$250,000+</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #333;">What's your biggest challenge? (Optional)</label>
                        <textarea name="challenge" placeholder="e.g., Managing inventory, reducing food waste, staff scheduling..." style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid #e5e7eb;
                            border-radius: 8px;
                            font-size: 1rem;
                            box-sizing: border-box;
                            height: 80px;
                            resize: vertical;
                        "></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="
                        width: 100%;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 15px 24px;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: transform 0.2s ease;
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        <span>Schedule My Demo</span>
                        <i class="fas fa-calendar" style="margin-left: 8px;"></i>
                    </button>
                    
                    <p style="margin-top: 1rem; font-size: 0.85rem; color: #666; text-align: center;">
                        We'll contact you within 24 hours to schedule your personalized demo
                    </p>
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
    
    // Form submission to Google Forms
    const form = modal.querySelector('.demo-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        try {
            // Submit to Google Forms
            await submitToGoogleForms(data);
            
            // Show success message
            modal.innerHTML = `
                <div style="padding: 3rem; text-align: center; background: white; border-radius: 16px;">
                    <div style="font-size: 3rem; color: #10b981; margin-bottom: 1rem;">✅</div>
                    <h3 style="color: #333; margin-bottom: 1rem;">Demo Request Submitted!</h3>
                    <p style="color: #666; margin-bottom: 2rem; line-height: 1.5;">
                        Thank you for your interest in TableTurnr! We'll contact you within 24 hours to schedule your personalized demo.
                    </p>
                    <button onclick="this.closest('.modal-overlay').remove()" style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 12px 24px;
                        border: none;
                        border-radius: 8px;
                        font-weight: 500;
                        cursor: pointer;
                        font-size: 1rem;
                    ">Close</button>
                </div>
            `;
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Reset button and show error
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            alert('There was an error submitting your request. Please try again or contact us directly.');
        }
    });
    
    return modal;
}

// Function to submit data to Google Forms
async function submitToGoogleForms(data) {
    // Your actual Google Forms URL
    const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfXBm8cC0y8lGNiJ0dJqZKXdVGH6N4bKgYDZcKhxvCsqFH0Nw/formResponse';
    
    try {
        // Create form data for Google Forms submission
        const googleFormData = new FormData();
        
        // Map form data to Google Forms fields (you'll need to update these entry IDs)
        // To get correct entry IDs: View page source of your form and search for "entry."
        googleFormData.append('entry.123456789', data.restaurant_name || ''); // Restaurant Name
        googleFormData.append('entry.987654321', data.contact_name || '');    // Contact Name  
        googleFormData.append('entry.555666777', data.email || '');          // Email
        googleFormData.append('entry.111222333', data.phone || '');          // Phone
        googleFormData.append('entry.444555666', data.locations || '');      // Locations
        googleFormData.append('entry.777888999', data.revenue || '');        // Revenue
        googleFormData.append('entry.000111222', data.challenge || '');      // Challenge
        
        // Submit to Google Forms
        await fetch(GOOGLE_FORMS_URL, {
            method: 'POST',
            body: googleFormData,
            mode: 'no-cors' // Required for Google Forms
        });
        
        // Send email notification to chandan.dce07@gmail.com
        await sendEmailNotification(data);
        
    } catch (error) {
        console.warn('Google Forms submission failed:', error);
        // Continue anyway - we still have localStorage backup
    }
    
    // Always save to localStorage as backup
    const leads = JSON.parse(localStorage.getItem('tableturner_leads') || '[]');
    leads.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('tableturner_leads', JSON.stringify(leads));
}

// Function to send email notification
async function sendEmailNotification(data) {
    // Email webhook URL (you'll need to set this up with Google Apps Script)
    const EMAIL_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
    
    try {
        await fetch(EMAIL_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: 'chandan.dce07@gmail.com',
                subject: `🚨 New TableTurnr Demo Request - ${data.restaurant_name}`,
                restaurant_name: data.restaurant_name,
                contact_name: data.contact_name,
                email: data.email,
                phone: data.phone,
                locations: data.locations,
                revenue: data.revenue,
                challenge: data.challenge,
                timestamp: new Date().toISOString()
            })
        });
    } catch (error) {
        console.warn('Email notification failed:', error);
        // Don't throw error - form submission should still succeed
    }
}

// Legacy function for backwards compatibility
function createModal() {
    return createDemoModal();
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