/**
 * Scroll-reveal, done without shipping an animation library.
 *
 * Two deliberate choices:
 *  - The `js-reveal` class is added by this script, and the CSS only hides
 *    `.reveal` elements *inside* `.js-reveal`. So if JS fails or is blocked,
 *    nothing is ever hidden and the visitor reads a complete page.
 *  - It runs inline during body parse rather than after hydration, so elements
 *    are hidden before first paint instead of flashing in and then out.
 */
const script = `
(function () {
  var root = document.documentElement;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  root.classList.add('js-reveal');

  function activate() {
    var targets = document.querySelectorAll('.reveal, .reveal-group');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(function (el) {
      if (el.classList.contains('reveal-group')) {
        Array.prototype.forEach.call(el.children, function (child, i) {
          child.style.setProperty('--i', String(i));
        });
      }
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', activate);
  } else {
    activate();
  }

  // Client-side route changes swap the DOM without a reload.
  var push = history.pushState;
  history.pushState = function () {
    push.apply(this, arguments);
    setTimeout(activate, 120);
  };
  window.addEventListener('popstate', function () { setTimeout(activate, 120); });
})();
`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
