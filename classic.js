let balance = 1000;

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
  "🍊": 6,   // ✅ NEW
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

// 🎰 SPIN SYSTEM (UPDATED CHANCES)
function spin() {
  if (balance < 1) return alert("No balance");

  balance -= 1;

  let grid;
  let roll = Math.random();

  if (roll < 0.01) {
    grid = generateWin("⭐"); // 1%

  } else if (roll < 0.03) {
    grid = generateWin("🔔"); // 2%

  } else if (roll < 0.06) {
    grid = generateWin("🍉"); // 3%

  } else if (roll < 0.09) {
    grid = generateWin("🍊"); // ✅ 3% NEW

  } else if (roll < 0.13) {
    grid = generateWin("🍋"); // 4%

  } else if (roll < 0.17) {
    grid = generateWin("🍎"); // 4%

  } else if (roll < 0.22) {
    grid = generateWin("🍒"); // 5%

  } else {
    grid = generateLose(); // 78%
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
