const user = localStorage.getItem("user");

console.log("Loaded user:", user);

// SAFE CHECK
if (!user || user === "null" || user === "") {
  window.location.href = "register.html";
}

// FIREBASE
const userRef = db.ref("users/" + user);

// AUTO BALANCE
userRef.on("value", (snap) => {
  const data = snap.val();

  if (data && data.balance !== undefined) {
    document.getElementById("balance").innerText = data.balance;
  } else {
    userRef.set({ balance: 0 });
  }
});

// GAME
function openGame() {
  window.location.href = "classic.html";
}

// LOGOUT
function logout() {
  localStorage.removeItem("user");
  window.location.href = "register.html";
}
