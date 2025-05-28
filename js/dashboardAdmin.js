document.addEventListener("DOMContentLoaded", function () {
  // Add active class to current page in sidebar
  const sidebarLinks = document.querySelectorAll(".sidebar-menu a");
  const userRole = sessionStorage.getItem("userRole");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      sidebarLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");
    });
  });

  // Add functionality to checkboxes
  const mainCheckbox = document.querySelector("thead .checkbox-cell input");
  const rowCheckboxes = document.querySelectorAll("tbody .checkbox-cell input");

  if (mainCheckbox) {
    mainCheckbox.addEventListener("change", function () {
      rowCheckboxes.forEach((checkbox) => {
        checkbox.checked = this.checked;
      });
    });
  }

  // Add Delete confirmation
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this user?")) {
        // Delete user functionality would go here
        console.log("User deleted");
      }
    });
  });
});
