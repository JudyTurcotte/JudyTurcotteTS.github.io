/* ============================================================
   Judy Turcotte — Navegación móvil (hamburger toggle)
   Inyectado por JS para no duplicar markup en 22 páginas.
   Patrón accesible: aria-expanded, aria-controls, cierre por
   Escape y por clic fuera.
   ============================================================ */

(function () {
  'use strict';

  function init() {
    var navInner = document.querySelector('.nav-inner');
    if (!navInner) return;

    var navWrap = navInner.querySelector('nav[aria-label]');
    var navLinks = navInner.querySelector('.nav-links');
    if (!navWrap || !navLinks) return;

    // Asegurar id sobre el UL para aria-controls
    var listId = navLinks.id || 'primary-nav';
    navLinks.id = listId;

    // Crear botón hamburger
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', listId);

    // Etiqueta accesible según idioma
    var lang = (document.documentElement.lang || 'fr').slice(0, 2);
    var label = 'Ouvrir le menu';
    var labelClose = 'Fermer le menu';
    if (lang === 'en') { label = 'Open menu'; labelClose = 'Close menu'; }
    if (lang === 'es') { label = 'Abrir menú'; labelClose = 'Cerrar menú'; }
    toggle.setAttribute('aria-label', label);

    var icon = document.createElement('span');
    icon.className = 'nav-toggle-icon';
    icon.setAttribute('aria-hidden', 'true');
    toggle.appendChild(icon);

    // Insertar antes del <nav> para que en lectura aparezca primero
    navInner.insertBefore(toggle, navWrap);

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? labelClose : label);
      navLinks.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    // Cerrar al pulsar Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Cerrar al hacer clic fuera del nav
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (navInner.contains(e.target)) return;
      setOpen(false);
    });

    // Cerrar al volver a desktop (evita estado abierto huérfano)
    var mq = window.matchMedia('(min-width: 981px)');
    var onChange = function (ev) { if (ev.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
