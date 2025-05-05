/*=============== STRICT MODE & CONSOLE LOG ===============*/
'use strict';
console.log("Portfolio Script Initializing - Final Polish v2 + Date");

/*=============== DATE DISPLAY ===============*/
function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (!dateElement) return; // Exit if element not found

    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    // Example formatting: "Sunday, April 14" or adjust options as needed
    const formattedDate = now.toLocaleDateString('en-US', options);

    dateElement.textContent = formattedDate;
}

/*=============== HEADER SCROLL EFFECT & ACTIVE LINK ===============*/
const header = document.querySelector('.main-header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section[id]'); // Target sections with IDs

function handleScroll() {
    // Header Styling
    if (header) { // Check if header exists
        header.classList.toggle('scrolled', window.scrollY > 50);
    }

    // Active Nav Link
    let currentSectionId = '';
    const scrollY = window.pageYOffset;
    const headerHeight = header ? header.offsetHeight : 70; // Estimate if header not found

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50; // Adjust offset
        if (scrollY >= sectionTop) {
            currentSectionId = section.getAttribute('id');
        }
    });

    // Highlight the correct nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check if the link's href matches the current section ID
        // Special case for the first section (hero) needs careful handling
         if (link.getAttribute('href') === `#${currentSectionId}` || (scrollY < (sections[0]?.offsetTop || 0) - headerHeight - 50 && link.getAttribute('href') === '#hero')) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', handleScroll, { passive: true });

/*=============== SCROLL UP BUTTON ===============*/
const scrollUpButton = document.getElementById('scroll-up');

function toggleScrollUp() {
    if (scrollUpButton) {
        scrollUpButton.classList.toggle('show-scroll', window.scrollY >= 600); // Show later
    }
}
window.addEventListener('scroll', toggleScrollUp, { passive: true });

if (scrollUpButton) {
    scrollUpButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/*=============== INTERSECTION OBSERVER FOR REVEAL ANIMATIONS ===============*/
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserverOptions = {
    root: null,
    threshold: 0.1, // Adjust threshold if needed
    rootMargin: '0px 0px -40px 0px' // Trigger slightly earlier
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add delay if specified
            const delay = entry.target.dataset.revealDelay || '0';
            entry.target.style.transitionDelay = `${delay}s`;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once revealed
        }
        // No 'else' needed if we don't want elements to hide again
    });
};

const revealObserver = new IntersectionObserver(revealCallback, revealObserverOptions);

revealElements.forEach(element => {
    // Removed adding reveal--type class here as CSS uses data attribute directly
    revealObserver.observe(element);
});


/*=============== HAMBURGER MENU TOGGLE ===============*/
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburgerMenu && mobileMenu) {
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a mobile nav link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/*=============== INITIALIZATION ON DOM CONTENT LOADED ===============*/
document.addEventListener('DOMContentLoaded', () => {
    displayCurrentDate(); // Display the date once the DOM is ready
    handleScroll(); // Initial check for header and active links
});

/*=============== REMOVE PRELOAD CLASS AFTER FULL LOAD ===============*/
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 150); // Slightly longer delay
});

console.log("Portfolio Script Fully Initialized - Polished & Impressive + Date!");

/*=============== (Optional) Custom Cursor Code - Keep commented if not using ===============*/
/*
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
if (cursorDot && cursorOutline) { ... }
*/