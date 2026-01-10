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
