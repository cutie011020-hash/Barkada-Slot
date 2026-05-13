// 🔐 GET USER
const user = localStorage.getItem("user");

console.log("Loaded user:", user);

// 🚫 PAG WALANG USER → REGISTER
if (!user || user === "null" || user === "") {
  window.location.href = "register.html";
}

// 🔥 FIREBASE REF
const userRef = db.ref("users/" + user);

// 💰 LOAD BALANCE (SAFE + EXACT DB VALUE)
function loadBalance() {
  userRef.once("value").then((snap) => {
    const data = snap.val();

    console.log("Firebase data:", data);

    if (data && data.balance !== undefined) {
      document.getElementById("balance").innerText = data.balance;
    } else {
      // ❗ kung walang data → display 0 lang (no overwrite)
      document.getElementById("balance").innerText = "0";
    }
  });
}

// 🎮 OPEN GAME
function openGame() {
  window.location.href = "classic.html";
}

// 🔒 PREVENT BACK BUTTON (di babalik sa register)
history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.go(1);
};

// INIT
loadBalance();
