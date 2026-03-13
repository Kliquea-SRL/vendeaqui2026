
  function toggleExclusiveAccordion(id) {
    for (let i = 1; i <= 6; i++) {
      const content = document.getElementById(`content-${i}`);
      const iconOpen = document.getElementById(`icon-open-${i}`);
      const iconClosed = document.getElementById(`icon-closed-${i}`);

      const isCurrent = i === id;
      const isOpen = content.classList.contains("open");

      if (isCurrent) {
        if (isOpen) {
          content.classList.remove("open");
          setTimeout(() => content.classList.add("hidden"), 600); // espera a que termine la animación
          iconOpen.classList.add("hidden");
          iconClosed.classList.remove("hidden");
        } else {
          content.classList.remove("hidden");
          setTimeout(() => content.classList.add("open"), 20); // da tiempo al navegador para aplicar transición
          iconOpen.classList.remove("hidden");
          iconClosed.classList.add("hidden");
        }
      } else {
        content.classList.remove("open");
        content.classList.add("hidden");
        iconOpen?.classList.add("hidden");
        iconClosed?.classList.remove("hidden");
      }
    }
  }
