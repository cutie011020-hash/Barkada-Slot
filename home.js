// 🔐 GET USER
const user = localStorage.getItem("user");

console.log("Loaded user:", user);

// 🚫 NO USER → REGISTER
if (!user || user === "null" || user === "") {
  window.location.href = "register.html";
}

// 🔥 FIREBASE REF
const userRef = db.ref("users/" + user);

// 💰 LOAD BALANCE (REALTIME - SAFE)
function loadBalance() {
  userRef.on("value", (snap) => {
    const data = snap.val();

    console.log("Firebase data:", data);

    // ❗ wait lang pag wala pa data
    if (!data) return;

    if (data.balance !== undefined) {
      document.getElementById("balance").innerText = data.balance;
    }
  });
}

// 🎮 OPEN GAME
function openGame() {
  window.location.href = "classic.html";
}

// 🔒 BLOCK BACK BUTTON
history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.go(1);
};

// INIT
loadBalance();
