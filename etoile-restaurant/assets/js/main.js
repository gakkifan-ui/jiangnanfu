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
