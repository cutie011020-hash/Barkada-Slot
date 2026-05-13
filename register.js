function register() {
  const number = document.getElementById("number").value.trim();

  if (!number) return alert("Enter number");

  console.log("Saving user:", number);

  const userRef = db.ref("users/" + number);

  userRef.once("value").then(snap => {

    if (!snap.exists()) {
      // new user
      userRef.set({
        balance: 1000
      });
    }

    // SAVE SESSION
    localStorage.setItem("user", number);

    // IMPORTANT DELAY (mobile fix)
    setTimeout(() => {
      window.location.href = "home.html";
    }, 100);

  });
}
