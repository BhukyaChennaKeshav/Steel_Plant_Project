document.addEventListener("DOMContentLoaded", () => {
  const employeeId = localStorage.getItem("employeeId");
  const userRole = localStorage.getItem("userRole");

  if (!employeeId || userRole !== "hr") {
    window.location.href = "role.html";
    return;
  }

  const frame = document.getElementById("frame");
  const navItems = Array.from(document.querySelectorAll(".nav-item[data-page]"));
  const logoutButton = document.querySelector(".sidebar-logout");
  const username = document.getElementById("username");
  const welcomeName = document.getElementById("welcomeName");
  const logoutPopup = document.getElementById("logoutPopup");

  username.textContent = "HR Manager";
  welcomeName.textContent = "Steel Plant HR";

  navItems.forEach((button) => {
    button.addEventListener("click", () => {
      frame.src = button.dataset.page;

      navItems.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");
    });
  });

  logoutButton.addEventListener("click", () => {
    logoutPopup.style.display = "flex";
  });

  window.closePopup = function closePopup() {
    logoutPopup.style.display = "none";
  };

  window.confirmLogout = function confirmLogout() {
    localStorage.clear();
    window.location.href = "role.html";
  };
});
