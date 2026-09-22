(function () {
  'use strict';

  /* --- nav scrollspy --- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.masthead nav a'));
  var byHash = {};
  links.forEach(function (a) { byHash[a.getAttribute('href')] = a; });

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var link = byHash['#' + e.target.id];
        if (!link) return;
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* --- video facades: the YouTube iframe is only built on click --- */
  document.querySelectorAll('.facade').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-video');
      if (!id || btn.querySelector('iframe')) return;
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
      frame.title = btn.getAttribute('aria-label') || 'Video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.setAttribute('allowfullscreen', '');
      btn.appendChild(frame);
      var play = btn.querySelector('.play');
      if (play) play.remove();
    });
  });

  /* --- resume sheet: PDF loads on open, not on page load --- */
  var sheet = document.getElementById('resume-sheet');
  var frame = document.getElementById('resume-frame');
  var openBtn = document.getElementById('resume-open');
  var closeBtn = document.getElementById('resume-close');

  function openSheet(e) {
    if (e) e.preventDefault();
    if (frame && frame.getAttribute('src') === 'about:blank') frame.setAttribute('src', 'resume.pdf');
    sheet.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeSheet() {
    sheet.setAttribute('data-open', 'false');
    document.body.style.overflow = '';
    if (openBtn) openBtn.focus();
  }

  if (sheet && openBtn) {
    openBtn.addEventListener('click', openSheet);
    if (closeBtn) closeBtn.addEventListener('click', closeSheet);
    sheet.addEventListener('click', function (e) { if (e.target === sheet) closeSheet(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sheet.getAttribute('data-open') === 'true') closeSheet();
    });
  }

  /* --- theme toggle, remembered per viewer --- */
  var toggle = document.getElementById('theme-toggle');
  var root = document.documentElement;

  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (err) { /* storage blocked - fall back to the OS setting */ }

  if (toggle) {
    toggle.addEventListener('click', function () {
      // the page is light unless it has explicitly been switched to dark
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (err) { /* ignore */ }
    });
  }
})();
