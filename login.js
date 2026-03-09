document.getElementById('login-btn').addEventListener('click', function () {

  const x = document.getElementById('un').value;
  const y = document.getElementById('pw').value;

  if (x == "admin" && y == "admin123") {
    window.alert("Login successful");
    window.location.assign("home.html");
  } else {
    window.alert("Wrong credentials");
  }

});