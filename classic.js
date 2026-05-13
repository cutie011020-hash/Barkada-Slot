let balance = 1000;

// 🎯 PAYLINES (no vertical)
const paylines = [
  [0,1,2], // top
  [3,4,5], // middle
  [6,7,8], // bottom
  [0,4,8], // diagonal \
  [2,4,6]  // diagonal /
];

// 💰 PAYTABLE
const pay = {
  "🍒": 0.25,
  "🍋": 3,
  "🍉": 6,
  "🔔": 12,
  "⭐": 30
};

// ❌ LOSING PRESETS
const losing = [
["🍒","🍉","🍋","🍉","🍒","🍋","🍋","🍒","🍉"],
["🍉","🍒","🍋","🍋","🍉","🍒","🍒","🍋","🍉"],
["🍋","🍒","🍉","🍒","🍋","🍉","🍉","🍋","🍒"],
["🍒","🍋","🍉","🍉","🍒","🍋","🍋","🍉","🍒"],
["🍉","🍋","🍒","🍒","🍉","🍋","🍋","🍒","🍉"]
];

// ✅ WIN PRESETS (iba-ibang fruits + iba-ibang lines)
const wins = [
{grid:["🍋","🍋","🍋","🍒","🍉","🍒","🍉","🍒","🍉"]},
{grid:["🍒","🍉","🍒","🍉","🍉","🍉","🍋","🍒","🍋"]},
{grid:["🍒","🍋","🍒","🍉","🍒","🍉","⭐","⭐","⭐"]},
{grid:["🔔","🍒","🍉","🍒","🔔","🍉","🍉","🍒","🔔"]},
{grid:["🍋","🍒","🍉","🍒","🍋","🍉","🍉","🍒","🍋"]},
{grid:["🍉","🍒","🍋","🍒","🍉","🍋","🍋","🍒","🍉"]}
];

function updateUI() {
  document.getElementById("balance").innerText = balance;
}

function display(g) {
  document.getElementById("reels").innerHTML = `
    ${g[0]} ${g[1]} ${g[2]}<br>
    ${g[3]} ${g[4]} ${g[5]}<br>
    ${g[6]} ${g[7]} ${g[8]}
  `;
}

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

function spin() {
  if (balance < 1) return alert("No balance");

  balance -= 1;

  let chosen;

  // 🎯 LOW WIN RATE (20%)
  if (Math.random() < 0.2) {
    chosen = wins[Math.floor(Math.random() * wins.length)].grid;
  } else {
    chosen = losing[Math.floor(Math.random() * losing.length)];
  }

  display(chosen);

  const win = calculateWin(chosen);

  balance += win;

  updateUI();

  if (win > 0) alert("PANALO: " + win);
}

function back() {
  window.location.href = "index.html";
}

updateUI();
