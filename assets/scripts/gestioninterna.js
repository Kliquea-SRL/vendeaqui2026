function toggleExclusiveAccordion(id) {
    const totalTabs = 16; // Ajusta si agregas más tabs
  
    for (let i = 1; i <= totalTabs; i++) {
      const content = document.getElementById('content-' + i);
      const icon = document.getElementById('icon-' + i);
  
      if (i === id) {
        const isHidden = content.classList.contains('hidden');
        // Primero cerrar todo
        document.querySelectorAll('[id^="content-"]').forEach(c => c.classList.add('hidden'));
        document.querySelectorAll('[id^="icon-"]').forEach(ic => ic.textContent = '+');
  
        if (isHidden) {
          content.classList.remove('hidden');
          icon.textContent = '−'; // Cambia el ícono al abierto
        }
      }
    }
  }
  