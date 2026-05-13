let balance = 1000;
let bet = 1;
let isSpinning = false;

const userId = "player1"; // 🔥 change later if may login ka

const paylines = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6]
];

const pay = {
  "🍒": 0.25,
  "🍋": 3,
  "🍎": 3,
  "🍉": 6,
  "🍊": 6,
  "🔔": 12,
  "⭐": 30
};

const symbols = ["🍒","🍋","🍎","🍉","🍊","🔔","⭐"];

// 🔊 SOUND
function playSound(id) {
  const sound = document.getElementById(id);
  if (!sound) return;
  sound.currentTime = 0;
  sound.play();
}

// 🔥 LOAD BALANCE
function loadBalance() {
  db.ref("users/" + userId + "/balance").once("value")
    .then(snapshot => {
      if (snapshot.exists()) {
        balance = snapshot.val();
      } else {
        balance = 1000;
        db.ref("users/" + userId).set({ balance: balance });
      }

      document.getElementById("balance").innerText = balance;
    });
}

// 💾 SAVE
function saveBalance() {
  db.ref("users/" + userId).update({
    balance: balance
  });
}

// 🎲 RANDOM
function rand() {
  return symbols[Math.floor(Math.random()*symbols.length)];
}

// 🎨 DISPLAY
function display(g) {
  document.getElementById("reels").innerHTML = `
    ${g[0]} ${g[1]} ${g[2]}<br>
    ${g[3]} ${g[4]} ${g[5]}<br>
    ${g[6]} ${g[7]} ${g[8]}
  `;
}

// 💰 CALC
function calculateWin(grid) {
  let total = 0;
  paylines.forEach(line => {
    const [a,b,c] = line;
    if (grid[a] === grid[b] && grid[b] === grid[c]) {
      total += pay[grid[a]] || 0;
    }
  });
  return total;
}

// ❌ LOSE
function generateLose() {
  let grid;
  do {
    grid = Array.from({length: 9}, rand);
  } while (calculateWin(grid) > 0);
  return grid;
}

// ✅ WIN
function generateWin(symbol) {
  const line = paylines[Math.floor(Math.random()*paylines.length)];
  let grid = Array.from({length: 9}, rand);
  line.forEach(i => grid[i] = symbol);
  return grid;
}

// 🎰 SPIN
function spin() {
  if (isSpinning) return;
  if (balance < bet) return alert("No balance");

  isSpinning = true;

  const reels = document.getElementById("reels");
  const winText = document.getElementById("winText");

  balance -= bet;
  saveBalance();

  document.getElementById("balance").innerText = balance;
  winText.innerText = "";

  reels.classList.add("spin");

  playSound("spinSound");

  let interval = setInterval(() => {
    let temp = Array.from({length: 9}, rand);
    display(temp);
  }, 60);

  setTimeout(() => {
    clearInterval(interval);

    let grid;
    let roll = Math.random();

    if (roll < 0.005) grid = generateWin("⭐");
    else if (roll < 0.01) grid = generateWin("🔔");
    else if (roll < 0.02) grid = generateWin("🍉");
    else if (roll < 0.03) grid = generateWin("🍊");
    else if (roll < 0.04) grid = generateWin("🍋");
    else if (roll < 0.05) grid = generateWin("🍎");
    else if (roll < 0.08) grid = generateWin("🍒");
    else grid = generateLose();

    display(grid);
    reels.classList.remove("spin");

    const win = calculateWin(grid) * bet;
    balance += win;

    saveBalance();

    document.getElementById("balance").innerText = balance;

    if (win > 0) {
      winText.innerText = "🎉 PANALO: " + win;
      playSound("winSound");

      reels.classList.add("win");
      setTimeout(() => reels.classList.remove("win"), 500);
    }

    isSpinning = false;

  }, 1000);
}

// BET
function changeBet(x) {
  bet += x;
  if (bet < 1) bet = 1;
  if (bet > 100) bet = 100;
  document.getElementById("bet").innerText = bet;
}

// BACK
function back() {
  window.location.href = "index.html";
}

// INIT
loadBalance();
