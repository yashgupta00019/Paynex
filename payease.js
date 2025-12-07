function initStickyHeader() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
            }
        }, 20);
    };
    
    counters.forEach(animateCounter);
}

function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    const toggleIcon = () => {
        const icon = navToggle.querySelector('i');
        if (!icon) return;
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    };

    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        toggleIcon();
    });

    // Close menu when a navigation link is clicked (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
                toggleIcon();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (ev) => {
        if (!navMenu.classList.contains('active')) return;
        const target = ev.target;
        if (!navMenu.contains(target) && !navToggle.contains(target)) {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            const icon = navToggle.querySelector('i');
            if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
        }
    });
}

// Initialize everything after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    animateCounters();
    initMobileMenu();
});
