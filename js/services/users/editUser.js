const onEditUser = async (id) => {
  try {
    const submitButton = document.getElementById("save-admin-edit-user");
    submitButton.addEventListener("click", async () => {
      const fullName = document.getElementById("edit-user-name").value;
      const email = document.getElementById("edit-user-email").value;
      const role = document.getElementById("edit-user-role").value;
      const status = document.getElementById("edit-user-status").value;

      const firstName = fullName.split(" ")[0];
      const lastName = fullName.split(" ").slice(1).join(" ");
      const token = window.localStorage.getItem("token");
      const response = await fetch(
        "https://serverkita.vercel.app/auth/editProfile/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role === "admin" ? true : false,
            status: status === "active" ? true : false,
          }),
        }
      );

      const res = await response.json();

      if (res.status === 200) {
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
const getEditedUser = () => {
  try {
    const fullName = document.getElementById("edit-user-name");
    const email = document.getElementById("edit-user-email");
    const role = document.getElementById("edit-user-role");
    const status = document.getElementById("edit-user-status");

    const editedUser = JSON.parse(window.localStorage.getItem("editedUser"));

    fullName.value = editedUser.firstName + " " + editedUser.lastName;
    email.value = editedUser.email;
    role.value = editedUser.role ? "admin" : "user";
    status.value = editedUser.status ? "active" : "inactive";

    onEditUser(editedUser._id);
  } catch (error) {
    console.log(error);
  }
};

getEditedUser();
