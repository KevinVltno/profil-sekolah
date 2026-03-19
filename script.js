// ── TAHUN AJARAN OTOMATIS ──
(function() {
  const year = new Date().getFullYear();
  const label = year + '/' + (year + 1);
  const el = document.getElementById('tahun-ajaran');
  if (el) el.textContent = label;
})();

// ── NAV SCROLL SHADOW ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── HAMBURGER MENU ──
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

function triggerVisible(el, delay = 0) {
  setTimeout(() => el.classList.add('visible'), delay);
}

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      triggerVisible(entry.target, i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

window.addEventListener('DOMContentLoaded', () => {
  revealEls.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      triggerVisible(el, i * 60);
    } else {
      revealObs.observe(el);
    }
  });
});

window.addEventListener('scroll', () => {
  revealEls.forEach(el => {
    if (el.classList.contains('visible')) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      triggerVisible(el);
      revealObs.unobserve(el);
    }
  });
}, { passive: true });

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ── MATCH MAP HEIGHT TO K-INFO ──
function matchMapHeight() {
  const kInfo = document.querySelector('.k-info');
  const mapFrame = document.querySelector('.map-frame');
  if (!kInfo || !mapFrame) return;
  mapFrame.style.height = kInfo.offsetHeight + 'px';
}
window.addEventListener('DOMContentLoaded', matchMapHeight);
window.addEventListener('resize', matchMapHeight);

// ── TAB TOGGLE TK / KB ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.vm-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // Update tombol aktif
      document.querySelectorAll('.vm-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Tampilkan panel yang sesuai
      const target = tab.dataset.tab; // 'tk' atau 'kb'
      document.querySelectorAll('.vm-panel').forEach(panel => {
        panel.style.display = panel.id === 'panel-' + target ? 'block' : 'none';
      });
    });
  });
});

// ── POPUP MODAL PENDAFTARAN ──
(function() {
  const overlay = document.getElementById('popupOverlay');
  const closeBtn = document.getElementById('popupClose');
  const laterBtn = document.getElementById('popupLater');
  const tahunEl  = document.getElementById('popup-tahun');

  if (!overlay) return;

  // Set tahun ajaran di popup
  if (tahunEl) {
    const y = new Date().getFullYear();
    tahunEl.textContent = y + '/' + (y + 1);
  }

  function closePopup() {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Tampilkan popup setelah 800ms
  setTimeout(() => {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }, 800);

  // Tutup via tombol ✕
  closeBtn.addEventListener('click', closePopup);
  // Tutup via "Nanti saja"
  laterBtn.addEventListener('click', closePopup);
  // Tutup klik di luar modal
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closePopup();
  });
  // Tutup via tombol Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePopup();
  });
})();

// ── ACCORDION VISI MISI TUJUAN ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.acc-head').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.acc-item');
      const isOpen = item.classList.contains('open');
      // Tutup semua di list yang sama
      item.closest('.acc-list').querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
      // Toggle item ini
      if (!isOpen) item.classList.add('open');
    });
  });
});