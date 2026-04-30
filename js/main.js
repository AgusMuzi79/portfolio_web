/* ─── Language switch — EN / ES ─── */
(function () {
  function setLang(lang) {
    /* Plain-text elements: use textContent */
    document.querySelectorAll('[data-en]:not([data-html])').forEach(function (el) {
      el.textContent = el.dataset[lang];
    });
    /* Elements with inner HTML (e.g. <em> tags): use innerHTML */
    document.querySelectorAll('[data-en][data-html]').forEach(function (el) {
      el.innerHTML = el.dataset[lang];
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var pressed = btn.dataset.lang === lang;
      btn.classList.toggle('active', pressed);
      btn.setAttribute('aria-pressed', pressed);
    });
    document.documentElement.lang = lang;
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.dataset.lang);
      });
    });
    setLang('en');
  });
})();
