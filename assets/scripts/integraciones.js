

  function toggleExclusiveAccordion(id) {
    const totalTabs = 5; // Cambia este número según la cantidad de tabs

    for (let i = 1; i <= totalTabs; i++) {
      const content = document.getElementById(`content-${i}`);
      const iconClosed = document.getElementById(`icon-closed-${i}`);
      const iconOpen = document.getElementById(`icon-open-${i}`);

      if (i === id) {
        const isHidden = content.classList.contains('hidden');
        // Cerrar todos
        document.querySelectorAll('[id^="content-"]').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('[id^="icon-closed-"]').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('[id^="icon-open-"]').forEach(el => el.classList.add('hidden'));

        // Abrir solo si estaba cerrado
        if (isHidden) {
          content.classList.remove('hidden');
          iconClosed.classList.add('hidden');
          iconOpen.classList.remove('hidden');
        }
      }
    }
  }
