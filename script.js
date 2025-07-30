// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSkillCircles();
    initTypingEffect();
    initParticles();
    initSmoothScrolling();
    initThemeToggle();
    initFloatingNavigation();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(12, 12, 12, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(12, 12, 12, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animateElements = document.querySelectorAll('.section-header, .about-content, .skill-item, .project-card, .achievement-card, .internship-card, .education-card, .contact-item');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skill circles animation
function initSkillCircles() {
    const skillCircles = document.querySelectorAll('.circle-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const percentage = circle.getAttribute('data-percentage');
                
                setTimeout(() => {
                    const angle = (percentage / 100) * 360;
                    circle.style.background = `conic-gradient(from 0deg, #00d4ff 0deg, #ff00ff ${angle}deg, rgba(255, 255, 255, 0.1) ${angle}deg)`;
                }, 500);
                
                skillObserver.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });

    skillCircles.forEach(circle => {
        skillObserver.observe(circle);
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    const nameSpan = heroTitle.querySelector('.highlight');
    const nameText = nameSpan.textContent;
    
    // Clear the title
    heroTitle.innerHTML = 'Hi, I\'m <span class="highlight"></span>';
    const newNameSpan = heroTitle.querySelector('.highlight');
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (i < nameText.length) {
            newNameSpan.textContent += nameText.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Add cursor blink effect
            newNameSpan.style.borderRight = '2px solid #00d4ff';
            newNameSpan.style.animation = 'blink 1s infinite';
            
            // Remove cursor after 3 seconds
            setTimeout(() => {
                newNameSpan.style.borderRight = 'none';
                newNameSpan.style.animation = 'none';
            }, 3000);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

// Particle background effect
function initParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#00d4ff';
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card, .achievement-card, .internship-card, .education-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    const loaderStyles = `
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
            color: #ffffff;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 212, 255, 0.3);
            border-top: 3px solid #00d4ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loaderStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(loader);
    
    // Hide loader after 2 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
            styleSheet.remove();
        }, 500);
    }, 2000);
});

// Add CSS for blink animation
const blinkStyles = `
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: #00d4ff; }
    }
`;

const blinkStyleSheet = document.createElement('style');
blinkStyleSheet.textContent = blinkStyles;
document.head.appendChild(blinkStyleSheet);

// Add mouse cursor trail effect
document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
});

// Add cursor trail styles
const cursorTrailStyles = `
    .cursor-trail {
        position: fixed;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, #00d4ff, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: trailFade 1s ease-out forwards;
    }
    
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;

const cursorStyleSheet = document.createElement('style');
cursorStyleSheet.textContent = cursorTrailStyles;
document.head.appendChild(cursorStyleSheet);

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';

const progressStyles = `
    .scroll-progress {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 999;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(45deg, #00d4ff, #ff00ff);
        width: 0%;
        transition: width 0.1s ease;
    }
`;

const progressStyleSheet = document.createElement('style');
progressStyleSheet.textContent = progressStyles;
document.head.appendChild(progressStyleSheet);
document.body.appendChild(progressBar);

// Update progress bar on scroll
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    document.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
});

// Add floating action button for scroll to top
const fabButton = document.createElement('div');
fabButton.className = 'fab-button';
fabButton.innerHTML = '<i class="fas fa-arrow-up"></i>';

const fabStyles = `
    .fab-button {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(45deg, #00d4ff, #ff00ff);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
    }
    
    .fab-button.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .fab-button:hover {
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 8px 30px rgba(0, 212, 255, 0.5);
    }
    
    .fab-button i {
        color: #ffffff;
        font-size: 1.2rem;
    }
`;

const fabStyleSheet = document.createElement('style');
fabStyleSheet.textContent = fabStyles;
document.head.appendChild(fabStyleSheet);
document.body.appendChild(fabButton);

// Show/hide FAB button based on scroll position
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        fabButton.classList.add('visible');
    } else {
        fabButton.classList.remove('visible');
    }
});

// Scroll to top when FAB is clicked
fabButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add contact form functionality (if needed in future)
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form submission logic here
            const formData = new FormData(this);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Message sent successfully!';
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #00d4ff, #ff00ff);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                z-index: 10000;
                animation: fadeInOut 3s ease forwards;
            `;
            
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
            
            // Reset form
            this.reset();
        });
    }
}

// Initialize contact form
initContactForm();

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    let currentTheme = 1;
    const totalThemes = 4;
    
    themeToggle.addEventListener('click', function() {
        // Remove current theme class
        document.body.classList.remove(`theme-${currentTheme}`);
        
        // Move to next theme
        currentTheme = currentTheme >= totalThemes ? 1 : currentTheme + 1;
        
        // Apply new theme class (except for theme-1 which is default)
        if (currentTheme > 1) {
            document.body.classList.add(`theme-${currentTheme}`);
        }
        
        // Add rotation animation to toggle button
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
        
        // Store theme preference
        localStorage.setItem('portfolioTheme', currentTheme);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme) {
        currentTheme = parseInt(savedTheme);
        if (currentTheme > 1) {
            document.body.classList.add(`theme-${currentTheme}`);
        }
    }
}

// Floating Navigation functionality
function initFloatingNavigation() {
    const floatingNavToggle = document.getElementById('floating-nav-toggle');
    const floatingNavMenu = document.getElementById('floating-nav-menu');
    const floatingNavLinks = document.querySelectorAll('.floating-nav-link');

    // Toggle floating menu
    floatingNavToggle.addEventListener('click', function() {
        floatingNavToggle.classList.toggle('active');
        floatingNavMenu.classList.toggle('active');
    });

    // Close floating menu when clicking on a link
    floatingNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            floatingNavToggle.classList.remove('active');
            floatingNavMenu.classList.remove('active');
        });
    });

    // Close floating menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.floating-nav')) {
            floatingNavToggle.classList.remove('active');
            floatingNavMenu.classList.remove('active');
        }
    });

    // Add stagger animation to menu items
    floatingNavLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
    });
}

