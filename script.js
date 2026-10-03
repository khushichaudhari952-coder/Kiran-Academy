const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const counters = document.querySelectorAll('[data-count]');
let counted = false;
function animateCounters() {
  if (counted) return;
  counted = true;
  counters.forEach(el => {
    const target = Number(el.dataset.count);
    const suffix = el.textContent.includes('%') ? '%' : el.textContent.includes('+') ? '+' : '+';
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
const stats = document.querySelector('#stats');
new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) animateCounters();
}, {threshold: .3}).observe(stats);

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.course-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const modal = document.querySelector('#demoModal');
const courseSelect = document.querySelector('#courseSelect');
document.querySelectorAll('.open-demo').forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.course) courseSelect.value = button.dataset.course;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});
function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.querySelector('#demoForm').addEventListener('submit', e => {
  e.preventDefault();
  document.querySelector('#successMsg').classList.add('show');
  e.target.reset();
  setTimeout(() => {
    document.querySelector('#successMsg').classList.remove('show');
    closeModal();
  }, 2600);
});
