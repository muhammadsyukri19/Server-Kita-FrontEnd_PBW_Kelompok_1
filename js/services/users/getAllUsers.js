const formatDate = (isoDate) => {
  const options = {
    day: "2-digit",
    month: "long", // nama bulan lengkap
    year: "numeric",
  };

  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("id-ID", options).format(date);
};

const deleteUser = async (id) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await fetch(
      "http://localhost:5000/auth/deleteUserById/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const res = await response.json();

    if (res.status === 200) {
      alert(res.message);
      window.location.href = window.location.href;
    } else {
      alert(res.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const mappingEditButton = (datas) => {
  try {
    datas.forEach((data, i) => {
      document
        .getElementById("admin-edit-user-btn-" + data._id)
        .addEventListener("click", () => {
          window.localStorage.setItem("editedUser", JSON.stringify(data));
          window.location.href = "/pages/editUser.html";
        });
    });
  } catch (error) {
    console.log(error);
  }
};
const mappingDeleteButton = (datas) => {
  try {
    datas.forEach((data, i) => {
      document
        .getElementById("admin-delete-user-btn-" + data._id)
        .addEventListener("click", () => deleteUser(data._id));
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const table = document.getElementById("body-table");
    const token = window.localStorage.getItem("token");
    const response = await fetch(
      "https://serverkita.vercel.app/auth/getAllUsers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const res = await response.json();

    if (res.status === 200) {
      res.data.forEach((user, i) => {
        table.innerHTML += `<tr>
              <td class="checkbox-cell"><input type="checkbox"></td>
              <td>${user._id}</td>
              <td>${user.firstName + " " + user.lastName}</td>
              <td>${user.email}</td>
              <td>${user.role ? "Admin" : "User"}</td>
              <td><span class="status status-active">${
                user.status ? "Active" : "Inactive"
              }</span></td>
              <td>${formatDate(user.createdAt)}</td>
              <td>
                  <div class="action-buttons">
                      <button class="action-btn edit-btn" id="admin-edit-user-btn-${
                        user._id
                      }"><i class="fas fa-edit"></i></button>
                      <button class="action-btn delete-btn" id="admin-delete-user-btn-${
                        user._id
                      }"><i class="fas fa-trash"></i></button>
                  </div>
              </td>
          </tr>`;
      });

      mappingEditButton(res.data);
      mappingDeleteButton(res.data);
    } else {
      alert(res.message);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

getAllUsers();
