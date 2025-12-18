// Fermer le menu quand on clique sur un lien
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.checked = false;
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar hide/show au scroll (seulement sur desktop)
const isDesktopView = () => window.innerWidth > 968;

if (isDesktopView()) {
    let lastScrollTop = 0;
    let isHidden = false;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        // Ne rien faire si le menu est ouvert
        if (menuToggle.checked) return;

        let scrollTop = window.scrollY;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling DOWN
            if (!isHidden) {
                header.style.transform = 'translateY(-100%)';
                isHidden = true;
            }
        } else if (scrollTop < lastScrollTop) {
            // Scrolling UP
            if (isHidden) {
                header.style.transform = 'translateY(0)';
                isHidden = false;
            }
        }

        lastScrollTop = scrollTop;
    }, { passive: true });
}

// Bloquer le scroll quand le menu est ouvert
menuToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Animation du + qui devient flèche au hover
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    const svg = button.querySelector('svg');
    const originalSVG = svg.outerHTML;
    
    // SVG flèche vers la droite
    const arrowSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
    
    button.addEventListener('mouseenter', () => {
        const currentSvg = button.querySelector('svg');
        currentSvg.classList.add('fade-out');
        setTimeout(() => {
            const svg = button.querySelector('svg');
            if (svg) svg.outerHTML = arrowSVG;
            const newSvg = button.querySelector('svg');
            if (newSvg) {
                newSvg.classList.remove('fade-out');
                newSvg.classList.add('fade-in');
            }
        }, 150);
    });
    
    button.addEventListener('mouseleave', () => {
        const currentSvg = button.querySelector('svg');
        if (currentSvg) {
            currentSvg.classList.remove('fade-in');
            currentSvg.classList.add('fade-out');
            setTimeout(() => {
                const svg = button.querySelector('svg');
                if (svg) svg.outerHTML = originalSVG;
                const newSvg = button.querySelector('svg');
                if (newSvg) {
                    newSvg.classList.remove('fade-out');
                    newSvg.classList.add('fade-in');
                }
            }, 150);
        }
    });
});
