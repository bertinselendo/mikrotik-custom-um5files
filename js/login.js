// Function to get URL parameters and auto-fill username and password from hash format: #login:username-password
function initLoginForm() {
  // Example hash: #login:john-secret
  var hash = window.location.hash.substring(1);
  var username = null;
  var password = null;

  if (hash.startsWith("login:")) {
    var credentials = hash.split(":")[1];
    var sepIndex = credentials.indexOf("-");
    if (sepIndex !== -1) {
      username = decodeURIComponent(credentials.substring(0, sepIndex));
      password = decodeURIComponent(credentials.substring(sepIndex + 1));
    } else {
      username = decodeURIComponent(credentials);
    }
  }

  var usernameField = document.getElementById("username");
  var passwordField = document.getElementById("password");
  var hasPasswordCheckbox = document.getElementById("has-password");

  if (username && usernameField) {
    usernameField.value = username;
  }

  if (password && passwordField && hasPasswordCheckbox) {
    // Show password field and fill it
    hasPasswordCheckbox.checked = true;
    passwordField.style.display = "block";
    passwordField.value = password;
  }

  // Auto-attempt login if username is provided
  if (username && usernameField) {
    setTimeout(function () {
      loginSubmited();
    }, 500);
  }
}

function loginSubmited() {
  document.getElementById("error-text").innerHTML = "";
  var postData = {};
  postData.username = document.getElementById("username").value;
  postData.password = document.getElementById("password").value;
  ajax.post("../api/login", postData, function (responseText) {
    try {
      obj = JSON.parse(responseText); // XXX probably wont work if <= IE7
      if (obj.success) {
        document.getElementById("error-text").innerHTML = "";
        location.reload();
      } else {
        document.getElementById("error-text").innerHTML = obj.data.error;
      }
    } catch (e) {
      alert("Unknown error.");
    }
  });
}
