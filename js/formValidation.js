// Fungsi validasi email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Fungsi untuk validasi form login
function validateLoginForm() {
  const email = document.getElementById("login-email");
  const password = document.getElementById("login-password");
  let isValid = true;

  if (!email.value.trim()) {
    email.nextElementSibling.textContent = "Email tidak boleh kosong";
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    email.nextElementSibling.textContent = "Email tidak valid";
    isValid = false;
  } else {
    email.nextElementSibling.textContent = "";
  }

  if (!password.value.trim()) {
    password.nextElementSibling.textContent = "Password tidak boleh kosong";
    isValid = false;
  } else if (password.value.length < 6) {
    password.nextElementSibling.textContent = "Password minimal 6 karakter";
    isValid = false;
  } else {
    password.nextElementSibling.textContent = "";
  }

  return isValid;
}

// Fungsi validasi form signup
function validateSignupForm() {
  const name = document.getElementById("signup-name");
  const email = document.getElementById("signup-email");
  const password = document.getElementById("signup-password");
  let isValid = true;

  if (!name.value.trim()) {
    name.nextElementSibling.textContent = "Nama tidak boleh kosong";
    isValid = false;
  } else {
    name.nextElementSibling.textContent = "";
  }

  if (!email.value.trim()) {
    email.nextElementSibling.textContent = "Email tidak boleh kosong";
    isValid = false;
  } else if (!isValidEmail(email.value.trim())) {
    email.nextElementSibling.textContent = "Email tidak valid";
    isValid = false;
  } else {
    email.nextElementSibling.textContent = "";
  }

  if (!password.value.trim()) {
    password.nextElementSibling.textContent = "Password tidak boleh kosong";
    isValid = false;
  } else if (password.value.length < 6) {
    password.nextElementSibling.textContent = "Password minimal 6 karakter";
    isValid = false;
  } else {
    password.nextElementSibling.textContent = "";
  }

  return isValid;
}
