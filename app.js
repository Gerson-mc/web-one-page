document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. HERO SLIDER ANIMADO (2 DIAPOSITIVAS)
       ========================================= */
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const sliderContainer = document.getElementById('inicio');

    let currentIndex = 0;
    const totalSlides = slides.length;
    const autoPlayDelay = 5500;
    let slideInterval;

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        slideInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (slideInterval) clearInterval(slideInterval);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoPlay();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(Number(dot.dataset.index));
            startAutoPlay();
        });
    });

    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();

    /* =========================================
       2. MENÚ MÓVIL RESPONSIVO
       ========================================= */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    /* =========================================
       3. VALIDACIÓN DEL FORMULARIO DE CONTACTO
       ========================================= */
    const contactForm = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!nombre || !correo || !mensaje) {
            feedback.style.color = '#FF0000';
            feedback.textContent = 'Por favor, completa todos los campos para vivir la EXperiencia EX.';
            return;
        }

        feedback.style.color = '#15803d';
        feedback.textContent = `¡Gracias, ${nombre}! Un asesor de Grupo EX® se contactará contigo pronto.`;
        contactForm.reset();
    });
});