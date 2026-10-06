const canvas = document.querySelector('#sky');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  stars = Array.from({ length: Math.min(90, Math.floor(innerWidth / 12)) }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    size: Math.random() * 1.5 + .3, phase: Math.random() * Math.PI * 2
  }));
}

function draw(time = 0) {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const star of stars) {
    ctx.globalAlpha = .2 + (Math.sin(time / 850 + star.phase) + 1) * .25;
    ctx.fillStyle = '#ffe7d1';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

function makePetal(x = Math.random() * innerWidth, y = -20) {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.textContent = Math.random() > .55 ? '✿' : '❀';
  petal.style.left = `${x}px`;
  petal.style.top = `${y}px`;
  petal.style.fontSize = `${12 + Math.random() * 18}px`;
  petal.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
  petal.style.animationDuration = `${5 + Math.random() * 4}s`;
  document.body.append(petal);
  petal.addEventListener('animationend', () => petal.remove(), { once: true });
}

const button = document.querySelector('#surprise');
const card = document.querySelector('.card');
const surpriseMessage = document.querySelector('#surprise-message');

function burstPetal() {
  const petal = document.createElement('span');
  petal.className = 'petal burst';
  petal.textContent = ['✿', '❀', '✦', '♥'][Math.floor(Math.random() * 4)];
  petal.style.left = `${innerWidth / 2}px`;
  petal.style.top = `${innerHeight * .47}px`;
  petal.style.fontSize = `${16 + Math.random() * 24}px`;
  petal.style.setProperty('--burst-x', `${Math.random() * 440 - 220}px`);
  petal.style.setProperty('--burst-y', `${Math.random() * -240 - 40}px`);
  petal.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
  petal.style.animationDuration = `${4 + Math.random() * 3}s`;
  document.body.append(petal);
  petal.addEventListener('animationend', () => petal.remove(), { once: true });
}

button.addEventListener('click', () => {
  card.classList.add('is-surprised');
  surpriseMessage.hidden = false;
  button.innerHTML = 'Otra lluvia de flores <span aria-hidden="true">✧</span>';
  button.setAttribute('aria-label', 'Lanza otra lluvia de flores');
  for (let i = 0; i < 72; i++) setTimeout(burstPetal, i * 22);
});

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(draw);
setInterval(() => makePetal(), 1100);
