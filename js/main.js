(function() {
  'use strict';

  const sections = document.querySelectorAll('section[id]');
  const navTabs = document.querySelectorAll('.nav-tab');

  function updateActiveTab() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navTabs.forEach(tab => {
          tab.classList.remove('active');
          if (tab.getAttribute('href') === '#' + sectionId) {
            tab.classList.add('active');
          }
        });
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateActiveTab();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateActiveTab();

  const resumeBtn = document.getElementById('resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const modalClose = document.getElementById('modal-close');

  if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    modalClose.addEventListener('click', function() {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    resumeModal.addEventListener('click', function(e) {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
})();
