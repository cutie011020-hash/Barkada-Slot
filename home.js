// 🔐 GET USER
const user = localStorage.getItem("user");

console.log("Loaded user:", user);

// 🚫 PAG WALANG USER → REGISTER
if (!user || user === "null" || user === "") {
  window.location.href = "register.html";
}

// 🔥 FIREBASE REF
const userRef = db.ref("users/" + user);

// 💰 LOAD BALANCE (REALTIME SAFE - NO RESET)
function loadBalance() {
  userRef.on("value", (snap) => {
    const data = snap.val();

    if (data && data.balance !== undefined) {
      document.getElementById("balance").innerText = data.balance;
    } else {
      // ❗ only set default kung totally wala pang data
      userRef.set({ balance: 1000 });
    }
  });
}

// 🎮 OPEN GAME
function openGame() {
  window.location.href = "classic.html";
}

// 🚫 OPTIONAL LOGOUT (pwede mo tanggalin kung ayaw mo)
function logout() {
  localStorage.removeItem("user");
  window.location.href = "register.html";
}

// 🔒 PREVENT BACK TO REGISTER (PHONE BACK BUTTON)
history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.go(1);
};

// INIT
loadBalance();
