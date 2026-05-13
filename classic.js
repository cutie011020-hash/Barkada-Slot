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

// 💰 CALCULATE WIN (with bet)
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

// 🎨 DISPLAY
function display(g) {
  document.getElementById("reels").innerHTML = `
    ${g[0]} ${g[1]} ${g[2]}<br>
    ${g[3]} ${g[4]} ${g[5]}<br>
    ${g[6]} ${g[7]} ${g[8]}
  `;
}

// 🎰 SPIN
function spin() {
  if (balance < bet) return alert("Not enough balance");

  balance -= bet;

  let grid;
  let roll = Math.random();

  if (roll < 0.005) grid = generateWin("⭐");
  else if (roll < 0.015) grid = generateWin("🔔");
  else if (roll < 0.025
