 (function(){
    const burgerCheckbox = document.getElementById('burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.getElementById('closeMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item a');

    if (!mobileMenu) return; 

    function openMenu() {
      mobileMenu.classList.add('open');
      document.body.classList.add('no-scroll');
      if (burgerCheckbox) burgerCheckbox.checked = true;
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
      if (burgerCheckbox) burgerCheckbox.checked = false;
    }

    if (burgerCheckbox) {
      burgerCheckbox.addEventListener('change', () => {
        if (burgerCheckbox.checked) openMenu();
        else closeMenu();
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    mobileNavLinks.forEach(a => a.addEventListener('click', closeMenu));

    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  })();