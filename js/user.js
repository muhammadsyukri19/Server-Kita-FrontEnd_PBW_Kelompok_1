document.addEventListener("DOMContentLoaded", function () {
  // Ambil data user dari localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userTable = document.querySelector(".users-table tbody");

  // Tampilkan user dalam tabel
  users.forEach((user, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="checkbox-cell"><input type="checkbox"></td>
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td><span class="status ${
        user.status === "active" ? "status-active" : "status-inactive"
      }">${user.status}</span></td>
      <td>${new Date().toLocaleDateString()}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
          <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    `;
    userTable.appendChild(newRow);
  });

  // Filter Users
  const roleFilter = document.getElementById("role-filter");
  const statusFilter = document.getElementById("status-filter");
  const searchInput = document.getElementById("search-users");
  const userRows = document.querySelectorAll(".users-table tbody tr");

  function filterUsers() {
    const role = roleFilter.value.toLowerCase();
    const status = statusFilter.value.toLowerCase();
    const searchQuery = searchInput.value.toLowerCase();

    userRows.forEach((row) => {
      const userRole = row.children[4].textContent.toLowerCase();
      const userStatus = row.children[5].textContent.toLowerCase();
      const userName = row.children[2].textContent.toLowerCase();
      const userEmail = row.children[3].textContent.toLowerCase();

      const matchesRole = role === "all" || userRole === role;
      const matchesStatus = status === "all" || userStatus === status;
      const matchesSearch =
        userName.includes(searchQuery) || userEmail.includes(searchQuery);

      if (matchesRole && matchesStatus && matchesSearch) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    });
  }

  roleFilter.addEventListener("change", filterUsers);
  statusFilter.addEventListener("change", filterUsers);
  searchInput.addEventListener("keyup", filterUsers);

  // Handle Edit & Delete Actions
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", function () {
      alert("Edit user: " + this.closest("tr").children[2].textContent);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      const userName = row.children[2].textContent;
      if (confirm(`Are you sure you want to delete ${userName}?`)) {
        row.remove();
      }
    });
  });
});
  