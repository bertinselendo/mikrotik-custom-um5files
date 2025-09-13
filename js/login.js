// Function to get URL parameters and auto-fill username
function initLoginForm() {
  // Get the username from the URL hash (e.g., #username:john)
  var hash = window.location.hash.substring(1);
  var username = "";
  if (hash.startsWith("username:")) {
    username = decodeURIComponent(hash.split(":")[1] || "");
  }
  var usernameField = document.getElementById("username");

  if (username && usernameField) {
    usernameField.value = username;

    // Auto-attempt login if username is provided and no password field is shown
    var hasPasswordCheckbox = document.getElementById("has-password");
    if (hasPasswordCheckbox && !hasPasswordCheckbox.checked)
      // Wait a bit for the page to load, then attempt login
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
