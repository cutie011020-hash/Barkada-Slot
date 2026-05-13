function register() {
  const number = document.getElementById("number").value;

  if (!number) return alert("Enter number");

  const userRef = db.ref("users/" + number);

  userRef.once("value", snap => {
    if (snap.exists()) {
      // existing user
      localStorage.setItem("user", number);
      window.location.href = "home.html";
    } else {
      // new user
      userRef.set({
        balance: 1000
      });

      localStorage.setItem("user", number);
      window.location.href = "home.html";
    }
  });
}
