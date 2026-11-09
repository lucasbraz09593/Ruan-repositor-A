let x = 50;
let y = 50;
let dx = 3;
let dy = 2;
let score = 0;
let time = 20;
let isRunning = true;

const arena = document.getElementById('arena');
const star = document.getElementById('star');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const restartButton = document.getElementById('restart');

let countdownTimer;
let movementTimer;

function updateHud() {
  scoreElement.textContent = String(score);
  timeElement.textContent = String(time);
}

function move() {
  if (!isRunning) {
    return;
  }

  const maxX = Math.max(arena.clientWidth - star.offsetWidth, 0);
  const maxY = Math.max(arena.clientHeight - star.offsetHeight, 0);

  x += dx;
  y += dy;

  if (x <= 0 || x >= maxX) {
    dx *= -1;
    x = Math.min(Math.max(x, 0), maxX);
  }

  if (y <= 0 || y >= maxY) {
    dy *= -1;
    y = Math.min(Math.max(y, 0), maxY);
  }

  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
}

function endGame() {
  isRunning = false;
  clearInterval(countdownTimer);
  clearInterval(movementTimer);
  star.disabled = true;
  alert(`Jogo encerrado! Sua pontuação foi: ${score}`);
}

function resetGame() {
  clearInterval(countdownTimer);
  clearInterval(movementTimer);

  x = 50;
  y = 50;
  dx = 3;
  dy = 2;
  score = 0;
  time = 20;
  isRunning = true;

  star.disabled = false;
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
  updateHud();

  countdownTimer = setInterval(() => {
    if (!isRunning) {
      return;
    }

    time -= 1;
    updateHud();

    if (time <= 0) {
      endGame();
    }
  }, 1000);

  movementTimer = setInterval(move, 30);
}

star.addEventListener('click', () => {
  if (!isRunning) {
    return;
  }

  score += 1;
  updateHud();

  dx = Math.sign(dx) * Math.min(Math.abs(dx) + 0.4, 8);
  dy = Math.sign(dy) * Math.min(Math.abs(dy) + 0.3, 6);
});

restartButton.addEventListener('click', resetGame);

updateHud();
resetGame();
