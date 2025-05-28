const formatDate = (isoDate) => {
  const options = {
    day: "2-digit",
    month: "long", // nama bulan lengkap
    year: "numeric",
  };

  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("id-ID", options).format(date);
};

const getUserProfile = async () => {
  try {
    // Elemen form fields
    const firstName = document.getElementById("profile-first-name");
    const lastName = document.getElementById("profile-last-name");
    const email = document.getElementById("profile-email");
    const phone = document.getElementById("profile-phone");
    const company = document.getElementById("profile-company");
    const jobTitle = document.getElementById("profile-job-title");
    const address = document.getElementById("profile-address");
    const fullNameHeader = document.getElementById("fullname-header");
    const emailHeader = document.getElementById("email-header");
    const imageProfileHeader = document.getElementById("profile-img-preview");
    const createdAt = document.getElementById("createdAt-header");

    const user = JSON.parse(window.localStorage.getItem("user"));
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    email.value = user.email;
    phone.value = user.phone;
    company.value = user.company;
    jobTitle.value = user.jobTitle;
    address.value = user.address;

    user.profilePhoto === ""
      ? imageProfileHeader.setAttribute("src", "../asset/login.jpg")
      : imageProfileHeader.setAttribute("src", user.profilePhoto);

    fullNameHeader.innerHTML = `${user.firstName} ${user.lastName}`;
    emailHeader.innerHTML = user.email;
    createdAt.innerHTML = `${formatDate(user.createdAt)}`;
  } catch (error) {
    console.error("DOM Error:", error);
  }
};

getUserProfile();
