let balance = 0;
let bet = 1;
let isSpinning = false;

// 🔥 GET LOGGED USER
const userId = localStorage.getItem("user");

if (!userId) {
  window.location.href = "register.html";
}

// 🔥 FIREBASE REF
const userRef = db.ref("users/" + userId);

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

// 🎲 SYMBOLS
const symbols = ["🍒","🍋","🍎","🍉","🍊","🔔","⭐"];

// 🔊 SOUND
function playSound(id) {
  const sound = document.getElementById(id);
  if (!sound) return;
  sound.currentTime = 0;
  sound.play();
}

// 🔥 LOAD BALANCE (REALTIME)
function loadBalance() {
  userRef.on("value", snapshot => {
    const data = snapshot.val();

    if (data && data.balance !== undefined) {
      balance = data.balance;
    } else {
      balance = 1000;
      userRef.set({ balance });
    }

    document.getElementById("balance").innerText = balance;
  });
}

// 💾 SAVE BALANCE
function saveBalance() {
  userRef.update({
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

// ❌ GENERATE LOSE
function generateLose() {
  let grid;

  do {
    grid = Array.from({length: 9}, rand);
  } while (calculateWin(grid) > 0);

  return grid;
}

// ✅ GENERATE WIN
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

  // bawas bet
  balance -= bet;
  saveBalance();

  winText.innerText = "";

  reels.classList.add("spin");

  // 🔊 SOUND
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

    // compute win
    const win = calculateWin(grid) * bet;

    balance += win;
    saveBalance();

    if (win > 0) {
      winText.innerText = "🎉 PANALO: " + win;

      playSound("winSound");

      reels.classList.add("win");
      setTimeout(() => reels.classList.remove("win"), 500);
    }

    isSpinning = false;

  }, 1000); // 1 second spin
}

// 🎯 BET SYSTEM
function changeBet(x) {
  bet += x;

  if (bet < 1) bet = 1;
  if (bet > 100) bet = 100;

  document.getElementById("bet").innerText = bet;
}

// 🔙 BACK
function back() {
  window.location.href = "home.html";
}

// INIT
loadBalance();
