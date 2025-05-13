document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");
    const menuLinks = document.querySelectorAll(".ul_link a");

    menuIcon.addEventListener("click", function () {
        navbar.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });

    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            navbar.classList.remove("active");
            menuIcon.classList.remove("active");
        });
    });
});

// Hacer transparente la navbar a la hroa de hacer scroll para no perder visibilidad

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});

// Menu hamburguesa

// Seleccionar el menú hamburguesa, la lista de enlaces y los enlaces individuales
const hamburger = document.querySelector('.hamburger');
const ulLinks = document.querySelector('.ul_link');
const links = document.querySelectorAll('.ul_link a'); // Seleccionar todos los enlaces

// Agregar un event listener para cuando se haga clic en el menú hamburguesa
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // Activa/desactiva la clase 'active'
    ulLinks.classList.toggle('active');   // Muestra/oculta el menú
});

// Agregar un event listener para cuando se haga clic en cualquiera de los enlaces
links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active'); // Eliminar la clase 'active' del hamburguesa
        ulLinks.classList.remove('active');   // Ocultar el menú
    });
});
