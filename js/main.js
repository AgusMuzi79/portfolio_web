/* ─── Language switch — EN / ES ─── */
(function () {
  let currentLang = 'en';

  function setLang(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-en]').forEach(function (el) {
      el.textContent = el.dataset[lang];
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
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
