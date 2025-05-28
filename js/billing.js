document.addEventListener("DOMContentLoaded", function () {
  const transactions = [
    { id: 1, name: "John Doe", amount: 120.0, status: "paid" },
    { id: 2, name: "Jane Smith", amount: 85.5, status: "pending" },
    { id: 3, name: "Mark Wilson", amount: 200.0, status: "failed" },
    { id: 4, name: "Emily Johnson", amount: 150.75, status: "paid" },
  ];

  const transactionTable = document.querySelector(".data-table tbody");
  const filterStatus = document.querySelector("#filter-status");
  const totalBalance = document.querySelector(".balance");
  const transactionCount = document.querySelector(".transaction-count");

  function renderTable(filter = "all") {
    transactionTable.innerHTML = "";
    let filteredTransactions = transactions.filter((t) =>
      filter === "all" ? true : t.status === filter
    );

    let total = 0;
    filteredTransactions.forEach((t) => {
      total += t.status === "paid" ? t.amount : 0;
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${t.id}</td>
          <td>${t.name}</td>
          <td>$${t.amount.toFixed(2)}</td>
          <td><span class="badge ${t.status}">${t.status}</span></td>
          <td>
            <button class="action-btn pay-btn" data-id="${t.id}">Pay</button>
            <button class="action-btn delete-btn" data-id="${
              t.id
            }">Delete</button>
          </td>
        `;
      transactionTable.appendChild(row);
    });
    totalBalance.textContent = `$${total.toFixed(2)}`;
    transactionCount.textContent = filteredTransactions.length;
  }

  filterStatus.addEventListener("change", function () {
    renderTable(this.value);
  });

  transactionTable.addEventListener("click", function (event) {
    if (event.target.classList.contains("pay-btn")) {
      const id = event.target.getAttribute("data-id");
      let transaction = transactions.find((t) => t.id == id);
      if (transaction && transaction.status !== "paid") {
        transaction.status = "paid";
        renderTable(filterStatus.value);
      }
    }

    if (event.target.classList.contains("delete-btn")) {
      const id = event.target.getAttribute("data-id");
      const index = transactions.findIndex((t) => t.id == id);
      if (index !== -1) {
        transactions.splice(index, 1);
        renderTable(filterStatus.value);
      }
    }
  });

  renderTable();
});
