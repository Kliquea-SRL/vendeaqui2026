document.addEventListener('DOMContentLoaded', () => {
    // Función para mover la línea azul (sin cambios)
    function setActiveLine(el, line, containerSelector) {
        const container = el.closest(containerSelector);
        if (!container) return;
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const scrollLeft = container.scrollLeft || 0;
        line.style.width = `${rect.width}px`;
        line.style.left = `${rect.left - containerRect.left + scrollLeft}px`;
    }

    // ===== ELEMENTOS GLOBALES Y CONSTANTES =====
    const desktopItems = document.querySelectorAll('#submenu .submenu-item');
    const desktopLine = document.getElementById('active-line');
    const mobileItems = document.querySelectorAll('#mobile-submenu .submenu-item');
    const mobileLine = document.getElementById('mobile-active-line');
    const mobileSubmenu = document.getElementById('mobile-submenu');
    const submenuWrapper = document.getElementById('submenu-wrapper');

    // Guardar las secciones para no tener que consultarlas repetidamente
    const sections = [];
    document.querySelectorAll('a.submenu-item[href^="#"]').forEach(item => {
        try {
            const sectionId = item.getAttribute('href');
            const section = document.querySelector(sectionId);
            if (section) {
                sections.push(section);
            } else {
                console.warn(`Sección no encontrada para el href: ${sectionId}`);
            }
        } catch (e) {
            console.warn(`Error al buscar sección para href: ${item.getAttribute('href')}`, e);
        }
    });

    // ===== LÓGICA DE ACTUALIZACIÓN DE ÍTEM ACTIVO EN SCROLL DE PÁGINA =====
    function updateActiveStateOnPageScroll() {
        if (!sections.length || !submenuWrapper) return;

        const menuHeight = submenuWrapper.offsetHeight;
        let currentSectionId = null;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const rect = section.getBoundingClientRect();
            // Considera una sección activa si su borde superior está dentro de un umbral visible
            // (ej. en el 40% superior del área visible debajo del menú)
            if (rect.top <= menuHeight + (window.innerHeight - menuHeight) * 0.4 && rect.bottom > menuHeight) {
                currentSectionId = section.id;
                break;
            }
        }
        
        // Si ninguna sección cumple (ej. estamos muy arriba, antes de la primera sección)
        // podríamos querer desactivar todo o activar la primera si está parcialmente visible.
        if (!currentSectionId && sections.length > 0) {
            const firstSectionRect = sections[0].getBoundingClientRect();
             // Si estamos cerca del inicio de la primera sección
            if (firstSectionRect.top <= menuHeight + 50 && firstSectionRect.bottom > menuHeight) {
                 // currentSectionId = sections[0].id; // Opcional: activar la primera si está muy cerca del tope
            }
        }


        // Actualizar ítems de escritorio
        desktopItems.forEach(item => {
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                if (!item.classList.contains('active')) {
                    item.classList.add('active');
                }
                setActiveLine(item, desktopLine, '#submenu');
            } else {
                item.classList.remove('active');
            }
        });
        if (!currentSectionId && document.querySelector('#submenu .submenu-item.active')) {
            desktopItems.forEach(i => i.classList.remove('active'));
            if (desktopLine) desktopLine.style.width = '0px';
        } else if (currentSectionId && !document.querySelector('#submenu .submenu-item.active') && desktopItems.length > 0) {
            // Si hay una sección pero ningún item activo (puede pasar al cargar sin hash),
            // activa el correspondiente si lo encuentra
            const targetItem = document.querySelector(`#submenu .submenu-item[href="#${currentSectionId}"]`);
            if(targetItem) {
                targetItem.classList.add('active');
                setActiveLine(targetItem, desktopLine, '#submenu');
            }
        }


        // Actualizar ítems móviles
        mobileItems.forEach(item => {
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                if (!item.classList.contains('active')) {
                    item.classList.add('active');
                }
                setActiveLine(item, mobileLine, '#mobile-submenu');
                const listItem = item.closest('li');
                if (listItem && mobileSubmenu && mobileSubmenu.scrollWidth > mobileSubmenu.clientWidth) {
                    listItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            } else {
                item.classList.remove('active');
            }
        });
        if (!currentSectionId && document.querySelector('#mobile-submenu .submenu-item.active')) {
            mobileItems.forEach(i => i.classList.remove('active'));
            if (mobileLine) mobileLine.style.width = '0px';
        } else if (currentSectionId && !document.querySelector('#mobile-submenu .submenu-item.active') && mobileItems.length > 0) {
             const targetItem = document.querySelector(`#mobile-submenu .submenu-item[href="#${currentSectionId}"]`);
            if(targetItem) {
                targetItem.classList.add('active');
                setActiveLine(targetItem, mobileLine, '#mobile-submenu');
                const listItem = targetItem.closest('li');
                if (listItem && mobileSubmenu && mobileSubmenu.scrollWidth > mobileSubmenu.clientWidth) {
                    listItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        }
    }

    // ===== EVENT LISTENERS =====

    // --- Scroll de la página ---
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveStateOnPageScroll, 60); // Throttle
    });

    // --- Clics en ítems de menú (común para Desktop y Mobile) ---
    function handleMenuItemClick(e, items, line, menuSelector, isMobile = false) {
        e.preventDefault();
        const clickedItem = e.currentTarget;
        const targetId = clickedItem.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement && submenuWrapper) {
            items.forEach(i => i.classList.remove('active'));
            clickedItem.classList.add('active');
            setActiveLine(clickedItem, line, menuSelector);

            if (isMobile) {
                const listItem = clickedItem.closest('li');
                if (listItem && mobileSubmenu && mobileSubmenu.scrollWidth > mobileSubmenu.clientWidth) {
                    listItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }

            const menuHeight = submenuWrapper.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - menuHeight - 80; // 15px de margen

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            // Se espera que el listener de scroll de la ventana actualice el estado después del scroll,
            // pero podemos forzar una actualización de la línea inmediatamente.
            // La clase 'active' ya está puesta.
        }
    }

    desktopItems.forEach(item => {
        item.addEventListener('click', (e) => handleMenuItemClick(e, desktopItems, desktopLine, '#submenu'));
        item.addEventListener('mouseenter', () => {
            if (desktopLine) setActiveLine(item, desktopLine, '#submenu');
        });
        item.addEventListener('mouseleave', () => {
            const active = document.querySelector('#submenu .submenu-item.active');
            if (active && desktopLine) {
                setActiveLine(active, desktopLine, '#submenu');
            } else if (desktopLine) {
                desktopLine.style.width = '0px';
            }
        });
    });

    mobileItems.forEach(item => {
        item.addEventListener('click', (e) => handleMenuItemClick(e, mobileItems, mobileLine, '#mobile-submenu', true));
        // El touchstart original para mover la línea podría ser útil para feedback inmediato.
        // Lo dejamos fuera por ahora para simplificar, ya que el click y scroll de página se encargan.
        // item.addEventListener('touchstart', () => setActiveLine(item, mobileLine, '#mobile-submenu'));
    });


    // --- DOMContentLoaded ---
    function initializeMenuState() {
        const hash = window.location.hash;
        if (hash && sections.find(s => `#${s.id}` === hash)) {
            const targetElement = document.querySelector(hash);
            if (targetElement && submenuWrapper) {
                const menuHeight = submenuWrapper.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - menuHeight - 15;
                
                // Hacemos scroll sin 'smooth' para que sea instantáneo al cargar
                window.scrollTo({ top: targetPosition, behavior: 'auto' });

                // Activar el ítem correspondiente
                desktopItems.forEach(i => i.classList.remove('active'));
                mobileItems.forEach(i => i.classList.remove('active'));

                const activeDesktopItem = document.querySelector(`#submenu .submenu-item[href="${hash}"]`);
                if (activeDesktopItem && desktopLine) {
                    activeDesktopItem.classList.add('active');
                    setActiveLine(activeDesktopItem, desktopLine, '#submenu');
                }
                const activeMobileItem = document.querySelector(`#mobile-submenu .submenu-item[href="${hash}"]`);
                if (activeMobileItem && mobileLine) {
                    activeMobileItem.classList.add('active');
                    setActiveLine(activeMobileItem, mobileLine, '#mobile-submenu');
                    const listItem = activeMobileItem.closest('li');
                    if (listItem && mobileSubmenu && mobileSubmenu.scrollWidth > mobileSubmenu.clientWidth) {
                        // Usar 'auto' también para el scroll del menú al cargar
                        listItem.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
                    }
                }
                 // Forzar actualización después de scroll por hash
                setTimeout(updateActiveStateOnPageScroll, 150); // Dar tiempo al scroll por hash y luego reevaluar
                return; // Salir si se procesó un hash
            }
        }
        // Si no hay hash válido, o después de procesarlo, actualizar basado en el scroll actual.
        // Una pequeña demora para asegurar que el layout esté completo.
        setTimeout(updateActiveStateOnPageScroll, 100);
    }
    
    initializeMenuState();


    // --- Resize ---
    window.addEventListener('resize', () => {
        updateActiveStateOnPageScroll(); // Re-evaluar qué sección es visible
        // Y luego re-dibujar la línea para el que quede activo
        const activeDesktop = document.querySelector('#submenu .submenu-item.active');
        if (activeDesktop && desktopLine) setActiveLine(activeDesktop, desktopLine, '#submenu');
        
        const activeMobile = document.querySelector('#mobile-submenu .submenu-item.active');
        if (activeMobile && mobileLine) setActiveLine(activeMobile, mobileLine, '#mobile-submenu');
    });

    // Eliminar la función `updateActiveOnScroll` original si ya no es necesaria,
    // ya que `updateActiveStateOnPageScroll` ahora se encarga de la clase `active`
    // y el `scrollIntoView` del ítem activo en el menú móvil.
    // const mobileContainer = document.getElementById('mobile-submenu');
    // mobileContainer.addEventListener('scroll', () => {
    //  requestAnimationFrame(updateActiveOnScroll); // updateActiveOnScroll era tu función original
    // });
});