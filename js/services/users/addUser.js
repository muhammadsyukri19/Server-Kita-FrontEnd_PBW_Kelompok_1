const createNewUser = async () => {
  try {
    const submitButton = document.getElementById("save-new-user");
    submitButton.addEventListener("click", async () => {
      const fullName = document.getElementById("new-user-name").value;
      const email = document.getElementById("new-user-email").value;
      const role = document.getElementById("new-user-role").value;
      const status = document.getElementById("new-user-status").value;
      const password = document.getElementById("new-user-password").value;

      const token = window.localStorage.getItem("token");
      const response = await fetch(
        "https://serverkita.vercel.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName: fullName,
            email: email,
            role: role === "admin" ? true : false,
            status: status === "active" ? true : false,
            password: password,
          }),
        }
      );

      const res = await response.json();

      if (res.status === 201) {
        alert(res.message);
        window.location.href = "/pages/user.html";
      } else {
        alert(res.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

createNewUser();
