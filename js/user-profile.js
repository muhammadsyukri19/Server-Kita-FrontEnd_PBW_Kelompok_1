document.addEventListener("DOMContentLoaded", function () {
  // --- Tab Switching ---
  const tabButtons = document.querySelectorAll(".profile-tab-btn");
  const tabContents = document.querySelectorAll(".profile-tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      // Hapus class 'active' dari semua tab dan tombol
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((tab) => tab.classList.remove("active"));

      // Tambahkan class 'active' ke tab yang sesuai
      document.getElementById(target).classList.add("active");
      this.classList.add("active");
    });
  });

  // --- Toggle Switch for Two-Factor Authentication ---
  const tfaToggle = document.getElementById("tfa-toggle");
  const tfaLabel = document.querySelector(".toggle-label");

  if (tfaToggle) {
    tfaToggle.addEventListener("change", function () {
      tfaLabel.textContent = this.checked ? "Enabled" : "Disabled";
    });
  }

  // --- Toggle Switch for Notifications ---
  const notificationToggles = document.querySelectorAll(".toggle-switch input");

  notificationToggles.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      const status = this.checked ? "ON" : "OFF";
      console.log(`Notification "${this.id}" switched to ${status}`);
    });
  });

  const avatarInput = document.getElementById("avatar-input");
  const avatarPreview = document.getElementById("profile-img-preview");

  if (avatarInput && avatarPreview) {
    avatarInput.addEventListener("change", async function () {
      const file = this.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = async function (e) {
          avatarPreview.src = e.target.result;

          try {
            const token = window.localStorage.getItem("token");
            const response = await fetch(
              "https://serverkita.vercel.app/auth/changeProfilePhoto",
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  profilePhoto: `${e.target.result}`,
                }),
              }
            );
            const res = await response.json();

            if (res.status === 200) {
              window.localStorage.setItem("user", JSON.stringify(res.data));
              window.location.href = window.location.href;
              alert(res.message);
            } else {
              alert(res.message);
            }
          } catch (error) {
            console.log(error);
          }
          // Simpan ke localStorage agar tetap tampil saat reload (optional)
          localStorage.setItem("profileAvatar", e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file.");
      }
    });

    // Cek localStorage jika ada avatar tersimpan
    const savedAvatar = localStorage.getItem("profileAvatar");
    if (savedAvatar) {
      avatarPreview.src = savedAvatar;
    }
  }
});
