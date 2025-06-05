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

// ---------------------------
  // Alternar Tema Claro/Escuro
  // ---------------------------
  const btnTema = document.getElementById("theme-toggle");
  const body = document.body;

  // Se o usuário já tiver salvo “modo-escuro = ativo”, ligamos automaticamente
  if (localStorage.getItem("modo-escuro") === "ativo") {
    body.classList.add("dark-mode");
    btnTema.textContent = "☀️";
  }

  btnTema.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      btnTema.textContent = "☀️";
      localStorage.setItem("modo-escuro", "ativo");
    } else {
      btnTema.textContent = "🌙";
      localStorage.setItem("modo-escuro", "inativo");
    }
  });
