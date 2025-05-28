const onLogin = async () => {
  const loginButton = document.getElementById("login-button");
  loginButton.addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const res = await response.json();

      if (res.status === 200) {
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("user", JSON.stringify(res.data));
        alert(res.message);
        if (res.data.role) {
          window.location.href = "/pages/dashboardAdmin.html";
        } else {
          window.location.href = "/pages/user-dashboard.html";
        }
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

onLogin();
