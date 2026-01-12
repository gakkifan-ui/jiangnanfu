// Footer 年份
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// Header 滚动状态
const header = document.querySelector(".header");
function onScroll(){
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 6);
}
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile 菜单切换
(() => {
  const toggle = document.getElementById('navToggle');
  const overlay = document.getElementById('navOverlay');
  const nav = document.getElementById('mobileNav');
  const closeBtn = document.getElementById('navClose');

  if (!toggle || !overlay || !nav || !closeBtn) return;

  const openNav = () => {
    overlay.hidden = false;
    nav.hidden = false;

    // trigger transition
    requestAnimationFrame(() => nav.classList.add('is-open'));

    toggle.setAttribute('aria-expanded', 'true');
    nav.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-label', 'Close menu');

    // lock scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    nav.classList.remove('is-open');

    toggle.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-label', 'Open menu');

    // unlock scroll
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    // wait for transition then hide
    setTimeout(() => {
      nav.hidden = true;
      overlay.hidden = true;
    }, 250);
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeNav() : openNav();
  });

  closeBtn.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeNav();
    }
  });

  // close after clicking any link (nice on mobile)
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) closeNav();
  });
})();

// Lazy load images
// Drag to scroll for horizontal gallery
(function () {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    gallery.classList.add('is-dragging');
    startX = e.pageX;
    startScrollLeft = gallery.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    gallery.classList.remove('is-dragging');
  });

  gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.classList.remove('is-dragging');
  });

  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const dx = e.pageX - startX;
    gallery.scrollLeft = startScrollLeft - dx;
  });
})();


//图片方大
// Simple Lightbox for .gallery images
(function () {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  // Create lightbox once
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Close">✕</button>
    <img alt="Preview">
  `;
  document.body.appendChild(lb);

  const imgEl = lb.querySelector('img');
  const closeBtn = lb.querySelector('.lightbox-close');

  function open(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt || 'Preview';
    lb.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('is-open');
    imgEl.src = '';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  gallery.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    open(img.currentSrc || img.src, img.alt);
  });

  closeBtn.addEventListener('click', close);

  // click outside image closes
  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();

// Simple Lightbox for .gallery items (desktop + mobile)
(function () {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  // Create lightbox once
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Close">✕</button>
    <img alt="Preview">
  `;
  document.body.appendChild(lb);

  const imgEl = lb.querySelector('img');
  const closeBtn = lb.querySelector('.lightbox-close');

  function open(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt || 'Preview';
    lb.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('is-open');
    imgEl.src = '';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Click any gallery item (not only the img)
  gallery.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;

    const img = item.querySelector('img');
    if (!img) return;

    open(img.currentSrc || img.src, img.alt);
  });

  closeBtn.addEventListener('click', close);

  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();
