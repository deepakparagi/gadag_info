/* ═══════════════════════════════════════════
   GADAG INFO INTERACTION LOGIC
   GSAP, Lenis, SplitType, Vanilla JS | 2026 Standards
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 0. GSAP Init ─── */
  gsap.registerPlugin(ScrollTrigger);

  /* ─── 1. Lenis Smooth Scrolling ─── */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  
  // Sync GSAP with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);


  /* ─── 2. Magic Cursor ─── */
  const cursor = document.getElementById('magicCursor');
  if (cursor && !window.matchMedia("(pointer: coarse)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    
    // Magnetic cursor easing
    gsap.ticker.add(() => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      gsap.set(cursor, { x: cursorX, y: cursorY });
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Hover logic
    const interactables = document.querySelectorAll('a, button, [data-cursor="hover"]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    const grabbables = document.querySelectorAll('.events__scroll');
    grabbables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('drag'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('drag'));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }


  /* ─── 3. SplitType & Hero Entry ─── */
  const heroTitle = new SplitType('.hero__title', { types: 'chars' });
  
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to('.hero__badge', { opacity: 1, y: 0, duration: 1 }, 0.2)
    .from(heroTitle.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.04,
      duration: 1.2,
      ease: 'back.out(1.7)'
    }, 0.3)
    .to('.hero__subtitle', { opacity: 1, y: 0, duration: 1 }, 1.2);


  /* ─── 4. Scrubbed Scroll Animations ─── */
  // Hero Parallax Background Text
  gsap.to('.hero__bg-text', {
    x: '-30%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  
  // Hero Content Fade/Scale out
  gsap.to('.hero__content', {
    y: 150,
    opacity: 0,
    scale: 0.95,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Gallery Image Parallax
  const galleryImages = document.querySelectorAll('.gallery__image');
  galleryImages.forEach(img => {
    gsap.fromTo(img, 
      { y: -30 }, 
      {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });


  /* ─── 5. Canvas Gradient Orbs & Particles ─── */
  const canvas = document.getElementById('heroCanvas');
  const particlesCanvas = document.getElementById('particles');
  
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (particlesCanvas) {
        particlesCanvas.width = width;
        particlesCanvas.height = height;
      }
    };
    window.addEventListener('resize', resize);
    resize();

    const orbs = [
      { x: 0.2, y: 0.3, r: 350, color: 'rgba(245,200,66,0.18)', vx: 0.0003, vy: 0.0002 },
      { x: 0.75, y: 0.6, r: 300, color: 'rgba(232,89,60,0.15)', vx: -0.0002, vy: 0.0003 },
      { x: 0.5,  y: 0.8, r: 400, color: 'rgba(56,189,248,0.12)', vx: 0.0002, vy: -0.0002 },
    ];

    let t = 0;
    const drawOrbs = () => {
      ctx.clearRect(0, 0, width, height);
      orbs.forEach(o => {
        const px = (o.x + Math.sin(t * o.vx * 1000) * 0.15) * width;
        const py = (o.y + Math.cos(t * o.vy * 1000) * 0.12) * height;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, o.r);
        grad.addColorStop(0, o.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });
      t += 0.5;
      requestAnimationFrame(drawOrbs);
    };
    drawOrbs();

    if (particlesCanvas) {
      const pCtx = particlesCanvas.getContext('2d');
      const particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.3 + 0.3,
          color: Math.random() > 0.5 ? '245, 200, 66' : '255, 255, 255'
        });
      }

      const drawParticles = () => {
        pCtx.clearRect(0, 0, width, height);
        particles.forEach(p => {
          pCtx.beginPath();
          pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          pCtx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
          pCtx.fill();
          
          p.x += p.speedX;
          p.y -= p.speedY; // Float upwards slightly
          
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        });
        requestAnimationFrame(drawParticles);
      };
      drawParticles();
    }
  }


  /* ─── 6. Mobile Nav (Dynamic Island to Sidebar) ─── */
  const navSidebar = document.getElementById('navSidebar');
  const navHamburger = document.getElementById('navHamburger');
  const navSidebarClose = document.getElementById('navSidebarClose');
  const navSidebarLinks = document.querySelectorAll('.nav__sidebar-link, .nav__sidebar-glass');

  const toggleSidebar = () => {
    navSidebar.classList.toggle('active');
    if (navSidebar.classList.contains('active')) {
      lenis.stop(); // Stop scroll when menu is open
    } else {
      lenis.start();
    }
  };

  navHamburger?.addEventListener('click', toggleSidebar);
  navSidebarClose?.addEventListener('click', toggleSidebar);
  navSidebarLinks.forEach(link => link.addEventListener('click', toggleSidebar));

  
  /* ─── 7. Form Handling ─── */
  const promoteForm = document.getElementById('promoteForm');
  const promoteSuccess = document.getElementById('promoteSuccess');

  if (promoteForm) {
    const validateField = (input) => {
      const errorEl = document.getElementById(`${input.name}Error`);
      if (!input.checkValidity() && input.value.trim() === '') {
        input.classList.add('error');
        input.style.borderColor = 'var(--accent-rust)';
        return false;
      }
      if (input.type === 'email' && input.value && !input.value.includes('@')) {
        input.classList.add('error');
        input.style.borderColor = 'var(--accent-rust)';
        return false;
      }
      input.classList.remove('error');
      input.style.borderColor = 'var(--accent-gold)';
      return true;
    };

    document.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        input.classList.remove('error');
        input.style.borderColor = '';
      });
    });

    promoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      let valid = true;
      document.querySelectorAll('#promoteForm [required]').forEach(field => {
        if (!validateField(field)) valid = false;
      });
      if (!valid) return;

      if (promoteForm.classList.contains('is-submitting')) return;
      promoteForm.classList.add('is-submitting');

      try {
        const formData = new FormData(promoteForm);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch('/api/promote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          gsap.to(promoteForm, { opacity: 0, scale: 0.95, duration: 0.4, onComplete: () => {
            promoteSuccess.classList.add('active');
          }});
        } else {
          alert('Error submitting form. Please check your inputs.');
        }
      } catch (err) {
        console.error(err);
      } finally {
        promoteForm.classList.remove('is-submitting');
      }
    });
  }

});
