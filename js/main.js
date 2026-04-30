/* ─── Language switch — EN / ES ─── */
(function () {
  function setLang(lang) {
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
