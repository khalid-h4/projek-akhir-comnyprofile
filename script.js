/* =============================================
   BENGKEL RADIATOR SONY JAYA — script.js
============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ===== PRELOADER ===== */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // After preloader, trigger hero animations
            document.querySelectorAll('.hero-badge, .hero-title, .hero-desc, .hero-actions, .hero-stats')
                .forEach(el => el.style.animationPlayState = 'running');
        }, 1800);
    });


    /* ===== HEADER SCROLL ===== */
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        updateActiveNav();
    }, { passive: true });

    /* ===== BACK TO TOP ===== */
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    /* ===== HAMBURGER MENU ===== */
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close nav when link clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });


    /* ===== ACTIVE NAV LINK ===== */
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top    = section.offsetTop;
            const height = section.offsetHeight;
            const id     = section.getAttribute('id');
            const link   = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }


    /* ===== ANIMATED COUNTER (Hero Stats) ===== */
    const statNums = document.querySelectorAll('.stat-num[data-target]');
    let statsAnimated = false;

    function animateCounters() {
        if (statsAnimated) return;
        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;
        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            statsAnimated = true;
            statNums.forEach(num => {
                const target   = +num.dataset.target;
                const suffix   = num.textContent.includes('+') ? '+' : (num.dataset.target === '100' ? '%' : '+');
                const duration = 2000;
                const step     = target / (duration / 16);
                let current    = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    num.textContent = Math.floor(current) + suffix;
                }, 16);
            });
        }
    }


    /* ===== PARTICLES ===== */
    const particlesContainer = document.getElementById('particles');
    function createParticles() {
        if (!particlesContainer) return;
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size    = Math.random() * 3 + 1;
            const left    = Math.random() * 100;
            const delay   = Math.random() * 8;
            const dur     = Math.random() * 8 + 8;
            const opacity = Math.random() * 0.6 + 0.2;
            p.style.cssText = `
                width:${size}px; height:${size}px;
                left:${left}%;
                bottom:${Math.random() * 20}%;
                opacity:0;
                animation-delay:${delay}s;
                animation-duration:${dur}s;
                background:${Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)'};
                box-shadow: 0 0 ${size * 2}px currentColor;
            `;
            particlesContainer.appendChild(p);
        }
    }
    createParticles();


    /* ===== SCROLL REVEAL ===== */
    const revealElements = document.querySelectorAll(
        '.service-card, .why-item, .contact-card, .gallery-item, .about-text, .about-visual, .why-text, .why-visual, .tc-main, .tc-side, .stat-item, .feature-item'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));


    /* ===== COUNTER OBSERVER ===== */
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);


    /* ===== SMOOTH SCROLL for hash links ===== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    /* ===== CARD HOVER TILT EFFECT ===== */
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect   = card.getBoundingClientRect();
            const x      = e.clientX - rect.left;
            const y      = e.clientY - rect.top;
            const cx     = rect.width  / 2;
            const cy     = rect.height / 2;
            const tiltX  = (y - cy) / cy * 5;
            const tiltY  = (cx - x) / cx * 5;
            card.style.transform = `translateY(-8px) perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });


    /* ===== GALLERY LIGHTBOX ===== */
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id    = 'lightbox';
    lightbox.innerHTML = `
        <div class="lb-overlay"></div>
        <button class="lb-close" aria-label="Tutup"><i class="fa-solid fa-xmark"></i></button>
        <button class="lb-prev"  aria-label="Sebelumnya"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="lb-next"  aria-label="Berikutnya"><i class="fa-solid fa-chevron-right"></i></button>
        <div class="lb-content">
            <img src="" alt="" class="lb-img">
            <div class="lb-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Lightbox styles
    const lbStyle = document.createElement('style');
    lbStyle.textContent = `
        #lightbox {
            position: fixed; inset: 0; z-index: 99998;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; pointer-events: none;
            transition: opacity 0.3s ease;
        }
        #lightbox.open { opacity: 1; pointer-events: all; }
        .lb-overlay {
            position: absolute; inset: 0;
            background: rgba(0,0,0,0.92);
            backdrop-filter: blur(8px);
        }
        .lb-content {
            position: relative; z-index: 2;
            max-width: 90vw; max-height: 85vh;
            text-align: center;
        }
        .lb-img {
            max-width: 100%; max-height: 80vh;
            object-fit: contain; border-radius: 12px;
            box-shadow: 0 30px 80px rgba(0,0,0,0.7);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        #lightbox.open .lb-img { transform: scale(1); }
        .lb-caption {
            margin-top: 16px; color: rgba(255,255,255,0.7);
            font-size: 0.9rem;
        }
        .lb-close, .lb-prev, .lb-next {
            position: fixed; z-index: 3;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.15);
            color: #fff; cursor: pointer;
            backdrop-filter: blur(10px);
            border-radius: 50%; font-size: 1.1rem;
            transition: background 0.2s ease, transform 0.2s ease;
        }
        .lb-close:hover, .lb-prev:hover, .lb-next:hover {
            background: var(--primary); transform: scale(1.1);
        }
        .lb-close {
            top: 24px; right: 24px;
            width: 46px; height: 46px;
            display: flex; align-items: center; justify-content: center;
        }
        .lb-prev {
            left: 24px; top: 50%; transform: translateY(-50%);
            width: 50px; height: 50px;
            display: flex; align-items: center; justify-content: center;
        }
        .lb-next {
            right: 24px; top: 50%; transform: translateY(-50%);
            width: 50px; height: 50px;
            display: flex; align-items: center; justify-content: center;
        }
        .lb-prev:hover { transform: translateY(-50%) scale(1.1); }
        .lb-next:hover { transform: translateY(-50%) scale(1.1); }
    `;
    document.head.appendChild(lbStyle);

    let currentIndex = 0;
    const imgs = [...galleryItems].map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt,
        cap: item.querySelector('.gallery-overlay span')?.textContent || ''
    }));

    function openLightbox(index) {
        currentIndex = index;
        const lbImg = lightbox.querySelector('.lb-img');
        const lbCap = lightbox.querySelector('.lb-caption');
        lbImg.src = imgs[index].src;
        lbImg.alt = imgs[index].alt;
        lbCap.textContent = imgs[index].cap;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }
    function showNext() {
        openLightbox((currentIndex + 1) % imgs.length);
    }
    function showPrev() {
        openLightbox((currentIndex - 1 + imgs.length) % imgs.length);
    }

    galleryItems.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(i));
    });
    lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lb-overlay').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lb-next').addEventListener('click', showNext);
    lightbox.querySelector('.lb-prev').addEventListener('click', showPrev);
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape')     closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft')  showPrev();
    });


    /* ===== HEADER NAV UNDERLINE ON LOAD ===== */
    updateActiveNav();


    /* ===== TYPING EFFECT (optional hero sub-text) ===== */
    // Nothing needed — animations handled via CSS


    console.log('%c🔧 Bengkel Radiator Sony Jaya', 'color:#ff4500;font-size:20px;font-weight:bold;');
    console.log('%cWebsite by Hafidz — Tugas Akhir Informatika', 'color:#ffc107;font-size:13px;');
});
