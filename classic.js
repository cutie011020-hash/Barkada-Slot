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

function rand() {
  return symbols[Math.floor(Math.random()*symbols.length)];
}

// ❌ LOSE GRID
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
      total += (pay[grid[a]] || 0) * bet;
    }
  });

  return total;
}

// 🎨 DISPLAY GRID
function display(g) {
  document.getElementById("reels").innerHTML = `
    <div class="grid">
      <div>${g[0]}</div><div>${g[1]}</div><div>${g[2]}</div>
      <div>${g[3]}</div><div>${g[4]}</div><div>${g[5]}</div>
      <div>${g[6]}</div><div>${g[7]}</div><div>${g[8]}</div>
    </div>
  `;
}

// 🎰 SPIN SYSTEM (~90% LOSE)
function spin() {
  if (balance < bet) return alert("Not enough balance");

  balance -= bet;

  let grid;
  let roll = Math.random();

  if (roll < 0.005) grid = generateWin("⭐");
  else if (roll < 0.015) grid = generateWin("🔔");
  else if (roll < 0.025) grid = generateWin("🍉");
  else if (roll < 0.035) grid = generateWin("🍊");
  else if (roll < 0.055) grid = generateWin("🍋");
  else if (roll < 0.075) grid = generateWin("🍎");
  else if (roll < 0.10) grid = generateWin("🍒");
  else grid = generateLose();

  display(grid);

  const win = calculateWin(grid);
  balance += win;

  updateUI();

  if (win > 0) alert("PANALO: " + win);
}

// BET
function changeBet(val) {
  bet += val;
  if (bet < 1) bet = 1;
  if (bet > 100) bet = 100;
  updateUI();
}

// UI
function updateUI() {
  document.getElementById("balance").innerText = balance;
  document.getElementById("bet").innerText = bet;
}

// BACK
function back() {
  window.location.href = "index.html";
}

// INIT
updateUI();
