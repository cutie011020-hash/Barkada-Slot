<!DOCTYPE html>
<html>
<head>
  <title>Register</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- FIREBASE -->
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>

  <script src="js/firebase.js"></script>

  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: radial-gradient(circle, #8b0000, black);
      font-family: Arial;
      color: gold;
    }

    .box {
      background: black;
      padding: 30px;
      border-radius: 15px;
      border: 3px solid gold;
      text-align: center;
      box-shadow: 0 0 20px gold;
    }

    input {
      padding: 10px;
      width: 200px;
      border-radius: 10px;
      border: none;
      margin-bottom: 10px;
      text-align: center;
    }

    button {
      padding: 10px 20px;
      background: gold;
      border: none;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>

<div class="box">
  <h2>📱 Register / Login</h2>

  <input type="text" id="number" placeholder="Enter phone number">
  <br>
  <button onclick="register()">ENTER</button>
</div>

<script src="register.js"></script>

</body>
</html>
