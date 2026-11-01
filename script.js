const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

// De thee trekt terwijl je door "Zo maak je het" scrolt
const steps = document.querySelector('.steps');

function brew() {
  const box = steps.getBoundingClientRect();
  const progress = (innerHeight * 0.6 - box.top) / (box.height * 0.8);
  steps.style.setProperty('--brew', Math.min(Math.max(progress, 0), 1).toFixed(3));
}

addEventListener('scroll', brew, { passive: true });
addEventListener('resize', brew);
brew();

// Video speelt niet vanzelf af als iemand minder beweging wil
if (calm) document.querySelector('#film').pause();

// Onderdelen komen na elkaar binnen zodra hun sectie in beeld schuift
const reveals = document.querySelectorAll('.reveal');

if (calm || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('is-in'));
} else {
  const watcher = new IntersectionObserver((entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach((entry, i) => {
      entry.target.style.setProperty('--delay', `${i * 80}ms`);
      entry.target.classList.add('is-in');
      watcher.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  reveals.forEach((el) => watcher.observe(el));
}
