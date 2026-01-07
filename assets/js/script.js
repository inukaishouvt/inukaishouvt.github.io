document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
        // Simple toggle for now, could be expanded for better mobile UX
        const icon = menuBtn.querySelector('i');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            icon.classList.replace('fa-xmark', 'fa-bars');
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 12, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            icon.classList.replace('fa-bars', 'fa-xmark');
        }
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for Nav Links (already handled by CSS scroll-behavior: smooth, 
    // but this ensures it works across all browsers and handles offset)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    menuBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
                }
            }
        });
    });
});

// Hero Text Rotator
const dynamicText = document.getElementById('dynamic-text');
const phrases = [
    "FAILED IDOL WOLF",
    "FULL-STACK DEVELOPER",
    "CHILL VTUBER",
    "CREATIVE STREAMER",
    "UI/UX DESIGNER",
    "TRILINGUAL CODER",
    "WOLF BOY"
];

let phraseIndex = 0;

function rotateText() {
    if (!dynamicText) return;

    // Smooth transition: fade out and slightly move down
    dynamicText.style.opacity = '0';
    dynamicText.style.transform = 'translateY(10px)';

    setTimeout(() => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        dynamicText.textContent = phrases[phraseIndex];

        // Fade in and move back to original position
        dynamicText.style.opacity = '1';
        dynamicText.style.transform = 'translateY(0)';
    }, 500);
}

// Initial setup for smooth transition
if (dynamicText) {
    dynamicText.style.transition = 'all 0.5s ease-in-out';
    dynamicText.style.display = 'inline-block';

    // Start rotation interval (every 2.5 seconds)
    setInterval(rotateText, 2500);
}
