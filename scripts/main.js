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
        // Ensure filter sidebar is closed when menu opens
        if (filterSidebar) filterSidebar.classList.remove('active');
    };

    if (mobileToggle) mobileToggle.addEventListener('click', toggleMenu);
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    
    // Close everything when overlay is clicked
    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
            if (filterSidebar) filterSidebar.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }

    // Filter FAB
    if (filterFAB && filterSidebar) {
        filterFAB.addEventListener('click', () => {
            filterSidebar.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            // Ensure nav is closed when filter opens
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    }

    // Product Filtering Logic
    const filterLinks = document.querySelectorAll('.filter-list a');
    const productCards = document.querySelectorAll('.product-card');

    if (filterLinks.length > 0) {
        filterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get filter type and value
                const filterValue = link.getAttribute('data-filter');
                
                // Update active state
                link.closest('.filter-list').querySelectorAll('a').forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Filter cards
                productCards.forEach(card => {
                    const category = card.getAttribute('data-category')?.toLowerCase() || "";
                    const brand = card.getAttribute('data-brand')?.toLowerCase() || "";

                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else if (category === filterValue || brand === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Auto-close sidebar on mobile after filtering
                if (window.innerWidth <= 768 && filterSidebar.classList.contains('active')) {
                    filterSidebar.classList.remove('active');
                    navOverlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
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
