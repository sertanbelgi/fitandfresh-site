(function () {
  var WA_NUMBER = '905524725118';

  // Menü: scroll'da arka plan, mobilde aç/kapa
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  }
  toggle.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

  // Kaydırınca belirme
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
  }

  // Galeri lightbox
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightboxImg');
  document.querySelectorAll('.gallery__item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      boxImg.src = btn.dataset.full;
      boxImg.alt = btn.querySelector('img').alt;
      box.hidden = false;
    });
  });
  function closeBox() { box.hidden = true; boxImg.src = ''; }
  box.addEventListener('click', function (e) { if (e.target !== boxImg) closeBox(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBox(); });

  // İletişim formu -> WhatsApp
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    var text = 'Merhaba, ben ' + f.name.value.trim() + '.\n' + f.message.value.trim();
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
