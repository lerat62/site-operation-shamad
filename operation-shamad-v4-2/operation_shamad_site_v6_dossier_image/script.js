// V4 clean : volontairement léger pour garder le style V2 propre.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});


/* Animation timeline */
const timeline = document.querySelector(".timeline");
const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("timeline")) {
        entry.target.classList.add("line-on");
      } else {
        entry.target.classList.add("show");
      }
    }
  });
}, { threshold: 0.22 });

if (timeline) timelineObserver.observe(timeline);
timelineItems.forEach(item => timelineObserver.observe(item));


/* Dossier / livre interactif pour l'histoire SHAMAD */
const operationBook = document.querySelector('.operation-book');
if (operationBook) {
  const pages = Array.from(operationBook.querySelectorAll('.book-page'));
  const prev = operationBook.querySelector('.book-prev');
  const next = operationBook.querySelector('.book-next');
  const open = operationBook.querySelector('.book-open');
  const dotsContainer = operationBook.querySelector('.book-dots');
  let currentPage = 0;

  pages.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'book-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Aller à la page ${index + 1}`);
    dot.addEventListener('click', () => showBookPage(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('.book-dot'));

  function showBookPage(index) {
    currentPage = Math.max(0, Math.min(index, pages.length - 1));
    pages.forEach((page, pageIndex) => page.classList.toggle('active', pageIndex === currentPage));
    dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentPage));
    prev.disabled = currentPage === 0;
    next.disabled = currentPage === pages.length - 1;
  }

  if (open) open.addEventListener('click', () => showBookPage(1));
  prev.addEventListener('click', () => showBookPage(currentPage - 1));
  next.addEventListener('click', () => showBookPage(currentPage + 1));
  showBookPage(0);
}
