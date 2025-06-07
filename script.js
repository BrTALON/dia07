// Sons do questionário
const quizClickSound = new Audio('assents/audios/quiz-click.mp3');
quizClickSound.volume = 0.5;

const quizFinishSound = new Audio('assents/audios/quiz-finish.mp3');
quizFinishSound.volume = 0.5;

// Configurações iniciais
const questions = [
  {
    question: "Você me ama?",
    options: ["Sim", "Claro que sim", "Com certeza", "Mais que tudo"],
    answer: [0, 1, 2, 3]
  },
  {
    question: "Nosso amor é:",
    options: ["Eterno", "Especial", "Único", "Todas as anteriores"],
    answer: [0, 1, 2, 3]
  },
  {
    question: "O que você mais gosta em nós?",
    options: ["Nossa cumplicidade", "Nossos momentos", "Nosso respeito", "Tudo"],
    answer: [0, 1, 2, 3]
  },
  {
    question: "Qual nosso momento favorito?",
    options: ["Primeiro beijo", "Primeiro encontro", "Quando nos reconciliamos", "Todos"],
    answer: [0, 1, 2, 3]
  },
  {
    question: "O que deseja para nosso futuro?",
    options: ["Felicidade", "Sempre juntos", "Muitas conquistas", "Tudo isso"],
    answer: [0, 1, 2, 3]
  }
];

let currentQuestion = 0;
let pontuacao = 0;
let gameActive = false;
let currentMessageIndex = 0;

// Lista de coisas que amo em você
const coisasQueAmo = [
  "Seu sorriso ilumina meu dia",
  "Sua maneira de me entender sem palavras",
  "Seu abraço aconchegante",
  "Seu jeito carinhoso",
  "Sua paciência comigo",
  "Seu senso de humor",
  "Sua inteligência",
  "Seu olhar meigo",
  "Sua voz suave",
  "Seu cheiro característico",
  "Seu jeito de cuidar de mim",
  "Sua companhia que me completa",
  "Seu coração bondoso",
  "Sua determinação",
  "Seu jeito único de ser",
  "Sua paixão pelas coisas que gosta",
  "Seu apoio incondicional",
  "Sua honestidade",
  "Sua lealdade",
  "Seu jeito de me fazer feliz"
];

// Mensagens românticas para o popup
const romanticMessages = [
  {
    title: "Para o Amor da Minha Vida",
    text: "Amo-te como se amam certas coisas obscuras, secretamente, entre a sombra e a alma. - Pablo Neruda"
  },
  {
    title: "Nosso Amor",
    text: "O amor não se vê com os olhos, mas com o coração. - Shakespeare"
  },
  {
    title: "Minha Inspiração",
    text: "Nada neste mundo é mais suave do que você. - Fernando Pessoa"
  },
  {
    title: "Minha Razão de Viver",
    text: "Eu te amo não apenas por quem você é, mas por quem eu sou quando estou com você."
  },
  {
    title: "Nosso Futuro",
    text: "Amar não é olhar um para o outro, é olhar juntos na mesma direção."
  },
  {
    title: "Alma Gêmea",
    text: "O amor é composto de uma única alma habitando dois corpos. - Aristóteles"
  },
  {
    title: "Minha Paixão",
    text: "Você é o meu hoje e meu amanhã, o meu para sempre e meu sempre."
  },
  {
    title: "Minha Felicidade",
    text: "O melhor sentimento do mundo é saber que você me ama tanto quanto eu te amo."
  }
];

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('current-year').textContent = new Date().getFullYear();
  showQuestion();
  setupGame();
  calcularTempo();
  setupGallery();
  setupPoema();
  generateLoveList();
  setupBeijoCounter();
  setupRomanticPopup();
});

function showQuestion() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = `
    <div class="quiz-question animate__animated animate__fadeIn">
      <h3>${questions[currentQuestion].question}</h3>
      <div class="quiz-options">
        ${questions[currentQuestion].options.map((option, index) => `
          <div class="quiz-option" onclick="selectOption(${index})">
            ${option}
          </div>
        `).join('')}
      </div>
    </div>
  `;
  document.getElementById('verificarResposta').style.display = 'none';
}

function selectOption(index) {
  const options = document.querySelectorAll('.quiz-option');
  options.forEach(opt => {
    opt.style.backgroundColor = '#f8f8f8';
    opt.style.color = '#333';
    opt.style.transform = 'scale(1)';
  });

  options[index].style.backgroundColor = 'var(--primary-color)';
  options[index].style.color = 'var(--white)';
  options[index].style.transform = 'scale(1.05)';

  quizClickSound.play();

  document.getElementById('verificarResposta').style.display = 'inline-block';
  document.getElementById('verificarResposta').onclick = () => checkAnswer(index);
}

function checkAnswer() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  document.getElementById('tela-questionario').style.display = 'none';
  document.getElementById('tela-inicial').style.display = 'flex';

  const bgMusic = document.getElementById('backgroundMusic');
  bgMusic.play();
  bgMusic.volume = 0.3;

  quizFinishSound.play();

  for (let i = 0; i < 25; i++) {
    setTimeout(() => createHeart(), i * 200);
  }
}

function createHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '❤️';
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = '-50px';
  heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
  heart.style.animation = `heartRain ${Math.random() * 3 + 2}s linear forwards`;
  heart.style.zIndex = '9999';
  heart.style.opacity = Math.random() * 0.5 + 0.5;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

// Galeria de Fotos Aprimorada
function setupGallery() {
  // Efeito de raspagem
  document.querySelectorAll('.galeria-foto').forEach(foto => {
    let isScratching = false;
    
    foto.addEventListener('mousedown', startScratching);
    foto.addEventListener('mouseup', stopScratching);
    foto.addEventListener('mousemove', scratchWithMouse);
    
    foto.addEventListener('touchstart', startScratching);
    foto.addEventListener('touchend', stopScratching);
    foto.addEventListener('touchmove', scratchWithTouch);
  });

  // Modal para zoom
  const modal = document.getElementById('fotoModal');
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('caption');
  const closeModal = document.querySelector('.close-modal');

  document.querySelectorAll('.galeria-foto').forEach(foto => {
    foto.addEventListener('click', function() {
      modal.style.display = 'block';
      modalImg.src = this.style.backgroundImage.slice(5, -2);
      captionText.innerHTML = this.parentElement.querySelector('.foto-legenda').innerHTML;
    });
  });

  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

function startScratching(e) {
  e.preventDefault();
  this.classList.add('scratched');
  isScratching = true;
  scratch(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, this);
}

function stopScratching() {
  isScratching = false;
}

function scratchWithMouse(e) {
  if (isScratching) {
    scratch(e.clientX, e.clientY, e.target);
  }
}

function scratchWithTouch(e) {
  if (isScratching) {
    scratch(e.touches[0].clientX, e.touches[0].clientY, e.target);
    e.preventDefault();
  }
}

function scratch(x, y, element) {
  const rect = element.getBoundingClientRect();
  const scratchArea = document.createElement('div');
  scratchArea.className = 'scratch-area';
  scratchArea.style.left = `${x - rect.left - 15}px`;
  scratchArea.style.top = `${y - rect.top - 15}px`;
  element.appendChild(scratchArea);
}

// Contador de tempo
function calcularTempo() {
  const dataInicio = new Date("2018-06-07T00:00:00");
  const agora = new Date();
  
  let anos = agora.getFullYear() - dataInicio.getFullYear();
  let meses = agora.getMonth() - dataInicio.getMonth();
  let dias = agora.getDate() - dataInicio.getDate();
  
  if (dias < 0) {
    meses--;
    dias += new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
  }
  if (meses < 0) {
    anos--;
    meses += 12;
  }
  
  const horas = agora.getHours();
  const minutos = agora.getMinutes();
  const segundos = agora.getSeconds();
  
  document.getElementById("tempo").innerHTML = `
    ${anos} anos, ${meses} meses, ${dias} dias<br>
    ${horas} horas, ${minutos} minutos, ${segundos} segundos
  `;
  
  // Barra de progresso
  const inicioAno = new Date(agora.getFullYear(), 0, 1);
  const progressoAno = (agora - inicioAno) / (1000 * 60 * 60 * 24);
  const diasNoAno = (new Date(agora.getFullYear(), 11, 31) - inicioAno) / (1000 * 60 * 60 * 24);
  document.getElementById("progress-bar").style.width = `${(progressoAno / diasNoAno) * 100}%`;
  
  // Próximo aniversário
  const proximoAniversario = new Date(agora.getFullYear(), dataInicio.getMonth(), dataInicio.getDate());
  if (proximoAniversario < agora) proximoAniversario.setFullYear(agora.getFullYear() + 1);
  const diasRestantes = Math.ceil((proximoAniversario - agora) / (1000 * 60 * 60 * 24));
  
  document.getElementById("next-milestone").innerHTML = `
    Próximo marco em <strong>${diasRestantes} dias</strong><br>
    ${proximoAniversario.toLocaleDateString('pt-BR')}
  `;
  
  setTimeout(calcularTempo, 1000);
}

// Jogo do Amor
function setupGame() {
  const canvas = document.getElementById('jogoCanvas');
  const ctx = canvas.getContext('2d');
  
  const jogador = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 30,
    width: 50,
    height: 20,
    speed: 8,
    dx: 0
  };
  
  const coracao = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 20,
    height: 20,
    speed: 3
  };
  
  function drawPlayer() {
    ctx.fillStyle = '#ff6699';
    ctx.fillRect(jogador.x, jogador.y, jogador.width, jogador.height);
    
    ctx.beginPath();
    ctx.moveTo(jogador.x + jogador.width/2, jogador.y - 5);
    ctx.bezierCurveTo(
      jogador.x + jogador.width/2 + 10, jogador.y - 15,
      jogador.x + jogador.width/2 + 20, jogador.y - 5,
      jogador.x + jogador.width/2, jogador.y + 5
    );
    ctx.bezierCurveTo(
      jogador.x + jogador.width/2 - 20, jogador.y - 5,
      jogador.x + jogador.width/2 - 10, jogador.y - 15,
      jogador.x + jogador.width/2, jogador.y - 5
    );
    ctx.fillStyle = '#ff0066';
    ctx.fill();
  }
  
  function drawHeart() {
    ctx.beginPath();
    ctx.moveTo(coracao.x + coracao.width/2, coracao.y);
    ctx.bezierCurveTo(
      coracao.x + coracao.width, coracao.y - coracao.height/2,
      coracao.x + coracao.width, coracao.y + coracao.height/2,
      coracao.x + coracao.width/2, coracao.y + coracao.height
    );
    ctx.bezierCurveTo(
      coracao.x, coracao.y + coracao.height/2,
      coracao.x, coracao.y - coracao.height/2,
      coracao.x + coracao.width/2, coracao.y
    );
    ctx.fillStyle = '#ff0066';
    ctx.fill();
  }
  
  function update() {
    jogador.x += jogador.dx;
    jogador.x = Math.max(0, Math.min(canvas.width - jogador.width, jogador.x));
    
    coracao.y += coracao.speed;
    
    // Colisão
    if (coracao.y + coracao.height >= jogador.y &&
        coracao.x + coracao.width >= jogador.x &&
        coracao.x <= jogador.x + jogador.width) {
      pontuacao++;
      document.getElementById('pontuacao').textContent = `Pontuação: ${pontuacao}`;
      
      if (pontuacao >= 100) {
        showRomanticPopup();
        gameActive = false;
      } else {
        resetHeart();
      }
    } else if (coracao.y > canvas.height) {
      resetHeart();
    }
  }
  
  function resetHeart() {
    coracao.y = 0;
    coracao.x = Math.random() * (canvas.width - 20);
    coracao.speed = 3 + Math.random() * 2;
  }
  
  function gameLoop() {
    if (!gameActive) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawHeart();
    update();
    
    requestAnimationFrame(gameLoop);
  }
  
  // Controles
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') jogador.dx = jogador.speed;
    if (e.key === 'ArrowLeft') jogador.dx = -jogador.speed;
  });
  
  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') jogador.dx = 0;
  });
  
  // Botão iniciar
  document.getElementById('startGame').addEventListener('click', () => {
    if (!gameActive) {
      gameActive = true;
      pontuacao = 0;
      document.getElementById('pontuacao').textContent = `Pontuação: ${pontuacao}`;
      resetHeart();
      gameLoop();
    }
  });
}

// Poema Interativo
function setupPoema() {
  const versos = document.querySelectorAll('.verso');
  versos.forEach((verso, index) => {
    setTimeout(() => {
      verso.style.opacity = '0.3';
      verso.style.transform = 'translateY(0)';
    }, index * 200);
    
    verso.addEventListener('mouseenter', function() {
      this.style.opacity = '1';
      this.style.transform = 'translateY(0) scale(1.05)';
    });
    
    verso.addEventListener('mouseleave', function() {
      this.style.opacity = '0.3';
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Lista de Coisas que Amo
function generateLoveList() {
  const listaContainer = document.getElementById('coisas-que-amo');
  const shuffledList = [...coisasQueAmo].sort(() => 0.5 - Math.random());
  const selectedItems = shuffledList.slice(0, 10); // Mostra 10 itens aleatórios
  
  selectedItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    listaContainer.appendChild(li);
  });
}

// Contador de Beijos
function setupBeijoCounter() {
  let contador = localStorage.getItem('beijoCounter') || 0;
  document.getElementById('contador-numero').textContent = contador;
  
  document.getElementById('adicionar-beijo').addEventListener('click', function() {
    contador++;
    updateBeijoCounter(contador);
  });
  
  document.getElementById('adicionar-beijao').addEventListener('click', function() {
    contador += 5;
    updateBeijoCounter(contador);
  });
  
  document.getElementById('reset-beijos').addEventListener('click', function() {
    if (confirm('Tem certeza que quer resetar o contador de beijos?')) {
      contador = 0;
      updateBeijoCounter(contador);
    }
  });
}

function updateBeijoCounter(value) {
  localStorage.setItem('beijoCounter', value);
  document.getElementById('contador-numero').textContent = value;
  
  // Efeito visual
  const counter = document.getElementById('contador-numero');
  counter.style.transform = 'scale(1.2)';
  setTimeout(() => {
    counter.style.transform = 'scale(1)';
  }, 300);
}

// Popup Romântico Aprimorado
function setupRomanticPopup() {
  const prevBtn = document.getElementById('prev-message');
  const nextBtn = document.getElementById('next-message');
  
  prevBtn.addEventListener('click', showPrevMessage);
  nextBtn.addEventListener('click', showNextMessage);
}

function showRomanticPopup() {
  const popup = document.getElementById('romantic-popup');
  const popupTitle = document.getElementById('popup-title');
  const popupText = document.getElementById('popup-text');
  const romanticMusic = document.getElementById('romantic-music');
  const bgMusic = document.getElementById('backgroundMusic');
  const prevBtn = document.getElementById('prev-message');
  const nextBtn = document.getElementById('next-message');
  
  currentMessageIndex = 0;
  updatePopupMessage();
  
  popup.style.display = 'flex';
  bgMusic.pause();
  romanticMusic.play();
  romanticMusic.volume = 0.5;
  
  document.querySelector('.close-popup').onclick = () => {
    popup.style.display = 'none';
    romanticMusic.pause();
    bgMusic.play();
  };
}

function showPrevMessage() {
  if (currentMessageIndex > 0) {
    currentMessageIndex--;
    updatePopupMessage();
  }
}

function showNextMessage() {
  if (currentMessageIndex < romanticMessages.length - 1) {
    currentMessageIndex++;
    updatePopupMessage();
  }
}

function updatePopupMessage() {
  const popupTitle = document.getElementById('popup-title');
  const popupText = document.getElementById('popup-text');
  const prevBtn = document.getElementById('prev-message');
  const nextBtn = document.getElementById('next-message');
  
  const message = romanticMessages[currentMessageIndex];
  popupTitle.textContent = message.title;
  popupText.textContent = message.text;
  
  // Atualizar estado dos botões
  prevBtn.disabled = currentMessageIndex === 0;
  nextBtn.disabled = currentMessageIndex === romanticMessages.length - 1;
  
  // Efeito de transição
  popupText.style.opacity = '0';
  setTimeout(() => {
    popupText.style.opacity = '1';
    popupText.style.transition = 'opacity 0.5s ease';
  }, 100);
}

// Entrar no site principal
document.getElementById('entrarSite').addEventListener('click', () => {
  document.getElementById('tela-inicial').style.display = 'none';
  document.getElementById('conteudo-site').style.display = 'block';
  document.getElementById('conteudo-site').classList.add('animate__fadeIn');
});