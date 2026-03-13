document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenuBtn = document.querySelector('#mobileMenuBtn');
    const nav = document.querySelector('.nav');
    const navOverlay = document.querySelector('.nav-overlay');
    const filterFAB = document.querySelector('#filterFAB');
    const filterSidebar = document.querySelector('.filter-sidebar');

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        nav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    if (mobileToggle) mobileToggle.addEventListener('click', toggleMenu);
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if (navOverlay) navOverlay.addEventListener('click', toggleMenu);

    // Filter FAB
    if (filterFAB && filterSidebar) {
        filterFAB.addEventListener('click', () => {
            filterSidebar.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});
