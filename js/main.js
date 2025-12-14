// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const isExpanded = mainNav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
}

// ==========================================
// HEADER CTA DROPDOWN TOGGLE
// ==========================================
const headerCta = document.getElementById('headerCta');
const headerCtaBtn = document.getElementById('headerCtaBtn');

if (headerCtaBtn && headerCta) {
    headerCtaBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        headerCta.classList.toggle('active');
        const isExpanded = headerCta.classList.contains('active');
        headerCtaBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close CTA dropdown when clicking outside
    document.addEventListener('click', () => {
        headerCta.classList.remove('active');
        headerCtaBtn.setAttribute('aria-expanded', 'false');
    });

    // Prevent dropdown from closing when clicking inside it
    const ctaDropdown = headerCta.querySelector('.cta-dropdown');
    if (ctaDropdown) {
        ctaDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// ==========================================
// RIGHT SIDE NAVIGATION - ACTIVE STATE & PATH ANIMATION
// ==========================================
const rightNavItems = document.querySelectorAll('.right-nav-item');
const navPathProgress = document.getElementById('navPathProgress');
const sections = document.querySelectorAll('section');

// Click handler for nav items
rightNavItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Keyboard accessibility
    item.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Scroll handler for active state and path animation
function updateNavigation() {
    let current = '';
    let scrollProgress = 0;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
            
            // Calculate scroll progress for path animation
            const sectionProgress = (window.scrollY - sectionTop + 200) / sectionHeight;
            scrollProgress = (index / sections.length) + (sectionProgress / sections.length);
        }
    });

    // Update active state
    rightNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });

    // Animate path progress
    if (navPathProgress) {
        const totalHeight = 400;
        const progressHeight = Math.min(scrollProgress * totalHeight, totalHeight);
        const dashOffset = 400 - progressHeight;
        navPathProgress.style.strokeDashoffset = dashOffset;
    }
}

// Throttle scroll event for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(updateNavigation);
});

// Initial call
updateNavigation();

// ==========================================
// ANIMATED COUNTER - STATS SECTION
// ==========================================
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==========================================
// CAPABILITY CARDS FADE-IN ANIMATION
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all capability cards
document.querySelectorAll('.capability-card').forEach(card => {
    sectionObserver.observe(card);
});

// ==========================================
// SECONDARY BUTTON ACTIONS
// ==========================================
const secondaryButtons = document.querySelectorAll('.btn-secondary');
secondaryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const capabilitiesSection = document.querySelector('#capabilities');
        if (capabilitiesSection) {
            capabilitiesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// HEADER SHADOW ON SCROLL
// ==========================================
const header = document.querySelector('.header');

function updateHeaderShadow() {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'var(--shadow-light-1), var(--shadow-light-2)';
    }
}

// Throttle scroll event
let shadowTimeout;
window.addEventListener('scroll', () => {
    if (shadowTimeout) {
        window.cancelAnimationFrame(shadowTimeout);
    }
    shadowTimeout = window.requestAnimationFrame(updateHeaderShadow);
});

// Initial call
updateHeaderShadow();

// ==========================================
// DROPDOWN MENU ACCESSIBILITY
// ==========================================
const dropdownButtons = document.querySelectorAll('.nav-link.has-dropdown');

dropdownButtons.forEach(button => {
    const navItem = button.parentElement;
    const dropdownMenu = navItem.querySelector('.dropdown-menu');

    // Toggle dropdown on click
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        // Close all other dropdowns
        dropdownButtons.forEach(otherButton => {
            if (otherButton !== button) {
                otherButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle current dropdown
        button.setAttribute('aria-expanded', !isExpanded);
    });

    // Keyboard navigation
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
        } else if (e.key === 'Escape') {
            button.setAttribute('aria-expanded', 'false');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!navItem.contains(e.target)) {
            button.setAttribute('aria-expanded', 'false');
        }
    });
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignore empty hash
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
});

// ==========================================
// PERFORMANCE: LAZY LOADING IMAGES
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// CONSOLE LOG - DEVELOPMENT INFO
// ==========================================
console.log('%cAVA Engineering Website', 'color: #5ec32b; font-size: 20px; font-weight: bold;');
console.log('%cPlastic Injection Mould Manufacturer', 'color: #151f49; font-size: 14px;');
console.log('Website loaded successfully ✓');
