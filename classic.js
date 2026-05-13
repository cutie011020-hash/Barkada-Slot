let balance = 1000;
let bet = 1;

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

function rand() {
  return symbols[Math.floor(Math.random()*symbols.length)];
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

function generateLose() {
  let grid;
  do {
    grid = Array.from({length: 9}, rand);
  } while (calculateWin(grid) > 0);
  return grid;
}

function generateWin(symbol) {
  const line = paylines[Math.floor(Math.random()*paylines.length)];
  let grid = Array.from({length: 9}, rand);
  line.forEach(i => grid[i] = symbol);
  return grid;
}

function spin() {
  if (balance < bet) return alert("No balance");

  const reels = document.getElementById("reels");
  const winText = document.getElementById("winText");

  balance -= bet;
  document.getElementById("balance").innerText = balance;

  winText.innerText = "";

  // START SPIN
  reels.classList.add("spin");

  let interval = setInterval(() => {
    let temp = Array.from({length: 9}, rand);
    display(temp);
  }, 80);

  // ⏱️ 2 SECONDS
  setTimeout(() => {
    clearInterval(interval);
    reels.classList.remove("spin");

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

    const win = calculateWin(grid) * bet;
    balance += win;
    document.getElementById("balance").innerText = balance;

    if (win > 0) {
      winText.innerText = "🎉 PANALO: " + win;

      reels.classList.add("win");
      setTimeout(() => reels.classList.remove("win"), 600);
    }

  }, 2000); // 🔥 2 seconds
}

function changeBet(x) {
  bet += x;
  if (bet < 1) bet = 1;
  if (bet > 100) bet = 100;
  document.getElementById("bet").innerText = bet;
}

function back() {
  window.location.href = "index.html";
}

document.getElementById("balance").innerText = balance;
