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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Animated background with teeth patterns
const animatedBg = document.getElementById('animatedBg');
let scrollPosition = 0;

function createToothPattern() {
    const tooth = document.createElement('div');
    tooth.className = 'floating-tooth';
    tooth.style.cssText = `
        position: absolute;
        width: 40px;
        height: 50px;
        opacity: 0.05;
        pointer-events: none;
    `;
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 120');
    svg.setAttribute('fill', '#4a90e2');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M50 10 C40 10 35 15 35 25 C35 35 30 40 30 50 L30 90 C30 105 35 115 50 115 C65 115 70 105 70 90 L70 50 C70 40 65 35 65 25 C65 15 60 10 50 10 Z');
    
    svg.appendChild(path);
    tooth.appendChild(svg);
    
    // Random position
    tooth.style.left = Math.random() * 100 + '%';
    tooth.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    tooth.style.animation = `floatTooth ${15 + Math.random() * 10}s ease-in-out infinite`;
    tooth.style.animationDelay = Math.random() * 5 + 's';
    
    animatedBg.appendChild(tooth);
}

// Create multiple tooth patterns
for (let i = 0; i < 15; i++) {
    createToothPattern();
}

// Add CSS animation for floating teeth
const style = document.createElement('style');
style.textContent = `
    @keyframes floatTooth {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.03;
        }
        25% {
            transform: translate(20px, -30px) rotate(5deg);
            opacity: 0.06;
        }
        50% {
            transform: translate(-10px, 20px) rotate(-3deg);
            opacity: 0.05;
        }
        75% {
            transform: translate(15px, 10px) rotate(2deg);
            opacity: 0.04;
        }
    }
`;
document.head.appendChild(style);

// Change background pattern on scroll
window.addEventListener('scroll', () => {
    scrollPosition = window.pageYOffset;
    const teeth = document.querySelectorAll('.floating-tooth');
    
    teeth.forEach((tooth, index) => {
        const speed = 0.1 + (index % 3) * 0.05;
        const yPos = scrollPosition * speed;
        tooth.style.transform = `translateY(${yPos}px) rotate(${scrollPosition * 0.05}deg)`;
    });
});

// Scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.commitment-card, .testimonial-card, .about-content, .appointment-content');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('scroll-reveal', 'active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Initialize scroll reveal class
document.querySelectorAll('.commitment-card, .testimonial-card, .about-content, .appointment-content').forEach(el => {
    el.classList.add('scroll-reveal');
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Add mobile menu styles dynamically
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
    @media (max-width: 968px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: left 0.3s ease;
            gap: 1rem;
        }
        
        .nav-links.active {
            left: 0;
            display: flex;
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
document.head.appendChild(mobileStyle);

// Form submission
const appointmentForm = document.getElementById('appointmentForm');
const successModal = document.getElementById('successModal');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(appointmentForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!data.nombre || !data.telefono || !data.fecha || !data.hora) {
            alert('Por favor completa todos los campos obligatorios.');
            return;
        }
        
        // Validate phone number (basic validation)
        const phoneRegex = /^[0-9]{10}$/;
        const cleanPhone = data.telefono.replace(/\D/g, '');
        
        if (!phoneRegex.test(cleanPhone)) {
            alert('Por favor ingresa un número de teléfono válido (10 dígitos).');
            return;
        }
        
        // Validate date is in the future
        const selectedDate = new Date(data.fecha);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Por favor selecciona una fecha futura.');
            return;
        }
        
        // In a real application, this would send data to a server
        console.log('Appointment request:', data);
        
        // Show success modal
        successModal.classList.add('active');
        
        // Reset form
        appointmentForm.reset();
        
        // Close modal after 5 seconds
        setTimeout(() => {
            closeModal();
        }, 5000);
    });
}

// Close modal function
function closeModal() {
    successModal.classList.remove('active');
}

// Close modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

// Add parallax effect to hero section
const heroSection = document.querySelector('.hero');
const toothIllustration = document.querySelector('.tooth-illustration');

window.addEventListener('scroll', () => {
    if (heroSection && toothIllustration) {
        const scrolled = window.pageYOffset;
        const heroTop = heroSection.offsetTop;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrolled < heroTop + heroHeight) {
            const parallaxSpeed = 0.5;
            toothIllustration.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }
});

// Add hover effect to info cards
document.querySelectorAll('.info-card, .contact-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Animate numbers (could be used for statistics if added later)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Enhance form inputs with animations
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Set minimum date for appointment form to today
const dateInput = document.getElementById('fecha');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Add entrance animation to sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

console.log('🦷 Dental Landing Page Initialized Successfully!');
