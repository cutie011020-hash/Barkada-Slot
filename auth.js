function register() {
  const number = document.getElementById("number").value.trim();

  if (!number) {
    alert("Enter phone number");
    return;
  }

  const userRef = db.ref("users/" + number);

  userRef.once("value")
    .then((snap) => {

      if (snap.exists()) {
        // LOGIN
        localStorage.setItem("user", number);
        window.location.href = "home.html";

      } else {
        // REGISTER
        userRef.set({
          balance: 1000
        });

        localStorage.setItem("user", number);
        window.location.href = "home.html";
      }

    })
    .catch((err) => {
      console.error(err);
      alert("Firebase error");
    });
}
