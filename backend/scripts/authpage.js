const handleLoadingState = (button, isLoading) => {
  if (isLoading) {
    button.classList.add("loading");
    button.disabled = true;
  } else {
    button.classList.remove("loading");
    button.disabled = false;
  }
};
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

const signupEmailError = document.getElementById("signupEmailError");
const signupPasswordError = document.getElementById("signupPasswordError");
const loginEmailError = document.getElementById("loginEmailError");

// Form toggle logic
const signupFormContainer = document.getElementById("signupFormContainer");
const loginFormContainer = document.getElementById("loginFormContainer");
const toggleToLogin = document.getElementById("toggleToLogin");
const toggleToSignup = document.getElementById("toggleToSignup");

toggleToLogin.addEventListener("click", () => {
  signupFormContainer.classList.add("hidden");
  loginFormContainer.classList.remove("hidden");
});

toggleToSignup.addEventListener("click", () => {
  loginFormContainer.classList.add("hidden");
  signupFormContainer.classList.remove("hidden");
});

// Helper function to display custom errors
const showError = (element, message) => {
  element.textContent = message;
  element.style.display = "block";
};

const clearError = (element) => {
  element.textContent = "";
  element.style.display = "none";
};

// Handle Signup form submission
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document
    .getElementById("signupConfirmPassword")
    .value.trim();
  const submitButton = signupForm.querySelector(".btn");
  handleLoadingState(submitButton, true);
  let isValid = true;

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError(signupEmailError, "Please enter a valid email address.");
    isValid = false;
  } else {
    clearError(signupEmailError);
  }

  // Validate password match
  if (password !== confirmPassword) {
    showError(signupPasswordError, "Passwords do not match.");
    isValid = false;
  } else if (password.length < 6) {
    showError(signupPasswordError, "Password must be at least 6 characters.");
    isValid = false;
  } else {
    clearError(signupPasswordError);
  }

  if (isValid) {
    console.log("has been called");
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // alert("Signup successful!");
        console.log("work of art");
        // signupForm.reset();
        const url = window.location.href;
        sessionStorage.setItem("authToken", generateRandomString());

        const urlObj = new URL(url);
        console.log("the url obj", urlObj);
        const returnToValue = urlObj.searchParams.get("returnTo");
        console.log(returnToValue);
        window.location.href = `manageevent/${returnToValue}`;

        toggleToLogin.click(); // Automatically show login form
        handleLoadingState(submitButton, false);

        // Use URLSearchParams to get the 'returnTo' parameter
      } else {
        handleLoadingState(submitButton, false);

        showError(signupEmailError, data.message || "Signup failed.");
      }
    } catch (error) {
      handleLoadingState(submitButton, false);
      console.log(error);
      showError(signupEmailError, "An error occurred. Please try again later.");
    }
    handleLoadingState(submitButton, false);
  } else {
    handleLoadingState(submitButton, false);
  }
});

// Handle Login form submission
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  let isValid = true;
  const submitButton = loginForm.querySelector(".btn");
  handleLoadingState(submitButton, true);

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError(loginEmailError, "Please enter a valid email address.");
    isValid = false;
  } else {
    clearError(loginEmailError);
  }

  if (isValid) {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        sessionStorage.setItem("authToken", generateRandomString());
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);
        loginForm.reset();
        const url = window.location.href;
        const urlObj = new URL(url);
        const returnToValue = urlObj.searchParams.get("returnTo");
        window.location.href = `manageevent/${returnToValue}`;
        handleLoadingState(submitButton, false);

        // Use URLSearchParams to get the 'returnTo' parameter
        // Redirect or perform any post-login actions here
      } else {
        showError(loginEmailError, data.message || "Login failed.");
      }
    } catch (error) {
      showError(loginEmailError, "An error occurred. Please try again later.");
    }
    handleLoadingState(submitButton, false);
  } else {
    handleLoadingState(submitButton, false);
  }
});
function generateRandomString(length = 12) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

console.log(generateRandomString()); // Example output: 'aBc123XyZ456'
