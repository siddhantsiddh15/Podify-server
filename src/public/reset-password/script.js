const error = document.getElementById("error");
const success = document.getElementById("success");
const loader = document.getElementById("loader");
const formContainer = document.getElementById("form-container");
const form = document.getElementById("reset-form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm");

// Hide initially
error.style.display = "none";
success.style.display = "none";

// -------------

function displayError(message) {
  success.style.display = "none";
  error.innerText = message;
  error.style.display = "block";
}

function displaySuccess(message) {
  error.style.display = "none";
  success.innerText = message;

  success.style.display = "block";
}

// Form submit

form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();

  if (!password.value.trim()) {
    displayError("Password is missing");
    return;
  }

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;

  if (!passwordRegex.test(password.value)) {
    displayError(
      "Password is too simple. Use alphanumeric with special characters"
    );
    return;
  }

  if (password.value !== confirmPassword.value) {
    displayError("Password do not match");
    return;
  }

  // Disable butto and show loader test
  const btn = form.querySelector("button");
  console.log(">>>>>>", btn);
  btn.disabled = true;
  btn.innerText = "Please wait..";

  // Submit updated password

  try {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");

    const res = await fetch("/auth/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        token,
        userId,
        password: password.value,
      }),
    });

    // Handle errors
    if (!res.ok) {
      const { error: errMsg } = await res.json();
      displayError(errMsg);
      button.disabled = false;
      button.innerText = "Reset Password";
      return;
    }

    // Success
    displaySuccess("Your password is reset successfully!");

    // Reset form fields
    password.value = "";
    confirmPassword.value = "";
  } catch (err) {
    displayError("Something went wrong. Try Again.");
  }

  button.disabled = false;
  button.innerText = "Reset Password";
}
