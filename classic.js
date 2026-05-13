let balance = 1000;
let bet = 1;

// 🎯 PAYLINES
const paylines = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6]
];

// 💰 PAYTABLE
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

// 🎲 RANDOM SYMBOL
function rand() {
  return symbols[Math.floor(Math.random()*symbols.length)];
}

// ❌ LOSING GRID
function generateLose() {
  let grid;

  do {
    grid = Array.from({length: 9}, rand);
  } while (calculateWin(grid) > 0);

  return grid;
}

// ✅ WIN GRID
function generateWin(symbol) {
  const line = paylines[Math.floor(Math.random()*paylines.length)];

  let grid = Array.from({length: 9}, rand);

  line.forEach(i => grid[i] = symbol);

  return grid;
}

// 💰 CALCULATE WIN
function calculateWin(grid) {
  let total = 0;

  paylines.forEach(line => {
    const [a,b,c] = line;

    if (grid[a] === grid[b] && grid[b] === grid[c]) {
      total += pay[grid[a]] * bet;
    }
  });

  return total;
}

// 🎨 DISPLAY
function display(g) {
  const reels = document.getElementById("reels").children;

  for (let i = 0; i < 9; i++) {
    reels[i].innerText = g[i];
  }
}

// 🎰 SPIN (HIGH LOSING RATE)
function spin() {
  if (balance < bet) return alert("Not enough balance");

  balance -= bet;

  let grid;
  let roll = Math.random();

  if (roll < 0.01) {
    grid = generateWin("⭐");

  } else if (roll < 0.02) {
    grid = generateWin("🔔");

  } else if (roll < 0.03) {
    grid = generateWin("🍉");

  } else if (roll < 0.035) {
    grid = generateWin("🍊");

  } else if (roll < 0.04) {
    grid = generateWin("🍋");

  } else if (roll < 0.045) {
    grid = generateWin("🍎");

  } else if (roll < 0.05) {
    grid = generateWin("🍒");

  } else {
    grid = generateLose(); // 🔥 95% LOSE
  }

  display(grid);

  const win = calculateWin(grid);
  balance += win;

  document.getElementById("balance").innerText = balance;

  if (win > 0) {
    setTimeout(() => alert("PANALO: " + win), 100);
  }
}

// ➕➖ BET
function betPlus() {
  bet++;
  document.getElementById("bet").innerText = bet;
}

function betMinus() {
  if (bet > 1) bet--;
  document.getElementById("bet").innerText = bet;
}

// 🔙 BACK
function back() {
  window.location.href = "home.html";
}

// INIT
document.getElementById("balance").innerText = balance;
