const onChangePassword = async () => {
  try {
    const submitButton = document.getElementById("change-password-btn");
    submitButton.addEventListener("click", async () => {
      const currentPassword = document.getElementById("current-password");
      const newPassword = document.getElementById("new-password");
      const confirmNewPassword = document.getElementById("confirm-password");

      const token = window.localStorage.getItem("token");
      const response = await fetch(
        "https://serverkita.vercel.app/auth/changePassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: currentPassword.value,
            newPassword: newPassword.value,
            confirmNewPassword: confirmNewPassword.value,
          }),
        }
      );

      const res = await response.json();

      if (res.status === 200) {
        alert(res.message);
        currentPassword.value = "";
        newPassword.value = "";
        confirmNewPassword.value = "";
      } else {
        alert(res.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

onChangePassword();
