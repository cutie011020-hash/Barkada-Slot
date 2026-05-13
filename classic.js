let balance = 1000;

const symbols = ["🍒","🍋","🍉","🔔","⭐","🪙"];

function updateUI() {
  document.getElementById("balance").innerText = balance;
}

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spin() {
  if (balance < 10) return alert("No balance");

  balance -= 10;

  // 🎲 Controlled RNG (important)
  const winChance = Math.random();

  let grid = [];

  // 👉 30% chance win
  if (winChance > 0.7) {
    const sym = randomSymbol();
    grid = [sym, sym, sym, sym, sym, sym, sym, sym, sym];
  } else {
    grid = Array.from({length: 9}, () => randomSymbol());
  }

  display(grid);

  let win = calculateWin(grid);

  balance += win;

  updateUI();

  if (win > 0) {
    alert("PANALO! +" + win);
  }
}

function display(g) {
  const reels = `
  ${g[0]} ${g[1]} ${g[2]}<br>
  ${g[3]} ${g[4]} ${g[5]}<br>
  ${g[6]} ${g[7]} ${g[8]}
  `;
  document.getElementById("reels").innerHTML = reels;
}

function calculateWin(g) {
  let win = 0;

  // horizontal
  if (g[0] === g[1] && g[1] === g[2]) win += 20;
  if (g[3] === g[4] && g[4] === g[5]) win += 20;
  if (g[6] === g[7] && g[7] === g[8]) win += 20;

  // diagonal
  if (g[0] === g[4] && g[4] === g[8]) win += 50;
  if (g[2] === g[4] && g[4] === g[6]) win += 50;

  // 🪙 jackpot chance
  const coins = g.filter(x => x === "🪙").length;

  if (coins >= 3) {
    const jackpot = Math.random();

    if (jackpot > 0.9) return 1000; // GRAND
    if (jackpot > 0.7) return 100;
    if (jackpot > 0.5) return 25;
    return 10;
  }

  return win;
}

function back() {
  window.location.href = "index.html";
}

updateUI();
