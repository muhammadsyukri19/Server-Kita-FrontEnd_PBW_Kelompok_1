let agree = false;
const submitButton = document.getElementById("signup-button");
const agreeTerms = document.getElementById("agree-terms");
try {
  // Set button disabled secara default
  submitButton.disabled = true;

  agreeTerms.addEventListener("change", () => {
    // Menggunakan checked untuk checkbox, bukan value
    agree = agreeTerms.checked;

    // Update status disabled button berdasarkan checkbox
    submitButton.disabled = !agree;
  });
} catch (error) {
  console.error("Error:", error);
}

const onRegister = async () => {
  submitButton.addEventListener("click", async () => {
    const fullName = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          password: password,
        }),
      });

      const res = await response.json();

      if (res.status === 201) {
        alert(res.message);
        window.location.href = "/pages/login.html";
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

onRegister();
