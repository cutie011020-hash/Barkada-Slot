let userId = localStorage.getItem("userId");

if (!userId) {
  userId = "user_" + Math.floor(Math.random() * 1000000);
  localStorage.setItem("userId", userId);
}

let balance = 0;

function loadBalance() {
  db.ref("users/" + userId).once("value", snap => {
    if (snap.exists()) {
      balance = snap.val().balance;
    } else {
      balance = 1000;
      db.ref("users/" + userId).set({ balance });
    }
    updateUI();
  });
}

function saveBalance() {
  db.ref("users/" + userId).update({ balance });
}

function updateUI() {
  document.getElementById("balance").innerText = balance;
}

function spin() {
  if (balance < 5) return alert("No balance");

  balance -= 5;

  const symbols = ["🍒","🍋","🍉","🍇"];
  const r1 = symbols[Math.floor(Math.random()*symbols.length)];
  const r2 = symbols[Math.floor(Math.random()*symbols.length)];
  const r3 = symbols[Math.floor(Math.random()*symbols.length)];

  document.getElementById("reels").innerText = `${r1} ${r2} ${r3}`;

  if (r1 === r2 && r2 === r3) {
    balance += 30;
    alert("WIN!");
  }

  updateUI();
  saveBalance();
}

function back() {
  window.location.href = "../../home.html";
}

loadBalance();
