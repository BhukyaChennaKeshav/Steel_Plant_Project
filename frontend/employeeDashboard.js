document.addEventListener("DOMContentLoaded", () => {
  const employeeId = localStorage.getItem("employeeId");
  const userRole = localStorage.getItem("userRole");

  if (!employeeId || userRole !== "employee") {
    window.location.href = "role.html";
    return;
  }

  const frame = document.getElementById("frame");
  const navButtons = Array.from(document.querySelectorAll(".nav-item[data-page]"));
  const username = document.getElementById("username");
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menuBtn");
  const logoutButton = document.querySelector(".sidebar-logout");
  const logoutPopup = document.getElementById("logoutPopup");

  username.textContent = employeeId;

  function setActive(button) {
    navButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
  }

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      frame.src = button.dataset.page;
      setActive(button);

      if (window.innerWidth <= 980) {
        sidebar.classList.remove("active");
      }
    });
  });

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  logoutButton.addEventListener("click", () => {
    logoutPopup.style.display = "flex";

    if (window.innerWidth <= 980) {
      sidebar.classList.remove("active");
    }
  });

  window.closePopup = function closePopup() {
    logoutPopup.style.display = "none";
  };

  window.confirmLogout = function confirmLogout() {
    localStorage.clear();
    window.location.href = "role.html";
  };
});
