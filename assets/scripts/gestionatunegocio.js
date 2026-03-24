

  
  function toggleExclusiveAccordion(id) {
    for (let i = 1; i <= 16; i++) {
      const content = document.getElementById(`content-${i}`);
      const iconOpen = document.getElementById(`icon-open-${i}`);
      const iconClosed = document.getElementById(`icon-closed-${i}`);

      if (i === id) {
        const isOpen = !content.classList.contains('hidden');
        content.classList.toggle('hidden');
        iconOpen.classList.toggle('hidden', isOpen);
        iconClosed.classList.toggle('hidden', !isOpen);
      } else {
        if (content && iconOpen && iconClosed) {
          content.classList.add('hidden');
          iconOpen.classList.add('hidden');
          iconClosed.classList.remove('hidden');
        }
      }
    }
  }

  // Toggle menú móvil
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.remove('hidden');
  });

  document.getElementById('menu-close').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('hidden');
  });

  function toggleSubmenu() {
    const submenu = document.getElementById("submenu");
    const arrow = document.getElementById("arrow-icon");
    submenu.classList.toggle("hidden");
    arrow.classList.toggle("rotate-180");
  }
