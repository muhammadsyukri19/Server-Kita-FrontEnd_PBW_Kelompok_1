// Menangani navigasi sidebar
const sidebarLinks = document.querySelectorAll(".sidebar-menu a");
sidebarLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = link.getAttribute("onclick").match(/'([^']+)'/)[1];
    window.location.href = target;
  });
});

// Menangani filter server
document
  .querySelector(".table-filters select")
  .addEventListener("change", filterTable);
document
  .querySelector(".search-filter input")
  .addEventListener("input", filterTable);

function filterTable() {
  const typeFilter = document
    .querySelector(".table-filters select")
    .value.toLowerCase();
  const searchFilter = document
    .querySelector(".search-filter input")
    .value.toLowerCase();

  document.querySelectorAll(".data-table tbody tr").forEach((row) => {
    const type = row.cells[2]?.innerText.toLowerCase();
    const name = row.cells[1]?.innerText.toLowerCase();
    const matchType = !typeFilter || type === typeFilter;
    const matchSearch = !searchFilter || name.includes(searchFilter);
    row.style.display = matchType && matchSearch ? "" : "none";
  });
}

// Konfigurasi grafik menggunakan Chart.js
document.addEventListener("DOMContentLoaded", () => {
  const loadChartCtx = document.getElementById("loadChart").getContext("2d");
  new Chart(loadChartCtx, {
    type: "line",
    data: {
      labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
      datasets: [
        {
          label: "Load Average",
          data: [2.1, 1.8, 2.4, 1.5, 2.0],
          borderColor: "blue",
          fill: false,
        },
      ],
    },
  });

  const storageChartCtx = document
    .getElementById("storageChart")
    .getContext("2d");
  new Chart(storageChartCtx, {
    type: "doughnut",
    data: {
      labels: ["Used", "Free"],
      datasets: [
        {
          data: [75, 25],
          backgroundColor: ["red", "green"],
        },
      ],
    },
  });
});

// Menangani aksi tombol di tabel
document.querySelectorAll(".action-btn").forEach((button) => {
  button.addEventListener("click", () => {
    alert("Action triggered!");
  });
});
