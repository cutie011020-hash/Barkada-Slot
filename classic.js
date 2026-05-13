let balance = 1000;

// 🎯 PAYLINES (horizontal + X)
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

// 🎲 SYMBOLS
const symbols = ["🍒","🍋","🍎","🍉","🍊","🔔","⭐"];

// 🎲 RANDOM SYMBOL
function rand() {
  return symbols[Math.floor(Math.random()*symbols.length)];
}

// ❌ GENERATE LOSING GRID
function generateLose() {
  let grid;

  do {
    grid = Array.from({length: 9}, rand);
  } while (calculateWin(grid) > 0);

  return grid;
}

// ✅ GENERATE WIN GRID
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
      total += pay[grid[a]] || 0;
    }
  });

  return total;
}

// 🎨 DISPLAY
function display(g) {
  document.getElementById("reels").innerHTML = `
    ${g[0]} ${g[1]} ${g[2]}<br>
    ${g[3]} ${g[4]} ${g[5]}<br>
    ${g[6]} ${g[7]} ${g[8]}
  `;
}

// 🎰 SPIN SYSTEM (HIGH LOSE RATE)
function spin() {
  if (balance < 1) return alert("No balance");

  balance -= 1;

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
    grid = generateLose(); // 🔥 ~90% LOSE
  }

  display(grid);

  const win = calculateWin(grid);
  balance += win;

  document.getElementById("balance").innerText = balance;

  if (win > 0) {
    alert("PANALO: " + win);
  }
}

// INIT
document.getElementById("balance").innerText = balance;

function back() {
  window.location.href = "index.html";
}
