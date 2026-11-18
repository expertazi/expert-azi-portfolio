(function () {
  // Hide header on scroll down, show on scroll up
  var header = document.getElementById('site-header');
  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('mobile-menu');
  var lastY = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY || 0, dy = y - lastY;
    if (Math.abs(dy) < 6) return;
    var open = menuBtn.getAttribute('aria-expanded') === 'true';
    header.classList.toggle('is-hidden', dy > 0 && y > 80 && !open);
    lastY = y;
  }, { passive: true });

  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
  }
  menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  // Work filter + load more
  var tabs = document.querySelectorAll('.tab');
  var cards = document.querySelectorAll('.work-card');
  var empty = document.getElementById('work-empty');
  var moreWrap = document.getElementById('more-wrap');
  var moreBtn = document.getElementById('more-btn');
  var filter = 'all', showAll = false;
  function applyWork() {
    var shown = 0;
    cards.forEach(function (c) {
      var match = filter === 'all' || c.dataset.cat === filter;
      var visible = match && (showAll || !c.hasAttribute('data-more'));
      c.hidden = !visible;
      if (visible) shown++;
    });
    empty.hidden = shown > 0;
    var hasMore = !showAll && Array.prototype.some.call(cards, function (c) {
      return c.hasAttribute('data-more') && (filter === 'all' || c.dataset.cat === filter);
    });
    moreWrap.hidden = !hasMore;
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', String(x === t)); });
      filter = t.dataset.filter; applyWork();
    });
  });
  moreBtn.addEventListener('click', function () { showAll = true; applyWork(); });
  applyWork();

  // Reviews slider
  var slides = [
    { quote: "Azi found problems on our product page we'd stared at for a year. The redesign paid for itself within weeks.", name: "[Founder name]", initials: "FN", role: "Founder, [pet supplies brand]", result: "[+XX% add-to-cart]" },
    { quote: "He doesn't just make things pretty. He showed us exactly where customers dropped off, then fixed it.", name: "[Founder name]", initials: "FN", role: "Co-founder, [DTC supplements brand]", result: "[+XX% conversion rate]" },
    { quote: "Our ads were working but the store wasn't. Azi's landing page finally matched what the ads promised.", name: "[Founder name]", initials: "FN", role: "Founder, [pet treats brand]", result: "[+XX% revenue per visitor]" },
    { quote: "Clear audit, clear priorities, clear designs. We knew what to build first and why.", name: "[Founder name]", initials: "FN", role: "CEO, [Shopify brand]", result: "[+XX% AOV]" },
    { quote: "The new product page feels like it was built for our customers. Mobile sales finally caught up with desktop.", name: "[Founder name]", initials: "FN", role: "Founder, [pet food brand]", result: "[+XX% mobile CVR]" }
  ];
  var n = slides.length, cur = 0;
  var grid = document.getElementById('review-grid');
  var dots = document.getElementById('dots');
  var count = document.getElementById('count');
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  slides.forEach(function (_, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.setAttribute('aria-label', 'Show review ' + (i + 1));
    b.addEventListener('click', function () { go(i); });
    dots.appendChild(b);
  });
  function render() {
    grid.innerHTML = [0, 1, 2].map(function (k) {
      var r = slides[(cur + k) % n];
      return '<article class="card review"><div class="review-top"><span class="stars" aria-label="5 stars">★★★★★</span><span class="tag tag--accent">' + esc(r.result) + '</span></div>' +
        '<p class="quote">“' + esc(r.quote) + '”</p>' +
        '<div class="review-who"><span class="avatar">' + esc(r.initials) + '</span><div><b>' + esc(r.name) + '</b><p class="small">' + esc(r.role) + '</p></div></div></article>';
    }).join('');
    count.textContent = '0' + (cur + 1) + ' / 0' + n;
    Array.prototype.forEach.call(dots.children, function (b, i) {
      if (i === cur) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
    });
  }
  function go(i) { cur = (i + n) % n; render(); }
  document.getElementById('prev').addEventListener('click', function () { go(cur - 1); });
  document.getElementById('next').addEventListener('click', function () { go(cur + 1); });
  render();
})();
