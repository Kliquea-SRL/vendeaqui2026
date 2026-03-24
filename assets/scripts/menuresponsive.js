
  const menu = document.getElementById("mobile-menu");
  const openBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("menu-close");
  const submenu = document.getElementById("submenu");
  const arrow = document.getElementById("arrow-icon");

  openBtn.addEventListener("click", () => {
    menu.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    menu.classList.add("hidden");
  });

  function toggleSubmenu() {
    submenu.classList.toggle("hidden");
    arrow.classList.toggle("rotate-180");
  }




