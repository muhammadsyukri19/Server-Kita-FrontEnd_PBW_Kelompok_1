const onEditProfile = async () => {
  try {
    const editProfileButton = document.getElementById("edit-profil-user-btn");
    editProfileButton.addEventListener("click", async () => {
      const firstName = document.getElementById("profile-first-name").value;
      const lastName = document.getElementById("profile-last-name").value;
      const email = document.getElementById("profile-email").value;
      const phone = document.getElementById("profile-phone").value;
      const company = document.getElementById("profile-company").value;
      const jobTitle = document.getElementById("profile-job-title").value;
      const address = document.getElementById("profile-address").value;

      const token = window.localStorage.getItem("token");
      const response = await fetch(
        "https://serverkita.vercel.app/auth/editProfile",
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
            phone: phone,
            company: company,
            jobTitle: jobTitle,
            address: address,
          }),
        }
      );

      const res = await response.json();

      if (res.status === 200) {
        window.localStorage.setItem("user", JSON.stringify(res.data));
        alert(res.message);
        window.location.href = window.location.href;
      } else {
        alert(res.message);
      }
    });
  } catch (error) {
    console.log(err);
  }
};

onEditProfile();
