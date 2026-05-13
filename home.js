// 🔐 GET USER FROM LOCAL
const user = localStorage.getItem("user");

// 🚫 PAG WALANG USER → BALIK REGISTER
if (!user) {
  window.location.href = "register.html";
}

// 🔥 FIREBASE REF
const userRef = db.ref("users/" + user);

// 💰 LOAD & AUTO UPDATE BALANCE
userRef.on("value", (snap) => {
  const data = snap.val();

  if (data && data.balance !== undefined) {
    document.getElementById("balance").innerText = data.balance;
  } else {
    // fallback kung walang data
    userRef.set({
      balance: 1000
    });
  }
});

// 🎮 OPEN SLOT GAME
function openGame() {
  window.location.href = "classic.html";
}

// 🚪 LOGOUT FUNCTION
function logout() {
  localStorage.removeItem("user");
  window.location.href = "register.html";
}

// ⚙️ OPTIONAL MENU CLICK (pwede mo lagyan later)
function openMenu() {
  alert("Menu coming soon 😄");
}

// 👤 OPTIONAL PROFILE CLICK
function openProfile() {
  alert("Profile system next natin 😎");
}

// 🔄 REFRESH BALANCE MANUALLY (optional)
function refreshBalance() {
  userRef.once("value").then((snap) => {
    const data = snap.val();
    if (data) {
      document.getElementById("balance").innerText = data.balance;
    }
  });
}
