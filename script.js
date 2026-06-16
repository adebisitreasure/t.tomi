// Custom circular cursor
(function () {
    // don't enable on touch devices
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor hidden';
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posX = mouseX;
    let posY = mouseY;
    const ease = 0.18;

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.remove('hidden');
    });

    function animate() {
        posX = lerp(posX, mouseX, ease);
        posY = lerp(posY, mouseY, ease);
        cursor.style.left = posX + 'px';
        cursor.style.top = posY + 'px';
        requestAnimationFrame(animate);
    }

    animate();

    // selectors for interactive and text elements
    const interactiveSelector = 'a, button, input, textarea, label, .work-card, .service-card, .nav-items a, .contact-link';
    const textSelector = 'p, h1, h2, h3, h4, h5, span, li, .work-title, .work-category, .about-text, .hero-copy';

    document.addEventListener('mouseover', (e) => {
        const el = e.target;
        try {
            if (el.matches && el.matches(interactiveSelector)) {
                cursor.classList.add('cursor--hover');
            } else if (el.matches && el.matches(textSelector)) {
                cursor.classList.add('cursor--text');
            }
        } catch (err) {
            // ignore
        }
    });

    document.addEventListener('mouseout', (e) => {
        const el = e.target;
        try {
            if (el.matches && el.matches(interactiveSelector)) {
                cursor.classList.remove('cursor--hover');
            } else if (el.matches && el.matches(textSelector)) {
                cursor.classList.remove('cursor--text');
            }
        } catch (err) {
            // ignore
        }
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor--active');
    });
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor--active');
    });

    document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));
    document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));

})();

// Lightbox modal for work cards
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const workCards = document.querySelectorAll('.work-card');

    const openLightbox = (imageSrc) => {
        lightboxImage.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    workCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const bgImage = card.querySelector('.work-image').style.backgroundImage;
            const imageSrc = bgImage.replace(/url\(["'](.+)["']\)/, '$1');
            openLightbox(imageSrc);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});

