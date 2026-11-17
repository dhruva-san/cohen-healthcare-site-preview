const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

// header: solid after scroll, mobile sheet
const header = $('#header'), menuBtn = $('#menuBtn');
const onScroll = () => header.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', onScroll, {passive: true}); onScroll();
const setMenu = open => { header.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', open); menuBtn.textContent = open ? 'Close' : 'Menu'; };
menuBtn.onclick = () => setMenu(!header.classList.contains('open'));
$('#nav').onclick = e => e.target.closest('a') && setMenu(false);

// heading reveals
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), {rootMargin: '0px 0px -12% 0px'});
$$('.rv').forEach(el => io.observe(el));

// blog: category filter
$$('.chips button').forEach(b => b.onclick = () => {
  $$('.chips button').forEach(o => o.setAttribute('aria-pressed', o === b));
  $$('.rows li').forEach(li => li.hidden = b.dataset.cat !== 'all' && li.dataset.cat !== b.dataset.cat);
});

// hero: count the figures up once, as part of the load sequence
if (still) $('.hero video')?.pause();
else setTimeout(() => $$('[data-count]').forEach(el => {
  const end = +el.dataset.count, t0 = performance.now(), dur = 1600;
  const tick = t => { const p = Math.min((t - t0) / dur, 1); el.textContent = Math.round(end * (1 - (1 - p) ** 3)) + el.dataset.suffix; p < 1 && requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}), 1700);
