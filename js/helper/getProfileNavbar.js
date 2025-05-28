const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};
const getProfileNavbar = () => {
  const firstNameNavbar = document.getElementById("firsname-nav");
  const roleNavbar = document.getElementById("role-nav");
  const user = JSON.parse(window.localStorage.getItem("user"));

  firstNameNavbar.innerHTML = toTitleCase(user.firstName);
  roleNavbar.innerHTML = user.role ? "Admin" : "Pengguna";
};

const getUserNameDashboardUser = () => {
  try {
    const userName = document.getElementById("user-name");
    const user = JSON.parse(window.localStorage.getItem("user"));
    userName.innerHTML = toTitleCase(user.firstName);
  } catch (error) {
    console.log(error);
  }
};

const getInfoUserBilling = () => {
  try {
    const userName = document.getElementById("username-billing");
    const userId = document.getElementById("id-billing");
    const email = document.getElementById("email-billing");
    const user = JSON.parse(window.localStorage.getItem("user"));
    userName.innerHTML = toTitleCase(user.firstName + " " + user.lastName);
    userId.innerHTML = user._id;
    email.innerHTML = user.email;
  } catch (error) {
    console.log(error);
  }
};

getProfileNavbar();
getUserNameDashboardUser();
getInfoUserBilling();
