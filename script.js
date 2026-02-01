const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');

const reactionImage = document.getElementById('reactionImage');
const reactions = [
  'gomma 1.gif',
  'gomma 2.gif',
  'goma 3.gif'
];

let lastReactionIndex = -1;
let isEscaping = false;


function moveNoButtonRandomly() {
  if (isEscaping) return;
  isEscaping = true;
  noBtn.style.position = 'absolute';

  // ✅ RANDOMIZE GIF ON EVERY NO ATTEMPT
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * reactions.length);
  } while (newIndex === lastReactionIndex);

  lastReactionIndex = newIndex;

  reactionImage.style.opacity = '0';

  setTimeout(() => {
    reactionImage.src = reactions[newIndex];
    reactionImage.style.opacity = '1';
  }, 120);

  // ---- existing NO button movement logic ----
  // ---- NO button movement INSIDE the white card ----
   // ---- NO button movement near YES button ----
// ---- NO button movement near YES (FIXED) ----
const buttons = document.querySelector('.buttons');
const buttonsRect = buttons.getBoundingClientRect();
const yesRect = yesBtn.getBoundingClientRect();
const noRect = noBtn.getBoundingClientRect();

// Radius limits
const minOffset = 200;
const maxOffset = 400;

// Random angle + distance
const angle = Math.random() * Math.PI * 2;
const distance =
  minOffset + Math.random() * (maxOffset - minOffset);

// Position relative to BUTTONS container
let targetX =
  yesRect.left - buttonsRect.left +
  Math.cos(angle) * distance;

let targetY =
  yesRect.top - buttonsRect.top +
  Math.sin(angle) * distance;

// Clamp inside buttons container
const padding = 8;
targetX = Math.max(
  padding,
  Math.min(buttons.clientWidth - noRect.width - padding, targetX)
);
targetY = Math.max(
  padding,
  Math.min(buttons.clientHeight - noRect.height - padding, targetY)
);

// Switch positioning ONLY now
noBtn.style.position = 'absolute';
noBtn.style.left = `${targetX}px`;
noBtn.style.top = `${targetY}px`;

  setTimeout(() => {
    isEscaping = false;
  }, 150);
}


// Move away BEFORE user can click
noBtn.addEventListener('mouseenter', moveNoButtonRandomly);
noBtn.addEventListener('touchstart', moveNoButtonRandomly);

// Extra safety: move when cursor gets close (desktop)
document.addEventListener('mousemove', (e) => {
  const rect = noBtn.getBoundingClientRect();
  const distance = Math.hypot(
    e.clientX - (rect.left + rect.width / 2),
    e.clientY - (rect.top + rect.height / 2)
  );

  if (distance < 70) {
    moveNoButtonRandomly();
  }
});

// YES wins 😌
const bgMusic = document.getElementById('bgMusic');

yesBtn.addEventListener('click', () => {
  page1.classList.add('hidden');
  page2.classList.remove('hidden');

  bgMusic.currentTime = 0;
  bgMusic.volume = 0.7;
  bgMusic.play();
});



// HEART RAIN
setInterval(() => {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '💕';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 3 + 3 + 's';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}, 300);

