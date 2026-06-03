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
