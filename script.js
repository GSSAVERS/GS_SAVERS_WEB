// script.js

// Função para fazer scroll suave ao clicar em cada item do menu
function inicializarMenu() {
  const links = document.querySelectorAll(".nav-menu a");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const destino = link.getAttribute("data-target");
      const secaoAlvo = document.getElementById(destino);

      if (secaoAlvo) {
        secaoAlvo.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarMenu();
});
