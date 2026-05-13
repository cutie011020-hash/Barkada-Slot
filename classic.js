// 💰 START
let balance = 1000;
let bet = 1;

// 🎯 PAYLINES (horizontal + diagonal only)
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

// 🎲 SYMBOL LIST
const symbols = ["🍒","🍋","🍎","🍉","🍊","🔔","⭐"];

// 🎲 RANDOM SYMBOL
function rand() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// ❌ GENERATE LOSING GRID (no winning lines)
function generateLose() {
  let grid;

  do {
    grid = Array.from({ length: 9 }, rand);
  } while (calculateWin(grid) > 0);

  return grid;
}

// ✅ GENERATE WIN GRID (random line + chosen symbol)
function generateWin(symbol) {
  const line = paylines[Math.floor(Math.random() * paylines.length)];

  let grid = Array.from({ length: 9 }, rand);

  line.forEach(i => grid[i] = symbol);

  return grid;
}

// 💰 CALCULATE WIN (with bet multiplier)
function calculateWin(grid) {
  let total = 0;

  paylines.forEach(line => {
    const [a, b, c] = line;

    if (grid[a] === grid[b] && grid[b] === grid[c]) {
      total += (pay[grid[a]] || 0) * bet;
    }
  });

  return total;
}

// 🎨 DISPLAY GRID
function display(g) {
  document.getElementById("reels").innerHTML = `
    ${g[0]} ${g[1]} ${g[2]}<br>
    ${g[3]} ${g[4]} ${g[5]}<br>
    ${g[6]} ${g[7]} ${g[8]}
  `;
}

// 🎰 SPIN SYSTEM (HIGH LOSE RATE ~90%)
function spin() {
  if (balance < bet) {
    alert("Not enough balance");
    return;
  }

  balance -= bet;

  let grid;
  let roll = Math.random();

  if (roll < 0.005) {
    grid = generateWin("⭐"); // 0.5%

  } else if (roll < 0.015) {
    grid = generateWin("🔔"); // 1%

  } else if (roll < 0.025) {
    grid = generateWin("🍉"); // 1%

  } else if (roll < 0.035) {
    grid = generateWin("🍊"); // 1%

  } else if (roll < 0.055) {
    grid = generateWin("🍋"); // 2%

  } else if (roll < 0.075) {
    grid = generateWin("🍎"); // 2%

  } else if (roll < 0.10) {
    grid = generateWin("🍒"); // 2.5%

  } else {
    grid = generateLose(); // 🔥 ~90% lose
  }

  display(grid);

  const win = calculateWin(grid);
  balance += win;

  updateUI();

  if (win > 0) {
    alert("PANALO: " + win);
  }
}

// 🔧 CHANGE BET
function changeBet(value) {
  bet += value;

  if (bet < 1) bet = 1;
  if (bet > 100) bet = 100;

  updateUI();
}

// 🔄 UPDATE UI
function updateUI() {
  document.getElementById("balance").innerText = balance;
  document.getElementById("bet").innerText = bet;
}

// 🔙 BACK
function back() {
  window.location.href = "index.html";
}

// 🚀 INIT
updateUI();
