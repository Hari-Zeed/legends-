/* ==========================================================================
   DATA HEIST — Presentation Engine  (Premium Edition)
   Features:
   · Fade / zoom slide transitions
   · Keyboard (←/→/PageUp/PageDown), click, dot, and swipe navigation
   · Slide counter (1 / 5) + expandable active dot indicator
   · Autoplay toggle (5 s interval) with play/pause button
   · Slide progress bar
   ========================================================================== */

(function () {
  'use strict';

  /* ── DOM refs ────────────────────────────────────────────────────────────── */
  const stage       = document.getElementById('stage');
  const dotsEl      = document.getElementById('dots');
  const counter     = document.getElementById('counter');
  const prevBtn     = document.getElementById('prevBtn');
  const nextBtn     = document.getElementById('nextBtn');
  const autoplayBtn = document.getElementById('autoplayBtn');
  const progressFill = document.getElementById('progressFill');

  /* ── State ───────────────────────────────────────────────────────────────── */
  let current     = 0;
  let isPlaying   = false;
  let autoTimer   = null;
  const INTERVAL  = 5000; // ms per slide during autoplay
  const total     = SLIDES.length;

  /* ── Build slide DOM ─────────────────────────────────────────────────────── */
  SLIDES.forEach((slide, i) => {
    const section = document.createElement('section');
    section.className = 'slide' + (slide.variant ? ' slide--' + slide.variant : '');
    section.id = 'slide-' + slide.id;
    section.setAttribute('role', 'group');
    section.setAttribute('aria-roledescription', 'slide');
    section.setAttribute('aria-label', `Slide ${i + 1} of ${total}: ${slide.id}`);

    const bg = document.createElement('div');
    bg.className = 'slide-bg';
    bg.style.backgroundImage = `url('${slide.image}')`;

    // Hint browser to decode images ahead of time for smoother transitions
    const img = new Image();
    img.src = slide.image;

    const content = document.createElement('div');
    content.className = 'slide-content';
    content.innerHTML = slide.html;

    section.appendChild(bg);
    section.appendChild(content);
    stage.appendChild(section);
  });

  /* ── Build dot indicators ────────────────────────────────────────────────── */
  SLIDES.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  const slideEls = Array.from(document.querySelectorAll('.slide'));
  const dotEls   = Array.from(document.querySelectorAll('.dot'));

  /* ── Render ──────────────────────────────────────────────────────────────── */
  function render() {
    slideEls.forEach((el, i) => {
      el.classList.remove('is-active', 'is-prev');
      if      (i === current)  el.classList.add('is-active');
      else if (i < current)    el.classList.add('is-prev');
    });

    dotEls.forEach((d, i) => {
      const active = i === current;
      d.classList.toggle('is-active', active);
      d.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    counter.textContent = `${current + 1} / ${total}`;

    // Progress bar: 1/5 → 20 %, 2/5 → 40 %, …, 5/5 → 100 %
    progressFill.style.width = `${((current + 1) / total) * 100}%`;
  }

  /* ── Navigation ──────────────────────────────────────────────────────────── */
  function goTo(index) {
    current = ((index % total) + total) % total;
    render();
    // Reset autoplay timer on manual navigation so next advance is fresh
    if (isPlaying) {
      clearTimeout(autoTimer);
      scheduleNext();
    }
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  /* ── Autoplay ────────────────────────────────────────────────────────────── */
  function scheduleNext() {
    autoTimer = setTimeout(() => {
      next();
    }, INTERVAL);
  }

  function startAutoplay() {
    isPlaying = true;
    autoplayBtn.classList.add('is-playing');
    autoplayBtn.setAttribute('aria-label', 'Pause autoplay');
    scheduleNext();
  }

  function stopAutoplay() {
    isPlaying = false;
    autoplayBtn.classList.remove('is-playing');
    autoplayBtn.setAttribute('aria-label', 'Start autoplay');
    clearTimeout(autoTimer);
    autoTimer = null;
  }

  function toggleAutoplay() {
    isPlaying ? stopAutoplay() : startAutoplay();
  }

  /* ── Event listeners ─────────────────────────────────────────────────────── */
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  autoplayBtn.addEventListener('click', toggleAutoplay);

  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
        e.preventDefault(); next(); break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault(); prev(); break;
      case ' ':
        e.preventDefault(); toggleAutoplay(); break;
      case 'Escape':
        stopAutoplay(); break;
    }
  });

  // Pause autoplay while the window is hidden (tab switch / minimize)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
      clearTimeout(autoTimer);
    } else if (!document.hidden && isPlaying) {
      scheduleNext();
    }
  });

  /* ── Touch / swipe ───────────────────────────────────────────────────────── */
  let touchStartX = null;
  let touchStartY = null;

  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    // Only trigger if horizontal swipe dominates
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    }

    touchStartX = null;
    touchStartY = null;
  }, { passive: true });

  /* ── Initial render ──────────────────────────────────────────────────────── */
  render();
})();
