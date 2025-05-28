// Get the modal and buttons
const modal = document.getElementById("add-user-modal");
const openModalButton = document.getElementById("open-modal-button"); // Add this button in your HTML
const closeModalButtons = document.querySelectorAll(".close-modal");
const saveUserButton = document.getElementById("save-new-user");

// Function to open the modal
function openModal() {
  modal.style.display = "flex";
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Event listeners for opening the modal
if (openModalButton) {
  openModalButton.addEventListener("click", openModal);
}

// Event listeners for closing the modal
closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Function to save user data to local storage
function saveUserToLocalStorage(user) {
  // Get existing users from local storage
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Add the new user to the list
  existingUsers.push(user);

  // Save the updated list back to local storage
  localStorage.setItem("users", JSON.stringify(existingUsers));
}

// Handle form submission
saveUserButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Get form data
  const userName = document.getElementById("new-user-name").value;
  const userEmail = document.getElementById("new-user-email").value;
  const userRole = document.getElementById("new-user-role").value;
  const userStatus = document.getElementById("new-user-status").value;
  const userPassword = document.getElementById("new-user-password").value;
  const userConfirmPassword = document.getElementById(
    "new-user-confirm-password"
  ).value;
  const userNotes = document.getElementById("new-user-notes").value;

  // Basic validation
  if (
    !userName ||
    !userEmail ||
    !userRole ||
    !userStatus ||
    !userPassword ||
    !userConfirmPassword
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  if (userPassword !== userConfirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Create user object
  const newUser = {
    name: userName,
    email: userEmail,
    role: userRole,
    status: userStatus,
    password: userPassword,
    notes: userNotes,
  };

  // Save the new user to local storage
  saveUserToLocalStorage(newUser);

  // Close the modal after saving
  closeModal();

  // Clear the form
  document.getElementById("add-user-form").reset();

  // Optional: Show a success message
  alert("User saved successfully!");

  // Optional: Redirect to user.html after saving
  window.location.href = "user.html";
});
