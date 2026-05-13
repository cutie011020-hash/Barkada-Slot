// 🔐 GET USER
const user = localStorage.getItem("user");

console.log("Loaded user:", user);

// 🚫 PAG WALANG USER → REGISTER
if (!user || user === "null" || user === "") {
  window.location.href = "register.html";
}

// 🔥 FIREBASE REF
const userRef = db.ref("users/" + user);

// 💰 LOAD BALANCE (DISPLAY ONLY - NO RESET)
function loadBalance() {
  userRef.on("value", (snap) => {
    const data = snap.val();

    if (data && data.balance !== undefined) {
      document.getElementById("balance").innerText = data.balance;
    } else {
      // ❗ wala talagang laman DB → display 0 lang
      document.getElementById("balance").innerText = "0";
    }
  });
}

// 🎮 OPEN GAME
function openGame() {
  window.location.href = "classic.html";
}

// 🔒 PREVENT BACK (para di bumalik sa register)
history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.go(1);
};

// INIT
loadBalance();
