/* ─── Language switch — EN / ES ─── */
var currentLang = 'en';

(function () {
  function setLang(lang) {
    currentLang = lang;

    /* Plain-text elements */
    document.querySelectorAll('[data-en]:not([data-html])').forEach(function (el) {
      el.textContent = el.dataset[lang];
    });
    /* Elements with inner HTML (e.g. <em> tags) */
    document.querySelectorAll('[data-en][data-html]').forEach(function (el) {
      el.innerHTML = el.dataset[lang];
    });
    /* Sync all lang-toggle buttons (navbar) */
    document.querySelectorAll('.nav-lang-btn').forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active);
    });
    document.documentElement.lang = lang;

    /* Re-render the project modal if it's open, so its content follows the switch */
    if (window.__reRenderModal) window.__reRenderModal();
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.dataset.lang);
      });
    });
    setLang('en');
  });
})();

/* ─── Project detail modal ─── */
(function () {
  var STATUS_LABEL = {
    dev: { en: 'in development', es: 'en desarrollo', variant: 'badge--green' },
    soon: { en: 'coming soon', es: 'próximamente', variant: 'badge--hazard' }
  };

  var overlay, iconEl, titleEl, statusEl, longEl, bulletsEl, tagsEl, closeBtn;
  var activeCard = null;

  function render(card) {
    var status = STATUS_LABEL[card.dataset.status];

    iconEl.innerHTML = card.querySelector('.project-card__icon').innerHTML;
    titleEl.textContent = card.dataset['name' + (currentLang === 'es' ? 'Es' : 'En')];
    statusEl.className = 'badge ' + status.variant;
    statusEl.textContent = status[currentLang];
    longEl.textContent = card.dataset['long' + (currentLang === 'es' ? 'Es' : 'En')];

    bulletsEl.innerHTML = '';
    card.dataset['bullets' + (currentLang === 'es' ? 'Es' : 'En')].split('|').forEach(function (b) {
      var row = document.createElement('div');
      row.className = 'modal__bullet';
      row.innerHTML = '<span class="modal__bullet-arrow">→</span><span></span>';
      row.querySelector('span:last-child').textContent = b;
      bulletsEl.appendChild(row);
    });

    tagsEl.innerHTML = '';
    card.dataset.stack.split(',').forEach(function (t) {
      var tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = t;
      tagsEl.appendChild(tag);
    });
  }

  function openModal(card) {
    activeCard = card;
    render(card);
    overlay.hidden = false;
  }

  function closeModal() {
    overlay.hidden = true;
    activeCard = null;
  }

  window.__reRenderModal = function () {
    if (activeCard) render(activeCard);
  };

  document.addEventListener('DOMContentLoaded', function () {
    overlay = document.getElementById('project-modal');
    iconEl = document.getElementById('modal-icon');
    titleEl = document.getElementById('modal-title');
    statusEl = document.getElementById('modal-status');
    longEl = document.getElementById('modal-long');
    bulletsEl = document.getElementById('modal-bullets');
    tagsEl = document.getElementById('modal-tags');
    closeBtn = document.getElementById('modal-close');

    document.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('click', function () { openModal(card); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(card);
        }
      });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !overlay.hidden) closeModal();
    });
  });
})();

/* ─── Contact terminal — command buttons ─── */
(function () {
  var RESPONSES = {
    whoami: {
      out: 'Agustín Muzi',
      dim: {
        en: '// AI automation engineer · Buenos Aires, AR · available',
        es: '// ingeniero en automatización con IA · Buenos Aires, AR · disponible'
      }
    },
    email: { link: 'agusmuzi79@gmail.com', href: 'mailto:agusmuzi79@gmail.com' },
    linkedin: { link: 'linkedin.com/in/agusmuzi79', href: 'https://www.linkedin.com/in/agusmuzi79' },
    github: { link: 'github.com/AgusMuzi79', href: 'https://github.com/AgusMuzi79' },
    cv: { ok: { en: '→ opening cv.pdf', es: '→ abriendo cv.pdf' }, href: 'assets/cv.pdf' }
  };

  function runCmd(key, label, body) {
    var caret = body.querySelector('.terminal__caret');

    var cmdLine = document.createElement('span');
    cmdLine.className = 'terminal__line';
    cmdLine.innerHTML = '<span class="terminal__prompt">~</span>' + label;
    body.insertBefore(cmdLine, caret);

    var r = RESPONSES[key];
    if (key === 'whoami') {
      var outLine = document.createElement('span');
      outLine.className = 'terminal__line';
      outLine.textContent = r.out;
      body.insertBefore(outLine, caret);

      var dimLine = document.createElement('span');
      dimLine.className = 'terminal__line terminal__dim';
      dimLine.textContent = r.dim[currentLang];
      body.insertBefore(dimLine, caret);
    } else if (key === 'email' || key === 'linkedin' || key === 'github') {
      var linkLine = document.createElement('span');
      linkLine.className = 'terminal__line';
      linkLine.innerHTML = '<a class="terminal__link" href="' + r.href + '" target="_blank" rel="noreferrer">' + r.link + '</a>';
      body.insertBefore(linkLine, caret);
    } else if (key === 'cv') {
      var okLine = document.createElement('span');
      okLine.className = 'terminal__line terminal__ok';
      okLine.textContent = r.ok[currentLang];
      body.insertBefore(okLine, caret);
      window.open(r.href, '_blank');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var body = document.getElementById('contact-terminal-body');
    document.querySelectorAll('.term-cmd-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        runCmd(btn.dataset.cmd, btn.textContent, body);
      });
    });
  });
})();
