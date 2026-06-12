const API_BASE = "http://localhost:5000";
const form = document.getElementById("loginForm");
const roleTitle = document.getElementById("roleTitle");
const togglePassword = document.getElementById("togglePassword");
const popup = document.getElementById("popup");
const popupIcon = document.getElementById("popupIcon");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const userRole = localStorage.getItem("userRole");

if (!userRole) {
  window.location.href = "role.html";
} else {
  roleTitle.textContent = `${userRole === "hr" ? "HR" : "Employee"} Login`;
}

togglePassword.addEventListener("click", () => {
  const password = document.getElementById("password");
  const isPassword = password.type === "password";
  password.type = isPassword ? "text" : "password";
  togglePassword.innerHTML = isPassword
    ? '<i class="fa-solid fa-eye-slash"></i>'
    : '<i class="fa-solid fa-eye"></i>';
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
 const loginInput =document.getElementById("userid").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!loginInput || !password) {
    return showPopup("Please enter your credentials", false);
  }

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginInput, password })
    });

    const data = await response.json();

    if (!data.success) {
      return showPopup(data.message || "Login failed", false);
    }

    if (data.role !== userRole) {
      return showPopup(`Please login with ${userRole.toUpperCase()} credentials`, false);
    }

    localStorage.setItem("employeeId", data.employee_id);
    localStorage.setItem("userRole", data.role);
    showPopup("Login successful", true);

    setTimeout(() => {
      window.location.href = data.role === "hr" ? "hrDashboard.html" : "employeeDashboard.html";
    }, 1100);
  } catch (error) {
    showPopup("Unable to connect to the server", false);
  }
});

function showPopup(message, success = true) {
  popupIcon.className = success ? "fa-solid fa-circle-check" : "fa-solid fa-triangle-exclamation";
  popupTitle.textContent = success ? "Success" : "Error";
  popupMessage.textContent = message;
  popup.classList.toggle("success", success);
  popup.classList.toggle("error", !success);
  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}
