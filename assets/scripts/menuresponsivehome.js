  
  
  
  document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('mobile-menu').classList.remove('hidden');
  });

  document.getElementById('menu-close').addEventListener('click', function () {
    document.getElementById('mobile-menu').classList.add('hidden');
  });

  function toggleSubmenu() {
    const submenu = document.getElementById('submenu');
    const arrowIcon = document.getElementById('arrow-icon');
    submenu.classList.toggle('hidden');
    arrowIcon.classList.toggle('rotate-180');
  }