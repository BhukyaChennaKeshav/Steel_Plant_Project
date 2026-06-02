const employeeId = localStorage.getItem("employeeId");

const userRole = localStorage.getItem("userRole");

const frame = document.getElementById("frame");

const navItems = Array.from(
  document.querySelectorAll(".nav-item[data-page]")
);

/* LOGIN CHECK */

if (!employeeId || userRole !== "hr") {

  window.location.href = "role.html";
}

/* USER DETAILS */

document.getElementById("username")
.innerText = "HR Manager";

document.getElementById("welcomeName")
.innerText = "Steel Plant HR";

/* NAVIGATION */

navItems.forEach((button) => {

  button.addEventListener("click", () => {

    const page = button.dataset.page;

    frame.src = page;

    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
  });

});

/* OPEN LOGOUT POPUP */

document.querySelector(".sidebar-logout")
.addEventListener("click", logout);

function logout(){

  document.getElementById(
    "logoutPopup"
  ).style.display = "flex";
}

/* CLOSE POPUP */

function closePopup(){

  document.getElementById(
    "logoutPopup"
  ).style.display = "none";
}

/* CONFIRM LOGOUT */

function confirmLogout(){

  localStorage.clear();

  window.location.href =
  "role.html";
}