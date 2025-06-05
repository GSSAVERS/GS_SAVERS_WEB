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
// =============================
// DADOS DO QUIZ (10 perguntas)
// Cada objeto: { question: "", options: [...], correctIndex: n }
// Informações retiradas de: QuizGecko “Flood Quiz” :contentReference[oaicite:0]{index=0}
const quizData = [
  {
    question: "1. O que é uma planície de inundação (floodplain)?",
    options: [
      "Uma região propensa a terremotos e deslizamentos",
      "Uma área alta adjacente a um corpo d’água que raramente inunda",
      "Uma área baixa adjacente a um corpo d’água que frequentemente inunda", // correto :contentReference[oaicite:1]{index=1}
      "Uma área distante de qualquer corpo d’água"
    ],
    correctIndex: 2
  },
  {
    question: "2. Qual é a principal causa de inundações durante tempestades tropicais e furacões?",
    options: [
      "Chuvas excessivas",               // correto :contentReference[oaicite:2]{index=2}
      "Falhas em infraestrutura (diques, represas)",
      "Derretimento de neve",
      "Transbordamento de rios"
    ],
    correctIndex: 0
  },
  {
    question: "3. Qual infraestrutura é construída ao redor de corpos d’água para elevar suas margens e prevenir inundações?",
    options: [
      "Barragem",
      "Dique (levee)",                   // correto :contentReference[oaicite:3]{index=3}
      "Canal",
      "Reservatório"
    ],
    correctIndex: 1
  },
  {
    question: "4. Qual foi a tempestade tropical mais cara da história dos Estados Unidos?",
    options: [
      "Tropical Storm Allison",         // correto :contentReference[oaicite:4]{index=4}
      "Furacão Katrina",
      "Furacão Sandy",
      "Tempestade Tropical Harvey"
    ],
    correctIndex: 0
  },
  {
    question: "5. O que é uma ‘storm surge’?",
    options: [
      "Uma elevação rápida do nível do mar durante uma tempestade", // correto :contentReference[oaicite:5]{index=5}
      "Uma queda repentina de pressão atmosférica",
      "Um evento de vento forte",
      "Um tipo de inundação repentina (‘flash flood’)"
    ],
    correctIndex: 0
  },
  {
    question: "6. Qual é a característica definidora de uma inundação repentina (‘flash flood’)?",
    options: [
      "Elevação rápida do nível da água",                            // correto :contentReference[oaicite:6]{index=6}
      "Inundação lenta e sustentada",
      "Marés altas combinadas com chuva",
      "Transbordamento de água subterrânea"
    ],
    correctIndex: 0
  },
  {
    question: "7. De que tipo de água as inundações podem ser compostas?",
    options: [
      "Água doce",
      "Água salgada",
      "Água salobra",                                                 // correto :contentReference[oaicite:7]{index=7}
      "Todas as anteriores"
    ],
    correctIndex: 2
  },
  {
    question: "8. Quais fatores podem levar ao transbordamento de rios (river flooding)?",
    options: [
      "Chuvas intensas",
      "Derretimento de neve",                                         // correto :contentReference[oaicite:8]{index=8}
      "Falhas em represas",
      "Todas as anteriores"
    ],
    correctIndex: 3
  },
  {
    question: "9. Qual tipo de inundação frequentemente traz excelentes benefícios agrícolas?",
    options: [
      "Inundação de rios (river flooding)",                           // correto :contentReference[oaicite:9]{index=9}
      "Inundação urbana",
      "Inundação costeira",
      "Inundação repentina (‘flash flood’)"
    ],
    correctIndex: 0
  },
  {
    question: "10. Qual é o conceito de inundação subterrânea (groundwater flooding)?",
    options: [
      "Elevação rápida do nível da maré",
      "Evaporação excessiva",
      "Transbordamento de rios",
      "Aumento do nível da água abaixo do solo"                      // correto :contentReference[oaicite:10]{index=10}
    ],
    correctIndex: 3
  }
];

// ÍNDICES e estado atual
let currentQuestionIndex = 0;
let userAnswers = new Array(quizData.length).fill(null);

// Seletores
const quizContainer = document.getElementById("quiz-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const quizResult = document.getElementById("quiz-result");
const scoreSpan = document.getElementById("score");

// Função para renderizar a pergunta atual
function renderQuestion() {
  // Limpa o container
  quizContainer.innerHTML = "";

  const qObj = quizData[currentQuestionIndex];
  const questionEl = document.createElement("div");
  questionEl.classList.add("quiz-question");
  questionEl.innerHTML = `<p>${qObj.question}</p>`;

  const optionsList = document.createElement("ul");
  optionsList.classList.add("quiz-options");

  qObj.options.forEach((opt, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="radio" name="option" value="${idx}"
          ${userAnswers[currentQuestionIndex] === idx ? "checked" : ""} />
        ${opt}
      </label>
    `;
    optionsList.appendChild(li);
  });

  quizContainer.append(questionEl, optionsList);

  // Ajusta exibição dos botões
  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.style.display = currentQuestionIndex === quizData.length - 1 ? "none" : "inline-block";
  submitBtn.style.display = currentQuestionIndex === quizData.length - 1 ? "inline-block" : "none";
}

// Atualiza resposta selecionada pelo usuário no array
quizContainer.addEventListener("change", (e) => {
  if (e.target.name === "option") {
    userAnswers[currentQuestionIndex] = parseInt(e.target.value);
  }
});

// Botão “Anterior”
prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
});

// Botão “Próxima”
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  }
});

// Botão “Enviar” (após a última pergunta)
submitBtn.addEventListener("click", () => {
  let correctCount = 0;
  quizData.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });
  scoreSpan.textContent = `${correctCount}`;
  quizResult.style.display = "block";
  // Esconde controles para não interferir após enviar
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
  submitBtn.style.display = "none";
});

// Quando a página carrega, renderiza a primeira pergunta
document.addEventListener("DOMContentLoaded", () => {
  renderQuestion();
});
